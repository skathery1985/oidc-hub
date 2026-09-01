/**
 * Mobile AppAuth Interactive Simulators (iOS Swift, Android Kotlin, Flutter Dart & React Native)
 * Simulates real native OAuth 2.0 / OIDC Authorization Code Flow with PKCE RFC 8252
 * Localized with Arabic (RTL) [Default] and English (LTR).
 * Fully themed for Light Mode [Default] and Dark Mode.
 */

window.MobileSimulator = {
  currentPlatform: 'flutter',
  traceCount: 0,
  state: {
    step: 'idle',
    verifier: null,
    challenge: null,
    code: null,
    tokens: null,
    user: null
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
      window.App.syncSdkCatalogFromSimulator('mobile', platform);
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
      user: null
    };
    this.renderPhoneScreen();
  },

  attachEventListeners() {
    const container = document.getElementById('mobile-simulator-root');
    if (!container) return;

    container.addEventListener('click', (e) => {
      if (e.target.closest('#mobile-btn-login')) {
        this.startLogin();
      } else if (e.target.closest('#mobile-btn-consent-approve')) {
        this.approveConsent();
      } else if (e.target.closest('#mobile-btn-consent-cancel')) {
        this.cancelConsent();
      } else if (e.target.closest('#mobile-btn-logout')) {
        this.reset();
      }
    });
  },

  async startLogin() {
    this.state.step = 'generating_pkce';
    this.renderPhoneScreen();

    this.state.verifier = window.PKCEEngine.generateCodeVerifier(64);
    this.state.challenge = await window.PKCEEngine.generateCodeChallenge(this.state.verifier);
    this.state.state = window.PKCEEngine.generateRandomString(16);

    const isAr = window.i18n.currentLang === 'ar';
    const msg = isAr 
      ? `تم توليد <span class="text-sky-400 font-mono font-semibold" dir="ltr">code_verifier</span> وحساب تحدي التشفير <span class="text-emerald-400 font-mono font-semibold" dir="ltr">code_challenge</span> بطريقة <span class="text-emerald-400 font-mono font-bold" dir="ltr">S256</span> وفتح متصفح النظام الآمن.`
      : `Generated <span class="text-sky-400 font-mono font-semibold" dir="ltr">code_verifier</span>, computed <span class="text-emerald-400 font-mono font-semibold" dir="ltr">code_challenge</span> using <span class="text-emerald-400 font-mono font-bold" dir="ltr">S256</span>, and opened secure system browser.`;
    
    this.logStep(msg);

    setTimeout(() => {
      this.state.step = 'browser_open';
      this.renderPhoneScreen();
    }, 400);
  },

  getRedirectScheme() {
    switch (this.currentPlatform) {
      case 'flutter':
        return 'com.example.flutterapp://oauthredirect';
      case 'ios':
        return 'com.example.pkceapp:/oauth2callback';
      case 'android':
        return 'com.example.pkceapp://oauth2callback';
      case 'react-native':
        return 'com.example.rnapp://oauthredirect';
      default:
        return 'com.example.app://oauthredirect';
    }
  },

  getClientId() {
    switch (this.currentPlatform) {
      case 'flutter':
        return 'flutter-mobile-client';
      case 'ios':
        return 'ios-mobile-app';
      case 'android':
        return 'android-mobile-app';
      case 'react-native':
        return 'react-native-client';
      default:
        return 'mobile-app';
    }
  },

  getPlatformLabel() {
    const isAr = window.i18n && window.i18n.currentLang === 'ar';
    switch (this.currentPlatform) {
      case 'flutter':
        return isAr ? 'فلاتر / دارت' : 'FLUTTER / DART';
      case 'ios':
        return isAr ? 'آي أو إس / سويفت' : 'IOS / SWIFT';
      case 'android':
        return isAr ? 'أندرويد / كوتلن' : 'ANDROID / KOTLIN';
      case 'react-native':
        return isAr ? 'رياكت نيتف' : 'REACT NATIVE';
      default:
        return isAr ? 'تطبيق هاتف' : 'MOBILE';
    }
  },

  async approveConsent() {
    this.state.step = 'redirecting';
    this.renderPhoneScreen();

    const redirectScheme = this.getRedirectScheme();
    let mockCode;
    if (window.VirtualOP) {
      mockCode = window.VirtualOP.issueAuthorizationCode({
        clientId: this.getClientId(),
        redirectUri: redirectScheme,
        codeChallenge: this.state.challenge,
        codeChallengeMethod: 'S256',
        nonce: window.PKCEEngine.generateRandomString(12),
        scope: 'openid profile email'
      });
    } else {
      mockCode = 'authcode_mob_' + Math.random().toString(36).substring(2, 12);
    }
    this.state.code = mockCode;
    const isAr = window.i18n.currentLang === 'ar';

    const redirectMsg = isAr
      ? `تمت موافقة المستخدم. متصفح النظام يعيد توجيه الاستجابة مع <span class="text-amber-400 font-mono font-semibold" dir="ltr">authorization_code</span> إلى التطبيق عبر <span class="text-purple-400 font-mono font-semibold" dir="ltr">Deep Link</span>.`
      : `User consented. Secure system browser redirects back to the app with <span class="text-amber-400 font-mono font-semibold" dir="ltr">authorization_code</span> via <span class="text-purple-400 font-mono font-semibold" dir="ltr">Deep Link</span>.`;
    this.logStep(redirectMsg);

    setTimeout(async () => {
      this.state.step = 'exchanging';
      this.renderPhoneScreen();

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
              id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfbW9ja18wMDEiLCJuYW1lIjoiQWxleCBNb3JnYW4iLCJlbWFpbCI6ImFsZXgubW9yZ2FuQGNvcnAuZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJtb2JpbGVfdXNlciIsImFkbWluIl19.sig',
              refresh_token: 'rt_' + window.PKCEEngine.generateRandomString(32),
              token_type: 'Bearer',
              expires_in: 3600,
              scope: 'openid profile email'
            };
          }
          
          let idTokenDecoded = null;
          if (data.id_token) {
            idTokenDecoded = window.PKCEEngine.decodeJwt(data.id_token);
          }

          this.state.tokens = data;
          this.state.user = idTokenDecoded ? idTokenDecoded.payload : {
            name: 'Alex Morgan',
            email: 'alex.morgan@corp.example.com',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            roles: ['mobile_user', 'admin']
          };

          const storageType = this.currentPlatform === 'flutter' 
            ? 'FlutterSecureStorage'
            : this.currentPlatform === 'ios'
            ? 'iOS Keychain'
            : this.currentPlatform === 'android'
            ? 'Android KeyStore'
            : 'Keychain';

          const successMsg = isAr
            ? `اكتمل تبادل <span class="text-amber-400 font-mono font-semibold" dir="ltr">authorization_code</span> بنجاح! تم استلام <span class="text-cyan-400 font-mono font-semibold" dir="ltr">access_token</span> و <span class="text-emerald-400 font-mono font-semibold" dir="ltr">id_token</span> و <span class="text-amber-400 font-mono font-semibold" dir="ltr">refresh_token</span> وتخزينها مشفرة في <span class="text-sky-300 font-mono font-semibold" dir="ltr">${storageType}</span>.`
            : `Successfully exchanged <span class="text-amber-400 font-mono font-semibold" dir="ltr">authorization_code</span>! Received <span class="text-cyan-400 font-mono font-semibold" dir="ltr">access_token</span>, <span class="text-emerald-400 font-mono font-semibold" dir="ltr">id_token</span>, and <span class="text-amber-400 font-mono font-semibold" dir="ltr">refresh_token</span> encrypted in <span class="text-sky-300 font-mono font-semibold" dir="ltr">${storageType}</span>.`;
          this.logStep(successMsg);

          this.state.step = 'logged_in';
          this.renderPhoneScreen();
        } catch (err) {
          console.error(err);
          this.state.step = 'logged_in';
          this.renderPhoneScreen();
        }
      }, 400);
    }, 300);
  },

  cancelConsent() {
    const isAr = window.i18n.currentLang === 'ar';
    this.logStep(isAr ? `تم إلغاء جلسة تسجيل الدخول من قبل المستخدم.` : `User cancelled login session.`);
    this.reset();
  },

  clearTrace() {
    this.traceCount = 0;
    const consoleEl = document.getElementById('mobile-live-console');
    if (consoleEl) consoleEl.innerHTML = '';
  },

  logStep(msg) {
    this.traceCount = (this.traceCount || 0) + 1;
    const isAr = window.i18n && window.i18n.currentLang === 'ar';
    const consoleEl = document.getElementById('mobile-live-console');
    if (consoleEl) {
      const line = document.createElement('div');
      line.className = 'text-xs font-mono py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-start gap-2 leading-relaxed';
      line.dir = isAr ? 'rtl' : 'ltr';
      line.innerHTML = `<span class="text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0" dir="ltr">[#${this.traceCount}]</span> <span class="text-slate-700 dark:text-slate-300 flex-1">${msg}</span>`;
      consoleEl.prepend(line);
    }
  },

  renderSimulatorFrame() {
    const root = document.getElementById('mobile-simulator-root');
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
              
              <!-- Flutter Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'flutter'}"
                   onclick="window.MobileSimulator.setPlatform('flutter')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#0c4a6e] to-[#0284c7] text-white ${plat === 'flutter' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-sky-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'flutter' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">Flutter</span>
                    ${plat !== 'flutter' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">flutter_appauth</span>` : ''}
                  </div>
                  ${plat === 'flutter' ? `
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
                ${plat === 'flutter' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">Flutter (iOS / Android / macOS / Windows) &bull; <span class="font-mono font-bold text-white">Dart</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="flutter_appauth">
                      📦 <strong>flutter_appauth</strong>
                    </span>
                    <a href="https://github.com/MaikuB/flutter_appauth" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- iOS Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'ios'}"
                   onclick="window.MobileSimulator.setPlatform('ios')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#9a3412] to-[#ea580c] text-white ${plat === 'ios' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-orange-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'ios' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">iOS (Swift)</span>
                    ${plat !== 'ios' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">AppAuth-iOS</span>` : ''}
                  </div>
                  ${plat === 'ios' ? `
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
                ${plat === 'ios' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">iOS / iPadOS / macOS &bull; <span class="font-mono font-bold text-white">Swift 5.9+ / SwiftUI</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="AppAuth-iOS">
                      📦 <strong>AppAuth-iOS</strong>
                    </span>
                    <a href="https://github.com/openid/AppAuth-iOS" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- Android Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'android'}"
                   onclick="window.MobileSimulator.setPlatform('android')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#064e3b] to-[#10b981] text-white ${plat === 'android' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-emerald-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'android' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">Android (Kotlin)</span>
                    ${plat !== 'android' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">AppAuth-Android</span>` : ''}
                  </div>
                  ${plat === 'android' ? `
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
                ${plat === 'android' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">Android SDK / Jetpack Compose &bull; <span class="font-mono font-bold text-white">Kotlin / Java</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="AppAuth-Android">
                      📦 <strong>AppAuth-Android</strong>
                    </span>
                    <a href="https://github.com/openid/AppAuth-Android" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
                      <svg class="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>GitHub</span>
                      <svg class="w-2 h-2 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                ` : ''}
              </div>

              <!-- React Native Option Card -->
              <div role="button" tabindex="0" aria-pressed="${plat === 'react-native'}"
                   onclick="window.MobileSimulator.setPlatform('react-native')" 
                   onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); this.click();}"
                   class="group relative rounded-xl cursor-pointer select-none transition-all duration-200 bg-gradient-to-r from-[#1e1b4b] to-[#3b82f6] text-white ${plat === 'react-native' ? 'p-3.5 ring-2 ring-white/80 shadow-lg shadow-blue-950/30 scale-[1.01] border border-white/50' : 'p-2.5 opacity-75 hover:opacity-100 hover:scale-[1.01] hover:-translate-y-0.5 shadow-sm hover:shadow border border-white/15 active:scale-[0.99]'}">
                <div class="flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="font-extrabold ${plat === 'react-native' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-white truncate tracking-wide drop-shadow-sm">React Native</span>
                    ${plat !== 'react-native' ? `<span class="text-[10px] font-mono text-white/70 bg-black/25 px-1.5 py-0.5 rounded border border-white/10 truncate hidden sm:inline" dir="ltr">react-native-app-auth</span>` : ''}
                  </div>
                  ${plat === 'react-native' ? `
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
                ${plat === 'react-native' ? `
                  <div class="text-[11px] text-white/90 mt-1 truncate font-medium" dir="ltr">React Native / Expo &bull; <span class="font-mono font-bold text-white">JavaScript / TypeScript</span></div>
                  <div class="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between gap-1.5" dir="ltr">
                    <span class="text-[10px] font-mono text-white truncate max-w-[130px] bg-black/30 px-1.5 py-0.5 rounded border border-white/20" title="react-native-app-auth">
                      📦 <strong>react-native-app-auth</strong>
                    </span>
                    <a href="https://github.com/FormidableLabs/react-native-app-auth" target="_blank" onclick="event.stopPropagation()" class="px-2 py-0.5 bg-white text-slate-900 hover:bg-slate-100 active:scale-95 text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all hover:scale-105 flex-shrink-0" title="GitHub Repository">
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
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">RFC Standard:</span> <span class="font-mono text-indigo-600 dark:text-indigo-400 font-bold" dir="ltr">RFC 8252 & RFC 7636</span></div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Browser Agent:</span> <span class="font-mono text-cyan-600 dark:text-cyan-400 font-bold" dir="ltr">${this.getBrowserAgentName()}</span></div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Deep Link:</span> <span class="font-mono text-amber-600 dark:text-amber-400 font-bold text-[11px] truncate max-w-[180px]" dir="ltr">${this.getRedirectScheme()}</span></div>
              <div class="flex justify-between pb-1.5 border-b border-slate-200/80 dark:border-slate-800/80"><span class="text-slate-500 dark:text-slate-400 font-medium">Secure Storage:</span> <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-[11px] truncate max-w-[180px]" dir="ltr">${this.getStorageEngineName()}</span></div>
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
              <button onclick="window.MobileSimulator.clearTrace()" class="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">${t('mobileClearTrace')}</button>
            </div>
            <div id="mobile-live-console" class="h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              <div class="text-xs text-slate-400 italic">${t('mobileTracePlaceholder')}</div>
            </div>
          </div>
        </div>

        <!-- Center Column: Photorealistic Smartphone Frame Simulator -->
        <div class="lg:col-span-4 flex justify-center w-full overflow-hidden py-2">
          <div class="relative w-full max-w-[310px] sm:max-w-[320px] h-[590px] sm:h-[640px] bg-slate-900 rounded-[44px] sm:rounded-[48px] p-3 sm:p-3.5 shadow-2xl border-4 sm:border-[5px] border-slate-700/90 shadow-indigo-950/60 ring-2 ring-slate-800/80 select-none">
            
            <!-- Hardware Side Buttons: Left (Volume Up & Down) -->
            <div class="hidden sm:block absolute -left-[8px] top-24 w-[3px] h-9 bg-slate-600 rounded-l-md border-l border-slate-500"></div>
            <div class="hidden sm:block absolute -left-[8px] top-36 w-[3px] h-9 bg-slate-600 rounded-l-md border-l border-slate-500"></div>
            
            <!-- Hardware Side Button: Right (Power / Sleep Button) -->
            <div class="hidden sm:block absolute -right-[8px] top-28 w-[3px] h-14 bg-slate-600 rounded-r-md border-r border-slate-500"></div>

            <!-- Dynamic Island / Speaker Notch -->
            <div class="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-5 sm:h-6 bg-black rounded-full z-30 flex items-center justify-between px-2.5 shadow-md">
              <div class="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                <div class="w-1 h-1 rounded-full bg-indigo-900"></div>
              </div>
              <div class="w-2 h-2 rounded-full bg-slate-900 border border-slate-800"></div>
            </div>

            <!-- Realistic Status Bar: Time & Connectivity Icons -->
            <div class="absolute top-5 sm:top-6 left-6 sm:left-7 text-[10px] font-bold text-white font-mono z-30">9:41</div>
            <div class="absolute top-5 sm:top-6 right-6 sm:right-7 flex items-center gap-1.5 text-[10px] text-white z-30">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zm-2.829 2.828a3 3 0 00-4.242 0 1 1 0 01-1.415-1.414 5 5 0 017.072 0 1 1 0 01-1.415 1.414zM10 16a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>
              <div class="w-4 h-2 rounded-sm border border-white p-0.5 flex items-center">
                <div class="w-full h-full bg-emerald-400 rounded-2xs"></div>
              </div>
            </div>

            <!-- Phone Screen Content with Glass Reflection -->
            <div id="mobile-screen-content" class="w-full h-full bg-gradient-to-b from-slate-900 to-slate-950 rounded-[32px] sm:rounded-[36px] overflow-hidden relative flex flex-col justify-between pt-12 sm:pt-14 pb-4 sm:pb-5 px-3 sm:px-4 text-white">
              <!-- Rendered dynamically -->
            </div>

            <!-- Glass Sheen Overlay -->
            <div class="pointer-events-none absolute inset-3 sm:inset-3.5 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] rounded-[32px] sm:rounded-[36px]"></div>

            <!-- Home indicator bar -->
            <div class="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-1 bg-slate-500 rounded-full z-30"></div>
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

    this.renderPhoneScreen();
    this.logStep(isAr ? 'تم تهيئة محاكي الهاتف - جاهز لبدء تدفق AppAuth مع ' + this.getPlatformTitle() : 'Phone Simulator initialized - Ready for AppAuth flow with ' + this.getPlatformTitle());
  },

  getSdkGithubUrl() {
    switch (this.currentPlatform) {
      case 'flutter':
        return 'https://github.com/MaikuB/flutter_appauth';
      case 'ios':
        return 'https://github.com/openid/AppAuth-iOS';
      case 'android':
        return 'https://github.com/openid/AppAuth-Android';
      case 'react-native':
        return 'https://github.com/FormidableLabs/react-native-app-auth';
      default:
        return 'https://github.com/openid';
    }
  },

  getSdkLibName() {
    switch (this.currentPlatform) {
      case 'flutter':
        return 'flutter_appauth';
      case 'ios':
        return 'AppAuth-iOS';
      case 'android':
        return 'AppAuth-Android';
      case 'react-native':
        return 'react-native-app-auth';
      default:
        return 'AppAuth';
    }
  },

  getSdkPackageName() {
    switch (this.currentPlatform) {
      case 'flutter':
        return 'flutter_appauth: ^6.0.7';
      case 'ios':
        return 'AppAuth-iOS (SPM / CocoaPods)';
      case 'android':
        return 'net.openid:appauth:0.11.1';
      case 'react-native':
        return 'react-native-app-auth';
      default:
        return 'AppAuth';
    }
  },

  getBrowserAgentName() {
    switch (this.currentPlatform) {
      case 'flutter':
        return 'ASWebAuth (iOS) & Custom Tabs (Android)';
      case 'ios':
        return 'ASWebAuthenticationSession';
      case 'android':
        return 'Chrome Custom Tabs';
      case 'react-native':
        return 'Native ASWebAuth / Custom Tabs Bridge';
      default:
        return 'System Browser';
    }
  },

  getStorageEngineName() {
    switch (this.currentPlatform) {
      case 'flutter':
        return 'FlutterSecureStorage (AES/Keychain)';
      case 'ios':
        return 'iOS Secure Keychain';
      case 'android':
        return 'EncryptedSharedPreferences (KeyStore)';
      case 'react-native':
        return 'react-native-keychain';
      default:
        return 'Secure Storage';
    }
  },

  getPlatformTitle() {
    switch (this.currentPlatform) {
      case 'flutter':
        return 'Flutter';
      case 'ios':
        return 'iOS (Swift)';
      case 'android':
        return 'Android (Kotlin)';
      case 'react-native':
        return 'React Native';
      default:
        return 'Mobile Code';
    }
  },

  renderPhoneScreen() {
    const screen = document.getElementById('mobile-screen-content');
    if (!screen) return;

    const t = (k) => window.i18n.t(k);
    const plat = this.currentPlatform;
    const isFlutter = plat === 'flutter';

    if (this.state.step === 'idle' || this.state.step === 'generating_pkce') {
      const getColorGradient = () => {
        switch (plat) {
          case 'flutter': return 'from-[#0284c7] to-[#0369a1]';
          case 'ios': return 'from-[#ea580c] to-[#c2410c]';
          case 'android': return 'from-[#10b981] to-[#047857]';
          case 'react-native': return 'from-[#3b82f6] to-[#1d4ed8]';
          default: return 'from-indigo-500 to-purple-600';
        }
      };

      const getLanguageName = () => {
        switch (plat) {
          case 'flutter': return 'Flutter';
          case 'ios': return 'iOS (Swift)';
          case 'android': return 'Android (Kotlin)';
          case 'react-native': return 'React Native';
          default: return 'Mobile';
        }
      };

      const getPackageName = () => {
        switch (plat) {
          case 'flutter': return 'flutter_appauth: ^6.0.7';
          case 'ios': return 'AppAuth-iOS';
          case 'android': return 'AppAuth-Android (net.openid:appauth)';
          case 'react-native': return 'react-native-app-auth';
          default: return 'AppAuth SDK';
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
            <button id="mobile-btn-login" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
              <span>Sign In</span>
            </button>
          </div>

        </div>
      `;
    } else if (this.state.step === 'browser_open') {
      screen.innerHTML = `
        <div class="absolute inset-0 bg-slate-900/95 backdrop-blur-md z-20 flex flex-col p-3 animate-slide-up">
          <div class="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
            <button id="mobile-btn-consent-cancel" class="text-indigo-400 font-medium">${t('mobileDenyBtn')}</button>
            <div class="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800 font-mono text-[10px] text-slate-300" dir="ltr">
              <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
              localhost:3000
            </div>
            <div class="w-8"></div>
          </div>

          <div class="flex-1 flex flex-col justify-between py-4 text-center">
            <div>
              <div class="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              </div>
              <h3 class="text-sm font-bold text-white">${t('mobileAuthorizeTitle')}</h3>
              <p class="text-[11px] text-slate-400 mt-1">${t('mobileConsentDescPrefix')} <strong class="text-sky-300 font-mono" dir="ltr">${this.getClientId()}</strong> ${t('mobileConsentDescSuffix')}</p>
              
              <div class="mt-4 p-2 bg-indigo-950/40 rounded-lg border border-indigo-800 text-[10px] text-left text-indigo-300 font-mono" dir="ltr">
                <div>&bull; PKCE: <span class="text-emerald-400">S256 Active</span></div>
                <div class="truncate">&bull; Challenge: ${this.state.challenge.substring(0, 15)}...</div>
              </div>
            </div>

            <div class="space-y-2">
              <button id="mobile-btn-consent-approve" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all">
                ${t('mobileApproveBtn')}
              </button>
              <button id="mobile-btn-consent-cancel" class="w-full py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">
                ${t('mobileDenyBtn')}
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (this.state.step === 'redirecting' || this.state.step === 'exchanging') {
      screen.innerHTML = `
        <div class="flex flex-col items-center justify-center flex-1 text-center">
          <div class="w-12 h-12 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <h3 class="text-sm font-bold text-white">${this.state.step === 'redirecting' ? t('mobileDeepLinkCallback') : t('mobileVerifyingPkce')}</h3>
          <p class="text-[10px] text-slate-400 mt-1 font-mono break-all" dir="ltr">${this.getRedirectScheme()}</p>
        </div>
      `;
    } else if (this.state.step === 'logged_in') {
      const user = this.state.user || {};
      screen.innerHTML = `
        <div class="flex flex-col h-full justify-between pt-2">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> ${t('mobileAuthenticated')}
              </span>
              <span class="text-[10px] font-mono text-sky-400" dir="ltr">${isFlutter ? 'FlutterSecureStorage' : 'KeyStore'}</span>
            </div>

            <div class="flex items-center gap-3 p-3 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
              <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" class="w-12 h-12 rounded-full object-cover border border-sky-500">
              <div class="truncate">
                <h3 class="text-xs font-bold text-white truncate">${user.name || 'Alex Morgan'}</h3>
                <p class="text-[10px] text-slate-400 truncate" dir="ltr">${user.email || 'alex.morgan@corp.example.com'}</p>
                <div class="text-[9px] text-sky-400 font-mono mt-0.5" dir="ltr">${user.roles ? user.roles.join(', ') : 'admin'}</div>
              </div>
            </div>

            <div class="mt-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-[10px]">
              <div class="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">${this.getStorageEngineName()}</div>
              <div class="text-slate-300 font-mono truncate" dir="ltr"><span class="text-slate-400">ID Token:</span> ${this.state.tokens?.id_token ? this.state.tokens.id_token.substring(0, 18) + '...' : 'jwt_rs256_valid'}</div>
              <div class="text-slate-300 font-mono truncate" dir="ltr"><span class="text-slate-400">Access Token:</span> ${this.state.tokens?.access_token ? this.state.tokens.access_token.substring(0, 18) + '...' : 'at_bearer_valid'}</div>
            </div>
          </div>

          <button id="mobile-btn-logout" class="w-full py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium transition-all">
            ${t('mobileSignOutBtn')}
          </button>
        </div>
      `;
    }
  },

  getCodeSnippet() {
    switch (this.currentPlatform) {
      case 'flutter':
        return this.getFlutterDartCode();
      case 'ios':
        return this.getIosSwiftCode();
      case 'android':
        return this.getAndroidKotlinCode();
      case 'react-native':
        return this.getReactNativeCode();
      default:
        return '';
    }
  },

  getFlutterDartCode() {
    return `// ==========================================
// Flutter 3.x + flutter_appauth + flutter_secure_storage
// RFC 8252 (OAuth for Native Apps) & RFC 7636 (PKCE S256)
// ==========================================

import 'package:flutter/material.dart';
import 'package:flutter_appauth/flutter_appauth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthService {
  final FlutterAppAuth _appAuth = const FlutterAppAuth();
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  static const String _issuer = 'http://localhost:3000/mock-idp';
  static const String _clientId = 'flutter-mobile-client';
  static const String _redirectUrl = 'com.example.flutterapp://oauthredirect';
  static const List<String> _scopes = ['openid', 'profile', 'email', 'offline_access'];

  /// Initiates PKCE Login with ASWebAuthenticationSession (iOS) & Chrome Custom Tabs (Android)
  Future<AuthorizationTokenResponse?> login() async {
    try {
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
        await _storage.write(key: 'access_token', value: result.accessToken);
        await _storage.write(key: 'id_token', value: result.idToken);
        await _storage.write(key: 'refresh_token', value: result.refreshToken);
      }
      return result;
    } catch (e) {
      debugPrint('Flutter PKCE Login Error: \$e');
      return null;
    }
  }

  /// Token Refresh using Refresh Token Rotation
  Future<TokenResponse?> refreshToken() async {
    final String? refreshToken = await _storage.read(key: 'refresh_token');
    if (refreshToken == null) return null;

    final TokenResponse? response = await _appAuth.token(
      TokenRequest(
        _clientId,
        _redirectUrl,
        issuer: _issuer,
        refreshToken: refreshToken,
        grantType: 'refresh_token',
      ),
    );

    if (response != null) {
      await _storage.write(key: 'access_token', value: response.accessToken);
      if (response.refreshToken != null) {
        await _storage.write(key: 'refresh_token', value: response.refreshToken);
      }
    }
    return response;
  }

  Future<void> logout() async {
    await _storage.deleteAll();
  }
}`;
  },

  getIosSwiftCode() {
    return `// Swift 5.9 + AppAuth-iOS (RFC 8252 / RFC 7636)
import UIKit
import AppAuth
import AuthenticationServices

class OIDCAuthManager {
    static let shared = OIDCAuthManager()
    let issuer = URL(string: "http://localhost:3000/mock-idp")!
    let clientID = "ios-mobile-app"
    let redirectURI = URL(string: "com.example.pkceapp:/oauth2callback")!
    
    var authState: OIDAuthState?

    func startPKCELogin(presentingVC: UIViewController) {
        OIDAuthorizationService.discoverConfiguration(forIssuer: issuer) { config, error in
            guard let config = config else { return }

            let request = OIDAuthorizationRequest(
                configuration: config,
                clientId: self.clientID,
                clientSecret: nil, // Public client!
                scopes: [OIDScopeOpenID, OIDScopeProfile, OIDScopeEmail],
                redirectURL: self.redirectURI,
                responseType: OIDResponseTypeCode,
                additionalParameters: [
                    "code_challenge_method": "S256"
                ]
            )

            OIDAuthState.authState(byPresenting: request, presenting: presentingVC) { state, err in
                if let state = state {
                    self.authState = state
                    self.saveToKeychain(state)
                }
            }
        }
    }
}`;
  },

  getAndroidKotlinCode() {
    return `// Kotlin + AppAuth-Android (RFC 8252 / RFC 7636)
package com.example.pkceapp

import android.net.Uri
import net.openid.appauth.*
import androidx.security.crypto.EncryptedSharedPreferences

class AuthRepository(private val context: Context) {
    private val authService = AuthorizationService(context)
    private var authState = AuthState()

    fun performPKCELogin(launcher: ActivityResultLauncher<Intent>) {
        val issuerUri = Uri.parse("http://10.0.2.2:3000/mock-idp")
        
        AuthorizationServiceConfiguration.fetchFromIssuer(issuerUri) { config, _ ->
            if (config == null) return@fetchFromIssuer

            val request = AuthorizationRequest.Builder(
                config,
                "android-mobile-app",
                ResponseTypeValues.CODE,
                Uri.parse("com.example.pkceapp://oauth2callback")
            )
            .setScopes("openid", "profile", "email")
            .setCodeVerifier(CodeVerifierUtil.generateRandomCodeVerifier())
            .build()

            val intent = authService.getAuthorizationRequestIntent(request)
            launcher.launch(intent)
        }
    }
}`;
  },

  getReactNativeCode() {
    return `// React Native + react-native-app-auth
import { authorize, refresh } from 'react-native-app-auth';
import * as Keychain from 'react-native-keychain';

const oidcConfig = {
  issuer: 'http://localhost:3000/mock-idp',
  clientId: 'react-native-client',
  redirectUrl: 'com.example.rnapp://oauthredirect',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  usePKCE: true // Enforce PKCE S256
};

export async function loginWithPkce() {
  try {
    const authResult = await authorize(oidcConfig);
    await Keychain.setGenericPassword(
      'oidc_tokens',
      JSON.stringify(authResult)
    );
    return authResult;
  } catch (error) {
    console.error('Login Failed', error);
  }
}`;
  }
};
