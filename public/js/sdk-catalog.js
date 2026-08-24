/**
 * Comprehensive Certified SDK Catalog, Configuration Blueprints & Multi-Language Demos
 * Covers OpenID Foundation Certified libraries across SPA, Non-SPA, iOS, Android, and Cross-Platform.
 */

window.BRAND_LOGOS = {
  flutter: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.07 11.536L8.01 17.91l3.684 3.702 3.68-3.682 6.31-6.394h-7.3z" fill="#02569B"/><path d="M11.694 21.612L15.378 24h7.308l-6.314-6.394-6.372 4.006z" fill="#0175C2"/><path d="M8.01 17.91l3.684 3.702 3.68-3.682-3.68-3.702-3.684 3.682z" fill="#29B6F6"/></svg>`,
  ios: `<svg class="w-8 h-8 flex-shrink-0 text-slate-800 dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.14.65-2.73 1.35-.53.61-.98 1.68-.93 2.7.07 0 .15.01.23.01.83 0 1.81-.44 2.42-1.19z"/></svg>`,
  android: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#3DDC84"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1557-.2699.0634-.6139-.2064-.7696-.2698-.1557-.6138-.0633-.7695.2064l-2.0238 3.5053c-1.3917-.635-2.9298-.9873-4.5778-.9873s-3.1861.3523-4.5778.9873L5.2984 5.3013c-.1557-.2697-.4997-.3621-.7695-.2064-.2698.1557-.3621.4997-.2064.7696l1.996 3.4572C2.7161 11.2933.2721 15.6174 0 20.6725h24c-.2721-5.0551-2.7161-9.3792-6.1185-11.3511"/></svg>`,
  react: `<svg class="w-8 h-8 flex-shrink-0" viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
  nodejs: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#339933"><path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm-1.12 18.37c-3.18 0-4.88-1.55-4.88-4.42 0-2.85 1.7-4.42 4.88-4.42 3.16 0 4.86 1.57 4.86 4.42 0 2.87-1.7 4.42-4.86 4.42z"/></svg>`,
  python: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24"><path d="M11.91 0C5.55 0 5.92 2.76 5.92 2.76l.01 2.86h6.08v.86H3.59S0 6.08 0 12.48c0 6.4 3.13 6.18 3.13 6.18h1.87v-2.62s-.1-3.13 3.08-3.13h5.27s2.96.05 2.96-2.88V3.03S16.78 0 11.91 0zm-3.28 1.9a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z" fill="#3776AB"/><path d="M12.09 24c6.36 0 5.99-2.76 5.99-2.76l-.01-2.86H12v-.86h8.42s3.59.4 3.59-6c0-6.4-3.13-6.18-3.13-6.18h-1.87v2.62s.1 3.13-3.08 3.13H10.66s-2.96-.05-2.96 2.88v7.02s-.47 3.03 4.39 3.03zm3.28-1.9a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" fill="#FFD43B"/></svg>`,
  spring: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#6DB33F"><path d="M21.57 14.73c-.92 2.65-2.84 4.79-5.38 6.01-1.3.62-2.71.95-4.14.96-5.84 0-10.59-4.75-10.59-10.59 0-3.32 1.54-6.39 4.14-8.38 1.48-1.13 3.25-1.83 5.12-2.02.47-.05.95-.08 1.43-.08 5.84 0 10.59 4.75 10.59 10.59 0 1.23-.21 2.45-.63 3.61-.17.47-.38.92-.63 1.34l-.01.02c.03-.02.06-.04.1-.06.01 0 .02-.01.03-.01.21-.11.39-.28.51-.48.24-.4.27-.89.09-1.32-.17-.4-.52-.7-.94-.8-.42-.1-.87-.01-1.21.23-.35.25-.56.65-.56 1.08 0 .2.05.4.14.58.18.37.52.63.92.73.4.1.82.02 1.15-.22.34-.24.55-.62.58-1.03.03-.41-.12-.81-.41-1.1-.3-.29-.71-.44-1.13-.41-.41.03-.79.23-1.04.56-.25.33-.33.75-.22 1.16.11.41.39.74.77.92.38.17.81.16 1.18-.04.38-.19.64-.54.71-.96.07-.42-.06-.85-.35-1.16-.29-.31-.7-.47-1.13-.44-.43.03-.82.25-1.07.6-.25.35-.32.79-.19 1.21.13.42.43.75.83.9.4.15.84.11 1.2-.11.36-.22.59-.6.63-1.02.04-.42-.11-.84-.42-1.13-.31-.29-.73-.43-1.15-.38z"/></svg>`,
  dotnet: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#512BD4"><path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm7.84 15.65h-2.11l-3.32-5.46v5.46h-2.22V8.35h2.16l3.27 5.37V8.35h2.22zm-9.36 0H4.16V8.35h6.32v1.94H6.38v1.64h3.69v1.89H6.38v1.83h4.1z"/></svg>`,
  go: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#00ADD8"><path d="M1.811 10.231c.427 0 .859.102 1.246.331l2.457 1.418a2.531 2.531 0 0 1 1.266 2.193v2.836c0 .907-.484 1.745-1.266 2.197L3.057 20.62a2.536 2.536 0 0 1-2.512 0L.088 20.354A.824.824 0 0 1 0 19.64V11.05c0-.455.368-.824.824-.824l.987.005zm14.12 3.66a2.766 2.766 0 0 1 2.378-1.378c1.536 0 2.78 1.246 2.78 2.78v.22h-5.558v-.22c0-.528.146-1.02.4-1.402zm8.069 1.402c0-3.082-2.5-5.578-5.578-5.578a5.58 5.58 0 0 0-5.578 5.578c0 3.082 2.5 5.578 5.578 5.578a5.55 5.55 0 0 0 4.14-1.848l-1.92-1.532a3.15 3.15 0 0 1-2.22.98 3.19 3.19 0 0 1-3.178-2.778h8.758v-.4z"/></svg>`,
  js: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M6.5 17.5c0 1.5 1 2.5 2.5 2.5 1.7 0 2.5-1 2.5-2.5V11H9.8v6.5c0 .6-.3.9-.8.9s-.8-.3-.8-.9V14H6.5v3.5zm7.3 1.2c.8.8 1.9 1.3 3.2 1.3 2 0 3.3-1 3.3-2.7 0-1.6-1-2.2-2.5-2.8l-.5-.2c-.8-.3-1.2-.6-1.2-1.2 0-.6.5-1 1.2-1 .7 0 1.3.3 1.8.8l1.2-1.2c-.8-.8-1.8-1.2-3-1.2-2 0-3.1 1.2-3.1 2.6 0 1.5.9 2.2 2.3 2.8l.5.2c.9.4 1.4.7 1.4 1.3 0 .7-.6 1.1-1.4 1.1-.9 0-1.6-.4-2.2-1.1l-1.1 1.2z" fill="#000"/></svg>`
};

