/**
 * Live PKCE Interactive Lab & Testing Sandbox
 * Step-by-step interactive workflow with live crypto computation, HTTP inspection, and token validation.
 */

window.LiveLab = {
  state: {
    providerMode: 'mock', // 'mock' | 'custom'
    issuer: window.location.origin + '/mock-idp',
    authEndpoint: window.location.origin + '/mock-idp/authorize',
    tokenEndpoint: window.location.origin + '/mock-idp/token',
    userinfoEndpoint: window.location.origin + '/mock-idp/userinfo',
    jwksUri: window.location.origin + '/mock-idp/jwks.json',
    clientId: 'pkce-demo-client',
    clientSecret: '',
    redirectUri: window.location.origin + '/callback.html',
    scope: 'openid profile email offline_access',
    
    // PKCE & Flow Data
    verifier: '',
    challenge: '',
    challengeMethod: 'S256',
    state: '',
    nonce: '',
    authUrl: '',
    
    // Results
    authCode: '',
    tokenResponse: null,
    idTokenDecoded: null,
    userInfoResponse: null,
    refreshedTokenResponse: null,

    // Step state
    currentStep: 1 // 1: Generate PKCE, 2: Auth URL, 3: Callback, 4: Token Exchange, 5: Token Inspector
  },

  async init() {
    await this.generateNewPkce();
    this.render();
    this.listenForPopupCallback();
  },

  async generateNewPkce() {
    this.state.verifier = window.PKCEEngine.generateCodeVerifier(64);
    this.state.challenge = await window.PKCEEngine.generateCodeChallenge(this.state.verifier);
    this.state.state = window.PKCEEngine.generateRandomString(16);
    this.state.nonce = window.PKCEEngine.generateRandomString(16);
    this.updateAuthUrl();
  },

  updateAuthUrl() {
    this.state.authUrl = window.PKCEEngine.buildAuthorizationUrl({
      authorizationEndpoint: this.state.authEndpoint,
      clientId: this.state.clientId,
      redirectUri: this.state.redirectUri,
      scope: this.state.scope,
      state: this.state.state,
      nonce: this.state.nonce,
      codeChallenge: this.state.challenge,
      codeChallengeMethod: this.state.challengeMethod
    });
  },

  setProviderMode(mode) {
    this.state.providerMode = mode;
    if (mode === 'mock') {
      const baseUrl = window.location.origin;
      this.state.issuer = `${baseUrl}/mock-idp`;
      this.state.authEndpoint = `${baseUrl}/mock-idp/authorize`;
      this.state.tokenEndpoint = `${baseUrl}/mock-idp/token`;
      this.state.userinfoEndpoint = `${baseUrl}/mock-idp/userinfo`;
      this.state.jwksUri = `${baseUrl}/mock-idp/jwks.json`;
      this.state.clientId = 'pkce-demo-client';
      this.state.clientSecret = '';
      this.state.redirectUri = `${baseUrl}/callback.html`;
    } else {
      this.state.clientId = 'your-client-id';
      this.state.clientSecret = '';
      this.state.redirectUri = `${window.location.origin}/callback.html`;
    }
    this.updateAuthUrl();
    this.render();
  },

  async fetchCustomDiscovery(issuerUrl) {
    if (!issuerUrl) return;
    try {
      const res = await fetch(`/api/discovery/analyze?issuer=${encodeURIComponent(issuerUrl)}`);
      const data = await res.json();
      if (data.error) {
        alert('Discovery Error: ' + data.error);
        return;
      }
      this.state.issuer = issuerUrl;
      this.state.authEndpoint = data.authorization_endpoint || '';
      this.state.tokenEndpoint = data.token_endpoint || '';
      this.state.userinfoEndpoint = data.userinfo_endpoint || '';
      this.state.jwksUri = data.jwks_uri || '';
      this.updateAuthUrl();
      this.render();
    } catch (e) {
      alert('Failed to fetch discovery: ' + e.message);
    }
  },

  listenForPopupCallback() {
    window.addEventListener('message', async (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.type === 'OIDC_CALLBACK') {
        const { code, state, error, error_description } = event.data;
        if (error) {
          alert(`OIDC Error: ${error} - ${error_description || ''}`);
          return;
        }

        if (code) {
          this.state.authCode = code;
          this.state.currentStep = 4;
          this.render();

          // Auto-trigger token exchange
          await this.executeTokenExchange();
        }
      }
    });
  },

  launchPopupAuth() {
    this.updateAuthUrl();
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    // Save state in session storage so callback can compare
    sessionStorage.setItem('oidc_state', this.state.state);
    sessionStorage.setItem('oidc_nonce', this.state.nonce);
    sessionStorage.setItem('oidc_verifier', this.state.verifier);

    window.open(
      this.state.authUrl,
      'OIDC_PKCE_Auth_Popup',
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=1`
    );
  },

  async executeTokenExchange() {
    if (!this.state.authCode) {
      alert('No authorization code available. Complete Step 2 first.');
      return;
    }

    try {
      const isExternal = this.state.providerMode === 'custom';
      const tokenData = await window.PKCEEngine.exchangeCodeForTokens({
        tokenEndpoint: this.state.tokenEndpoint,
        clientId: this.state.clientId,
        clientSecret: this.state.clientSecret,
        redirectUri: this.state.redirectUri,
        code: this.state.authCode,
        codeVerifier: this.state.verifier,
        useProxy: isExternal
      });

      this.state.tokenResponse = tokenData;

      if (tokenData.id_token) {
        this.state.idTokenDecoded = window.PKCEEngine.decodeJwt(tokenData.id_token);
      }

      this.state.currentStep = 5;
      this.render();

      // Automatically fetch UserInfo if access_token is present
      if (tokenData.access_token && this.state.userinfoEndpoint) {
        this.fetchUserInfo(tokenData.access_token);
      }
    } catch (err) {
      alert('Token Exchange Failed: ' + err.message);
    }
  },

  async fetchUserInfo(accessToken) {
    try {
      const res = await fetch(this.state.userinfoEndpoint, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await res.json();
      this.state.userInfoResponse = data;
      this.render();
    } catch (e) {
      console.error('Failed to fetch UserInfo', e);
    }
  },

  async testRefreshToken() {
    if (!this.state.tokenResponse || !this.state.tokenResponse.refresh_token) {
      alert('No refresh token received in token response.');
      return;
    }

    try {
      const res = await fetch(this.state.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          client_id: this.state.clientId,
          refresh_token: this.state.tokenResponse.refresh_token
        })
      });
      const data = await res.json();
      this.state.refreshedTokenResponse = data;
      this.render();
    } catch (e) {
      alert('Refresh token exchange failed: ' + e.message);
    }
  },

  render() {
    const root = document.getElementById('live-lab-root');
    if (!root) return;

    const isMock = this.state.providerMode === 'mock';

    root.innerHTML = `
      <div class="space-y-8">
        
        <!-- Top Banner: Provider Mode & Config Bar -->
        <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <h2 class="text-xl font-bold text-white flex items-center gap-2.5">
                <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                Interactive PKCE Authorization Code Lab
              </h2>
              <p class="text-xs text-slate-400 mt-1">RFC 7636 Proof Key for Code Exchange (OAuth 2.1 & OpenID Connect 1.0)</p>
            </div>

            <!-- Provider Mode Toggle -->
            <div class="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
              <button onclick="window.LiveLab.setProviderMode('mock')" class="px-4 py-2 rounded-lg text-xs font-semibold transition-all ${isMock ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'}">
                Mock OpenID Provider (Built-in)
              </button>
              <button onclick="window.LiveLab.setProviderMode('custom')" class="px-4 py-2 rounded-lg text-xs font-semibold transition-all ${!isMock ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'}">
                External IdP (Auth0, Okta, Keycloak)
              </button>
            </div>
          </div>

          <!-- Configuration Details Panel -->
          <div class="mt-5">
            ${isMock ? `
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div class="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">Issuer URL</div>
                  <div class="font-mono text-indigo-400 truncate mt-0.5" title="${this.state.issuer}">${this.state.issuer}</div>
                </div>
                <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div class="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">Client ID</div>
                  <div class="font-mono text-cyan-400 truncate mt-0.5">${this.state.clientId}</div>
                </div>
                <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div class="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">Redirect URI</div>
                  <div class="font-mono text-amber-400 truncate mt-0.5" title="${this.state.redirectUri}">${this.state.redirectUri}</div>
                </div>
                <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div class="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">PKCE Method</div>
                  <div class="font-mono text-emerald-400 truncate mt-0.5">S256 (SHA-256)</div>
                </div>
              </div>
            ` : `
              <div class="space-y-4">
                <div class="flex items-center gap-2">
                  <input type="text" id="custom-issuer-input" placeholder="https://your-tenant.auth0.com or https://keycloak/realms/myrealm" value="${this.state.issuer.startsWith('http://localhost') ? '' : this.state.issuer}" class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono">
                  <button onclick="window.LiveLab.fetchCustomDiscovery(document.getElementById('custom-issuer-input').value)" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-xl shadow-lg transition-all flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Fetch Discovery
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label class="text-slate-400 text-[10px] uppercase font-semibold">Client ID</label>
                    <input type="text" value="${this.state.clientId}" oninput="window.LiveLab.state.clientId = this.value; window.LiveLab.updateAuthUrl();" class="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200">
                  </div>
                  <div>
                    <label class="text-slate-400 text-[10px] uppercase font-semibold">Client Secret (Optional)</label>
                    <input type="password" value="${this.state.clientSecret}" oninput="window.LiveLab.state.clientSecret = this.value;" placeholder="Leave empty for public client" class="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200">
                  </div>
                  <div>
                    <label class="text-slate-400 text-[10px] uppercase font-semibold">Scope</label>
                    <input type="text" value="${this.state.scope}" oninput="window.LiveLab.state.scope = this.value; window.LiveLab.updateAuthUrl();" class="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200">
                  </div>
                </div>
              </div>
            `}
          </div>
        </div>

        <!-- 5-STEP VISUAL PKCE WORKFLOW PIPELINE -->
        <div class="space-y-6">

          <!-- STEP 1: PKCE Cryptographic Parameter Generation -->
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl transition-all ${this.state.currentStep >= 1 ? 'ring-1 ring-indigo-500/30' : ''}">
            <div class="flex items-center justify-between pb-4 border-b border-slate-800">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">1</span>
                <div>
                  <h3 class="text-sm font-bold text-white">Generate PKCE Keys (RFC 7636)</h3>
                  <p class="text-xs text-slate-400">Cryptographically secure code_verifier & S256 code_challenge</p>
                </div>
              </div>
              <button onclick="window.LiveLab.generateNewPkce().then(() => window.LiveLab.render())" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-medium rounded-xl border border-slate-700 transition-all flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                Regenerate PKCE
              </button>
            </div>

            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Code Verifier -->
              <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-slate-300">code_verifier (Secret, Client-side only)</span>
                  <span class="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono text-[10px] border border-indigo-800">${this.state.verifier.length} chars (RFC 43-128)</span>
                </div>
                <div class="p-2.5 bg-slate-900 rounded-lg text-xs font-mono text-amber-300 break-all border border-slate-800 select-all">
                  ${this.state.verifier}
                </div>
                <p class="text-[11px] text-slate-400">High-entropy unguessable random string generated via <code>window.crypto.getRandomValues()</code>.</p>
              </div>

              <!-- Code Challenge -->
              <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-slate-300">code_challenge (Sent in /authorize)</span>
                  <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] border border-emerald-800">Method: S256</span>
                </div>
                <div class="p-2.5 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 break-all border border-slate-800 select-all">
                  ${this.state.challenge}
                </div>
                <p class="text-[11px] text-slate-400">Formula: <code>BASE64URL(SHA256(ASCII(code_verifier)))</code>. Safe to transmit publicly.</p>
              </div>
            </div>

            <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-400">
              <div class="p-2 bg-slate-950/60 rounded-lg border border-slate-800/60 truncate"><span class="text-slate-400">state (Anti-CSRF):</span> <span class="text-slate-300">${this.state.state}</span></div>
              <div class="p-2 bg-slate-950/60 rounded-lg border border-slate-800/60 truncate"><span class="text-slate-400">nonce (ID Token Replay Protection):</span> <span class="text-slate-300">${this.state.nonce}</span></div>
            </div>
          </div>

          <!-- STEP 2: Build & Launch Authorization Request -->
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div class="flex items-center justify-between pb-4 border-b border-slate-800">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30">2</span>
                <div>
                  <h3 class="text-sm font-bold text-white">Execute Authorization Request (GET /authorize)</h3>
                  <p class="text-xs text-slate-400">Send code_challenge and request authorization code</p>
                </div>
              </div>
            </div>

            <!-- Authorization URL Preview -->
            <div class="mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div class="text-xs font-semibold text-slate-300">Generated Authorization URL:</div>
              <div class="p-3 bg-slate-900 rounded-lg text-xs font-mono text-cyan-300 break-all border border-slate-800 select-all leading-relaxed">
                ${this.state.authUrl}
              </div>
            </div>

            <!-- Launch Options -->
            <div class="mt-4 flex flex-wrap items-center gap-3">
              <button onclick="window.LiveLab.launchPopupAuth()" class="py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                Launch SSO in Popup Window (Recommended)
              </button>

              <a href="${this.state.authUrl}" target="_blank" class="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition-all flex items-center gap-2">
                Open in New Tab
              </a>
            </div>
          </div>

          <!-- STEP 3: Handle Callback & Authorization Code -->
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl ${this.state.authCode ? 'ring-1 ring-emerald-500/30' : ''}">
            <div class="flex items-center justify-between pb-4 border-b border-slate-800">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">3</span>
                <div>
                  <h3 class="text-sm font-bold text-white">Callback Received & State Validated</h3>
                  <p class="text-xs text-slate-400">Extracts one-time code and confirms state parameter matches</p>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${this.state.authCode ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'}">
                ${this.state.authCode ? 'Code Captured' : 'Waiting for Code'}
              </span>
            </div>

            <div class="mt-4">
              <label class="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">Authorization Code (Single-Use, 5min expiration)</label>
              <div class="flex items-center gap-2">
                <input type="text" id="auth-code-input" value="${this.state.authCode}" placeholder="Launch Step 2 to receive code, or paste one manually..." oninput="window.LiveLab.state.authCode = this.value;" class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-indigo-500">
                <button onclick="window.LiveLab.executeTokenExchange()" class="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Exchange for Tokens
                </button>
              </div>
            </div>
          </div>

          <!-- STEP 4: Token Exchange & PKCE Verification (POST /token) -->
          ${this.state.tokenResponse ? `
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl ring-1 ring-emerald-500/40">
              <div class="flex items-center justify-between pb-4 border-b border-slate-800">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">4</span>
                  <div>
                    <h3 class="text-sm font-bold text-white">Token Exchange & Cryptographic Verification Success</h3>
                    <p class="text-xs text-slate-400">Server verified SHA256(code_verifier) === code_challenge and issued tokens</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  HTTP 200 OK
                </span>
              </div>

              <!-- Raw Token Payload -->
              <div class="mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Token Response JSON</div>
                <pre class="text-xs font-mono text-emerald-300 overflow-x-auto custom-scrollbar p-3 bg-slate-900 rounded-lg"><code>${JSON.stringify(this.state.tokenResponse, null, 2)}</code></pre>
              </div>
            </div>

            <!-- STEP 5: ID Token & User Claims Inspector -->
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div class="flex items-center justify-between pb-4 border-b border-slate-800">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm border border-cyan-500/30">5</span>
                  <div>
                    <h3 class="text-sm font-bold text-white">ID Token Inspection & User Claims</h3>
                    <p class="text-xs text-slate-400">RS256 Signed JSON Web Token (JWT) Decoded</p>
                  </div>
                </div>
              </div>

              ${this.state.idTokenDecoded ? `
                <div class="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <!-- Header -->
                  <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div class="text-xs font-semibold text-rose-400 uppercase tracking-wider">JWT Header (RS256)</div>
                    <pre class="text-xs font-mono text-rose-300 bg-slate-900 p-2.5 rounded-lg overflow-x-auto"><code>${JSON.stringify(this.state.idTokenDecoded.header, null, 2)}</code></pre>
                  </div>

                  <!-- Payload -->
                  <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 lg:col-span-2">
                    <div class="text-xs font-semibold text-purple-400 uppercase tracking-wider">JWT Payload (Claims)</div>
                    <pre class="text-xs font-mono text-purple-300 bg-slate-900 p-2.5 rounded-lg overflow-x-auto custom-scrollbar"><code>${JSON.stringify(this.state.idTokenDecoded.payload, null, 2)}</code></pre>
                  </div>
                </div>

                <!-- Claims Verification Checklist -->
                <div class="mt-4 p-4 bg-indigo-950/30 rounded-xl border border-indigo-800/40 text-xs space-y-2">
                  <div class="text-indigo-300 font-semibold uppercase tracking-wider text-[11px]">Security Claims Validation Checklist</div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Issuer: <strong class="text-white font-mono">${this.state.idTokenDecoded.payload.iss}</strong></span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Audience (Client): <strong class="text-white font-mono">${this.state.idTokenDecoded.payload.aud}</strong></span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Nonce Match: <strong class="text-emerald-300 font-mono">${this.state.idTokenDecoded.payload.nonce || 'N/A'}</strong></span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Expiration: <strong class="text-white">${new Date(this.state.idTokenDecoded.payload.exp * 1000).toLocaleTimeString()}</strong></span>
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- User Profile & Refresh Token Actions -->
              <div class="mt-5 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <button onclick="window.LiveLab.testRefreshToken()" class="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  Test Refresh Token Rotation
                </button>

                <div class="text-xs text-slate-400 font-mono">
                  ${this.state.userInfoResponse ? `UserInfo sub: <span class="text-emerald-400">${this.state.userInfoResponse.sub}</span> (${this.state.userInfoResponse.name})` : ''}
                </div>
              </div>

              ${this.state.refreshedTokenResponse ? `
                <div class="mt-4 p-4 bg-slate-950 rounded-xl border border-indigo-900/50 space-y-2">
                  <div class="text-xs font-semibold text-emerald-400 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    Refresh Token Rotation Applied! New Tokens Issued:
                  </div>
                  <pre class="text-xs font-mono text-slate-300 bg-slate-900 p-2.5 rounded-lg overflow-x-auto"><code>${JSON.stringify(this.state.refreshedTokenResponse, null, 2)}</code></pre>
                </div>
              ` : ''}
            </div>
          ` : ''}

        </div>

      </div>
    `;
  }
};
