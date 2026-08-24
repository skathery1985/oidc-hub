/**
 * Developer Toolset & Interactive Utilities
 * PKCE Bitwise Calculator, JWT Decoder & Claim Explainer, Discovery Analyzer, and Security Architecture.
 * Localized with Arabic (RTL) [Default] and English (LTR).
 * Fully themed for Light Mode [Default] and Dark Mode.
 */

window.DevTools = {
  activeTab: 'calculator',

  init() {
    this.render();
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  render() {
    const root = document.getElementById('tools-root');
    if (!root) return;

    const t = (k) => window.i18n.t(k);

    root.innerHTML = `
      <div class="space-y-6">
        
        <!-- Tab Navigation -->
        <div class="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button onclick="window.DevTools.setTab('calculator')" class="px-4 py-2 rounded-xl text-xs font-semibold transition-all ${this.activeTab === 'calculator' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            ${t('tabCalc')}
          </button>
          <button onclick="window.DevTools.setTab('jwt')" class="px-4 py-2 rounded-xl text-xs font-semibold transition-all ${this.activeTab === 'jwt' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            ${t('tabJwt')}
          </button>
          <button onclick="window.DevTools.setTab('discovery')" class="px-4 py-2 rounded-xl text-xs font-semibold transition-all ${this.activeTab === 'discovery' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            ${t('tabDisco')}
          </button>
          <button onclick="window.DevTools.setTab('security')" class="px-4 py-2 rounded-xl text-xs font-semibold transition-all ${this.activeTab === 'security' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            ${t('tabThreat')}
          </button>
        </div>

        <!-- Tab Content -->
        <div id="tools-tab-content">
          ${this.renderTabContent()}
        </div>

      </div>
    `;

    if (this.activeTab === 'calculator') {
      this.recalculatePkce();
    }
  },

  renderTabContent() {
    switch (this.activeTab) {
      case 'calculator':
        return this.renderCalculator();
      case 'jwt':
        return this.renderJwtDebugger();
      case 'discovery':
        return this.renderDiscoveryInspector();
      case 'security':
        return this.renderSecurityMatrix();
      default:
        return '';
    }
  },

  // --------------------------------------------------------------------------
  // 1. PKCE CALCULATOR
  // --------------------------------------------------------------------------
  renderCalculator() {
    const t = (k) => window.i18n.t(k);
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div class="lg:col-span-6 space-y-4">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
            <div class="flex items-center justify-between mb-3">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('calcVerifierLabel')}</label>
              <button onclick="document.getElementById('calc-verifier-input').value = window.PKCEEngine.generateCodeVerifier(64); window.DevTools.recalculatePkce();" class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                ${t('calcGenRandom')}
              </button>
            </div>

            <textarea id="calc-verifier-input" dir="ltr" rows="3" oninput="window.DevTools.recalculatePkce()" class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs font-mono text-amber-700 dark:text-amber-300 focus:outline-none focus:border-indigo-500">${window.PKCEEngine.generateCodeVerifier(64)}</textarea>

            <div id="calc-verifier-validation" class="mt-2 text-xs flex items-center justify-between">
              <!-- Validation status -->
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">${t('calcChallengeLabel')}</h3>
            <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div class="text-[11px] text-slate-500 dark:text-slate-400" dir="ltr">Formula: <code class="text-emerald-600 dark:text-emerald-400">BASE64URL(SHA256(ASCII(code_verifier)))</code></div>
              <div id="calc-challenge-output" dir="ltr" class="p-3 bg-white dark:bg-slate-900 rounded-lg text-xs font-mono text-emerald-700 dark:text-emerald-300 break-all select-all border border-slate-200 dark:border-slate-800">
                <!-- Calculated output -->
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 space-y-4">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('calcStepsTitle')}</h3>
            
            <div class="space-y-3 text-xs font-mono">
              <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div class="text-slate-500 dark:text-slate-400 text-[10px] font-sans font-semibold uppercase mb-1">${t('calcStep1')}</div>
                <div id="calc-step-ascii" class="text-indigo-600 dark:text-indigo-300 break-all text-[11px]" dir="ltr"></div>
              </div>

              <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div class="text-slate-500 dark:text-slate-400 text-[10px] font-sans font-semibold uppercase mb-1">${t('calcStep2')}</div>
                <div id="calc-step-sha256" class="text-purple-600 dark:text-purple-300 break-all text-[11px]" dir="ltr"></div>
              </div>

              <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div class="text-slate-500 dark:text-slate-400 text-[10px] font-sans font-semibold uppercase mb-1">${t('calcStep3')}</div>
                <div id="calc-step-base64url" class="text-emerald-600 dark:text-emerald-300 break-all text-[11px]" dir="ltr"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  async recalculatePkce() {
    const input = document.getElementById('calc-verifier-input');
    if (!input) return;

    const verifier = input.value.trim();
    const len = verifier.length;
    const isValidLen = len >= 43 && len <= 128;
    const isValidChars = /^[A-Za-z0-9\-._~]+$/.test(verifier);

    const validEl = document.getElementById('calc-verifier-validation');
    if (validEl) {
      if (isValidLen && isValidChars) {
        validEl.innerHTML = `
          <span class="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Valid RFC 7636 Verifier</span>
          <span class="text-slate-500 dark:text-slate-400 font-mono" dir="ltr">${len} / 128 chars</span>
        `;
      } else {
        validEl.innerHTML = `
          <span class="text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg> Invalid! (Must be 43-128 chars of [A-Za-z0-9-._~])</span>
          <span class="text-rose-600 dark:text-rose-400 font-mono" dir="ltr">${len} chars</span>
        `;
      }
    }

    if (verifier) {
      try {
        const challenge = await window.PKCEEngine.generateCodeChallenge(verifier);
        const challengeEl = document.getElementById('calc-challenge-output');
        if (challengeEl) challengeEl.textContent = challenge;

        const encoder = new TextEncoder();
        const asciiBytes = encoder.encode(verifier);
        const asciiHex = Array.from(asciiBytes, b => b.toString(16).padStart(2, '0')).join('');
        
        const digest = await window.crypto.subtle.digest('SHA-256', asciiBytes);
        const digestHex = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');

        const stepAscii = document.getElementById('calc-step-ascii');
        if (stepAscii) stepAscii.textContent = asciiHex;

        const stepSha256 = document.getElementById('calc-step-sha256');
        if (stepSha256) stepSha256.textContent = digestHex;

        const stepB64 = document.getElementById('calc-step-base64url');
        if (stepB64) stepB64.textContent = challenge;
      } catch (err) {
        console.error(err);
      }
    }
  },

  // --------------------------------------------------------------------------
  // 2. JWT DEBUGGER
  // --------------------------------------------------------------------------
  renderJwtDebugger() {
    const t = (k) => window.i18n.t(k);
    return `
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">${t('jwtPasteLabel')}</label>
          <textarea id="jwt-input-field" dir="ltr" rows="4" oninput="window.DevTools.decodeJwtInput()" placeholder="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-700 dark:text-cyan-300 focus:outline-none focus:border-indigo-500"></textarea>
        </div>

        <div id="jwt-decoded-container" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-4 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-md dark:shadow-xl">
            <h4 class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">${t('jwtHeader')}</h4>
            <pre id="jwt-header-display" class="bg-slate-900 p-3 rounded-xl text-xs font-mono text-rose-300 overflow-x-auto" dir="ltr">Paste a token above to inspect...</pre>
          </div>

          <div class="lg:col-span-8 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-md dark:shadow-xl">
            <h4 class="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-3">${t('jwtPayload')}</h4>
            <pre id="jwt-payload-display" class="bg-slate-900 p-3 rounded-xl text-xs font-mono text-purple-300 overflow-x-auto" dir="ltr">Paste a token above to inspect...</pre>
          </div>
        </div>
      </div>
    `;
  },

  decodeJwtInput() {
    const input = document.getElementById('jwt-input-field');
    if (!input) return;
    const token = input.value.trim();
    if (!token) return;

    const decoded = window.PKCEEngine.decodeJwt(token);
    const headerEl = document.getElementById('jwt-header-display');
    const payloadEl = document.getElementById('jwt-payload-display');

    if (decoded && headerEl && payloadEl) {
      headerEl.textContent = JSON.stringify(decoded.header, null, 2);
      payloadEl.textContent = JSON.stringify(decoded.payload, null, 2);
    }
  },

  // --------------------------------------------------------------------------
  // 3. DISCOVERY INSPECTOR
  // --------------------------------------------------------------------------
  renderDiscoveryInspector() {
    const t = (k) => window.i18n.t(k);
    return `
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">${t('discoveryInputLabel')}</label>
          <div class="flex items-center gap-2">
            <input type="text" id="discovery-issuer-input" dir="ltr" value="http://localhost:3000/mock-idp" placeholder="https://accounts.google.com or https://your-tenant.auth0.com" class="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono">
            <button onclick="window.DevTools.runDiscoveryCheck()" class="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all">
              ${t('discoveryInspectBtn')}
            </button>
          </div>
        </div>

        <div id="discovery-results" class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
          <div class="text-xs text-slate-500 dark:text-slate-400 italic">${window.i18n.currentLang === 'ar' ? 'اضغط على زر الفحص لاختبار بيانات المزود.' : 'Click "Inspect Provider Metadata" to test the issuer.'}</div>
        </div>
      </div>
    `;
  },

  async runDiscoveryCheck() {
    const input = document.getElementById('discovery-issuer-input');
    const results = document.getElementById('discovery-results');
    if (!input || !results) return;

    results.innerHTML = `<div class="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-2"><div class="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div> Fetching OIDC Discovery Metadata...</div>`;

    try {
      let data;
      try {
        const res = await fetch(`/api/discovery/analyze?issuer=${encodeURIComponent(input.value.trim())}`);
        data = await res.json();
      } catch (fetchErr) {
        if (window.VirtualOP) {
          const meta = window.VirtualOP.getDiscoveryMetadata();
          data = {
            issuer: meta.issuer,
            authorization_endpoint: meta.authorization_endpoint,
            token_endpoint: meta.token_endpoint,
            userinfo_endpoint: meta.userinfo_endpoint,
            jwks_uri: meta.jwks_uri,
            supportsS256: true,
            raw: meta
          };
        } else {
          throw fetchErr;
        }
      }

      if (data.error) {
        results.innerHTML = `<div class="text-xs text-rose-600 dark:text-rose-400 font-medium">${data.error}</div>`;
        return;
      }

      results.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">PKCE Compliance Check</span>
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${data.supportsS256 ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'}" dir="ltr">
              ${data.supportsS256 ? '✓ S256 PKCE Supported' : '✗ S256 PKCE Missing'}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800" dir="ltr"><span class="text-slate-500 dark:text-slate-400">Authorization Endpoint:</span> <span class="text-indigo-600 dark:text-indigo-300">${data.authorization_endpoint || 'N/A'}</span></div>
            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800" dir="ltr"><span class="text-slate-500 dark:text-slate-400">Token Endpoint:</span> <span class="text-emerald-600 dark:text-emerald-300">${data.token_endpoint || 'N/A'}</span></div>
            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800" dir="ltr"><span class="text-slate-500 dark:text-slate-400">JWKS URI:</span> <span class="text-amber-600 dark:text-amber-300">${data.jwks_uri || 'N/A'}</span></div>
            <div class="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800" dir="ltr"><span class="text-slate-500 dark:text-slate-400">UserInfo Endpoint:</span> <span class="text-cyan-600 dark:text-cyan-300">${data.userinfo_endpoint || 'N/A'}</span></div>
          </div>

          <div class="mt-3">
            <div class="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Raw JSON Metadata</div>
            <pre class="bg-slate-900 p-3 rounded-xl text-xs font-mono text-slate-200 max-h-60 overflow-y-auto custom-scrollbar" dir="ltr"><code>${JSON.stringify(data.raw, null, 2)}</code></pre>
          </div>
        </div>
      `;
    } catch (err) {
      results.innerHTML = `<div class="text-xs text-rose-600 dark:text-rose-400">Fetch error: ${err.message}</div>`;
    }
  },

  // --------------------------------------------------------------------------
  // 4. SECURITY MATRIX
  // --------------------------------------------------------------------------
  renderSecurityMatrix() {
    const t = (k) => window.i18n.t(k);
    return `
      <div class="space-y-6">
        
        <!-- Why PKCE Replaced Implicit Flow -->
        <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl space-y-3">
          <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span class="p-1 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300">⚡</span>
            ${t('whyPkceTitle')}
          </h3>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            ${t('whyPkceText1')}
          </p>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            ${t('whyPkceText2')}
          </p>
        </div>

        <!-- Token Storage Security Comparison Table -->
        <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
          <h3 class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4">${t('storageMatrixTitle')}</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-start text-xs">
              <thead class="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th class="p-3">${t('tblPlatform')}</th>
                  <th class="p-3">${t('tblStorage')}</th>
                  <th class="p-3">${t('tblXss')}</th>
                  <th class="p-3">${t('tblCsrf')}</th>
                  <th class="p-3">${t('tblBestPractice')}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800/60 font-mono text-slate-700 dark:text-slate-300">
                <tr>
                  <td class="p-3 font-sans font-semibold text-slate-900 dark:text-white">Browser SPA (React, Vue, Angular)</td>
                  <td class="p-3 text-amber-600 dark:text-amber-300" dir="ltr">In-Memory / SessionStorage</td>
                  <td class="p-3 text-rose-600 dark:text-rose-400" dir="ltr">High (if in localStorage)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400" dir="ltr">None (Bearer header)</td>
                  <td class="p-3 font-sans text-indigo-600 dark:text-indigo-300">BFF Pattern (Backend For Frontend)</td>
                </tr>
                <tr>
                  <td class="p-3 font-sans font-semibold text-slate-900 dark:text-white">Traditional Web App (Node, Python, Java, .NET)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-300" dir="ltr">HttpOnly Encrypted Cookie</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400" dir="ltr">Immune (JS cannot read cookie)</td>
                  <td class="p-3 text-amber-600 dark:text-amber-400" dir="ltr">Mitigated via SameSite=Lax + Anti-CSRF</td>
                  <td class="p-3 font-sans text-indigo-600 dark:text-indigo-300">Confidential Client with PKCE S256</td>
                </tr>
                <tr>
                  <td class="p-3 font-sans font-semibold text-slate-900 dark:text-white">Mobile Flutter (iOS & Android)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-300" dir="ltr">FlutterSecureStorage (Keychain / Keystore)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400" dir="ltr">None (Native binary)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400" dir="ltr">None</td>
                  <td class="p-3 font-sans text-indigo-600 dark:text-indigo-300">flutter_appauth + ASWebAuth / Custom Tabs</td>
                </tr>
                <tr>
                  <td class="p-3 font-sans font-semibold text-slate-900 dark:text-white">Mobile iOS (Swift / SwiftUI)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-300" dir="ltr">iOS Keychain (SecItem)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400" dir="ltr">None (No browser DOM)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400" dir="ltr">None</td>
                  <td class="p-3 font-sans text-indigo-600 dark:text-indigo-300">AppAuth-iOS + ASWebAuthenticationSession</td>
                </tr>
                <tr>
                  <td class="p-3 font-sans font-semibold text-slate-900 dark:text-white">Mobile Android (Kotlin)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-300" dir="ltr">EncryptedSharedPreferences (Keystore)</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400" dir="ltr">None</td>
                  <td class="p-3 text-emerald-600 dark:text-emerald-400" dir="ltr">None</td>
                  <td class="p-3 font-sans text-indigo-600 dark:text-indigo-300">AppAuth-Android + Chrome Custom Tabs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }
};
