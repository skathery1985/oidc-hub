/**
 * In-Browser Virtual OpenID Provider (Web Crypto RS256 Engine)
 * Runs 100% Client-Side on GitHub Pages without requiring a backend server!
 * Generates RSA-256 keys, issues signed ID Tokens, and verifies PKCE S256 challenges.
 */

window.VirtualOP = {
  keyPair: null,
  jwkPublic: null,
  keyId: 'virtual-op-key-1',
  authCodes: new Map(),
  refreshTokens: new Map(),

  // Realistic Mock Users
  users: {
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
  },

  async init() {
    if (this.keyPair) return;

    // 1. Generate RSA-256 Key Pair using standard Web Crypto API
    this.keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
        hash: { name: 'SHA-256' }
      },
      true, // extractable
      ['sign', 'verify']
    );

    // 2. Export Public Key to JWK
    const exportedJwk = await window.crypto.subtle.exportKey('jwk', this.keyPair.publicKey);
    this.jwkPublic = {
      kty: exportedJwk.kty,
      n: exportedJwk.n,
      e: exportedJwk.e,
      alg: 'RS256',
      use: 'sig',
      kid: this.keyId
    };

    console.log('✓ Virtual In-Browser OpenID Provider Initialized (Web Crypto RS256 Active)');
  },

  getBaseUrl() {
    const url = new URL(window.location.href);
    return `${url.origin}${url.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '')}`;
  },

  getIssuer() {
    return `${this.getBaseUrl()}/mock-idp`;
  },

  getDiscoveryMetadata() {
    const issuer = this.getIssuer();
    return {
      issuer: issuer,
      authorization_endpoint: `${issuer}/authorize`,
      token_endpoint: `${issuer}/token`,
      userinfo_endpoint: `${issuer}/userinfo`,
      jwks_uri: `${issuer}/jwks.json`,
      code_challenge_methods_supported: ['S256', 'plain'],
      response_types_supported: ['code'],
      response_modes_supported: ['query', 'fragment'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256'],
      scopes_supported: ['openid', 'profile', 'email', 'offline_access', 'roles', 'api'],
      token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
      claims_supported: [
        'sub', 'iss', 'aud', 'exp', 'iat', 'auth_time', 'nonce',
        'name', 'given_name', 'family_name', 'preferred_username',
        'email', 'email_verified', 'roles', 'department', 'avatar',
        'at_hash', 'c_hash'
      ]
    };
  },

  getJwks() {
    return {
      keys: [this.jwkPublic]
    };
  },

  /**
   * Issues a one-time authorization code associated with PKCE challenge
   */
  issueAuthorizationCode({ clientId, redirectUri, codeChallenge, codeChallengeMethod, nonce, scope, userKey = 'alex.morgan' }) {
    const code = 'code_' + window.PKCEEngine.generateRandomString(24);
    const user = this.users[userKey] || this.users['alex.morgan'];

    this.authCodes.set(code, {
      code,
      clientId,
      redirectUri,
      codeChallenge,
      codeChallengeMethod: codeChallengeMethod || 'S256',
      user,
      nonce,
      scope,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    return code;
  },

  /**
   * Executes in-browser PKCE verification and RS256 ID Token signing
   */
  async exchangeCodeForTokens({ grantType, code, codeVerifier, refreshToken, clientId }) {
    await this.init();

    // 1. Handle Refresh Token Grant
    if (grantType === 'refresh_token') {
      if (!refreshToken || !this.refreshTokens.has(refreshToken)) {
        return {
          error: 'invalid_grant',
          error_description: 'Invalid or expired refresh token'
        };
      }

      const stored = this.refreshTokens.get(refreshToken);
      this.refreshTokens.delete(refreshToken); // Rotation

      const newRefreshToken = 'rt_' + window.PKCEEngine.generateRandomString(32);
      this.refreshTokens.set(newRefreshToken, {
        clientId: clientId || stored.clientId,
        user: stored.user,
        scope: stored.scope,
        createdAt: Date.now()
      });

      const accessToken = 'at_' + window.PKCEEngine.generateRandomString(32);
      const idToken = await this.signIdToken({
        user: stored.user,
        clientId: clientId || stored.clientId,
        accessToken,
        authTime: Math.floor(stored.createdAt / 1000)
      });

      return {
        access_token: accessToken,
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: newRefreshToken,
        id_token: idToken,
        scope: stored.scope
      };
    }

    // 2. Handle Authorization Code Grant
    if (grantType === 'authorization_code') {
      if (!code) {
        return { error: 'invalid_request', error_description: 'Missing code parameter' };
      }

      const authSession = this.authCodes.get(code);
      if (!authSession) {
        return {
          error: 'invalid_grant',
          error_description: 'Authorization code is invalid, expired, or has already been redeemed (Single-use policy).'
        };
      }

      // Single-use code policy
      this.authCodes.delete(code);

      if (Date.now() > authSession.expiresAt) {
        return { error: 'invalid_grant', error_description: 'Authorization code has expired' };
      }

      // -------------------------------------------------------------
      // PKCE S256 Cryptographic Verification
      // -------------------------------------------------------------
      if (authSession.codeChallenge) {
        if (!codeVerifier) {
          return {
            error: 'invalid_grant',
            error_description: 'PKCE Verification Failed: code_challenge was set at /authorize, but no code_verifier was sent to /token'
          };
        }

        let calculatedChallenge;
        if (authSession.codeChallengeMethod === 'S256') {
          calculatedChallenge = await window.PKCEEngine.generateCodeChallenge(codeVerifier);
        } else {
          calculatedChallenge = codeVerifier;
        }

        if (calculatedChallenge !== authSession.codeChallenge) {
          return {
            error: 'invalid_grant',
            error_description: 'PKCE Verification Failed: The computed SHA256 hash of code_verifier does not match the original code_challenge.',
            details: {
              method: authSession.codeChallengeMethod,
              computed_challenge: calculatedChallenge,
              expected_challenge: authSession.codeChallenge
            }
          };
        }
      }

      const user = authSession.user;
      const accessToken = 'at_' + window.PKCEEngine.generateRandomString(32);
      const newRefreshToken = 'rt_' + window.PKCEEngine.generateRandomString(32);

      this.refreshTokens.set(newRefreshToken, {
        clientId: clientId || authSession.clientId,
        user,
        scope: authSession.scope,
        createdAt: Date.now()
      });

      const idToken = await this.signIdToken({
        user,
        clientId: clientId || authSession.clientId,
        accessToken,
        nonce: authSession.nonce,
        code,
        authTime: Math.floor(authSession.createdAt / 1000)
      });

      return {
        access_token: accessToken,
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: newRefreshToken,
        id_token: idToken,
        scope: authSession.scope
      };
    }

    return { error: 'unsupported_grant_type', error_description: `Grant type "${grantType}" is not supported` };
  },

  /**
   * Signs RS256 JWT ID Token using Web Crypto SubtleCrypto.sign
   */
  async signIdToken({ user, clientId, accessToken, nonce, code, authTime }) {
    const at_hash = accessToken ? await window.PKCEEngine.calculateAtHash(accessToken) : undefined;
    const c_hash = code ? await window.PKCEEngine.calculateAtHash(code) : undefined;

    const header = {
      alg: 'RS256',
      typ: 'JWT',
      kid: this.keyId
    };

    const payload = {
      iss: this.getIssuer(),
      sub: user.id,
      aud: clientId || 'pkce-demo-client',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
      auth_time: authTime || Math.floor(Date.now() / 1000),
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

    if (nonce) payload.nonce = nonce;
    if (at_hash) payload.at_hash = at_hash;
    if (c_hash) payload.c_hash = c_hash;

    const encodeB64Url = (obj) => {
      const str = JSON.stringify(obj);
      return window.PKCEEngine.base64UrlEncode(new TextEncoder().encode(str));
    };

    const encodedHeader = encodeB64Url(header);
    const encodedPayload = encodeB64Url(payload);
    const signingInput = `${encodedHeader}.${encodedPayload}`;

    // Cryptographic RS256 Signature using Web Crypto API
    const signatureBuffer = await window.crypto.subtle.sign(
      { name: 'RSASSA-PKCS1-v1_5' },
      this.keyPair.privateKey,
      new TextEncoder().encode(signingInput)
    );

    const encodedSignature = window.PKCEEngine.base64UrlEncode(signatureBuffer);
    return `${signingInput}.${encodedSignature}`;
  },

  getUserInfo() {
    const user = this.users['alex.morgan'];
    return {
      sub: user.id,
      name: user.name,
      given_name: user.given_name,
      family_name: user.family_name,
      preferred_username: user.username,
      email: user.email,
      email_verified: user.email_verified,
      roles: user.roles,
      department: user.department,
      avatar: user.avatar,
      updated_at: Math.floor(Date.now() / 1000)
    };
  }
};

// Initialize on page load
window.VirtualOP.init();
