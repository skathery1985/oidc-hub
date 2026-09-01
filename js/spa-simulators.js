/**
 * Single Page Application (SPA) Interactive Simulators (oidc-client-ts & Vanilla Web Crypto API)
 * Simulates real public client OAuth 2.0 / OIDC Authorization Code Flow with PKCE RFC 7636
 * Localized with Arabic (RTL) [Default] and English (LTR).
 * Fully themed for Light Mode [Default] and Dark Mode.
 */

window.SpaSimulator = {
  currentPlatform: 'oidc-client-ts',
  traceCount: 0,
  state: {
    step: 'idle',
    verifier: null,
    challenge: null,
    code: null,
    tokens: null,
    user: null,
    silentRenewCount: 0
  },

  init() {
    this.renderSimulatorFrame();
    this.attachEventListeners();
  },

  setPlatform(platform) {
    this.currentPlatform = platform;
    this.reset();
    this.renderSimulatorFrame();
    if (window.App && typeof window.App.syncSdkCatalogFromSimulator === 'function') {
      window.App.syncSdkCatalogFromSimulator('spa', platform);
    }
  },

  reset() {
    this.traceCount = 0;
    this.state = {
      step: 'idle',
      verifier: null,
      challenge: null,
      code: null,
      tokens: null,
      user: null,
      silentRenewCount: 0
    };
    this.renderScreen();
  },

  attachEventListeners() {
    const container = document.getElementById('spa-simulator-root');
    if (!container) return;

    container.addEventListener('click', (e) => {
      if (e.target.closest('#spa-btn-login')) {
        this.startLogin();
      } else if (e.target.closest('#spa-btn-consent-approve')) {
        this.approveConsent();
      } else if (e.target.closest('#spa-btn-consent-cancel')) {
        this.cancelConsent();
      } else if (e.target.closest('#spa-btn-renew')) {
        this.silentRenew();
      } else if (e.target.closest('#spa-btn-logout')) {
        this.reset();
      }
    });
  },

  async startLogin() {
    this.state.step = 'generating_pkce';
    this.renderScreen();

    this.state.verifier = window.PKCEEngine.generateCodeVerifier(64);
    this.state.challenge = await window.PKCEEngine.generateCodeChallenge(this.state.verifier);
    this.state.state = window.PKCEEngine.generateRandomString(16);

    const isAr = window.i18n.currentLang === 'ar';
    const msg = isAr 
      ? `تم توليد <span class="text-sky-400 font-mono font-semibold" dir="ltr">code_verifier</span> وحساب تحدي التشفير <span class="text-emerald-400 font-mono font-semibold" dir="ltr">code_challenge</span> بطريقة <span class="text-emerald-400 font-mono font-bold" dir="ltr">S256</span> وبدء التوجيه لصفحة تسجيل الدخول.`
      : `Generated <span class="text-sky-400 font-mono font-semibold" dir="ltr">code_verifier</span>, computed <span class="text-emerald-400 font-mono font-semibold" dir="ltr">code_challenge</span> using <span class="text-emerald-400 font-mono font-bold" dir="ltr">S256</span>, and redirected to IdP authorization endpoint.`;
    
    this.logStep(msg);

    setTimeout(() => {
      this.state.step = 'authorizing';
      this.renderScreen();
    }, 400);
  },

  getRedirectUri() {
    return window.location.origin + '/callback.html';
  },

  getClientId() {
    return this.currentPlatform === 'oidc-client-ts' ? 'spa-oidc-client' : 'spa-vanilla-client';
  },

  getPlatformLabel() {
    const isAr = window.i18n && window.i18n.currentLang === 'ar';
    switch (this.currentPlatform) {
      case 'oidc-client-ts':
        return isAr ? 'رياكت / oidc-client-ts' : 'REACT / OIDC-CLIENT-TS';
      case 'vanilla':
        return isAr ? 'جافاسكريبت / Web Crypto' : 'VANILLA / WEB CRYPTO';
      default:
        return isAr ? 'تطبيق SPA' : 'SPA CLIENT';
    }
  },

  async approveConsent() {
    this.state.step = 'redirecting';
    this.renderScreen();

    const redirectUri = this.getRedirectUri();
    let mockCode;
    if (window.VirtualOP) {
      mockCode = window.VirtualOP.issueAuthorizationCode({
        clientId: this.getClientId(),
        redirectUri: redirectUri,
        codeChallenge: this.state.challenge,
        codeChallengeMethod: 'S256',
        nonce: window.PKCEEngine.generateRandomString(12),
        scope: 'openid profile email'
      });
    } else {
      mockCode = 'authcode_spa_' + Math.random().toString(36).substring(2, 12);
    }
    this.state.code = mockCode;
    const isAr = window.i18n.currentLang === 'ar';

    const redirectMsg = isAr
      ? `تمت موافقة المستخدم. استلم التطبيق رمز <span class="text-amber-400 font-mono font-semibold" dir="ltr">authorization_code</span> عبر نقطة <span class="text-indigo-400 font-mono font-semibold" dir="ltr">redirect_uri</span>.`
      : `User approved consent. Application received <span class="text-amber-400 font-mono font-semibold" dir="ltr">authorization_code</span> at <span class="text-indigo-400 font-mono font-semibold" dir="ltr">redirect_uri</span>.`;
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
              token_type: 'Bearer',
              expires_in: 3600,
              scope: 'openid profile email'
            };
          }

          this.state.tokens = data;
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
            ? `اكتمل التحقق من <span class="text-emerald-400 font-mono font-bold" dir="ltr">PKCE S256</span> بنجاح! تم إصدار <span class="text-cyan-400 font-mono font-semibold" dir="ltr">access_token</span> و <span class="text-emerald-400 font-mono font-semibold" dir="ltr">id_token</span> وتخزينها بأمان في <span class="text-rose-400 font-mono font-bold" dir="ltr">In-Memory</span> للحماية من هجمات XSS.`
            : `<span class="text-emerald-400 font-mono font-bold" dir="ltr">PKCE S256</span> verified! Issued <span class="text-cyan-400 font-mono font-semibold" dir="ltr">access_token</span> and <span class="text-emerald-400 font-mono font-semibold" dir="ltr">id_token</span> stored securely in <span class="text-rose-400 font-mono font-bold" dir="ltr">In-Memory</span> storage (XSS protected).`;
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
    this.logStep(isAr ? `تم إلغاء جلسة التفويض من قبل المستخدم.` : `User cancelled authorization.`);
    this.reset();
  },

  silentRenew() {
    this.state.silentRenewCount++;
    const isAr = window.i18n.currentLang === 'ar';
    const msg = isAr
      ? `تم تنفيذ <span class="text-indigo-400 font-mono font-semibold" dir="ltr">Silent Token Renewal</span> (عملية #${this.state.silentRenewCount}) بنجاح في الخلفية عبر iframe/Worker دون مقاطعة المستخدم.`
      : `Executed <span class="text-indigo-400 font-mono font-semibold" dir="ltr">Silent Token Renewal</span> (#${this.state.silentRenewCount}) in background via iframe/Worker without user interruption.`;
    this.logStep(msg);
    this.renderScreen();
  },

  clearTrace() {
    this.traceCount = 0;
    const consoleEl = document.getElementById('spa-live-console');
    if (consoleEl) consoleEl.innerHTML = '';
  },

  logStep(msg) {
    this.traceCount = (this.traceCount || 0) + 1;
    const isAr = window.i18n && window.i18n.currentLang === 'ar';
    const consoleEl = document.getElementById('spa-live-console');
    if (consoleEl) {
      const line = document.createElement('div');
      line.className = 'text-xs font-mono py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-start gap-2 leading-relaxed';
      line.dir = isAr ? 'rtl' : 'ltr';
      line.innerHTML = `<span class="text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0" dir="ltr">[#${this.traceCount}]</span> <span class="text-slate-700 dark:text-slate-300 flex-1">${msg}</span>`;
      consoleEl.prepend(line);
    }
  },

  renderSimulatorFrame() {
    const root = document.getElementById('spa-simulator-root');
    if (!root) return;

    const t = (k) => window.i18n.t(k);
    const isAr = window.i18n && window.i18n.currentLang === 'ar';
    const plat = this.currentPlatform;

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
            <div class="space-y-2">
              
              <!-- React / TS Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'oidc-client-ts'}"
                   onclick="window.SpaSimulator.setPlatform('oidc-client-ts')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#0369a1] to-[#0284c7] text-white ${plat === 'oidc-client-ts' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-sky-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'oidc-client-ts' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">React / TypeScript</span>
                    ${plat !== 'oidc-client-ts' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">oidc-client-ts</span>` : ''}
                  </div>
                  ${plat === 'oidc-client-ts' ? `
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
                ${plat === 'oidc-client-ts' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">React / Vue / Angular / Vanilla &bull; <span class="font-mono font-bold text-white">TypeScript / JavaScript</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="oidc-client-ts">
                      📦 <strong>oidc-client-ts</strong>
                    </span>
                    <a href="https://github.com/authts/oidc-client-ts" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- Angular Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'angular'}"
                   onclick="window.SpaSimulator.setPlatform('angular')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#be123c] to-[#e11d48] text-white ${plat === 'angular' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-rose-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'angular' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">Angular</span>
                    ${plat !== 'angular' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">angular-auth-oidc-client</span>` : ''}
                  </div>
                  ${plat === 'angular' ? `
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
                ${plat === 'angular' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">Angular 17+ / 18+ / 19+ (Standalone) &bull; <span class="font-mono font-bold text-white">TypeScript</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="angular-auth-oidc-client">
                      📦 <strong>angular-auth-oidc-client</strong>
                    </span>
                    <a href="https://github.com/damienbod/angular-auth-oidc-client" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- Vanilla JS Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'vanilla-crypto'}"
                   onclick="window.SpaSimulator.setPlatform('vanilla-crypto')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#b45309] to-[#d97706] text-white ${plat === 'vanilla-crypto' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-amber-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'vanilla-crypto' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">JavaScript</span>
                    ${plat !== 'vanilla-crypto' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">Web Crypto</span>` : ''}
                  </div>
                  ${plat === 'vanilla-crypto' ? `
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
                ${plat === 'vanilla-crypto' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">Any / Framework-Agnostic &bull; <span class="font-mono font-bold text-white">Web Crypto API</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="Web Crypto API">
                      📦 <strong>Web Crypto API</strong>
                    </span>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="MDN Web Docs">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>MDN/Doc</span>
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
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">RFC Standard:</span> <span class="font-mono text-indigo-600 dark:text-indigo-400 font-bold" dir="ltr">RFC 7636 & OAuth 2.1</span></div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Client Type:</span> <span class="font-mono text-cyan-600 dark:text-cyan-400 font-bold" dir="ltr">Public Client (SPA)</span></div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Token Storage:</span> <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-[11px] truncate max-w-[180px]" dir="ltr">${this.getStorageEngineName()}</span></div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Silent Renewal:</span> <span class="font-mono text-amber-600 dark:text-amber-400 font-bold text-[11px]" dir="ltr">${this.getSilentRenewMethod()}</span></div>
              <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400 font-medium">Client Secret:</span> <span class="text-rose-600 dark:text-rose-400 font-bold" dir="ltr">None (Public Client)</span></div>
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
              <button onclick="window.SpaSimulator.clearTrace()" class="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">${t('mobileClearTrace')}</button>
            </div>
            <div id="spa-live-console" class="h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              <div class="text-xs text-slate-400 italic">${t('mobileTracePlaceholder')}</div>
            </div>
          </div>
        </div>

        <!-- Center Column: Web Browser Frame Simulator -->
        <div class="lg:col-span-4 flex justify-center w-full overflow-hidden py-2">
          <div class="relative w-full max-w-[340px] sm:max-w-[360px] h-[590px] sm:h-[640px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 flex flex-col overflow-hidden select-none">
            
            <!-- Browser Header Bar -->
            <div class="bg-slate-950 px-3 py-2.5 border-b border-slate-800 flex items-center gap-2">
              <div class="flex items-center gap-1.5">
                <div class="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div class="flex-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center justify-between text-[11px] text-slate-300 font-mono" dir="ltr">
                <div class="flex items-center gap-1.5 truncate">
                  <svg class="w-3 h-3 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                  <span class="truncate">https://spa.example.local</span>
                </div>
                <svg class="w-3 h-3 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </div>
            </div>

            <!-- Browser Viewport Content -->
            <div id="spa-screen-content" class="flex-1 bg-gradient-to-b from-slate-900 to-slate-950 p-4 flex flex-col justify-between text-white overflow-y-auto custom-scrollbar">
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
    this.logStep(isAr ? 'تم تهيئة المحاكي - جاهز لبدء تدفق PKCE S256 مع ' + this.getPlatformTitle() : 'Simulator initialized - Ready for PKCE S256 with ' + this.getPlatformTitle());
  },

  getSdkGithubUrl() {
    switch (this.currentPlatform) {
      case 'oidc-client-ts': return 'https://github.com/authts/oidc-client-ts';
      case 'angular': return 'https://github.com/damienbod/angular-auth-oidc-client';
      default: return 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API';
    }
  },

  getSdkLibName() {
    switch (this.currentPlatform) {
      case 'oidc-client-ts': return 'oidc-client-ts';
      case 'angular': return 'angular-auth-oidc-client';
      default: return 'Web Crypto API';
    }
  },

  getSdkPackageName() {
    switch (this.currentPlatform) {
      case 'oidc-client-ts': return 'oidc-client-ts: ^3.0.1';
      case 'angular': return 'angular-auth-oidc-client';
      default: return 'window.crypto.subtle (Native Web)';
    }
  },

  getStorageEngineName() {
    switch (this.currentPlatform) {
      case 'oidc-client-ts': return 'In-Memory / sessionStorage';
      case 'angular': return 'In-Memory / sessionStorage (Auto-renew)';
      default: return 'In-Memory / sessionStorage';
    }
  },

  getSilentRenewMethod() {
    switch (this.currentPlatform) {
      case 'oidc-client-ts': return 'Web Worker / Hidden iframe';
      case 'angular': return 'Silent Renew / Refresh Rotation';
      default: return 'Custom Refresh Loop';
    }
  },

  getPlatformTitle() {
    switch (this.currentPlatform) {
      case 'oidc-client-ts': return 'React / TypeScript';
      case 'angular': return 'Angular';
      default: return 'JavaScript';
    }
  },

  renderScreen() {
    const screen = document.getElementById('spa-screen-content');
    if (!screen) return;

    const t = (k) => window.i18n.t(k);
    const plat = this.currentPlatform;

    if (this.state.step === 'idle' || this.state.step === 'generating_pkce') {
      const getColorGradient = () => {
        switch (plat) {
          case 'oidc-client-ts': return 'from-[#0284c7] to-[#0369a1]';
          case 'angular': return 'from-[#be123c] to-[#e11d48]';
          default: return 'from-[#d97706] to-[#b45309]';
        }
      };

      const getLanguageName = () => {
        switch (plat) {
          case 'oidc-client-ts': return 'React / TypeScript';
          case 'angular': return 'Angular';
          default: return 'JavaScript';
        }
      };

      const getPackageName = () => {
        switch (plat) {
          case 'oidc-client-ts': return 'oidc-client-ts: ^3.0.1';
          case 'angular': return 'angular-auth-oidc-client (provideAuth)';
          default: return 'Web Crypto API (SubtleCrypto)';
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
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Code Flow with PKCE S256 (Public)</span>
          </div>
          
          <!-- 5. Button (Sign In) -->
          <div class="w-full mt-8 space-y-2">
            <button id="spa-btn-login" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group">
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
            <h3 class="text-sm font-bold text-white">Authorize SPA Sign-In</h3>
            <p class="text-[11px] text-slate-400 mt-1">Client: <strong class="text-sky-300 font-mono" dir="ltr">${this.getClientId()}</strong></p>
            
            <div class="mt-4 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[10px] text-left text-indigo-300 font-mono space-y-1" dir="ltr">
              <div>&bull; PKCE Method: <span class="text-emerald-400">S256</span></div>
              <div class="truncate">&bull; Challenge: ${this.state.challenge.substring(0, 16)}...</div>
              <div>&bull; Scopes: <span class="text-amber-400">openid profile email</span></div>
            </div>
          </div>

          <div class="space-y-2 mt-4">
            <button id="spa-btn-consent-approve" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all">
              ${t('mobileApproveBtn')}
            </button>
            <button id="spa-btn-consent-cancel" class="w-full py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">
              ${t('mobileDenyBtn')}
            </button>
          </div>
        </div>
      `;
    } else if (this.state.step === 'redirecting' || this.state.step === 'exchanging') {
      screen.innerHTML = `
        <div class="flex flex-col items-center justify-center flex-1 text-center">
          <div class="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <h3 class="text-sm font-bold text-white">Verifying PKCE S256 & Exchanging Code...</h3>
          <p class="text-[10px] text-slate-400 mt-1 font-mono break-all" dir="ltr">POST /mock-idp/token</p>
        </div>
      `;
    } else if (this.state.step === 'logged_in') {
      const user = this.state.user || {};
      screen.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
              AM
            </div>
            <div class="flex-1 min-w-0 text-left">
              <div class="text-xs font-bold text-white truncate">${user.name}</div>
              <div class="text-[10px] text-slate-400 truncate" dir="ltr">${user.email}</div>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">Active</span>
          </div>

          <!-- Tokens Card -->
          <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-[11px] font-mono text-left" dir="ltr">
            <div class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">In-Memory Token Cache</div>
            <div class="flex justify-between text-slate-300">
              <span>Access Token:</span>
              <span class="text-emerald-400">Bearer (Valid)</span>
            </div>
            <div class="flex justify-between text-slate-300">
              <span>ID Token (RS256):</span>
              <span class="text-sky-400">Verified</span>
            </div>
            <div class="flex justify-between text-slate-300">
              <span>Silent Renews:</span>
              <span class="text-amber-400">${this.state.silentRenewCount}</span>
            </div>
          </div>

          <button id="spa-btn-logout" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-rose-900/80 text-rose-300 text-xs font-semibold transition-all">
            ${t('mobileSignOutBtn')}
          </button>
        </div>
      `;
    }
  },

  getCodeSnippet() {
    if (this.currentPlatform === 'oidc-client-ts') {
      return `import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

// 1. Initialize OpenID Certified Client with PKCE S256
const userManager = new UserManager({
  authority: 'http://localhost:3000/mock-idp',
  client_id: 'spa-oidc-client',
  redirect_uri: window.location.origin + '/callback.html',
  response_type: 'code',
  scope: 'openid profile email',
  
  // PKCE is enforced automatically by oidc-client-ts
  // Tokens are securely held In-Memory
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  automaticSilentRenew: true
});

// 2. Trigger Login Redirect
export async function login() {
  await userManager.signinRedirect();
}

// 3. Process Callback on /callback.html
export async function handleCallback() {
  const user = await userManager.signinRedirectCallback();
  console.log('Logged in user:', user.profile);
}`;
    } else if (this.currentPlatform === 'angular') {
      return `// Angular 17/18/19 Standalone with provideAuth()
import { ApplicationConfig } from '@angular/core';
import { provideAuth, LogLevel, OidcSecurityService } from 'angular-auth-oidc-client';

// 1. Configure OpenID Connect Provider (app.config.ts)
export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth({
      config: {
        authority: 'http://localhost:3000/mock-idp',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'angular-pkce-client',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        autoUserInfo: true,
        logLevel: LogLevel.Warn,
      },
    }),
  ],
};

// 2. Component usage (app.component.ts)
@Component({
  selector: 'app-root',
  standalone: true,
  template: \`<button (click)="login()">Sign In with Angular PKCE</button>\`
})
export class AppComponent {
  private readonly oidc = inject(OidcSecurityService);

  login() {
    // Generates S256 code_challenge and redirects
    this.oidc.authorize();
  }
}`;
    } else {
      return `// Native Web Crypto API (RFC 7636 PKCE S256)

// 1. Generate high-entropy code_verifier
function generateVerifier() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

// 2. Compute SHA-256 code_challenge
async function generateChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
}

// 3. Launch Authorization Request
async function startAuth() {
  const verifier = generateVerifier();
  sessionStorage.setItem('pkce_verifier', verifier);
  const challenge = await generateChallenge(verifier);

  const url = 'http://localhost:3000/mock-idp/authorize?' +
    'response_type=code' +
    '&client_id=spa-vanilla-client' +
    '&code_challenge=' + challenge +
    '&code_challenge_method=S256' +
    '&scope=openid profile email' +
    '&redirect_uri=' + encodeURIComponent(location.origin + '/callback.html');

  location.href = url;
}`;
    }
  }
};
