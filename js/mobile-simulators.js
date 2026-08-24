/**
 * Mobile AppAuth Interactive Simulators (iOS Swift, Android Kotlin, Flutter Dart & React Native)
 * Simulates real native OAuth 2.0 / OIDC Authorization Code Flow with PKCE RFC 8252
 * Localized with Arabic (RTL) [Default] and English (LTR).
 * Fully themed for Light Mode [Default] and Dark Mode.
 */

window.MobileSimulator = {
  currentPlatform: 'flutter',
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
  },

  reset() {
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

    const platformLabel = this.getPlatformLabel();
    const isAr = window.i18n.currentLang === 'ar';
    const msg = isAr 
      ? `[${platformLabel}] تم توليد PKCE Verifier: ${this.state.verifier.substring(0, 10)}... (S256 Challenge: ${this.state.challenge.substring(0, 10)}...)`
      : `[${platformLabel}] Generated PKCE Verifier: ${this.state.verifier.substring(0, 10)}... (S256 Challenge: ${this.state.challenge.substring(0, 10)}...)`;
    
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
    switch (this.currentPlatform) {
      case 'flutter':
        return 'FLUTTER / DART';
      case 'ios':
        return 'IOS / SWIFT';
      case 'android':
        return 'ANDROID / KOTLIN';
      case 'react-native':
        return 'REACT NATIVE';
      default:
        return 'MOBILE';
    }
  },

  async approveConsent() {
    this.state.step = 'redirecting';
    this.renderPhoneScreen();

    const mockCode = 'authcode_mob_' + Math.random().toString(36).substring(2, 12);
    this.state.code = mockCode;
    const redirectScheme = this.getRedirectScheme();
    const platformLabel = this.getPlatformLabel();
    const isAr = window.i18n.currentLang === 'ar';

    const redirectMsg = isAr
      ? `[${platformLabel}] تمت موافقة المستخدم. متصفح النظام يعيد التوجيه عبر Deep Link: ${redirectScheme}?code=${mockCode}`
      : `[${platformLabel}] User consented. System browser redirects to deep link: ${redirectScheme}?code=${mockCode}`;
    this.logStep(redirectMsg);

    setTimeout(async () => {
      this.state.step = 'exchanging';
      this.renderPhoneScreen();

      try {
        let data;
        try {
          const res = await fetch('/mock-idp/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              grant_type: 'authorization_code',
              client_id: this.getClientId(),
              redirect_uri: redirectScheme,
              code: mockCode,
              code_verifier: this.state.verifier
            })
          });
          data = await res.json();
        } catch (fetchErr) {
          if (window.VirtualOP) {
            data = await window.VirtualOP.exchangeCodeForTokens({
              grantType: 'authorization_code',
              clientId: this.getClientId(),
              code: mockCode,
              codeVerifier: this.state.verifier
            });
          } else {
            throw fetchErr;
          }
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
          ? 'FlutterSecureStorage (iOS Keychain & Android KeyStore)'
          : this.currentPlatform === 'ios'
          ? 'iOS Secure Keychain (SecItemAdd)'
          : this.currentPlatform === 'android'
          ? 'Android KeyStore (EncryptedSharedPreferences)'
          : 'react-native-keychain';

        const successMsg = isAr
          ? `[${platformLabel}] اكتمل تبادل التوكنات بنجاح! تم حفظ التوكنات في ${storageType}.`
          : `[${platformLabel}] Token exchange successful! Saved tokens to ${storageType}.`;
        this.logStep(successMsg);

        this.state.step = 'logged_in';
        this.renderPhoneScreen();
      } catch (err) {
        console.error(err);
      }
    }, 800);
  },

  cancelConsent() {
    const isAr = window.i18n.currentLang === 'ar';
    this.logStep(isAr ? `[${this.getPlatformLabel()}] قام المستخدم بإلغاء تسجيل الدخول.` : `[${this.getPlatformLabel()}] User cancelled login.`);
    this.reset();
  },

  logStep(msg) {
    const consoleEl = document.getElementById('mobile-live-console');
    if (consoleEl) {
      const line = document.createElement('div');
      line.className = 'text-xs font-mono py-1 border-b border-slate-200 dark:border-slate-800 flex items-start gap-2';
      line.innerHTML = `<span class="text-indigo-600 dark:text-indigo-400 font-bold" dir="ltr">${new Date().toLocaleTimeString()}</span> <span class="text-slate-700 dark:text-slate-300">${msg}</span>`;
      consoleEl.prepend(line);
    }
  },

  renderSimulatorFrame() {
    const root = document.getElementById('mobile-simulator-root');
    if (!root) return;

    const t = (k) => window.i18n.t(k);
    const plat = this.currentPlatform;

    root.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left Column: Controls & Platform Switcher -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-md dark:shadow-xl">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">${t('mobileSelectPlatform')}</h3>
            <div class="grid grid-cols-2 gap-2">
              
              <!-- Flutter Option -->
              <button onclick="window.MobileSimulator.setPlatform('flutter')" class="p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${plat === 'flutter' ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-white font-medium shadow-md shadow-sky-500/10 ring-2 ring-sky-500/20' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
                ${window.BRAND_LOGOS ? window.BRAND_LOGOS.flutter : '<svg class="w-8 h-8 text-sky-500" viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.07 11.536L8.01 17.91l3.684 3.702 3.68-3.682 6.31-6.394h-7.3z"/></svg>'}
                <span class="text-xs font-bold">Flutter (Dart)</span>
              </button>

              <!-- iOS Option -->
              <button onclick="window.MobileSimulator.setPlatform('ios')" class="p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${plat === 'ios' ? 'border-slate-900 dark:border-white bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium shadow-md ring-2 ring-slate-500/20' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
                ${window.BRAND_LOGOS ? window.BRAND_LOGOS.ios : '<svg class="w-8 h-8 text-slate-800 dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.14.65-2.73 1.35-.53.61-.98 1.68-.93 2.7.07 0 .15.01.23.01.83 0 1.81-.44 2.42-1.19z"/></svg>'}
                <span class="text-xs font-bold">iOS (Swift)</span>
              </button>

              <!-- Android Option -->
              <button onclick="window.MobileSimulator.setPlatform('android')" class="p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${plat === 'android' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-white font-medium shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
                ${window.BRAND_LOGOS ? window.BRAND_LOGOS.android : '<svg class="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1557-.2699.0634-.6139-.2064-.7696-.2698-.1557-.6138-.0633-.7695.2064l-2.0238 3.5053c-1.3917-.635-2.9298-.9873-4.5778-.9873s-3.1861.3523-4.5778.9873L5.2984 5.3013c-.1557-.2697-.4997-.3621-.7695-.2064-.2698.1557-.3621.4997-.2064.7696l1.996 3.4572C2.7161 11.2933.2721 15.6174 0 20.6725h24c-.2721-5.0551-2.7161-9.3792-6.1185-11.3511"/></svg>'}
                <span class="text-xs font-bold">Android (Kotlin)</span>
              </button>

              <!-- React Native Option -->
              <button onclick="window.MobileSimulator.setPlatform('react-native')" class="p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${plat === 'react-native' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-white font-medium shadow-md shadow-cyan-500/10 ring-2 ring-cyan-500/20' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
                ${window.BRAND_LOGOS ? window.BRAND_LOGOS.react : '<svg class="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/></svg>'}
                <span class="text-xs font-bold">React Native</span>
              </button>

            </div>

            <!-- Platform specs -->
            <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">RFC Standard:</span> <span class="font-mono text-indigo-600 dark:text-indigo-400" dir="ltr">RFC 8252 & RFC 7636</span></div>
              <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">SDK / Package:</span> <span class="font-mono text-sky-600 dark:text-sky-400" dir="ltr">${this.getSdkPackageName()}</span></div>
              <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Browser Agent:</span> <span class="font-mono text-cyan-600 dark:text-cyan-400" dir="ltr">${this.getBrowserAgentName()}</span></div>
              <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Deep Link:</span> <span class="font-mono text-amber-600 dark:text-amber-400 text-[11px] truncate max-w-[180px]" dir="ltr">${this.getRedirectScheme()}</span></div>
              <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Secure Storage:</span> <span class="font-mono text-emerald-600 dark:text-emerald-400 text-[11px] truncate max-w-[180px]" dir="ltr">${this.getStorageEngineName()}</span></div>
              <div class="flex justify-between"><span class="text-slate-500 dark:text-slate-400">Client Secret:</span> <span class="text-rose-600 dark:text-rose-400 font-bold" dir="ltr">None (Public Client)</span></div>
            </div>
          </div>

          <!-- Step Trace Log -->
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-md dark:shadow-xl">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">${t('mobileTraceTitle')}</h3>
              <button onclick="document.getElementById('mobile-live-console').innerHTML=''" class="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">${t('mobileClearTrace')}</button>
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
            <pre class="bg-slate-900 p-4 rounded-xl text-[11px] font-mono text-slate-200 overflow-x-auto border border-slate-800 h-[520px] custom-scrollbar" dir="ltr"><code>${this.getCodeSnippet()}</code></pre>
          </div>
        </div>

      </div>
    `;

    this.renderPhoneScreen();
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
        return 'Flutter / Dart';
      case 'ios':
        return 'Swift / AppAuth-iOS';
      case 'android':
        return 'Kotlin / AppAuth-Android';
      case 'react-native':
        return 'React Native / TypeScript';
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
      const getAppLogo = () => {
        if (!window.BRAND_LOGOS) return '';
        switch (plat) {
          case 'flutter': return window.BRAND_LOGOS.flutter;
          case 'ios': return window.BRAND_LOGOS.ios;
          case 'android': return window.BRAND_LOGOS.android;
          case 'react-native': return window.BRAND_LOGOS.react;
          default: return '';
        }
      };

      const getAppTitle = () => {
        switch (plat) {
          case 'flutter': return 'Flutter AppAuth';
          case 'ios': return 'iOS Swift AppAuth';
          case 'android': return 'Android AppAuth';
          case 'react-native': return 'React Native Auth';
          default: return 'Enterprise Mobile';
        }
      };

      screen.innerHTML = `
        <div class="flex flex-col items-center justify-center flex-1 text-center px-2">
          <div class="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl flex items-center justify-center shadow-indigo-950/50 mb-4 p-3 ring-1 ring-slate-600/50">
            ${getAppLogo()}
          </div>
          <h2 class="text-lg font-extrabold text-white tracking-tight">${getAppTitle()}</h2>
          <p class="text-xs text-slate-400 mt-1">${t('mobileSsoSubtitle')}</p>
          
          <div class="w-full mt-10 space-y-3">
            <button id="mobile-btn-login" class="w-full py-3 px-4 rounded-xl ${isFlutter ? 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-sky-500/25' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/25'} text-white font-semibold text-xs shadow-lg transition-all flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
              ${t('mobileSignInBtn')}
            </button>
            <div class="text-[10px] text-slate-400 font-mono" dir="ltr">Powered by ${this.getSdkPackageName()}</div>
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