window.SDK_CATALOG = [
  // =========================================================================
  // 1. SPA - Single Page Applications
  // =========================================================================
  {
    id: 'spa-oidc-client-ts',
    category: 'spa',
    logoKey: 'react',
    name: 'oidc-client-ts (React / TS / Vue)',
    certified: true,
    certificationName: 'OpenID Certified (JavaScript)',
    badge: 'Most Popular SPA SDK',
    language: 'TypeScript / JavaScript',
    framework: 'React / Vue / Angular / Vanilla',
    npmPackage: 'oidc-client-ts / react-oidc-context',
    github: 'https://github.com/authts/oidc-client-ts',
    description: 'The industry-standard OpenID Certified TypeScript library for Single Page Applications (SPA). Handles PKCE S256 code verifier/challenge generation, silent token renew via Web Worker or iframe, state validation, and secure in-memory storage.',
    securityModel: {
      type: 'Public Client',
      clientSecret: 'Forbidden / Never exposed (No secret is used in SPAs)',
      pkceEnforced: 'Mandatory (S256)',
      tokenStorage: 'In-Memory / WebStorage (SessionStorage recommended; avoid LocalStorage due to XSS vulnerability). Best Practice: BFF (Backend For Frontend).',
      redirectHandler: 'Browser popup or URL redirect with hash/query parsing'
    },
    installCmd: 'npm install oidc-client-ts react-oidc-context',
    configCode: `import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

// 1. Configure the OIDC Client with PKCE enabled
const oidcConfig = {
  authority: 'http://localhost:3000/mock-idp', // OIDC Issuer URL
  client_id: 'my-spa-client-id',
  redirect_uri: 'http://localhost:3000/callback.html',
  post_logout_redirect_uri: 'http://localhost:3000/',
  response_type: 'code', // Authorization Code Flow
  scope: 'openid profile email offline_access',
  
  // PKCE Settings (Enabled by default in oidc-client-ts)
  // Generates S256 code_challenge and stores code_verifier in sessionStorage
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  
  // Automatic Silent Token Renewal
  automaticSilentRenew: true,
  silent_redirect_uri: 'http://localhost:3000/silent-renew.html',
  
  // Security checks
  filterProtocolClaims: true,
  loadUserInfo: true
};

export const userManager = new UserManager(oidcConfig);`,
    loginCode: `// 2. Trigger Login (Redirects with PKCE parameters)
export async function login() {
  // oidc-client-ts automatically:
  // - Generates high-entropy code_verifier
  // - Computes SHA-256 base64url code_challenge
  // - Stores verifier + state in sessionStorage
  // - Redirects browser to /authorize?response_type=code&code_challenge=...&code_challenge_method=S256
  await userManager.signinRedirect();
}`,
    callbackCode: `// 3. Callback Handler (e.g. callback.html or /callback route)
export async function handleCallback() {
  try {
    // Automatically extracts ?code=...&state=...
    // Retrieves stored code_verifier from sessionStorage
    // Makes POST /token with code and code_verifier
    // Validates ID Token signature, nonce, and audience
    const user = await userManager.signinCallback();
    console.log('Signed in user:', user.profile);
    console.log('Access Token:', user.access_token);
    console.log('ID Token:', user.id_token);
    return user;
  } catch (error) {
    console.error('OIDC Login failed:', error);
    throw error;
  }
}`,
    reactSnippet: `// 4. React Component with react-oidc-context
import React from 'react';
import { useAuth, AuthProvider } from 'react-oidc-context';

const authConfig = {
  authority: 'http://localhost:3000/mock-idp',
  client_id: 'react-pkce-app',
  redirect_uri: window.location.origin + '/callback',
  response_type: 'code',
  scope: 'openid profile email'
};

function UserProfile() {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading OIDC session...</div>;
  if (auth.error) return <div>Authentication Error: {auth.error.message}</div>;

  if (auth.isAuthenticated) {
    return (
      <div className="profile-card">
        <h2>Welcome, {auth.user?.profile.name}!</h2>
        <p>Email: {auth.user?.profile.email}</p>
        <p>Access Token: {auth.user?.access_token.substring(0, 15)}...</p>
        <button onClick={() => auth.signoutRedirect()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => auth.signinRedirect()}>Sign In with PKCE</button>;
}

export default function App() {
  return (
    <AuthProvider {...authConfig}>
      <UserProfile />
    </AuthProvider>
  );
}`
  },

  {
    id: 'spa-vanilla-crypto',
    category: 'spa',
    logoKey: 'js',
    name: 'Vanilla JS (Zero-Dependency Web Crypto PKCE)',
    certified: true,
    certificationName: 'Pure RFC 7636 Web Standards',
    badge: 'Zero Dependencies',
    language: 'JavaScript / TypeScript',
    framework: 'Any / Framework-Agnostic',
    npmPackage: 'None (Built into modern browsers)',
    github: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API',
    description: 'Learn exactly how PKCE works under the hood! Direct implementation using the browser standard window.crypto.subtle API with no external packages required.',
    securityModel: {
      type: 'Public Client',
      clientSecret: 'None',
      pkceEnforced: 'Mandatory (S256)',
      tokenStorage: 'SessionStorage / Memory',
      redirectHandler: 'Custom URLSearchParams parser'
    },
    installCmd: '# No installation required - 100% native Web Crypto API',
    configCode: `// 1. Pure Web Crypto PKCE Helpers (RFC 7636)
function generateRandomString(length = 64) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = new Uint8Array(length);
  window.crypto.getRandomValues(values);
  return Array.from(values, x => charset[x % charset.length]).join('');
}

function base64UrlEncode(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, '');
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
}`,
    loginCode: `// 2. Start Authorization Flow
async function startPkceLogin() {
  // A. Generate PKCE parameters
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateRandomString(32);
  const nonce = generateRandomString(32);

  // B. Persist verifier and state in sessionStorage (Temporary storage for callback)
  sessionStorage.setItem('pkce_verifier', codeVerifier);
  sessionStorage.setItem('pkce_state', state);
  sessionStorage.setItem('pkce_nonce', nonce);

  // C. Build Authorization URL
  const authUrl = new URL('http://localhost:3000/mock-idp/authorize');
  authUrl.searchParams.set('client_id', 'vanilla-pkce-client');
  authUrl.searchParams.set('redirect_uri', window.location.origin + '/callback.html');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid profile email');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('nonce', nonce);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  // D. Redirect user to Identity Provider
  window.location.href = authUrl.toString();
}`,
    callbackCode: `// 3. Process Callback on /callback.html
async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const returnedState = params.get('state');

  // Verify State to prevent CSRF
  const savedState = sessionStorage.getItem('pkce_state');
  if (!returnedState || returnedState !== savedState) {
    throw new Error('State mismatch! Possible CSRF attack detected.');
  }

  // Retrieve saved code_verifier
  const codeVerifier = sessionStorage.getItem('pkce_verifier');
  if (!codeVerifier) {
    throw new Error('Missing code_verifier in session storage.');
  }

  // Exchange Code + Verifier for Tokens (POST /token)
  const tokenResponse = await fetch('http://localhost:3000/mock-idp/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: 'vanilla-pkce-client',
      redirect_uri: window.location.origin + '/callback.html',
      code: code,
      code_verifier: codeVerifier
    })
  });

  const tokens = await tokenResponse.json();
  
  // Clean up temporary PKCE keys
  sessionStorage.removeItem('pkce_verifier');
  sessionStorage.removeItem('pkce_state');

  console.log('Received Tokens:', tokens);
  return tokens;
}`
  },

  // =========================================================================
  // 2. NON-SPA / BACKEND (Traditional Web App / SSR / Confidential Client)
  // =========================================================================
  {
    id: 'backend-node-openid-client',
    category: 'non-spa',
    logoKey: 'nodejs',
    name: 'Node.js / Express (openid-client)',
    certified: true,
    certificationName: 'OpenID Certified (Node.js)',
    badge: 'OpenID Certified Backend',
    language: 'Node.js (JavaScript / TypeScript)',
    framework: 'Express / NestJS / Fastify',
    npmPackage: 'openid-client',
    github: 'https://github.com/panva/node-openid-client',
    description: 'The premier OpenID Certified RP library by Filip Skokan (OpenID Foundation board member). Provides complete Discovery, PKCE generation, JWKS signature verification, and claims validation.',
    securityModel: {
      type: 'Confidential Client (or Public Backend)',
      clientSecret: 'Can use client_secret_post or client_secret_basic (stored securely in server env)',
      pkceEnforced: 'Highly Recommended & Default (RFC 7636 / OAuth 2.1)',
      tokenStorage: 'Server-side Encrypted Session Cookie (HttpOnly, Secure, SameSite=Lax/Strict)',
      redirectHandler: 'Server-side Express Route Handler'
    },
    installCmd: 'npm install openid-client express express-session',
    configCode: `const express = require('express');
const session = require('express-session');
const { Issuer, generators } = require('openid-client');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key-must-be-random',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' }
}));

let client;

// 1. Auto-discover OIDC endpoints via Discovery URL
async function initOidcClient() {
  const oidcIssuer = await Issuer.discover('http://localhost:3000/mock-idp');
  console.log('Discovered OIDC Endpoints:', oidcIssuer.metadata.authorization_endpoint);

  client = new oidcIssuer.Client({
    client_id: 'my-node-backend-client',
    client_secret: 'my-backend-super-secret', // Confidential client secret
    redirect_uris: ['http://localhost:4000/auth/callback'],
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_post'
  });
}`,
    loginCode: `// 2. Login Route: Generate PKCE & Redirect
app.get('/login', (req, res) => {
  // Generate PKCE code_verifier and S256 code_challenge
  const code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);
  const state = generators.state();
  const nonce = generators.nonce();

  // Store verifier, state, and nonce in server-side session
  req.session.code_verifier = code_verifier;
  req.session.state = state;
  req.session.nonce = nonce;

  // Build authorization URL with PKCE parameters
  const authorizationUrl = client.authorizationUrl({
    scope: 'openid profile email',
    state: state,
    nonce: nonce,
    code_challenge: code_challenge,
    code_challenge_method: 'S256'
  });

  res.redirect(authorizationUrl);
});`,
    callbackCode: `// 3. Callback Route: Exchange Code + Verifier for Tokens
app.get('/auth/callback', async (req, res) => {
  try {
    const params = client.callbackParams(req);
    
    // Retrieve stored verifier from session
    const code_verifier = req.session.code_verifier;
    const state = req.session.state;
    const nonce = req.session.nonce;

    // Exchange authorization code for tokens
    // openid-client automatically:
    // - Sends code + code_verifier to /token
    // - Validates ID Token cryptographic signature against JWKS
    // - Validates nonce, iss, aud, and exp claims
    const tokenSet = await client.callback('http://localhost:4000/auth/callback', params, {
      code_verifier,
      state,
      nonce
    });

    console.log('ID Token Claims:', tokenSet.claims());
    console.log('Access Token:', tokenSet.access_token);

    // Store user session securely
    req.session.user = tokenSet.claims();
    req.session.accessToken = tokenSet.access_token;
    req.session.refreshToken = tokenSet.refresh_token;

    // Clear one-time PKCE session values
    delete req.session.code_verifier;
    delete req.session.state;
    delete req.session.nonce;

    res.redirect('/dashboard');
  } catch (err) {
    console.error('OIDC Callback Error:', err);
    res.status(500).send('Authentication Failed: ' + err.message);
  }
});`
  },

  {
    id: 'backend-python-authlib',
    category: 'non-spa',
    logoKey: 'python',
    name: 'Python (Authlib / FastAPI / Flask)',
    certified: true,
    certificationName: 'OpenID Certified (Python)',
    badge: 'Python Standard',
    language: 'Python 3.9+',
    framework: 'FastAPI / Flask / Django',
    npmPackage: 'authlib, requests, httpx',
    github: 'https://github.com/lepture/authlib',
    description: 'The definitive Python OAuth & OpenID Connect library supporting PKCE, JWT signature validation via JWKS, and seamless integrations with FastAPI, Flask, and Django.',
    securityModel: {
      type: 'Confidential Client',
      clientSecret: 'Stored in server environment variables (.env)',
      pkceEnforced: 'Enabled via code_challenge_method="S256"',
      tokenStorage: 'Encrypted Server-side Session / Secure Cookie',
      redirectHandler: 'FastAPI / Flask route with request.session'
    },
    installCmd: 'pip install authlib httpx uvicorn fastapi itsdangerous',
    configCode: `# 1. FastAPI + Authlib OIDC Configuration with PKCE
from fastapi import FastAPI, Request, Depends
from fastapi.responses import RedirectResponse, JSONResponse
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuth
import os

app = FastAPI(title="Python OIDC PKCE Demo")
app.add_middleware(SessionMiddleware, secret_key="super-secure-random-key")

oauth = OAuth()
oauth.register(
    name='oidc_provider',
    server_metadata_url='http://localhost:3000/mock-idp/.well-known/openid-configuration',
    client_id='python-backend-client',
    client_secret='python-backend-secret',
    client_kwargs={
        'scope': 'openid profile email',
        'code_challenge_method': 'S256'  # Enforce PKCE S256!
    }
)`,
    loginCode: `# 2. Login Route: Automatically generates PKCE & redirects
@app.get("/login")
async def login(request: Request):
    redirect_uri = request.url_for('auth_callback')
    # Authlib automatically:
    # 1. Generates code_verifier
    # 2. Computes code_challenge = S256(code_verifier)
    # 3. Saves code_verifier in request.session['_state_oidc_provider_...']
    # 4. Redirects to /authorize with code_challenge & method
    return await oauth.oidc_provider.authorize_redirect(request, redirect_uri)`,
    callbackCode: `# 3. Callback Route: Exchanges Code + Verifier & Validates JWT
@app.get("/auth/callback")
async def auth_callback(request: Request):
    try:
        # Authlib automatically:
        # - Reads code_verifier from request.session
        # - Sends POST /token with code & code_verifier
        # - Verifies ID Token signature using remote JWKS
        # - Validates issuer, audience, and expiration
        token = await oauth.oidc_provider.authorize_access_token(request)
        user_info = token.get('userinfo')
        id_token_claims = token.get('id_token')

        # Store user profile in session
        request.session['user'] = user_info
        return RedirectResponse(url="/profile")
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})

@app.get("/profile")
async def profile(request: Request):
    user = request.session.get('user')
    if not user:
        return RedirectResponse(url="/login")
    return {"authenticated_user": user}`
  },

  {
    id: 'backend-java-spring',
    category: 'non-spa',
    logoKey: 'spring',
    name: 'Java (Spring Boot 3 / Spring Security)',
    certified: true,
    certificationName: 'OpenID Certified (Java)',
    badge: 'Enterprise Standard',
    language: 'Java 17 / 21',
    framework: 'Spring Boot 3.x + Spring Security 6',
    npmPackage: 'org.springframework.boot:spring-boot-starter-oauth2-client',
    github: 'https://github.com/spring-projects/spring-security',
    description: 'Spring Security OAuth2 Client provides built-in enterprise-grade OpenID Connect 1.0 and PKCE (S256) support out of the box with zero boilerplate.',
    securityModel: {
      type: 'Confidential Client',
      clientSecret: 'Configured in application.yml or environment properties',
      pkceEnforced: 'Auto-enabled for all authorization code requests in Spring Security 6',
      tokenStorage: 'HttpSession / Redis / SecurityContextHolder',
      redirectHandler: 'Spring Security Filter Chain (/login/oauth2/code/*)'
    },
    installCmd: `<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>`,
    configCode: `# 1. application.yml Configuration
spring:
  security:
    oauth2:
      client:
        registration:
          my-oidc-provider:
            client-id: spring-boot-pkce-client
            client-secret: spring-boot-secret
            client-authentication-method: client_secret_basic
            authorization-grant-type: authorization_code
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
            scope: openid, profile, email
            client-name: My OpenID Provider
        provider:
          my-oidc-provider:
            issuer-uri: http://localhost:3000/mock-idp
            # Spring Boot automatically queries /.well-known/openid-configuration
            # and automatically enforces PKCE S256 for code exchanges!`,
    loginCode: `// 2. Security Configuration Class (SecurityConfig.java)
package com.example.oidcdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/", "/public/**").permitAll()
                .anyRequest().authenticated()
            )
            // Automatically registers OIDC Login endpoints with PKCE S256
            .oauth2Login(Customizer.withDefaults())
            .logout(logout -> logout.logoutSuccessUrl("/"));

        return http.build();
    }
}`,
    callbackCode: `// 3. Accessing Authenticated User Claims (UserController.java)
package com.example.oidcdemo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/api/me")
    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal OidcUser principal) {
        // Spring Security has already validated:
        // - ID Token RS256 signature against Provider JWKS
        // - Nonce matching
        // - PKCE verifier roundtrip
        return Map.of(
            "subject", principal.getSubject(),
            "name", principal.getFullName(),
            "email", principal.getEmail(),
            "claims", principal.getClaims()
        );
    }
}`
  },

  {
    id: 'backend-dotnet-aspnetcore',
    category: 'non-spa',
    logoKey: 'dotnet',
    name: 'C# / .NET 8 (Microsoft.AspNetCore.Authentication.OpenIdConnect)',
    certified: true,
    certificationName: 'OpenID Certified (.NET)',
    badge: 'Microsoft Certified',
    language: 'C# 12 / .NET 8',
    framework: 'ASP.NET Core / Blazor Server / Razor Pages',
    npmPackage: 'Microsoft.AspNetCore.Authentication.OpenIdConnect',
    github: 'https://github.com/dotnet/aspnetcore',
    description: 'The official ASP.NET Core OpenID Connect middleware. Supports automatic PKCE generation, Discovery document parsing, Token validation, and Cookie-based claims authentication.',
    securityModel: {
      type: 'Confidential Client',
      clientSecret: 'Stored in appsettings.json / Azure Key Vault',
      pkceEnforced: 'UsePkce = true (Default in .NET 7/8)',
      tokenStorage: 'Encrypted CookieAuthenticationMiddleware (Chunked & Protected)',
      redirectHandler: '/signin-oidc'
    },
    installCmd: 'dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect',
    configCode: `// 1. Program.cs in ASP.NET Core 8
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.Lax;
})
.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    options.Authority = "http://localhost:3000/mock-idp";
    options.ClientId = "dotnet-backend-client";
    options.ClientSecret = "dotnet-super-secret";
    options.ResponseType = OpenIdConnectResponseType.Code;
    options.ResponseMode = OpenIdConnectResponseMode.Query;
    
    // ENFORCE PKCE S256
    options.UsePkce = true; 
    
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    options.Scope.Add("offline_access");

    options.SaveTokens = true; // Stores access_token, id_token, refresh_token in auth cookie
    options.GetClaimsFromUserInfoEndpoint = true;
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();`,
    loginCode: `// 2. Challenge endpoint to trigger OIDC PKCE flow
app.MapGet("/login", async (HttpContext ctx) =>
{
    // Redirects to IdP with code_challenge and state
    await ctx.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme, new AuthenticationProperties
    {
        RedirectUri = "/dashboard"
    });
});`,
    callbackCode: `// 3. Protected Dashboard Endpoint
app.MapGet("/dashboard", [Microsoft.AspNetCore.Authorization.Authorize] async (HttpContext ctx) =>
{
    var user = ctx.User;
    var accessToken = await ctx.GetTokenAsync("access_token");
    var idToken = await ctx.GetTokenAsync("id_token");

    return Results.Ok(new
    {
        Name = user.Identity?.Name,
        Subject = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value,
        Email = user.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value,
        AccessTokenPreview = accessToken?.Substring(0, 15) + "..."
    });
});

app.Run();`
  },

  {
    id: 'backend-go-oidc',
    category: 'non-spa',
    logoKey: 'go',
    name: 'Go (coreos/go-oidc & golang.org/x/oauth2)',
    certified: true,
    certificationName: 'OpenID Certified (Go)',
    badge: 'High Performance Go',
    language: 'Go 1.21+',
    framework: 'net/http / Gin / Fiber / Echo',
    npmPackage: 'github.com/coreos/go-oidc/v3/oidc',
    github: 'https://github.com/coreos/go-oidc',
    description: 'The standard Go OpenID Connect verification library created by CoreOS/Red Hat. Works in conjunction with golang.org/x/oauth2 for PKCE parameter generation and JWKS validation.',
    securityModel: {
      type: 'Confidential Client',
      clientSecret: 'Server environment variable',
      pkceEnforced: 'oauth2.S256ChallengeOption(verifier)',
      tokenStorage: 'Secure Encrypted Cookie (Gorilla Sessions)',
      redirectHandler: 'http.HandlerFunc on /auth/callback'
    },
    installCmd: 'go get github.com/coreos/go-oidc/v3/oidc golang.org/x/oauth2',
    configCode: `package main

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"log"
	"net/http"

	"github.com/coreos/go-oidc/v3/oidc"
	"golang.org/x/oauth2"
)

var (
	ctx          = context.Background()
	provider, _  = oidc.NewProvider(ctx, "http://localhost:3000/mock-idp")
	verifier     = provider.Verifier(&oidc.Config{ClientID: "go-pkce-client"})
	oauth2Config = oauth2.Config{
		ClientID:     "go-pkce-client",
		ClientSecret: "go-client-secret",
		RedirectURL:  "http://localhost:8080/auth/callback",
		Endpoint:     provider.Endpoint(),
		Scopes:       []string{oidc.ScopeOpenID, "profile", "email"},
	}
)`,
    loginCode: `// PKCE Helper: generates 43-128 char verifier and S256 challenge
func generatePKCE() (verifier, challenge string) {
	b := make([]byte, 32)
	rand.Read(b)
	verifier = base64.RawURLEncoding.EncodeToString(b)
	h := sha256.Sum256([]byte(verifier))
	challenge = base64.RawURLEncoding.EncodeToString(h[:])
	return verifier, challenge
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	codeVerifier, codeChallenge := generatePKCE()
	state := "random-csrf-state"

	// Store codeVerifier in secure session cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "pkce_verifier",
		Value:    codeVerifier,
		HttpOnly: true,
		Path:     "/",
	})

	// Generate authorization URL with S256 PKCE challenge
	url := oauth2Config.AuthCodeURL(
		state,
		oauth2.SetAuthURLParam("code_challenge", codeChallenge),
		oauth2.SetAuthURLParam("code_challenge_method", "S256"),
	)
	http.Redirect(w, r, url, http.StatusFound)
}`,
    callbackCode: `func handleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	
	// Retrieve code_verifier from cookie
	cookie, err := r.Cookie("pkce_verifier")
	if err != nil {
		http.Error(w, "Missing PKCE cookie", http.StatusBadRequest)
		return
	}
	codeVerifier := cookie.Value

	// Exchange Code + Verifier for TokenSet
	token, err := oauth2Config.Exchange(
		ctx,
		code,
		oauth2.SetAuthURLParam("code_verifier", codeVerifier),
	)
	if err != nil {
		http.Error(w, "Token exchange failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Extract & Verify ID Token Cryptographic Signature
	rawIDToken, ok := token.Extra("id_token").(string)
	if !ok {
		http.Error(w, "No id_token field in oauth2 token", http.StatusInternalServerError)
		return
	}

	idToken, err := verifier.Verify(ctx, rawIDToken)
	if err != nil {
		http.Error(w, "Failed to verify ID Token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var claims map[string]interface{}
	idToken.Claims(&claims)
	log.Printf("Successfully logged in user: %v", claims["name"])
	w.Write([]byte("Welcome, " + claims["name"].(string)))
}`
  },

  // =========================================================================
  // 3. MOBILE iOS (Swift / AppAuth-iOS)
  // =========================================================================
  {
    id: 'mobile-ios-appauth',
    category: 'mobile',
    logoKey: 'ios',
    name: 'iOS (Swift & AppAuth-iOS)',
    certified: true,
    certificationName: 'OpenID Certified Foundation SDK',
    badge: 'Native iOS Standard',
    language: 'Swift 5.9+ / SwiftUI',
    framework: 'iOS / iPadOS / macOS',
    npmPackage: 'AppAuth (CocoaPods / SPM)',
    github: 'https://github.com/openid/AppAuth-iOS',
    description: 'The official OpenID Foundation SDK for iOS. Implements RFC 8252 (OAuth 2.0 for Native Apps) using ASWebAuthenticationSession, custom URL scheme / Universal Links, automatic PKCE S256, and iOS Keychain token storage.',
    securityModel: {
      type: 'Public Native Client',
      clientSecret: 'Forbidden / Never embedded in native mobile binaries',
      pkceEnforced: 'Mandatory (S256 automatically generated by OIDAuthorizationRequest)',
      tokenStorage: 'iOS Keychain (kSecClassGenericPassword with kSecAttrAccessibleAfterFirstUnlock)',
      redirectHandler: 'Custom URL Scheme (e.g. com.example.app:/oauth2callback) or Universal Link'
    },
    installCmd: `// Swift Package Manager (SPM):
dependencies: [
    .package(url: "https://github.com/openid/AppAuth-iOS.git", from: "1.6.0")
]

// Or CocoaPods Podfile:
pod 'AppAuth'`,
    configCode: `import UIKit
import AppAuth
import AuthenticationServices

class OIDCManager: NSObject {
    static let shared = OIDCManager()
    
    // OIDC Configuration
    let issuer = URL(string: "http://localhost:3000/mock-idp")!
    let clientID = "ios-mobile-app"
    let redirectURI = URL(string: "com.example.pkceapp:/oauth2callback")!
    
    // AppAuth State & Session holder
    var authState: OIDAuthState?
    var currentAuthorizationFlow: OIDExternalUserAgentSession?
}`,
    loginCode: `// 1. Discover Endpoints & Start PKCE Login with ASWebAuthenticationSession
func login(from presentingViewController: UIViewController, completion: @escaping (Bool) -> Void) {
    // A. Discover OpenID Provider configuration
    OIDAuthorizationService.discoverConfiguration(forIssuer: issuer) { configuration, error in
        guard let config = configuration, error == nil else {
            print("Discovery error: \\(error?.localizedDescription ?? "unknown")")
            completion(false)
            return
        }
        
        // B. Generate PKCE S256 Code Verifier & Challenge automatically!
        // AppAuth-iOS automatically creates 128-byte cryptographic verifier
        // and S256 challenge under the hood.
        let codeVerifier = OIDAuthorizationRequest.generateCodeVerifier()
        let codeChallenge = OIDAuthorizationRequest.codeChallengeS256(forVerifier: codeVerifier)
        
        let request = OIDAuthorizationRequest(
            configuration: config,
            clientId: self.clientID,
            clientSecret: nil, // Public client: NO secret!
            scopes: [OIDScopeOpenID, OIDScopeProfile, OIDScopeEmail],
            redirectURL: self.redirectURI,
            responseType: OIDResponseTypeCode,
            additionalParameters: [
                "code_challenge": codeChallenge!,
                "code_challenge_method": OIDOAuthorizationRequestCodeChallengeMethodS256
            ]
        )
        
        // C. Launch secure system browser (ASWebAuthenticationSession)
        self.currentAuthorizationFlow = OIDAuthState.authState(byPresenting: request, presenting: presentingViewController) { authState, error in
            if let authState = authState {
                self.authState = authState
                // Save tokens in iOS Secure Keychain
                self.saveAuthStateToKeychain(authState)
                print("Logged in! Access Token: \\(authState.lastTokenResponse?.accessToken ?? "")")
                completion(true)
            } else {
                print("Authorization failed: \\(error?.localizedDescription ?? "")")
                completion(false)
            }
        }
    }
}`,
    callbackCode: `// 2. AppDelegate / SceneDelegate Deep Link Handler
// Handles redirect URI: com.example.pkceapp:/oauth2callback?code=...
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else { return }
    
    // Forward callback URL to AppAuth
    if let authorizationFlow = OIDCManager.shared.currentAuthorizationFlow,
       authorizationFlow.resumeExternalUserAgentFlow(with: url) {
        OIDCManager.shared.currentAuthorizationFlow = nil
    }
}

// 3. Keychain Persistence
func saveAuthStateToKeychain(_ authState: OIDAuthState) {
    let data = try? NSKeyedArchiver.archivedData(withRootObject: authState, requiringSecureCoding: true)
    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrAccount as String: "oidc_auth_state",
        kSecValueData as String: data!,
        kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlock
    ]
    SecItemDelete(query as CFDictionary)
    SecItemAdd(query as CFDictionary, nil)
}`
  },

  // =========================================================================
  // 4. MOBILE ANDROID (Kotlin / AppAuth-Android)
  // =========================================================================
  {
    id: 'mobile-android-appauth',
    category: 'mobile',
    logoKey: 'android',
    name: 'Android (Kotlin & AppAuth-Android)',
    certified: true,
    certificationName: 'OpenID Certified Foundation SDK',
    badge: 'Native Android Standard',
    language: 'Kotlin / Java',
    framework: 'Android SDK / Jetpack Compose',
    npmPackage: 'net.openid:appauth (Gradle)',
    github: 'https://github.com/openid/AppAuth-Android',
    description: 'The official OpenID Foundation SDK for Android. Implements RFC 8252 using Chrome Custom Tabs, Intent Filters for deep link redirection, PKCE S256 code verifier generation, and EncryptedSharedPreferences storage.',
    securityModel: {
      type: 'Public Native Client',
      clientSecret: 'Forbidden / Never packaged in APK or AAB files',
      pkceEnforced: 'Mandatory (S256 automatically generated by AuthorizationRequest.Builder)',
      tokenStorage: 'EncryptedSharedPreferences / Android Keystore System (AES-256 GCM)',
      redirectHandler: 'Intent Filter in AndroidManifest.xml (e.g. net.openid.appauth.RedirectUriReceiverActivity)'
    },
    installCmd: `// build.gradle.kts (Module: app)
dependencies {
    implementation("net.openid:appauth:0.11.1")
    implementation("androidx.security:security-crypto:1.1.0-alpha06")
}`,
    configCode: `<!-- AndroidManifest.xml Configuration -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application>
        <!-- AppAuth Redirect Receiver Activity -->
        <activity
            android:name="net.openid.appauth.RedirectUriReceiverActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="android.intent.category.BROWSABLE"/>
                <data
                    android:scheme="com.example.pkceapp"
                    android:host="oauth2callback"/>
            </intent-filter>
        </activity>
    </application>
</manifest>`,
    loginCode: `// 1. Initiate PKCE Login in MainActivity.kt
package com.example.pkceapp

import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.result.contract.ActivityResultContracts
import net.openid.appauth.*

class MainActivity : ComponentActivity() {

    private lateinit var authService: AuthorizationService
    private var authState: AuthState = AuthState()

    private val authLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        val intent = result.data
        if (intent != null) {
            val response = AuthorizationResponse.fromIntent(intent)
            val exception = AuthorizationException.fromIntent(intent)
            
            authState.update(response, exception)
            
            if (response != null) {
                // 2. Exchange Code + Verifier for Tokens (POST /token)
                exchangeAuthorizationCode(response)
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        authService = AuthorizationService(this)
    }

    fun startPkceLogin() {
        val issuerUri = Uri.parse("http://10.0.2.2:3000/mock-idp") // Android Emulator localhost
        
        AuthorizationServiceConfiguration.fetchFromIssuer(issuerUri) { serviceConfig, ex ->
            if (serviceConfig == null) return@fetchFromIssuer

            // AppAuth automatically:
            // - Generates secure random code_verifier
            // - Computes S256 code_challenge
            val authRequest = AuthorizationRequest.Builder(
                serviceConfig,
                "android-mobile-app",
                ResponseTypeValues.CODE,
                Uri.parse("com.example.pkceapp://oauth2callback")
            )
            .setScopes(AuthorizationRequest.Scope.OPENID, "profile", "email")
            .setCodeVerifier(CodeVerifierUtil.generateRandomCodeVerifier())
            .build()

            // Launch Chrome Custom Tab for interactive SSO
            val authIntent = authService.getAuthorizationRequestIntent(authRequest)
            authLauncher.launch(authIntent)
        }
    }`,
    callbackCode: `    // 3. Token Exchange & Encrypted Storage
    private fun exchangeAuthorizationCode(response: AuthorizationResponse) {
        val tokenRequest = response.createTokenExchangeRequest()
        
        authService.performTokenRequest(tokenRequest) { tokenResponse, ex ->
            authState.update(tokenResponse, ex)
            if (tokenResponse != null) {
                val idToken = authState.idToken
                val accessToken = authState.accessToken
                val refreshToken = authState.refreshToken
                
                // Store in Android Keystore / EncryptedSharedPreferences
                saveAuthStateEncrypted(authState)
            }
        }
    }

    private fun saveAuthStateEncrypted(state: AuthState) {
        val masterKey = androidx.security.crypto.MasterKey.Builder(this)
            .setKeyScheme(androidx.security.crypto.MasterKey.KeyScheme.AES256_GCM)
            .build()

        val sharedPreferences = androidx.security.crypto.EncryptedSharedPreferences.create(
            this,
            "secure_auth_prefs",
            masterKey,
            androidx.security.crypto.EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            androidx.security.crypto.EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )

        sharedPreferences.edit()
            .putString("auth_state_json", state.jsonSerializeString())
            .apply()
    }
}`
  },

  // =========================================================================
  // 5. CROSS-PLATFORM MOBILE (React Native & Flutter)
  // =========================================================================
  {
    id: 'mobile-react-native-appauth',
    category: 'mobile',
    logoKey: 'react',
    name: 'React Native (react-native-app-auth)',
    certified: true,
    certificationName: 'AppAuth Native Bridge',
    badge: 'Cross-Platform Mobile',
    language: 'JavaScript / TypeScript',
    framework: 'React Native / Expo',
    npmPackage: 'react-native-app-auth',
    github: 'https://github.com/FormidableLabs/react-native-app-auth',
    description: 'React Native bridge for AppAuth-iOS and AppAuth-Android. Executes native ASWebAuthenticationSession / Custom Tabs with automatic PKCE S256.',
    securityModel: {
      type: 'Public Native Client',
      clientSecret: 'None',
      pkceEnforced: 'Mandatory (AppAuth native S256)',
      tokenStorage: 'react-native-keychain / Expo SecureStore',
      redirectHandler: 'Native Deep Linking (custom URL scheme)'
    },
    installCmd: 'npm install react-native-app-auth react-native-keychain',
    configCode: `import { authorize, refresh } from 'react-native-app-auth';
import * as Keychain from 'react-native-keychain';

const oidcConfig = {
  issuer: 'http://localhost:3000/mock-idp',
  clientId: 'react-native-client',
  redirectUrl: 'com.example.rnapp://oauthredirect',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  usePKCE: true // Enforce PKCE S256
};`,
    loginCode: `export async function loginWithPkce() {
  try {
    // Native bridge invokes AppAuth-iOS / AppAuth-Android
    const authResult = await authorize(oidcConfig);
    
    // Save tokens securely in iOS Keychain / Android KeyStore
    await Keychain.setGenericPassword(
      'oidc_tokens',
      JSON.stringify({
        accessToken: authResult.accessToken,
        idToken: authResult.idToken,
        refreshToken: authResult.refreshToken,
        expiresAt: authResult.accessTokenExpirationDate
      })
    );

    return authResult;
  } catch (error) {
    console.error('Login Failed', error);
  }
}`,
    callbackCode: `export async function getStoredUserTokens() {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return JSON.parse(credentials.password);
  }
  return null;
}`
  },

  {
    id: 'mobile-flutter-appauth',
    category: 'mobile',
    logoKey: 'flutter',
    name: 'Flutter (flutter_appauth)',
    certified: true,
    certificationName: 'AppAuth Flutter Plugin',
    badge: 'Flutter Standard',
    language: 'Dart',
    framework: 'Flutter (iOS / Android / macOS / Windows)',
    npmPackage: 'flutter_appauth',
    github: 'https://github.com/MaikuB/flutter_appauth',
    description: 'The premier Flutter plugin for AppAuth-iOS and AppAuth-Android. Handles PKCE code challenge calculation, deep link redirect parsing, and token storage with flutter_secure_storage.',
    securityModel: {
      type: 'Public Native Client',
      clientSecret: 'None',
      pkceEnforced: 'Automatic (AppAuth S256)',
      tokenStorage: 'flutter_secure_storage (Keychain & EncryptedSharedPreferences)',
      redirectHandler: 'Native URL Scheme / Universal Links'
    },
    installCmd: `// pubspec.yaml
dependencies:
  flutter_appauth: ^6.0.7
  flutter_secure_storage: ^9.0.0`,
    configCode: `import 'package:flutter_appauth/flutter_appauth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthService {
  final FlutterAppAuth _appAuth = const FlutterAppAuth();
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  static const String _issuer = 'http://localhost:3000/mock-idp';
  static const String _clientId = 'flutter-mobile-client';
  static const String _redirectUrl = 'com.example.flutterapp://oauthredirect';
  static const List<String> _scopes = ['openid', 'profile', 'email', 'offline_access'];`,
    loginCode: `  Future<AuthorizationTokenResponse?> login() async {
    try {
      // Automatically triggers OIDC Discovery, PKCE S256, and System Browser
      final AuthorizationTokenResponse? result = await _appAuth.authorizeAndExchangeCode(
        AuthorizationTokenRequest(
          _clientId,
          _redirectUrl,
          issuer: _issuer,
          scopes: _scopes,
          promptValues: ['login'],
        ),
      );

      if (result != null) {
        // Securely store tokens
        await _storage.write(key: 'access_token', value: result.accessToken);
        await _storage.write(key: 'id_token', value: result.idToken);
        await _storage.write(key: 'refresh_token', value: result.refreshToken);
      }
      return result;
    } catch (e) {
      print('Flutter Login error: $e');
      return null;
    }
  }`,
    callbackCode: `  Future<String?> getAccessToken() async {
    return await _storage.read(key: 'access_token');
  }

  Future<void> logout() async {
    await _storage.deleteAll();
  }
}`
  }
];
