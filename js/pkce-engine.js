/**
 * OpenID Connect PKCE Cryptographic Engine (RFC 7636 / RFC 7519)
 * Pure Web Crypto API implementation for high-entropy key generation and S256 challenge creation.
 * Seamlessly integrates with in-browser Web Crypto Virtual OP for 100% static GitHub Pages hosting.
 */

window.PKCEEngine = {
  /**
   * Generates a high-entropy cryptographically random string (code_verifier).
   * RFC 7636 Section 4.1: [A-Za-z0-9\-._~] (43 to 128 characters)
   */
  generateCodeVerifier(length = 64) {
    const clampedLength = Math.max(43, Math.min(128, length));
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const randomValues = new Uint8Array(clampedLength);
    window.crypto.getRandomValues(randomValues);
    
    let verifier = '';
    for (let i = 0; i < clampedLength; i++) {
      verifier += charset[randomValues[i] % charset.length];
    }
    return verifier;
  },

  /**
   * Encodes an ArrayBuffer or Uint8Array into a Base64URL string (RFC 4648 §5).
   */
  base64UrlEncode(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  },

  /**
   * Generates code_challenge from code_verifier using S256 method.
   * RFC 7636: code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))
   */
  async generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return this.base64UrlEncode(digest);
  },

  /**
   * Generates cryptographically secure State or Nonce parameter.
   */
  generateRandomString(length = 32) {
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);
    return this.base64UrlEncode(randomValues);
  },

  /**
   * Builds the complete OIDC Authorization Request URL.
   */
  buildAuthorizationUrl({
    authorizationEndpoint,
    clientId,
    redirectUri,
    scope = 'openid profile email',
    state,
    nonce,
    codeChallenge,
    codeChallengeMethod = 'S256',
    prompt,
    extraParams = {}
  }) {
    // If running with virtual in-browser OP or relative URL
    let url;
    try {
      url = new URL(authorizationEndpoint, window.location.href);
    } catch (e) {
      url = new URL(authorizationEndpoint);
    }

    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', scope);
    
    if (state) url.searchParams.set('state', state);
    if (nonce) url.searchParams.set('nonce', nonce);
    if (codeChallenge) {
      url.searchParams.set('code_challenge', codeChallenge);
      url.searchParams.set('code_challenge_method', codeChallengeMethod);
    }
    if (prompt) url.searchParams.set('prompt', prompt);

    for (const [key, value] of Object.entries(extraParams)) {
      if (value) url.searchParams.set(key, value);
    }

    return url.toString();
  },

  /**
   * Executes Token Exchange POST request (code -> tokens).
   * Supports both server endpoint and in-browser Virtual OP (for GitHub Pages).
   */
  async exchangeCodeForTokens({
    tokenEndpoint,
    clientId,
    clientSecret,
    redirectUri,
    code,
    codeVerifier,
    useProxy = false
  }) {
    const isGitHubPages = window.location.hostname.includes('github.io') || window.location.protocol === 'file:';
    const isMock = tokenEndpoint.includes('/mock-idp');

    // On GitHub Pages or when Mock OP is selected without server, use In-Browser Web Crypto Virtual OP
    if (isGitHubPages || isMock) {
      if (window.VirtualOP) {
        try {
          const virtualResult = await window.VirtualOP.exchangeCodeForTokens({
            grantType: 'authorization_code',
            code,
            codeVerifier,
            clientId
          });
          if (virtualResult && !virtualResult.error) {
            return virtualResult;
          }
        } catch (e) {
          console.warn('Virtual OP exchange fallback to HTTP', e);
        }
      }
    }

    const formData = {
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code: code,
      code_verifier: codeVerifier
    };

    if (clientSecret) {
      formData.client_secret = clientSecret;
    }

    if (useProxy && !isGitHubPages) {
      try {
        const res = await fetch('/api/proxy/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token_endpoint: tokenEndpoint, form_data: formData })
        });
        return await res.json();
      } catch (e) {
        console.warn('Proxy fetch failed', e);
      }
    }

    try {
      const body = new URLSearchParams(formData);
      const res = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: body.toString()
      });

      return await res.json();
    } catch (err) {
      // If network fetch fails (e.g. static site), fallback to Virtual OP
      if (window.VirtualOP) {
        return await window.VirtualOP.exchangeCodeForTokens({
          grantType: 'authorization_code',
          code,
          codeVerifier,
          clientId
        });
      }
      throw err;
    }
  },

  /**
   * Decodes a JWT token without verifying cryptographic signature.
   */
  decodeJwt(token) {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    try {
      const base64Decode = (str) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const header = JSON.parse(base64Decode(parts[0]));
      const payload = JSON.parse(base64Decode(parts[1]));
      const signature = parts[2];

      return {
        header,
        payload,
        signature,
        raw: {
          header: parts[0],
          payload: parts[1],
          signature: parts[2]
        }
      };
    } catch (e) {
      console.error('Failed to parse JWT', e);
      return null;
    }
  },

  /**
   * Calculates at_hash (Access Token Hash) according to OpenID Connect Core 1.0 §3.1.3.6
   */
  async calculateAtHash(accessToken) {
    const encoder = new TextEncoder();
    const data = encoder.encode(accessToken);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const halfDigest = new Uint8Array(digest).slice(0, digest.byteLength / 2);
    return this.base64UrlEncode(halfDigest);
  }
};
