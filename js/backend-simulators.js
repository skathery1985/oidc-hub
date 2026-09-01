/**
 * Non-SPA / Backend / BFF Interactive Simulators (Next.js, Node.js, Python, Spring Boot, .NET 8, Go)
 * Simulates real confidential client OAuth 2.0 / OIDC Authorization Code Flow with PKCE RFC 7636 & Client Secrets
 * Localized with Arabic (RTL) [Default] and English (LTR).
 * Fully themed for Light Mode [Default] and Dark Mode.
 */

window.BackendSimulator = {
  currentPlatform: 'nextjs',
  authMode: 'pkce_public', // 'pkce_public' (Default) or 'client_secret'
  traceCount: 0,
  state: {
    step: 'idle',
    verifier: null,
    challenge: null,
    code: null,
    sessionCookie: null,
    tokens: null,
    user: null,
    refreshCount: 0
  },

  init() {
    this.renderSimulatorFrame();
    this.attachEventListeners();
  },

  setAuthMode(mode) {
    this.authMode = mode;
    this.reset();
    this.renderSimulatorFrame();
  },

  setPlatform(platform) {
    this.currentPlatform = platform;
    this.reset();
    this.renderSimulatorFrame();
    if (window.App && typeof window.App.syncSdkCatalogFromSimulator === 'function') {
      window.App.syncSdkCatalogFromSimulator('backend', platform);
    }
  },

  reset() {
    this.traceCount = 0;
    this.state = {
      step: 'idle',
      verifier: null,
      challenge: null,
      code: null,
      sessionCookie: null,
      tokens: null,
      user: null,
      refreshCount: 0
    };
    this.renderScreen();
  },

  attachEventListeners() {
    const container = document.getElementById('backend-simulator-root');
    if (!container) return;

    container.addEventListener('click', (e) => {
      if (e.target.closest('#backend-btn-login')) {
        this.startLogin();
      } else if (e.target.closest('#backend-btn-consent-approve')) {
        this.approveConsent();
      } else if (e.target.closest('#backend-btn-consent-cancel')) {
        this.cancelConsent();
      } else if (e.target.closest('#backend-btn-refresh')) {
        this.refreshSession();
      } else if (e.target.closest('#backend-btn-logout')) {
        this.reset();
      }
    });
  },

  async startLogin() {
    this.state.step = 'generating_pkce';
    this.renderScreen();

    const isAr = window.i18n.currentLang === 'ar';
    const isPkce = this.authMode === 'pkce_public';

    if (isPkce) {
      this.state.verifier = window.PKCEEngine.generateCodeVerifier(64);
      this.state.challenge = await window.PKCEEngine.generateCodeChallenge(this.state.verifier);
      this.state.state = window.PKCEEngine.generateRandomString(16);

      const msg = isAr 
        ? `تم إنشاء <span class="text-sky-400 font-mono font-semibold" dir="ltr">code_verifier</span> وتوليد تحدي التشفير <span class="text-emerald-400 font-mono font-semibold" dir="ltr">code_challenge</span> بطريقة <span class="text-emerald-400 font-mono font-bold" dir="ltr">S256</span> (نمط PKCE Public).`
        : `Generated <span class="text-sky-400 font-mono font-semibold" dir="ltr">code_verifier</span> and computed <span class="text-emerald-400 font-mono font-bold" dir="ltr">S256</span> <span class="text-emerald-400 font-mono font-semibold" dir="ltr">code_challenge</span> (PKCE Public mode).`;
      this.logStep(msg);
    } else {
      this.state.verifier = null;
      this.state.challenge = null;
      this.state.state = window.PKCEEngine.generateRandomString(16);

      const msg = isAr
        ? `بدء جلسة المصادقة المباشرة باستخدام <span class="text-emerald-400 font-mono font-semibold" dir="ltr">client_secret</span> المحمي في الخادم السري (نمط العميل السري / بدون PKCE).`
        : `Initiated direct authentication session using secure server <span class="text-emerald-400 font-mono font-semibold" dir="ltr">client_secret</span> (Confidential Client mode, No PKCE).`;
      this.logStep(msg);
    }

    setTimeout(() => {
      this.state.step = 'authorizing';
      this.renderScreen();
    }, 400);
  },

  getRedirectUri() {
    switch (this.currentPlatform) {
      case 'nextjs': return window.location.origin + '/api/auth/callback/oidc';
      case 'node': return window.location.origin + '/auth/callback';
      case 'python': return window.location.origin + '/auth/callback';
      case 'spring': return window.location.origin + '/login/oauth2/code/oidc';
      case 'nimbus': return window.location.origin + '/oidc/callback';
      case 'dotnet': return window.location.origin + '/signin-oidc';
      case 'go': return window.location.origin + '/auth/callback';
      default: return window.location.origin + '/auth/callback';
    }
  },

  getClientId() {
    switch (this.currentPlatform) {
      case 'nextjs': return 'nextjs-bff-client';
      case 'node': return 'node-backend-client';
      case 'python': return 'fastapi-authlib-client';
      case 'spring': return 'spring-boot-client';
      case 'nimbus': return 'nimbus-java-client';
      case 'dotnet': return 'dotnet-core-client';
      case 'go': return 'go-gin-client';
      default: return 'confidential-client';
    }
  },

  getPlatformLabel() {
    const isAr = window.i18n && window.i18n.currentLang === 'ar';
    switch (this.currentPlatform) {
      case 'nextjs': return isAr ? 'نكست جي إس 14 (نمط BFF)' : 'NEXT.JS 14 / AUTH.JS (BFF)';
      case 'node': return isAr ? 'نود جي إس / openid-client' : 'NODE.JS / OPENID-CLIENT';
      case 'python': return isAr ? 'بايثون / فاست إيه بي آي' : 'PYTHON / FASTAPI';
      case 'spring': return isAr ? 'جافا / سبرينغ سيكيوريتي' : 'JAVA / SPRING SECURITY';
      case 'nimbus': return isAr ? 'جافا / نيمبوس (NimbusDS)' : 'JAVA / NIMBUS-OIDC-SDK';
      case 'dotnet': return isAr ? 'دوت نت 8 / ASP.NET' : 'C# / ASP.NET CORE 8';
      case 'go': return isAr ? 'غو / go-oidc' : 'GO / COREOS-OIDC';
      default: return isAr ? 'خادم خلفي / BFF' : 'BACKEND / BFF';
    }
  },

  async approveConsent() {
    this.state.step = 'redirecting';
    this.renderScreen();

    const redirectUri = this.getRedirectUri();
    const isPkce = this.authMode === 'pkce_public';
    let mockCode;
    if (window.VirtualOP) {
      mockCode = window.VirtualOP.issueAuthorizationCode({
        clientId: this.getClientId(),
        redirectUri: redirectUri,
        codeChallenge: isPkce ? this.state.challenge : null,
        codeChallengeMethod: isPkce ? 'S256' : null,
        nonce: window.PKCEEngine.generateRandomString(12),
        scope: 'openid profile email'
      });
    } else {
      mockCode = 'authcode_srv_' + Math.random().toString(36).substring(2, 12);
    }
    this.state.code = mockCode;
    const isAr = window.i18n.currentLang === 'ar';

    const redirectMsg = isAr
      ? `تمت موافقة المستخدم. استلم الخادم رمز <span class="text-amber-400 font-mono font-semibold" dir="ltr">authorization_code</span> عبر مسار العودة المخصص <span class="text-indigo-400 font-mono font-semibold" dir="ltr">redirect_uri</span>.`
      : `User approved consent. Server received <span class="text-amber-400 font-mono font-semibold" dir="ltr">authorization_code</span> at backend <span class="text-indigo-400 font-mono font-semibold" dir="ltr">redirect_uri</span> handler.`;
    this.logStep(redirectMsg);

    setTimeout(async () => {
      this.state.step = 'exchanging';
      this.renderScreen();

      setTimeout(async () => {
        try {
          let data = null;
          if (window.VirtualOP) {
            try {
              data = await window.VirtualOP.exchangeCodeForTokens({
                grantType: 'authorization_code',
                clientId: this.getClientId(),
                code: mockCode,
                codeVerifier: this.state.verifier
              });
            } catch (vErr) {
              console.warn('VirtualOP exchange notice:', vErr);
            }
          }

          if (!data || data.error) {
            data = {
              access_token: 'at_' + window.PKCEEngine.generateRandomString(32),
              id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfbW9ja18wMDEiLCJuYW1lIjoiQWxleCBNb3JnYW4iLCJlbWFpbCI6ImFsZXgubW9yZ2FuQGNvcnAuZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJzc28tYWRtaW4iLCJlbmdpbmVlciJdfQ.sig',
              refresh_token: 'rt_' + window.PKCEEngine.generateRandomString(32),
              token_type: 'Bearer',
              expires_in: 3600,
              scope: 'openid profile email'
            };
          }

          this.state.tokens = data;
          this.state.sessionCookie = '__Secure-auth.session.' + Math.random().toString(36).substring(2, 15);
          this.state.user = {
            name: 'Alex Morgan',
            email: 'alex.morgan@company.com',
            sub: 'usr_mock_001',
            role: 'Full-Stack Lead Engineer',
            roles: ['sso-admin', 'engineer'],
            scope: 'openid profile email'
          };
          this.state.step = 'logged_in';

          const successMsg = isAr
            ? `اكتمل التحقق عبر <span class="text-cyan-400 font-mono font-bold" dir="ltr">Backchannel</span> بنجاح! تم التحقق من توقيعات <span class="text-indigo-400 font-mono font-semibold" dir="ltr">JWKS</span> باستخدام <span class="text-emerald-400 font-mono font-semibold" dir="ltr">client_secret</span> وإنشاء ملف <span class="text-purple-400 font-mono font-bold" dir="ltr">HttpOnly SameSite Cookie</span> مشفر للجلسة.`
            : `<span class="text-cyan-400 font-mono font-bold" dir="ltr">Backchannel</span> validation passed! Verified <span class="text-indigo-400 font-mono font-semibold" dir="ltr">JWKS</span> signatures using <span class="text-emerald-400 font-mono font-semibold" dir="ltr">client_secret</span> and created an encrypted <span class="text-purple-400 font-mono font-bold" dir="ltr">HttpOnly SameSite Cookie</span> session.`;
          this.logStep(successMsg);

          this.renderScreen();
        } catch (err) {
          console.error(err);
          this.state.step = 'logged_in';
          this.renderScreen();
        }
      }, 400);
    }, 300);
  },

  cancelConsent() {
    const isAr = window.i18n.currentLang === 'ar';
    this.logStep(isAr ? `تم إلغاء جلسة التفويض.` : `User cancelled login session.`);
    this.reset();
  },

  refreshSession() {
    this.state.refreshCount++;
    const isAr = window.i18n.currentLang === 'ar';
    const msg = isAr
      ? `قام الخادم بتنفيذ <span class="text-amber-400 font-mono font-semibold" dir="ltr">Refresh Token Rotation (RTR)</span> (عملية #${this.state.refreshCount}) عبر <span class="text-cyan-400 font-mono font-semibold" dir="ltr">Backchannel</span> وتجديد كوكيز الجلسة دون كشف التوكنات للمتصفح.`
      : `Server executed <span class="text-amber-400 font-mono font-semibold" dir="ltr">Refresh Token Rotation (RTR)</span> (#${this.state.refreshCount}) via <span class="text-cyan-400 font-mono font-semibold" dir="ltr">Backchannel</span> and updated session cookies with zero browser token exposure.`;
    this.logStep(msg);
    this.renderScreen();
  },

  clearTrace() {
    this.traceCount = 0;
    const consoleEl = document.getElementById('backend-live-console');
    if (consoleEl) consoleEl.innerHTML = '';
  },

  logStep(msg) {
    this.traceCount = (this.traceCount || 0) + 1;
    const isAr = window.i18n && window.i18n.currentLang === 'ar';
    const consoleEl = document.getElementById('backend-live-console');
    if (consoleEl) {
      const line = document.createElement('div');
      line.className = 'text-xs font-mono py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-start gap-2 leading-relaxed';
      line.dir = isAr ? 'rtl' : 'ltr';
      line.innerHTML = `<span class="text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0" dir="ltr">[#${this.traceCount}]</span> <span class="text-slate-700 dark:text-slate-300 flex-1">${msg}</span>`;
      consoleEl.prepend(line);
    }
  },

  renderSimulatorFrame() {
    const root = document.getElementById('backend-simulator-root');
    if (!root) return;

    const t = (k) => window.i18n.t(k);
    const isAr = window.i18n && window.i18n.currentLang === 'ar';
    const plat = this.currentPlatform;
    const isPkce = this.authMode === 'pkce_public';

    root.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left Column: Controls & Platform Switcher -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-md dark:shadow-xl space-y-4">
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">${t('mobileSelectPlatform')}</h3>
              <a href="${this.getSdkGithubUrl()}" target="_blank" class="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-[11px] font-bold rounded-lg shadow-sm border border-slate-700 flex items-center gap-1.5 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                <svg class="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                <span>GitHub</span>
                <svg class="w-2.5 h-2.5 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
            
            <!-- Client Security Mode Toggle: PKCE S256 (Public) vs Client Secret (Confidential) -->
            <div class="mb-3 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 grid grid-cols-2 gap-1 text-[11px] font-semibold select-none">
              <button onclick="window.BackendSimulator.setAuthMode('pkce_public')" class="py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${isPkce ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
                <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <span class="truncate">PKCE S256 (Public)</span>
              </button>
              <button onclick="window.BackendSimulator.setAuthMode('client_secret')" class="py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${!isPkce ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
                <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                <span class="truncate">Client Secret</span>
              </button>
            </div>

            <!-- Platforms List (Rich Cards with brand gradients) -->
            <div class="space-y-2">
              
              <!-- Next.js Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'nextjs'}"
                   onclick="window.BackendSimulator.setPlatform('nextjs')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#09090b] to-[#27272a] text-white ${plat === 'nextjs' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-black/40 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'nextjs' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">Next.js</span>
                    ${plat !== 'nextjs' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">next-auth</span>` : ''}
                  </div>
                  ${plat === 'nextjs' ? `
                    <span class="px-2 py-0.5 rounded-full bg-white text-slate-950 font-black text-[10px] shadow-md flex items-center gap-1 flex-shrink-0 animate-fadeIn">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ${t('activeLanguage')}
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-white/80 group-hover:text-white flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-all flex-shrink-0">
                      ${t('selectToView')}
                      <svg class="w-3 h-3 transform ${isAr ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </span>
                  `}
                </div>
                ${plat === 'nextjs' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">Next.js App Router &bull; <span class="font-mono font-bold text-white">TypeScript / Node.js</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="next-auth">
                      📦 <strong>next-auth</strong>
                    </span>
                    <a href="https://github.com/nextauthjs/next-auth" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- Node.js Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'node'}"
                   onclick="window.BackendSimulator.setPlatform('node')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#14532d] to-[#16a34a] text-white ${plat === 'node' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-green-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'node' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">Node.js</span>
                    ${plat !== 'node' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">openid-client</span>` : ''}
                  </div>
                  ${plat === 'node' ? `
                    <span class="px-2 py-0.5 rounded-full bg-white text-slate-950 font-black text-[10px] shadow-md flex items-center gap-1 flex-shrink-0 animate-fadeIn">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ${t('activeLanguage')}
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-white/80 group-hover:text-white flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-all flex-shrink-0">
                      ${t('selectToView')}
                      <svg class="w-3 h-3 transform ${isAr ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </span>
                  `}
                </div>
                ${plat === 'node' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">Express / Fastify / NestJS &bull; <span class="font-mono font-bold text-white">JavaScript / TypeScript</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="openid-client">
                      📦 <strong>openid-client</strong>
                    </span>
                    <a href="https://github.com/panva/node-openid-client" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- Python Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'python'}"
                   onclick="window.BackendSimulator.setPlatform('python')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white ${plat === 'python' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-blue-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'python' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">Python</span>
                    ${plat !== 'python' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">Authlib</span>` : ''}
                  </div>
                  ${plat === 'python' ? `
                    <span class="px-2 py-0.5 rounded-full bg-white text-slate-950 font-black text-[10px] shadow-md flex items-center gap-1 flex-shrink-0 animate-fadeIn">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ${t('activeLanguage')}
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-white/80 group-hover:text-white flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-all flex-shrink-0">
                      ${t('selectToView')}
                      <svg class="w-3 h-3 transform ${isAr ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </span>
                  `}
                </div>
                ${plat === 'python' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">FastAPI / Flask / Django &bull; <span class="font-mono font-bold text-white">Python 3.10+</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="Authlib">
                      📦 <strong>Authlib</strong>
                    </span>
                    <a href="https://github.com/lepture/authlib" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- Java Spring Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'spring'}"
                   onclick="window.BackendSimulator.setPlatform('spring')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#065f46] to-[#059669] text-white ${plat === 'spring' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-emerald-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'spring' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">Spring Boot</span>
                    ${plat !== 'spring' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">spring-security</span>` : ''}
                  </div>
                  ${plat === 'spring' ? `
                    <span class="px-2 py-0.5 rounded-full bg-white text-slate-950 font-black text-[10px] shadow-md flex items-center gap-1 flex-shrink-0 animate-fadeIn">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ${t('activeLanguage')}
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-white/80 group-hover:text-white flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-all flex-shrink-0">
                      ${t('selectToView')}
                      <svg class="w-3 h-3 transform ${isAr ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </span>
                  `}
                </div>
                ${plat === 'spring' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">Spring Boot 3.x / WebFlux &bull; <span class="font-mono font-bold text-white">Java 17+ / Kotlin</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="spring-security-oauth2">
                      📦 <strong>spring-security</strong>
                    </span>
                    <a href="https://github.com/spring-projects/spring-security" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- Java Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'nimbus'}"
                   onclick="window.BackendSimulator.setPlatform('nimbus')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#991b1b] to-[#dc2626] text-white ${plat === 'nimbus' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-red-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'nimbus' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">Java</span>
                    ${plat !== 'nimbus' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">NimbusDS</span>` : ''}
                  </div>
                  ${plat === 'nimbus' ? `
                    <span class="px-2 py-0.5 rounded-full bg-white text-slate-950 font-black text-[10px] shadow-md flex items-center gap-1 flex-shrink-0 animate-fadeIn">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ${t('activeLanguage')}
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-white/80 group-hover:text-white flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-all flex-shrink-0">
                      ${t('selectToView')}
                      <svg class="w-3 h-3 transform ${isAr ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </span>
                  `}
                </div>
                ${plat === 'nimbus' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">Enterprise Java &bull; <span class="font-mono font-bold text-white">Java 11+ / Jakarta</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="oauth2-oidc-sdk">
                      📦 <strong>oauth2-oidc-sdk</strong>
                    </span>
                    <a href="https://bitbucket.org/connect2id/oauth-2.0-sdk-with-openid-connect-extensions" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>Repo</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- C# / .NET Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'dotnet'}"
                   onclick="window.BackendSimulator.setPlatform('dotnet')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#581c87] to-[#7c3aed] text-white ${plat === 'dotnet' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-purple-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'dotnet' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">C# / .NET</span>
                    ${plat !== 'dotnet' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">ASP.NET</span>` : ''}
                  </div>
                  ${plat === 'dotnet' ? `
                    <span class="px-2 py-0.5 rounded-full bg-white text-slate-950 font-black text-[10px] shadow-md flex items-center gap-1 flex-shrink-0 animate-fadeIn">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ${t('activeLanguage')}
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-white/80 group-hover:text-white flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-all flex-shrink-0">
                      ${t('selectToView')}
                      <svg class="w-3 h-3 transform ${isAr ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </span>
                  `}
                </div>
                ${plat === 'dotnet' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">ASP.NET Core / WebAPI &bull; <span class="font-mono font-bold text-white">C# / .NET</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="AspNetCore.OpenIdConnect">
                      📦 <strong>OpenIdConnect</strong>
                    </span>
                    <a href="https://github.com/dotnet/aspnetcore" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- Go Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'go'}"
                   onclick="window.BackendSimulator.setPlatform('go')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#075985] to-[#0284c7] text-white ${plat === 'go' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-sky-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'go' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">Go</span>
                    ${plat !== 'go' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">go-oidc</span>` : ''}
                  </div>
                  ${plat === 'go' ? `
                    <span class="px-2 py-0.5 rounded-full bg-white text-slate-950 font-black text-[10px] shadow-md flex items-center gap-1 flex-shrink-0 animate-fadeIn">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ${t('activeLanguage')}
                    </span>
                  ` : `
                    <span class="text-[10px] font-bold text-white/80 group-hover:text-white flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-all flex-shrink-0">
                      ${t('selectToView')}
                      <svg class="w-3 h-3 transform ${isAr ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </span>
                  `}
                </div>
                ${plat === 'go' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">net/http / Gin / Fiber &bull; <span class="font-mono font-bold text-white">Go 1.21+</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="go-oidc">
                      📦 <strong>go-oidc</strong>
                    </span>
                    <a href="https://github.com/coreos/go-oidc" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

            </div>

            <!-- Platform specs (Prominent & High-Contrast) -->
            <div dir="ltr" class="mt-4 p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-left">
              <div class="flex justify-between items-center pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80">
                <span class="text-slate-500 dark:text-slate-400 font-medium">SDK / Package:</span>
                <span class="font-mono text-sky-600 dark:text-sky-400 font-bold" dir="ltr">${this.getSdkPackageName()}</span>
              </div>
              <div class="flex justify-between items-center pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80">
                <span class="text-slate-500 dark:text-slate-400 font-medium">Repository:</span>
                <a href="${this.getSdkGithubUrl()}" target="_blank" class="inline-flex items-center gap-1 font-mono text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold underline underline-offset-2" dir="ltr">
                  <span>${this.getSdkLibName()}</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Client Type:</span> <span class="font-mono text-indigo-600 dark:text-indigo-400 font-bold" dir="ltr">${isPkce ? 'Public Client (SPA/Native)' : 'Confidential Client (Server)'}</span></div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Security Mode:</span> <span class="font-mono font-bold ${isPkce ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}" dir="ltr">${isPkce ? 'PKCE S256 (RFC 7636)' : 'Client Secret (Backchannel)'}</span></div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Client Secret:</span> <span class="font-mono font-bold ${isPkce ? 'text-slate-400' : 'text-emerald-500'}" dir="ltr">${isPkce ? 'None (Public PKCE)' : 'Server .env (Secure)'}</span></div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Session Storage:</span> <span class="font-mono text-purple-600 dark:text-purple-400 font-bold text-[11px] truncate max-w-[180px]" dir="ltr">Encrypted HttpOnly Cookie</span></div>
              <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400 font-medium">Backchannel JWKS:</span> <span class="font-mono text-amber-600 dark:text-amber-400 font-bold text-[11px]" dir="ltr">RS256 Server Validation</span></div>
            </div>

            <!-- Dedicated prominent GitHub Button Bar inside card -->
            <div class="pt-3 border-t border-slate-200 dark:border-slate-800" dir="ltr">
              <a href="${this.getSdkGithubUrl()}" target="_blank" class="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl shadow-md border border-slate-700 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]" title="Open Official SDK GitHub Repository">
                <svg class="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                <span>GitHub Repository: <strong>${this.getSdkLibName()}</strong></span>
                <svg class="w-3.5 h-3.5 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
          </div>

          <!-- Step Trace Log -->
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-md dark:shadow-xl">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">${t('mobileTraceTitle')}</h3>
              <button onclick="window.BackendSimulator.clearTrace()" class="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">${t('mobileClearTrace')}</button>
            </div>
            <div id="backend-live-console" class="h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              <div class="text-xs text-slate-400 italic">${t('mobileTracePlaceholder')}</div>
            </div>
          </div>
        </div>

        <!-- Center Column: Server / BFF Frame Simulator -->
        <div class="lg:col-span-4 flex justify-center w-full py-2">
          <div class="relative w-full max-w-[340px] sm:max-w-[360px] h-[590px] sm:h-[640px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 flex flex-col overflow-hidden select-none">
            
            <!-- Server Terminal Header Bar -->
            <div class="bg-slate-950 px-3 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-[11px] font-mono font-bold text-slate-200" dir="ltr">SERVER NODE :3000</span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60" dir="ltr">
                BFF PROXY
              </div>
            </div>

            <!-- Server Viewport Content -->
            <div id="backend-screen-content" class="flex-1 bg-gradient-to-b from-slate-900 to-slate-950 p-4 flex flex-col justify-between text-white overflow-y-auto custom-scrollbar">
              <!-- Rendered dynamically -->
            </div>

          </div>
        </div>

        <!-- Right Column: Live Code Inspector -->
        <div class="lg:col-span-4 space-y-4">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-md dark:shadow-xl">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              ${t('mobileLiveCode')} (${this.getPlatformTitle()})
            </h3>
            <pre class="bg-slate-900 p-4 rounded-xl text-[11px] font-mono text-slate-200 overflow-x-auto border border-slate-800 h-[520px] custom-scrollbar" dir="ltr"><code>${window.App ? window.App.highlightCode(this.getCodeSnippet()) : this.getCodeSnippet()}</code></pre>
          </div>
        </div>

      </div>
    `;

    this.renderScreen();
    this.logStep(isAr ? 'تم تهيئة خادم الخلفية - جاهز لتدفق OIDC مع ' + this.getPlatformTitle() : 'Backend server initialized - Ready for OIDC flow with ' + this.getPlatformTitle());
  },

  getSdkGithubUrl() {
    switch (this.currentPlatform) {
      case 'nextjs': return 'https://github.com/nextauthjs/next-auth';
      case 'node': return 'https://github.com/panva/node-openid-client';
      case 'python': return 'https://github.com/lepture/authlib';
      case 'spring': return 'https://github.com/spring-projects/spring-security';
      case 'nimbus': return 'https://bitbucket.org/connect2id/oauth-2.0-sdk-with-openid-connect-extensions';
      case 'dotnet': return 'https://github.com/dotnet/aspnetcore';
      case 'go': return 'https://github.com/coreos/go-oidc';
      default: return 'https://github.com/openid';
    }
  },

  getSdkLibName() {
    switch (this.currentPlatform) {
      case 'nextjs': return 'next-auth / Auth.js';
      case 'node': return 'openid-client';
      case 'python': return 'authlib';
      case 'spring': return 'spring-security-oauth2';
      case 'nimbus': return 'oauth2-oidc-sdk';
      case 'dotnet': return 'Microsoft.AspNetCore.OpenIdConnect';
      case 'go': return 'coreos/go-oidc';
      default: return 'OIDC SDK';
    }
  },

  getSdkPackageName() {
    switch (this.currentPlatform) {
      case 'nextjs': return 'next-auth@beta / @auth/core';
      case 'node': return 'openid-client: ^5.6.4';
      case 'python': return 'authlib: ^1.3.0';
      case 'spring': return 'spring-boot-starter-oauth2-client';
      case 'nimbus': return 'com.nimbusds:oauth2-oidc-sdk';
      case 'dotnet': return 'Microsoft.AspNetCore.Authentication.OpenIdConnect';
      case 'go': return 'coreos/go-oidc & oauth2';
      default: return 'OIDC Server SDK';
    }
  },

  getPlatformTitle() {
    switch (this.currentPlatform) {
      case 'nextjs': return 'Next.js';
      case 'node': return 'Node.js';
      case 'python': return 'Python';
      case 'spring': return 'Spring Boot';
      case 'nimbus': return 'Java';
      case 'dotnet': return 'C# / .NET';
      case 'go': return 'Go';
      default: return 'Backend Code';
    }
  },

  renderScreen() {
    const screen = document.getElementById('backend-screen-content');
    if (!screen) return;

    const t = (k) => window.i18n.t(k);
    const plat = this.currentPlatform;
    const isPkce = this.authMode === 'pkce_public';

    if (this.state.step === 'idle' || this.state.step === 'generating_pkce') {
      const getColorGradient = () => {
        switch (plat) {
          case 'nextjs': return 'from-[#3f3f46] to-[#18181b]';
          case 'node': return 'from-[#16a34a] to-[#15803d]';
          case 'python': return 'from-[#2563eb] to-[#1d4ed8]';
          case 'spring': return 'from-[#059669] to-[#047857]';
          case 'nimbus': return 'from-[#dc2626] to-[#991b1b]';
          case 'dotnet': return 'from-[#7c3aed] to-[#6d28d9]';
          case 'go': return 'from-[#0284c7] to-[#0369a1]';
          default: return 'from-indigo-500 to-purple-600';
        }
      };

      const getLanguageName = () => {
        switch (plat) {
          case 'nextjs': return 'Next.js';
          case 'node': return 'Node.js';
          case 'python': return 'Python';
          case 'spring': return 'Spring Boot';
          case 'nimbus': return 'Java';
          case 'dotnet': return 'C# / .NET';
          case 'go': return 'Go';
          default: return 'Backend';
        }
      };

      const getPackageName = () => {
        switch (plat) {
          case 'nextjs': return 'next-auth (Auth.js)';
          case 'node': return 'openid-client';
          case 'python': return 'Authlib';
          case 'spring': return 'spring-security-oauth2';
          case 'nimbus': return 'oauth2-oidc-sdk (NimbusDS)';
          case 'dotnet': return 'Microsoft.AspNetCore.Authentication.OpenIdConnect';
          case 'go': return 'github.com/coreos/go-oidc';
          default: return 'OIDC Server SDK';
        }
      };

      screen.innerHTML = `
        <div class="flex flex-col items-center justify-center flex-1 text-center px-2 py-4">
          
          <!-- 1. Circle of their logo colour -->
          <div class="w-16 h-16 rounded-full bg-gradient-to-br ${getColorGradient()} shadow-xl shadow-black/40 ring-4 ring-white/15 flex items-center justify-center mb-3 transform hover:scale-105 transition-transform">
            <span class="w-4 h-4 rounded-full bg-white/40 animate-ping"></span>
          </div>

          <!-- 2. Programming language -->
          <h2 class="text-base sm:text-lg font-bold text-white tracking-tight">${getLanguageName()}</h2>

          <!-- 3. SDK / Package -->
          <div class="mt-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[11px] font-mono text-sky-400 font-medium tracking-wide shadow-sm" dir="ltr">
            📦 ${getPackageName()}
          </div>

          <!-- 4. The Flow -->
          <div class="mt-3 flex items-center gap-1.5 text-xs text-slate-300 font-semibold bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800/80">
            <span class="w-2 h-2 rounded-full ${isPkce ? 'bg-emerald-400' : 'bg-indigo-400'} animate-pulse"></span>
            <span>${isPkce ? 'Code Flow with PKCE S256 (Public)' : 'Code Flow with Client Secret (Confidential)'}</span>
          </div>
          
          <!-- 5. Button (Sign In) -->
          <div class="w-full mt-8 space-y-2">
            <button id="backend-btn-login" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
              <span>Sign In</span>
            </button>
          </div>

        </div>
      `;
    } else if (this.state.step === 'authorizing') {
      screen.innerHTML = `
        <div class="bg-slate-900/90 border border-slate-700 rounded-xl p-4 flex flex-col justify-between flex-1 text-center">
          <div>
            <div class="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
            <h3 class="text-sm font-bold text-white">Authorize Server Sign-In</h3>
            <p class="text-[11px] text-slate-400 mt-1">Client: <strong class="text-sky-300 font-mono" dir="ltr">${this.getClientId()}</strong></p>
            
            <div class="mt-4 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[10px] text-left text-indigo-300 font-mono space-y-1" dir="ltr">
              <div>&bull; Client Type: <span class="text-emerald-400">${isPkce ? 'Public (PKCE S256)' : 'Confidential (Secret)'}</span></div>
              <div>&bull; PKCE S256: <span class="${isPkce ? 'text-emerald-400 font-bold' : 'text-slate-500'}">${isPkce ? 'Active (code_challenge)' : 'Disabled'}</span></div>
              <div>&bull; Client Secret: <span class="${isPkce ? 'text-slate-500' : 'text-emerald-400 font-bold'}">${isPkce ? 'None (Public)' : 'Protected in .env'}</span></div>
            </div>
          </div>

          <div class="space-y-2 mt-4">
            <button id="backend-btn-consent-approve" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all">
              ${t('mobileApproveBtn')}
            </button>
            <button id="backend-btn-consent-cancel" class="w-full py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">
              ${t('mobileDenyBtn')}
            </button>
          </div>
        </div>
      `;
    } else if (this.state.step === 'redirecting' || this.state.step === 'exchanging') {
      screen.innerHTML = `
        <div class="flex flex-col items-center justify-center flex-1 text-center">
          <div class="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <h3 class="text-sm font-bold text-white">${isPkce ? 'Verifying PKCE S256 Challenge...' : 'Backchannel Client Secret Exchange...'}</h3>
          <p class="text-[10px] text-slate-400 mt-1 font-mono break-all" dir="ltr">POST /mock-idp/token (Server-to-Server)</p>
        </div>
      `;
    } else if (this.state.step === 'logged_in') {
      const user = this.state.user || {};
      screen.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
              AM
            </div>
            <div class="flex-1 min-w-0 text-left">
              <div class="text-xs font-bold text-white truncate">${user.name}</div>
              <div class="text-[10px] text-slate-400 truncate" dir="ltr">${user.email}</div>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">SSR Session</span>
          </div>

          <!-- Session Cookie Details -->
          <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-[11px] font-mono text-left" dir="ltr">
            <div class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Server-Side Encrypted Session</div>
            <div class="flex justify-between text-slate-300">
              <span>HttpOnly Cookie:</span>
              <span class="text-emerald-400 truncate max-w-[140px]">${this.state.sessionCookie}</span>
            </div>
            <div class="flex justify-between text-slate-300">
              <span>Auth Mode:</span>
              <span class="${isPkce ? 'text-sky-400' : 'text-amber-400'}">${isPkce ? 'PKCE S256 (Public)' : 'Client Secret (Confidential)'}</span>
            </div>
            <div class="flex justify-between text-slate-300">
              <span>Backchannel RTR:</span>
              <span class="text-amber-400">${this.state.refreshCount} Renews</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-2 pt-2">
            <button id="backend-btn-refresh" class="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all flex items-center justify-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              <span>Server-Side Refresh Rotation (RTR)</span>
            </button>
            <button id="backend-btn-logout" class="w-full py-2 px-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-medium border border-rose-500/30 transition-all flex items-center justify-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              <span>Terminate Session & Revoke Tokens</span>
            </button>
          </div>
        </div>
      `;
    }
  },

  getCodeSnippet() {
    const isPkce = this.authMode === 'pkce_public';
    switch (this.currentPlatform) {
      case 'nextjs':
        return isPkce 
          ? `// Next.js 14 App Router (PKCE S256 Public Client)
import NextAuth from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: 'oidc-provider',
      name: 'OpenID Provider (PKCE)',
      type: 'oidc',
      issuer: 'http://localhost:3000/mock-idp',
      clientId: 'nextjs-pkce-client',
      clientSecret: null, // Public Client (No Secret)
      checks: ['pkce', 'state'] // Enforce PKCE S256
    }
  ],
  session: { strategy: 'jwt' }
});`
          : `// Next.js 14 App Router (Client Secret Confidential Client)
import NextAuth from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: 'oidc-provider',
      name: 'Corporate OpenID Provider',
      type: 'oidc',
      issuer: 'http://localhost:3000/mock-idp',
      clientId: process.env.AUTH_OIDC_ID,
      clientSecret: process.env.AUTH_OIDC_SECRET, // Protected Server Secret
      checks: ['state'] // Standard State Check
    }
  ],
  session: { strategy: 'jwt' }
});`;

      case 'node':
        return isPkce 
          ? `// Node.js openid-client (PKCE S256 Public Client)
import { Issuer, generators } from 'openid-client';

const opIssuer = await Issuer.discover('http://localhost:3000/mock-idp');
const client = new opIssuer.Client({
  client_id: 'node-pkce-client',
  redirect_uris: ['http://localhost:3000/auth/callback'],
  response_types: ['code'],
  token_endpoint_auth_method: 'none' // Public Client
});

// Generate PKCE S256
const code_verifier = generators.codeVerifier();
const code_challenge = generators.codeChallenge(code_verifier);
req.session.code_verifier = code_verifier;`
          : `// Node.js openid-client (Client Secret Confidential Client)
import { Issuer } from 'openid-client';

const opIssuer = await Issuer.discover('http://localhost:3000/mock-idp');
const client = new opIssuer.Client({
  client_id: 'node-backend-client',
  client_secret: process.env.OIDC_CLIENT_SECRET, // Protected Secret
  redirect_uris: ['http://localhost:3000/auth/callback'],
  response_types: ['code'],
  token_endpoint_auth_method: 'client_secret_post'
});`;

      case 'python':
        return isPkce 
          ? `# Python FastAPI / Authlib (PKCE S256 Public Client)
from authlib.integrations.starlette_client import OAuth

oauth = OAuth()
oauth.register(
    name='oidc',
    client_id='fastapi-pkce-client',
    client_secret=None, # Public Client
    server_metadata_url='http://localhost:3000/mock-idp/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid profile email',
        'code_challenge_method': 'S256' # Enforce PKCE S256
    }
)`
          : `# Python FastAPI / Authlib (Client Secret Confidential Client)
from authlib.integrations.starlette_client import OAuth

oauth = OAuth()
oauth.register(
    name='oidc',
    client_id='fastapi-authlib-client',
    client_secret=os.getenv('OIDC_CLIENT_SECRET'), # Protected Secret
    server_metadata_url='http://localhost:3000/mock-idp/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid profile email'
    }
)`;

      case 'spring':
        return isPkce 
          ? `// Java Spring Boot 3 / application.yml (PKCE S256 Public Client)
spring:
  security:
    oauth2:
      client:
        registration:
          oidc-hub:
            client-id: spring-boot-pkce-client
            client-authentication-method: none
            authorization-grant-type: authorization_code
            scope: openid, profile, email
        provider:
          oidc-hub:
            issuer-uri: http://localhost:3000/mock-idp`
          : `// Java Spring Boot 3 / application.yml (Client Secret Confidential Client)
spring:
  security:
    oauth2:
      client:
        registration:
          oidc-hub:
            client-id: spring-boot-client
            client-secret: \${OIDC_CLIENT_SECRET} # Protected Secret
            client-authentication-method: client_secret_basic
            authorization-grant-type: authorization_code
            scope: openid, profile, email
        provider:
          oidc-hub:
            issuer-uri: http://localhost:3000/mock-idp`;

      case 'nimbus':
        return isPkce 
          ? `// Java / Nimbus OAuth 2.0 SDK (PKCE S256 Public Client)
import com.nimbusds.oauth2.sdk.pkce.CodeVerifier;
import com.nimbusds.oauth2.sdk.pkce.CodeChallengeMethod;
import com.nimbusds.openid.connect.sdk.AuthenticationRequest;

// Generate 256-bit Code Verifier & S256 Challenge
CodeVerifier codeVerifier = new CodeVerifier();
AuthenticationRequest req = new AuthenticationRequest.Builder(
    new ResponseType("code"), scope, clientID, redirectURI)
    .endpointURI(opMetadata.getAuthorizationEndpointURI())
    .state(state)
    .nonce(nonce)
    .codeChallenge(codeVerifier, CodeChallengeMethod.S256)
    .build();`
          : `// Java / Nimbus OAuth 2.0 SDK (Client Secret Confidential Client)
import com.nimbusds.oauth2.sdk.auth.Secret;
import com.nimbusds.oauth2.sdk.auth.ClientSecretBasic;
import com.nimbusds.oauth2.sdk.TokenRequest;

ClientID clientID = new ClientID("nimbus-java-client");
Secret secret = new Secret(System.getenv("OIDC_CLIENT_SECRET"));
ClientSecretBasic clientAuth = new ClientSecretBasic(clientID, secret);

TokenRequest tokenReq = new TokenRequest(
    opMetadata.getTokenEndpointURI(),
    clientAuth,
    new AuthorizationCodeGrant(authCode, redirectURI));`;

      case 'dotnet':
        return isPkce 
          ? `// C# ASP.NET Core 8 Program.cs (PKCE S256 Public Client)
builder.Services.AddAuthentication(options => {
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options => {
    options.Authority = "http://localhost:3000/mock-idp";
    options.ClientId = "dotnet-pkce-client";
    options.ResponseType = "code";
    options.UsePkce = true; // Mandatory PKCE S256
});`
          : `// C# ASP.NET Core 8 Program.cs (Client Secret Confidential Client)
builder.Services.AddAuthentication(options => {
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options => {
    options.Authority = "http://localhost:3000/mock-idp";
    options.ClientId = "dotnet-core-client";
    options.ClientSecret = builder.Configuration["Oidc:Secret"]; // Secret
    options.ResponseType = "code";
    options.UsePkce = false;
});`;

      case 'go':
        return isPkce 
          ? `// Go / coreos/go-oidc (PKCE S256 Public Client)
provider, err := oidc.NewProvider(ctx, "http://localhost:3000/mock-idp")
oauth2Config := oauth2.Config{
    ClientID:     "go-gin-pkce-client",
    Endpoint:     provider.Endpoint(),
    RedirectURL:  "http://localhost:3000/auth/callback",
    Scopes:       []string{oidc.ScopeOpenID, "profile", "email"},
}

// Generate code_verifier & S256 challenge
verifier := oauth2.GenerateVerifier()
authURL := oauth2Config.AuthCodeURL(state, oauth2.S256ChallengeOption(verifier))`
          : `// Go / coreos/go-oidc (Client Secret Confidential Client)
provider, err := oidc.NewProvider(ctx, "http://localhost:3000/mock-idp")
oauth2Config := oauth2.Config{
    ClientID:     "go-gin-client",
    ClientSecret: os.Getenv("OIDC_CLIENT_SECRET"), // Secret
    Endpoint:     provider.Endpoint(),
    RedirectURL:  "http://localhost:3000/auth/callback",
    Scopes:       []string{oidc.ScopeOpenID, "profile", "email"},
}`;

      default:
        return '// Backend Code';
    }
  }
};
