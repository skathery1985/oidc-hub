const express = require('express');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes (important for client-side OIDC/PKCE requests)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware for traditional web / non-SPA simulation
app.use(session({
  name: 'oidc-pkce-session',
  secret: 'oidc-pkce-super-secret-session-key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // http for localhost
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// In-memory key pair generation (RSA 2048) for OpenID Connect signing
const KEY_ID = 'oidc-pkce-hub-key-1';
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Export public key as JWK
const pubKeyObject = crypto.createPublicKey(publicKey);
const jwkExport = pubKeyObject.export({ format: 'jwk' });
const JWK_SET = {
  keys: [
    {
      kty: jwkExport.kty,
      n: jwkExport.n,
      e: jwkExport.e,
      alg: 'RS256',
      use: 'sig',
      kid: KEY_ID
    }
  ]
};

// In-memory stores
const authCodes = new Map(); // code -> { clientId, redirectUri, codeChallenge, codeChallengeMethod, user, nonce, scope, createdAt }
const refreshTokens = new Map(); // token -> { clientId, user, scope, createdAt }
const logs = [];
const sseClients = new Set();

// Mock Users
const MOCK_USERS = {
  'alex.morgan': {
    id: 'usr_alex_001',
    username: 'alex.morgan',
    name: 'Alex Morgan',
    given_name: 'Alex',
    family_name: 'Morgan',
    email: 'alex.morgan@corp.example.com',
    email_verified: true,
    roles: ['admin', 'security_engineer', 'developer'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Cybersecurity & IAM'
  },
  'alice.smith': {
    id: 'usr_alice_002',
    username: 'alice.smith',
    name: 'Alice Smith',
    given_name: 'Alice',
    family_name: 'Smith',
    email: 'alice.smith@dev.example.com',
    email_verified: true,
    roles: ['developer', 'architect'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'Platform Engineering'
  },
  'bob.johnson': {
    id: 'usr_bob_003',
    username: 'bob.johnson',
    name: 'Bob Johnson',
    given_name: 'Bob',
    family_name: 'Johnson',
    email: 'bob.johnson@business.example.com',
    email_verified: true,
    roles: ['product_manager', 'user'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Digital Products'
  }
};

// Helper: Base64URL encoding
function base64UrlEncode(buffer) {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Helper: Log event to memory and SSE stream
function logEvent(category, action, details = {}, level = 'info') {
  const entry = {
    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toISOString(),
    category, // 'PKCE', 'AUTH_CODE', 'TOKEN', 'USERINFO', 'DISCOVERY', 'SECURITY'
    action,
    level,    // 'info', 'success', 'warning', 'error'
    details
  };
  logs.push(entry);
  if (logs.length > 500) logs.shift();

  // Push to SSE clients
  const message = `data: ${JSON.stringify(entry)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(message);
    } catch (err) {
      sseClients.delete(client);
    }
  }
  return entry;
}

// Helper: Get Base URL dynamically
function getBaseUrl(req) {
  const host = req.get('host') || `localhost:${PORT}`;
  const protocol = req.protocol || 'http';
  return `${protocol}://${host}`;
}

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------------------------------------------
// 1. OPENID CONNECT DISCOVERY & JWKS
// -------------------------------------------------------------

// OpenID Provider Discovery endpoint (RFC 8414 & OpenID Connect Discovery 1.0)
app.get(['/.well-known/openid-configuration', '/mock-idp/.well-known/openid-configuration'], (req, res) => {
  const baseUrl = getBaseUrl(req);
  const issuer = `${baseUrl}/mock-idp`;

  logEvent('DISCOVERY', 'OpenID Provider Metadata Requested', {
    clientIp: req.ip,
    issuer
  }, 'info');

  const config = {
    issuer: issuer,
    authorization_endpoint: `${issuer}/authorize`,
    token_endpoint: `${issuer}/token`,
    userinfo_endpoint: `${issuer}/userinfo`,
    jwks_uri: `${issuer}/jwks.json`,
    registration_endpoint: `${issuer}/register`,
    revocation_endpoint: `${issuer}/revoke`,
    introspection_endpoint: `${issuer}/introspect`,
    end_session_endpoint: `${issuer}/endsession`,
    
    // Supported PKCE Code Challenge Methods (Crucial for OIDC PKCE verification)
    code_challenge_methods_supported: ['S256', 'plain'],
    
    response_types_supported: ['code'],
    response_modes_supported: ['query', 'fragment'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['RS256'],
    scopes_supported: ['openid', 'profile', 'email', 'offline_access', 'roles', 'api'],
    token_endpoint_auth_methods_supported: ['none', 'client_secret_post', 'client_secret_basic'],
    claims_supported: [
      'sub', 'iss', 'aud', 'exp', 'iat', 'auth_time', 'nonce',
      'name', 'given_name', 'family_name', 'preferred_username',
      'email', 'email_verified', 'roles', 'department', 'avatar',
      'at_hash', 'c_hash'
    ],
    claims_parameter_supported: false,
    request_parameter_supported: false,
    request_uri_parameter_supported: false
  };

  res.setHeader('Cache-Control', 'no-cache');
  res.json(config);
});

// JWKS Endpoint
app.get('/mock-idp/jwks.json', (req, res) => {
  logEvent('DISCOVERY', 'JWKS Public Key Set Requested', {
    keyId: KEY_ID,
    alg: 'RS256'
  }, 'info');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.json(JWK_SET);
});

// -------------------------------------------------------------
// 2. OIDC AUTHORIZATION ENDPOINT (PKCE Aware)
// -------------------------------------------------------------

app.get('/mock-idp/authorize', (req, res) => {
  const {
    client_id,
    redirect_uri,
    response_type,
    scope = 'openid profile email',
    state,
    nonce,
    code_challenge,
    code_challenge_method = 'plain',
    prompt,
    user_select,
    auto_consent
  } = req.query;

  // Validation
  if (!client_id) {
    return res.status(400).send('<h1>OAuth Error: Missing client_id</h1>');
  }
  if (!redirect_uri) {
    return res.status(400).send('<h1>OAuth Error: Missing redirect_uri</h1>');
  }
  if (response_type !== 'code') {
    return res.status(400).send('<h1>OAuth Error: response_type must be "code" for Authorization Code Flow with PKCE</h1>');
  }

  // Security Check: PKCE Validation warning if missing
  const hasPkce = !!code_challenge;
  logEvent('AUTH_CODE', 'Authorization Request Received', {
    client_id,
    redirect_uri,
    scope,
    state,
    nonce,
    hasPkce,
    code_challenge: code_challenge || '(none)',
    code_challenge_method
  }, hasPkce ? 'info' : 'warning');

  // If auto_consent is requested (e.g. by quick test runners)
  if (auto_consent === 'true' || prompt === 'none') {
    const selectedUserId = user_select || 'alex.morgan';
    const user = MOCK_USERS[selectedUserId] || MOCK_USERS['alex.morgan'];
    const authCode = 'code_' + crypto.randomBytes(24).toString('hex');

    authCodes.set(authCode, {
      code: authCode,
      clientId: client_id,
      redirectUri: redirect_uri,
      codeChallenge: code_challenge,
      codeChallengeMethod: code_challenge_method,
      user,
      nonce,
      scope,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    logEvent('AUTH_CODE', 'Authorization Code Issued (Auto-Consent)', {
      authCode: authCode.substring(0, 10) + '...',
      user: user.name,
      clientId: client_id
    }, 'success');

    const redirectUrl = new URL(redirect_uri);
    redirectUrl.searchParams.set('code', authCode);
    if (state) redirectUrl.searchParams.set('state', state);

    return res.redirect(redirectUrl.toString());
  }

  // Render Interactive Authorization & Consent Screen
  const usersOptions = Object.entries(MOCK_USERS).map(([key, u]) => `
    <label class="user-option flex items-center p-3 border rounded-xl cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-slate-800/80 transition-all ${key === 'alex.morgan' ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20' : 'border-slate-200 dark:border-slate-700'}">
      <input type="radio" name="selected_user" value="${key}" ${key === 'alex.morgan' ? 'checked' : ''} class="text-indigo-600 focus:ring-indigo-500 mr-3.5 h-4 w-4">
      <img src="${u.avatar}" alt="${u.name}" class="w-10 h-10 rounded-full mr-3 border border-slate-300 dark:border-slate-600 object-cover">
      <div>
        <div class="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          ${u.name}
          <span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">${u.username}</span>
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400">${u.email} &bull; <span class="text-indigo-600 dark:text-indigo-400 font-medium">${u.department}</span></div>
      </div>
    </label>
  `).join('');

  const scopesList = scope.split(' ').map(s => `
    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
      <svg class="w-3 h-3 mr-1 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      ${s}
    </span>
  `).join(' ');

  const html = `
  <!DOCTYPE html>
  <html lang="en" class="h-full bg-slate-900">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mock OpenID Connect Provider - Consent & Authorization</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Inter', sans-serif; }
      code, pre { font-family: 'JetBrains Mono', monospace; }
    </style>
  </head>
  <body class="min-h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
    <div class="max-w-xl w-full bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
      
      <!-- Header -->
      <div class="flex items-center gap-3 pb-6 border-b border-slate-800">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold text-white flex items-center gap-2">
            OpenID Connect Provider
            <span class="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">Mock OP</span>
          </h1>
          <p class="text-xs text-slate-400">RFC 7636 PKCE Authorization Code Verification</p>
        </div>
      </div>

      <!-- App authorization banner -->
      <div class="mt-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
        <p class="text-sm text-slate-300">
          Client application <strong class="text-indigo-300 font-mono">${escapeHtml(client_id)}</strong> is requesting authorization to sign in.
        </p>
      </div>

      <!-- PKCE Verification Parameters Badge -->
      <div class="mt-4 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/50 text-xs space-y-2">
        <div class="flex items-center justify-between text-indigo-300 font-semibold uppercase tracking-wider text-[11px]">
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            PKCE Security Parameters
          </span>
          <span class="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">${hasPkce ? 'PKCE Active' : 'No PKCE'}</span>
        </div>
        <div class="grid grid-cols-1 gap-1 text-slate-300 font-mono">
          <div class="truncate"><span class="text-slate-400">code_challenge:</span> <span class="text-amber-300">${escapeHtml(code_challenge || 'none')}</span></div>
          <div><span class="text-slate-400">code_challenge_method:</span> <span class="text-cyan-300">${escapeHtml(code_challenge_method)}</span></div>
          ${nonce ? `<div class="truncate"><span class="text-slate-400">nonce:</span> <span class="text-slate-300">${escapeHtml(nonce)}</span></div>` : ''}
          ${state ? `<div class="truncate"><span class="text-slate-400">state:</span> <span class="text-slate-300">${escapeHtml(state)}</span></div>` : ''}
        </div>
      </div>

      <!-- Scopes -->
      <div class="mt-4">
        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Requested Scopes</label>
        <div class="flex flex-wrap gap-1.5">
          ${scopesList}
        </div>
      </div>

      <!-- User Selector Form -->
      <form method="POST" action="/mock-idp/approve" class="mt-6">
        <input type="hidden" name="client_id" value="${escapeHtml(client_id)}">
        <input type="hidden" name="redirect_uri" value="${escapeHtml(redirect_uri)}">
        <input type="hidden" name="state" value="${escapeHtml(state || '')}">
        <input type="hidden" name="nonce" value="${escapeHtml(nonce || '')}">
        <input type="hidden" name="scope" value="${escapeHtml(scope)}">
        <input type="hidden" name="code_challenge" value="${escapeHtml(code_challenge || '')}">
        <input type="hidden" name="code_challenge_method" value="${escapeHtml(code_challenge_method)}">

        <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select User Account to Sign In</label>
        <div class="space-y-2">
          ${usersOptions}
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex items-center gap-3">
          <button type="submit" class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all text-sm flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Authorize & Issue Code
          </button>
          <a href="${escapeHtml(redirect_uri)}?error=access_denied&state=${escapeHtml(state || '')}" class="py-3 px-4 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all text-sm font-medium">
            Cancel
          </a>
        </div>
      </form>

      <div class="mt-4 text-center">
        <p class="text-[11px] text-slate-400">Redirect URI: <span class="font-mono text-slate-400">${escapeHtml(redirect_uri)}</span></p>
      </div>

    </div>
  </body>
  </html>
  `;

  res.send(html);
});

// Consent Approval Form POST Handler
app.post('/mock-idp/approve', (req, res) => {
  const {
    client_id,
    redirect_uri,
    state,
    nonce,
    scope = 'openid profile email',
    code_challenge,
    code_challenge_method,
    selected_user = 'alex.morgan'
  } = req.body;

  const user = MOCK_USERS[selected_user] || MOCK_USERS['alex.morgan'];
  const authCode = 'code_' + crypto.randomBytes(24).toString('hex');

  authCodes.set(authCode, {
    code: authCode,
    clientId: client_id,
    redirectUri: redirect_uri,
    codeChallenge: code_challenge,
    codeChallengeMethod: code_challenge_method,
    user,
    nonce,
    scope,
    createdAt: Date.now(),
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 min
  });

  logEvent('AUTH_CODE', 'Authorization Code Issued via Consent Form', {
    authCode: authCode.substring(0, 10) + '...',
    user: user.name,
    clientId: client_id,
    hasPkce: !!code_challenge
  }, 'success');

  const redirectUrl = new URL(redirect_uri);
  redirectUrl.searchParams.set('code', authCode);
  if (state) redirectUrl.searchParams.set('state', state);

  res.redirect(redirectUrl.toString());
});

// -------------------------------------------------------------
// 3. OIDC TOKEN ENDPOINT (PKCE Cryptographic Verification)
// -------------------------------------------------------------

app.post('/mock-idp/token', (req, res) => {
  const baseUrl = getBaseUrl(req);
  const issuer = `${baseUrl}/mock-idp`;

  const {
    grant_type,
    code,
    redirect_uri,
    client_id,
    code_verifier,
    refresh_token
  } = req.body;

  // Handle Refresh Token Grant
  if (grant_type === 'refresh_token') {
    if (!refresh_token) {
      logEvent('TOKEN', 'Refresh Token Failed: Missing refresh_token', {}, 'error');
      return res.status(400).json({ error: 'invalid_request', error_description: 'Missing refresh_token parameter' });
    }

    const storedRefreshToken = refreshTokens.get(refresh_token);
    if (!storedRefreshToken) {
      logEvent('TOKEN', 'Refresh Token Failed: Invalid or expired token', { refresh_token }, 'error');
      return res.status(400).json({ error: 'invalid_grant', error_description: 'Invalid or expired refresh token' });
    }

    // Token Rotation: Invalidate old refresh token, generate new one
    refreshTokens.delete(refresh_token);
    const newRefreshToken = 'rt_' + crypto.randomBytes(32).toString('hex');
    const user = storedRefreshToken.user;
    const scope = storedRefreshToken.scope;

    refreshTokens.set(newRefreshToken, {
      clientId: client_id || storedRefreshToken.clientId,
      user,
      scope,
      createdAt: Date.now()
    });

    const accessToken = 'at_' + crypto.randomBytes(32).toString('hex');
    
    // Generate new ID Token
    const idTokenClaims = {
      iss: issuer,
      sub: user.id,
      aud: client_id || storedRefreshToken.clientId || 'default-client',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
      auth_time: Math.floor(storedRefreshToken.createdAt / 1000),
      name: user.name,
      given_name: user.given_name,
      family_name: user.family_name,
      preferred_username: user.username,
      email: user.email,
      email_verified: user.email_verified,
      roles: user.roles,
      department: user.department,
      avatar: user.avatar
    };

    const idToken = jwt.sign(idTokenClaims, privateKey, {
      algorithm: 'RS256',
      keyid: KEY_ID
    });

    logEvent('TOKEN', 'Token Refreshed Successfully (Rotation Applied)', {
      user: user.name,
      rotatedRefreshToken: newRefreshToken.substring(0, 10) + '...'
    }, 'success');

    return res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: newRefreshToken,
      id_token: idToken,
      scope: scope
    });
  }

  // Handle Authorization Code Grant with PKCE
  if (grant_type === 'authorization_code') {
    if (!code) {
      logEvent('TOKEN', 'Token Exchange Failed: Missing code', {}, 'error');
      return res.status(400).json({ error: 'invalid_request', error_description: 'Missing code parameter' });
    }

    const authSession = authCodes.get(code);
    if (!authSession) {
      logEvent('TOKEN', 'Token Exchange Failed: Code not found or already used', { code }, 'error');
      return res.status(400).json({
        error: 'invalid_grant',
        error_description: 'Authorization code is invalid, expired, or has already been redeemed (Single-use policy).'
      });
    }

    // Single-use code policy: Delete code immediately to prevent replay attacks
    authCodes.delete(code);

    // Check expiration (5 min)
    if (Date.now() > authSession.expiresAt) {
      logEvent('TOKEN', 'Token Exchange Failed: Code expired', { code }, 'error');
      return res.status(400).json({ error: 'invalid_grant', error_description: 'Authorization code has expired' });
    }

    // -----------------------------------------------------------
    // PKCE CRYPTOGRAPHIC VERIFICATION (RFC 7636 Section 4.6)
    // -----------------------------------------------------------
    if (authSession.codeChallenge) {
      if (!code_verifier) {
        logEvent('PKCE', 'PKCE Verification Failed: Code challenge was set at /authorize, but no code_verifier was sent to /token', {
          storedChallenge: authSession.codeChallenge,
          method: authSession.codeChallengeMethod
        }, 'error');
        return res.status(400).json({
          error: 'invalid_grant',
          error_description: 'PKCE Verification Failed: Authorization request specified code_challenge, but token request did not provide code_verifier.'
        });
      }

      let calculatedChallenge;
      if (authSession.codeChallengeMethod === 'S256' || !authSession.codeChallengeMethod) {
        // S256: BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))
        const hash = crypto.createHash('sha256').update(code_verifier, 'ascii').digest();
        calculatedChallenge = base64UrlEncode(hash);
      } else if (authSession.codeChallengeMethod === 'plain') {
        // Plain: code_verifier === code_challenge
        calculatedChallenge = code_verifier;
      } else {
        logEvent('PKCE', `Unsupported code_challenge_method: ${authSession.codeChallengeMethod}`, {}, 'error');
        return res.status(400).json({
          error: 'invalid_request',
          error_description: `Unsupported code_challenge_method: ${authSession.codeChallengeMethod}`
        });
      }

      const match = calculatedChallenge === authSession.codeChallenge;

      if (!match) {
        logEvent('PKCE', 'PKCE Cryptographic Verification Mismatch!', {
          providedVerifier: code_verifier,
          calculatedChallenge: calculatedChallenge,
          expectedChallenge: authSession.codeChallenge,
          method: authSession.codeChallengeMethod
        }, 'error');
        return res.status(400).json({
          error: 'invalid_grant',
          error_description: 'PKCE Verification Failed: The computed hash of code_verifier does not match the original code_challenge.',
          details: {
            method: authSession.codeChallengeMethod,
            computed_challenge: calculatedChallenge,
            expected_challenge: authSession.codeChallenge
          }
        });
      }

      logEvent('PKCE', 'PKCE Cryptographic Verification Succeeded (S256 match)!', {
        verifier: code_verifier.substring(0, 8) + '...',
        method: authSession.codeChallengeMethod,
        matchedChallenge: calculatedChallenge
      }, 'success');
    }

    const user = authSession.user;
    const accessToken = 'at_' + crypto.randomBytes(32).toString('hex');
    const newRefreshToken = 'rt_' + crypto.randomBytes(32).toString('hex');

    // Store refresh token
    refreshTokens.set(newRefreshToken, {
      clientId: client_id || authSession.clientId,
      user,
      scope: authSession.scope,
      createdAt: Date.now()
    });

    // Compute at_hash (Access Token Hash) for ID Token
    // RFC 7519 / OIDC Core: at_hash is base64url-encoded left-most half of SHA-256 of access_token
    const atHashDigest = crypto.createHash('sha256').update(accessToken, 'ascii').digest();
    const atHashHalf = atHashDigest.subarray(0, atHashDigest.length / 2);
    const at_hash = base64UrlEncode(atHashHalf);

    // Compute c_hash (Code Hash)
    const cHashDigest = crypto.createHash('sha256').update(code, 'ascii').digest();
    const cHashHalf = cHashDigest.subarray(0, cHashDigest.length / 2);
    const c_hash = base64UrlEncode(cHashHalf);

    // Construct ID Token Claims
    const idTokenPayload = {
      iss: issuer,
      sub: user.id,
      aud: client_id || authSession.clientId || 'demo-client-app',
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
      iat: Math.floor(Date.now() / 1000),
      auth_time: Math.floor(authSession.createdAt / 1000),
      at_hash: at_hash,
      c_hash: c_hash,
      name: user.name,
      given_name: user.given_name,
      family_name: user.family_name,
      preferred_username: user.username,
      email: user.email,
      email_verified: user.email_verified,
      roles: user.roles,
      department: user.department,
      avatar: user.avatar
    };

    if (authSession.nonce) {
      idTokenPayload.nonce = authSession.nonce;
    }

    // Sign ID Token with RSA Private Key (RS256)
    const idToken = jwt.sign(idTokenPayload, privateKey, {
      algorithm: 'RS256',
      keyid: KEY_ID
    });

    logEvent('TOKEN', 'Tokens Issued Successfully (ID Token RS256 Signed)', {
      user: user.name,
      email: user.email,
      clientId: client_id || authSession.clientId,
      scopes: authSession.scope
    }, 'success');

    return res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: newRefreshToken,
      id_token: idToken,
      scope: authSession.scope
    });
  }

  logEvent('TOKEN', `Unsupported grant_type: ${grant_type}`, {}, 'error');
  return res.status(400).json({ error: 'unsupported_grant_type', error_description: `Grant type "${grant_type}" is not supported` });
});

// -------------------------------------------------------------
// 4. OIDC USERINFO ENDPOINT
// -------------------------------------------------------------

app.get('/mock-idp/userinfo', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logEvent('USERINFO', 'UserInfo Request Unauthorized: Missing or invalid Bearer token', {}, 'warning');
    return res.status(401).json({ error: 'invalid_token', error_description: 'Bearer token required in Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  // In this mock OP, find user by access token or return default user
  const defaultUser = MOCK_USERS['alex.morgan'];

  logEvent('USERINFO', 'UserInfo Returned for User Profile', {
    sub: defaultUser.id,
    name: defaultUser.name
  }, 'info');

  res.json({
    sub: defaultUser.id,
    name: defaultUser.name,
    given_name: defaultUser.given_name,
    family_name: defaultUser.family_name,
    preferred_username: defaultUser.username,
    email: defaultUser.email,
    email_verified: defaultUser.email_verified,
    roles: defaultUser.roles,
    department: defaultUser.department,
    avatar: defaultUser.avatar,
    updated_at: Math.floor(Date.now() / 1000)
  });
});

// -------------------------------------------------------------
// 5. HELPER APIS FOR PLAYGROUND & TOOLS
// -------------------------------------------------------------

// PKCE Generator API
app.post('/api/pkce/generate', (req, res) => {
  const length = parseInt(req.body.length, 10) || 64;
  const clampedLength = Math.max(43, Math.min(128, length));

  // Generate high-entropy random string (RFC 7636 Section 4.1: characters A-Z, a-z, 0-9, "-", ".", "_", "~")
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let verifier = '';
  const randomBytes = crypto.randomBytes(clampedLength);
  for (let i = 0; i < clampedLength; i++) {
    verifier += charset[randomBytes[i] % charset.length];
  }

  // Calculate S256 Challenge
  const hash = crypto.createHash('sha256').update(verifier, 'ascii').digest();
  const challengeS256 = base64UrlEncode(hash);

  // Generate State and Nonce
  const state = base64UrlEncode(crypto.randomBytes(16));
  const nonce = base64UrlEncode(crypto.randomBytes(16));

  res.json({
    verifier,
    challenge_s256: challengeS256,
    challenge_plain: verifier,
    state,
    nonce,
    length: clampedLength
  });
});

// PKCE Verification Step-by-Step Inspector API
app.post('/api/pkce/verify', (req, res) => {
  const { verifier, challenge, method = 'S256' } = req.body;
  if (!verifier || !challenge) {
    return res.status(400).json({ error: 'Both verifier and challenge are required' });
  }

  const asciiBytes = Buffer.from(verifier, 'ascii');
  const sha256Digest = crypto.createHash('sha256').update(asciiBytes).digest();
  const computedChallenge = method === 'S256' ? base64UrlEncode(sha256Digest) : verifier;
  const matches = computedChallenge === challenge;

  res.json({
    verifier,
    verifier_length: verifier.length,
    is_valid_rfc7636_length: verifier.length >= 43 && verifier.length <= 128,
    method,
    steps: {
      step1_ascii_hex: asciiBytes.toString('hex'),
      step2_sha256_hex: sha256Digest.toString('hex'),
      step3_base64url: base64UrlEncode(sha256Digest)
    },
    computed_challenge: computedChallenge,
    provided_challenge: challenge,
    matches
  });
});

// Remote IdP Discovery Analyzer
app.get('/api/discovery/analyze', async (req, res) => {
  const { issuer } = req.query;
  if (!issuer) {
    return res.status(400).json({ error: 'Missing issuer query parameter' });
  }

  let discoveryUrl = issuer.trim();
  if (!discoveryUrl.endsWith('/.well-known/openid-configuration')) {
    discoveryUrl = discoveryUrl.replace(/\/+$/, '') + '/.well-known/openid-configuration';
  }

  try {
    const response = await fetch(discoveryUrl, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Discovery endpoint returned HTTP ${response.status} ${response.statusText}`
      });
    }
    const data = await response.json();

    // Check PKCE support
    const pkceMethods = data.code_challenge_methods_supported || [];
    const supportsS256 = pkceMethods.includes('S256');

    res.json({
      discoveryUrl,
      supportsPKCE: supportsS256 || pkceMethods.length > 0,
      supportsS256,
      code_challenge_methods_supported: pkceMethods,
      authorization_endpoint: data.authorization_endpoint,
      token_endpoint: data.token_endpoint,
      userinfo_endpoint: data.userinfo_endpoint,
      jwks_uri: data.jwks_uri,
      response_types_supported: data.response_types_supported || [],
      grant_types_supported: data.grant_types_supported || [],
      raw: data
    });
  } catch (err) {
    res.status(500).json({
      error: `Failed to fetch OIDC discovery configuration: ${err.message}`
    });
  }
});

// Proxy Token Request (solves CORS issues when user wants to test external IdPs)
app.post('/api/proxy/token', async (req, res) => {
  const { token_endpoint, form_data } = req.body;
  if (!token_endpoint || !form_data) {
    return res.status(400).json({ error: 'Missing token_endpoint or form_data' });
  }

  try {
    const bodyParams = new URLSearchParams(form_data);
    const response = await fetch(token_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: bodyParams.toString()
    });

    const json = await response.json();
    res.status(response.status).json(json);
  } catch (err) {
    res.status(500).json({ error: `Proxy Token Request failed: ${err.message}` });
  }
});

// Live Event Stream (Server-Sent Events)
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial connected event & recent logs
  res.write(`data: ${JSON.stringify({ type: 'INIT', logs: logs.slice(-30) })}\n\n`);

  sseClients.add(res);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

// Get recent logs
app.get('/api/logs', (req, res) => {
  res.json({ logs });
});

// Clear logs
app.delete('/api/logs', (req, res) => {
  logs.length = 0;
  logEvent('SECURITY', 'Log history cleared by user', {}, 'info');
  res.json({ status: 'ok' });
});

// Helper function to escape HTML
function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 OIDC PKCE Master Hub & Testing Playground`);
  console.log(`📡 Server running at: http://localhost:${PORT}`);
  console.log(`🔐 Mock OpenID Issuer: http://localhost:${PORT}/mock-idp`);
  console.log(`📄 Discovery Endpoint: http://localhost:${PORT}/.well-known/openid-configuration`);
  console.log(`=======================================================`);
});
