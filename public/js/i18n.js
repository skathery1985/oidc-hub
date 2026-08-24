/**
 * Internationalization (i18n) Engine
 * Supports Arabic (RTL) [Default] and English (LTR)
 * Retains all technical OIDC, PKCE, OAuth, and SDK terminology as requested.
 */

window.i18n = {
  currentLang: localStorage.getItem('oidc_hub_lang') || 'ar',

  translations: {
    ar: {
      // Header & Navigation
      appTitle: 'منصة OIDC PKCE Hub',
      appSubtitle: 'مختبر تفاعلي لتطبيق OpenID Connect Code Flow with PKCE عبر مختلف اللغات وحزم SDK المعتمدة',
      mockOpReady: 'خادم Mock OP جاهز',
      discoveryJson: 'ملف Discovery JSON',
      langToggle: 'English',
      themeToggleLight: '☀️ نهاري',
      themeToggleDark: '🌙 ليلي',
      
      // Tabs
      tabLiveLab: '🚀 مختبر PKCE التفاعلي',
      tabMobile: '📱 تطبيقات الهواتف و Flutter',
      tabSpa: '🌐 تطبيقات الصفحة الواحدة (SPA)',
      tabBackend: '🖥️ تطبيقات الواجهة الخلفية (Non-SPA)',
      tabTools: '🧰 أدوات المطورين ومصفوفة الأمان',

      // Live Lab
      liveLabTitle: 'المختبر التفاعلي لـ PKCE Authorization Code Flow',
      liveLabSubtitle: 'تطبيق معيار RFC 7636 Proof Key for Code Exchange (وفق OAuth 2.1 و OpenID Connect 1.0)',
      providerMock: 'مزود OpenID الافتراضي (Built-in Mock OP)',
      providerCustom: 'مزود خارجي (Auth0, Okta, Keycloak)',
      issuerUrl: 'رابط المزود (Issuer URL)',
      clientId: 'معرف العميل (Client ID)',
      clientSecret: 'الرمز السري للعميل (Client Secret - اختياري)',
      redirectUri: 'رابط إعادة التوجيه (Redirect URI)',
      pkceMethod: 'طريقة PKCE',
      scope: 'الصلاحيات (Scope)',
      fetchDiscoveryBtn: 'جلب بيانات Discovery',
      
      // Steps
      step1Title: '1. توليد مفاتيح PKCE المشفرة (RFC 7636)',
      step1Desc: 'توليد code_verifier عالي الإنتروبيا وحساب code_challenge بطريقة S256',
      regeneratePkce: 'إعادة توليد PKCE',
      verifierLabel: 'code_verifier (سري، يُحفظ في المتصفح فقط)',
      verifierHelp: 'نص عشوائي مشفر لا يمكن تخمينه تم توليده بواسطة window.crypto.getRandomValues().',
      challengeLabel: 'code_challenge (يُرسل في طلب /authorize)',
      challengeHelp: 'المعادلة الرياضية: BASE64URL(SHA256(ASCII(code_verifier))). آمن للإرسال عبر الشبكة.',
      stateLabel: 'state (حماية ضد هجمات CSRF):',
      nonceLabel: 'nonce (حماية ضد إعادة تشغيل ID Token):',
      
      step2Title: '2. إنشاء وإطلاق طلب التفويض (GET /authorize)',
      step2Desc: 'إرسال code_challenge وطلب authorization code',
      authUrlLabel: 'رابط التفويض المولد (Authorization URL):',
      launchPopupBtn: 'إطلاق تسجيل الدخول في نافذة منبثقة (Popup - مستحسن)',
      openNewTabBtn: 'فتح في تبويب جديد',

      step3Title: '3. استلام Callback والتحقق من state',
      step3Desc: 'استخراج الرمز أحادي الاستخدام والتأكد من مطابقة قيمة state لمنع CSRF',
      authCodeLabel: 'رمز التفويض (Authorization Code - صلاحية 5 دقائق، استخدام لمرة واحدة فقط)',
      waitingForCode: 'بانتظار الرمز...',
      codeCaptured: 'تم استلام الرمز بنجاح ✓',
      exchangeBtn: 'تبادل الرمز بالتوكنات (POST /token)',

      step4Title: '4. التحقق المشفر من PKCE وتبادل التوكنات (POST /token)',
      step4Desc: 'قام الخادم بالتحقق من مطابقة SHA256(code_verifier) === code_challenge وإصدار التوكنات',
      tokenResponseJson: 'استجابة التوكنات (JSON Response):',

      step5Title: '5. فحص ID Token ومطالب المستخدم (Claims)',
      step5Desc: 'فك تشفير JSON Web Token (JWT) الموقع بخوارزمية RS256',
      jwtHeader: 'ترويسة JWT Header (RS256)',
      jwtPayload: 'حمولة JWT Payload (بيانات المستخدم والمطالب)',
      claimsChecklist: 'قائمة التحقق من مطابقة الأمان (Claims Validation)',
      claimIssuer: 'المصدر (Issuer):',
      claimAudience: 'الجمهور المستهدف (Audience):',
      claimNonce: 'مطابقة Nonce:',
      claimExpiration: 'تاريخ الانتهاء:',
      testRefreshBtn: 'تجربة تدوير Refresh Token Rotation',

      // Mobile Simulator
      mobileSimTitle: '📱 محاكي أجهزة الهواتف الذكية وحزم SDK المعتمدة (AppAuth)',
      mobileSimSubtitle: 'تطبيق معيار RFC 8252 (OAuth 2.0 for Native Apps) لحزم AppAuth على Flutter و iOS و Android و React Native.',
      mobileSelectPlatform: 'اختر منصة SDK لتجربتها:',
      mobileTraceTitle: 'سجل التتبع اللحظي (Execution Trace)',
      mobileClearTrace: 'مسح',
      mobileTracePlaceholder: 'اضغط على زر "Sign In with SSO" داخل الهاتف لبدء المحاكاة...',
      mobileLiveCode: 'الكود المصدري المباشر',
      mobileSignInBtn: 'Sign In with SSO',
      mobileAuthorizeTitle: 'Authorize Sign-In',
      mobileApproveBtn: 'الموافقة والمتابعة (Approve)',
      mobileDenyBtn: 'إلغاء (Deny)',
      mobileDeepLinkCallback: 'استدعاء Deep Link Callback...',
      mobileVerifyingPkce: 'التحقق من PKCE وتبادل التوكنات...',
      mobileAuthenticated: 'تمت المصادقة بنجاح',
      mobileSignOutBtn: 'تسجيل الخروج (مسح الذاكرة الآمنة)',
      mobileBlueprintsTitle: '📦 أدلة الإعداد والتكوين لتطبيقات الهواتف المعتمدة',
      mobileBlueprintsDesc: 'طريقة إعداد الحزم، أذونات Manifest، روابط Deep Linking، وحفظ التوكنات في المفاتيح الآمنة.',

      // SPA & Backend Catalogs
      spaTitle: '🌐 حزم SDK المعتمدة لتطبيقات الصفحة الواحدة (SPA)',
      spaSubtitle: 'عملاء عموميون في المتصفح دون أسرار خادم. تطبيق PKCE S256 إلزامي لمنع اعتراض رمز التفويض.',
      backendTitle: '🖥️ حزم SDK المعتمدة لتطبيقات الواجهة الخلفية (Non-SPA)',
      backendSubtitle: 'عملاء سريون وخوادم SSR. استخدام PKCE S256 مع ملفات تعريف ارتباط مشفرة HttpOnly والتحقق من JWKS.',
      availableSdks: 'حزم SDK المتاحة:',
      certifiedBadge: 'معتمد رسمياً',
      copyCmd: 'نسخ الأمر',
      secSpecsTitle: 'المواصفات الأمنية:',
      secClientType: 'نوع العميل:',
      secPkceEnforcement: 'تطبيق PKCE:',
      secStorage: 'تخزين التوكنات الموصى به:',
      sectionInstall: '1. أمر تثبيت الحزم (Dependencies)',
      sectionConfig: '2. الإعداد والتهيئة (Configuration & Setup)',
      sectionLogin: '3. بدء تسجيل الدخول عبر PKCE (Login Trigger)',
      sectionCallback: '4. معالجة Callback والتحقق من التوكنات',

      // Tools
      toolsTitle: '🧰 أدوات المطورين ومصفوفة الأمان لـ OIDC & PKCE',
      toolsSubtitle: 'حاسبة تشفير PKCE، فاحص JWT ومطالب المستخدم، فاحص Discovery، ومصفوفة التهديدات الأمنية.',
      tabCalc: '🧮 حاسبة تشفير PKCE',
      tabJwt: '🔍 فاحص ومحلل JWT',
      tabDisco: '🌐 فاحص نقطة OIDC Discovery',
      tabThreat: '🛡️ الهندسة ومصفوفة التهديدات',
      calcVerifierLabel: 'Code Verifier (المدخل)',
      calcGenRandom: 'توليد عشوائي (64 حرفاً)',
      calcChallengeLabel: 'S256 Code Challenge (المخرج الناتج)',
      calcStepsTitle: 'خطوات التحويل الرياضي خطوة بخطوة (RFC 7636):',
      calcStep1: 'الخطوة 1: تحويل الأحرف إلى بايتات ASCII بنظام Hex',
      calcStep2: 'الخطوة 2: حساب بصمة SHA-256 (256-bit Digest)',
      calcStep3: 'الخطوة 3: التشفير بنظام Base64URL (إزالة \'=\' واستبدال \'+\' بـ \'-\' و \'/\' بـ \'_\')',
      jwtPasteLabel: 'الصق رمز JWT هنا (ID Token أو Access Token):',
      discoveryInputLabel: 'اختبر أي رابط مزود OpenID Connect Issuer:',
      discoveryInspectBtn: 'فحص بيانات المزود',
      
      // Threat Matrix
      whyPkceTitle: 'لماذا حل PKCE (RFC 7636) محل Implicit Flow في OAuth 2.1؟',
      whyPkceText1: 'في التدفق القديم (Implicit Flow)، كانت التوكنات تعود مباشرة في رابط المتصفح بعد علامة (#)، مما يعرضها للاختراق عبر سجل المتصفح وترويسات Referer وتطبيقات الهواتف الضارة.',
      whyPkceText2: 'مع تدفق Authorization Code Flow + PKCE، يولد العميل سراً عشوائياً (code_verifier) في الذاكرة المؤقتة. حتى لو اعترض المهاجم رمز التفويض، فلن يتمكن من استبداله بدون المفتاح الأصلي.',
      storageMatrixTitle: 'مصفوفة مقارنة أمان تخزين التوكنات بين المنصات',
      tblPlatform: 'المنصة / نوع العميل',
      tblStorage: 'مكان التخزين الموصى به',
      tblXss: 'مخاطر XSS',
      tblCsrf: 'مخاطر CSRF',
      tblBestPractice: 'أفضل نمط معماري موصى به',

      // Footer
      footerSpecs: 'OpenID Connect Core 1.0 • RFC 7636 (PKCE) • RFC 8252 (OAuth for Apps) • OAuth 2.1',
      footerJwks: 'نقطة JWKS',
      footerUserInfo: 'نقطة UserInfo',
      footerMetadata: 'بيانات OpenID Metadata'
    },

    en: {
      // Header & Navigation
      appTitle: 'OIDC PKCE Hub',
      appSubtitle: 'Interactive OpenID Connect Code Flow with PKCE Lab & Multi-Language Certified SDK Showcase',
      mockOpReady: 'Mock OP Ready',
      discoveryJson: 'Discovery JSON',
      langToggle: 'العربية',
      themeToggleLight: '☀️ Light',
      themeToggleDark: '🌙 Dark',

      // Tabs
      tabLiveLab: '🚀 Live PKCE Lab',
      tabMobile: '📱 Mobile & Flutter',
      tabSpa: '🌐 Single Page Apps (SPA)',
      tabBackend: '🖥️ Non-SPA / Backend',
      tabTools: '🧰 Dev Tools & Threat Matrix',

      // Live Lab
      liveLabTitle: 'Interactive PKCE Authorization Code Lab',
      liveLabSubtitle: 'RFC 7636 Proof Key for Code Exchange (OAuth 2.1 & OpenID Connect 1.0)',
      providerMock: 'Built-in Mock OpenID Provider',
      providerCustom: 'External IdP (Auth0, Okta, Keycloak)',
      issuerUrl: 'Issuer URL',
      clientId: 'Client ID',
      clientSecret: 'Client Secret (Optional)',
      redirectUri: 'Redirect URI',
      pkceMethod: 'PKCE Method',
      scope: 'Scope',
      fetchDiscoveryBtn: 'Fetch Discovery',

      // Steps
      step1Title: '1. Generate PKCE Cryptographic Keys (RFC 7636)',
      step1Desc: 'Generate high-entropy code_verifier and compute S256 code_challenge',
      regeneratePkce: 'Regenerate PKCE',
      verifierLabel: 'code_verifier (Secret, Client-side only)',
      verifierHelp: 'High-entropy unguessable random string generated via window.crypto.getRandomValues().',
      challengeLabel: 'code_challenge (Sent in /authorize)',
      challengeHelp: 'Formula: BASE64URL(SHA256(ASCII(code_verifier))). Safe to transmit publicly.',
      stateLabel: 'state (Anti-CSRF Protection):',
      nonceLabel: 'nonce (ID Token Replay Protection):',

      step2Title: '2. Build & Execute Authorization Request (GET /authorize)',
      step2Desc: 'Send code_challenge and request authorization code',
      authUrlLabel: 'Generated Authorization URL:',
      launchPopupBtn: 'Launch SSO in Popup Window (Recommended)',
      openNewTabBtn: 'Open in New Tab',

      step3Title: '3. Callback Received & State Validated',
      step3Desc: 'Extracts one-time code and confirms state parameter matches to prevent CSRF',
      authCodeLabel: 'Authorization Code (Single-Use, 5min expiration)',
      waitingForCode: 'Waiting for Code...',
      codeCaptured: 'Code Captured Successfully ✓',
      exchangeBtn: 'Exchange for Tokens (POST /token)',

      step4Title: '4. PKCE Verification & Token Exchange (POST /token)',
      step4Desc: 'Server verified SHA256(code_verifier) === code_challenge and issued tokens',
      tokenResponseJson: 'Token Response JSON:',

      step5Title: '5. ID Token Inspection & User Claims',
      step5Desc: 'RS256 Signed JSON Web Token (JWT) Decoded',
      jwtHeader: 'JWT Header (RS256)',
      jwtPayload: 'JWT Payload (Claims)',
      claimsChecklist: 'Security Claims Validation Checklist',
      claimIssuer: 'Issuer:',
      claimAudience: 'Audience (Client):',
      claimNonce: 'Nonce Match:',
      claimExpiration: 'Expiration:',
      testRefreshBtn: 'Test Refresh Token Rotation',

      // Mobile Simulator
      mobileSimTitle: '📱 Mobile (iOS, Android & Flutter) AppAuth Simulators & SDKs',
      mobileSimSubtitle: 'RFC 8252 (OAuth 2.0 for Native Apps) & OpenID Foundation standard AppAuth implementations.',
      mobileSelectPlatform: 'Select Mobile SDK Platform:',
      mobileTraceTitle: 'Execution Trace',
      mobileClearTrace: 'Clear',
      mobileTracePlaceholder: 'Click "Sign in with SSO" in the phone simulator to start...',
      mobileLiveCode: 'Live Code',
      mobileSignInBtn: 'Sign In with SSO',
      mobileAuthorizeTitle: 'Authorize Sign-In',
      mobileApproveBtn: 'Approve & Continue',
      mobileDenyBtn: 'Deny',
      mobileDeepLinkCallback: 'Deep Link Callback...',
      mobileVerifyingPkce: 'Verifying PKCE & Exchanging Tokens...',
      mobileAuthenticated: 'Authenticated',
      mobileSignOutBtn: 'Sign Out (Clear Storage)',
      mobileBlueprintsTitle: '📦 Mobile & Cross-Platform SDK Configuration Blueprints',
      mobileBlueprintsDesc: 'Complete setup, manifest permissions, deep linking, and secure keyrings for mobile platforms.',

      // SPA & Backend Catalogs
      spaTitle: '🌐 Certified Single Page Application (SPA) SDKs',
      spaSubtitle: 'Public browser clients without server secrets. Enforces S256 PKCE to prevent authorization code interception.',
      backendTitle: '🖥️ Certified Non-SPA / Traditional Backend SDKs',
      backendSubtitle: 'Confidential & SSR server-side clients. Uses PKCE S256 with HttpOnly secure sessions and JWKS signature verification.',
      availableSdks: 'Available Certified SDKs:',
      certifiedBadge: 'Certified',
      copyCmd: 'Copy Command',
      secSpecsTitle: 'Security Specifications:',
      secClientType: 'Client Type:',
      secPkceEnforcement: 'PKCE Enforcement:',
      secStorage: 'Recommended Token Storage:',
      sectionInstall: '1. Dependencies',
      sectionConfig: '2. Configuration & Initialization',
      sectionLogin: '3. Execute PKCE Login Flow',
      sectionCallback: '4. Secure Token Storage & Verification',

      // Tools
      toolsTitle: '🧰 OIDC & PKCE Developer Tools & Threat Matrix',
      toolsSubtitle: 'Cryptographic bitwise calculator, JWT inspector, OIDC discovery analyzer, and architecture threat models.',
      tabCalc: '🧮 PKCE Cryptographic Calculator',
      tabJwt: '🔍 JWT & Claims Debugger',
      tabDisco: '🌐 OIDC Discovery (.well-known) Inspector',
      tabThreat: '🛡️ Architecture & Threat Matrix',
      calcVerifierLabel: 'Code Verifier (Input)',
      calcGenRandom: 'Generate Random (64 chars)',
      calcChallengeLabel: 'S256 Code Challenge (Output)',
      calcStepsTitle: 'RFC 7636 Step-by-Step Transformation:',
      calcStep1: 'Step 1: ASCII Bytes to Hex',
      calcStep2: 'Step 2: SHA-256 256-bit Digest (Hex)',
      calcStep3: 'Step 3: Base64URL Encoding (Strip \'=\', \'+\' -> \'-\', \'/\' -> \'_\')',
      jwtPasteLabel: 'Paste JWT Token (ID Token or Access Token):',
      discoveryInputLabel: 'Test Any OpenID Connect Issuer URL:',
      discoveryInspectBtn: 'Inspect Provider Metadata',

      // Threat Matrix
      whyPkceTitle: 'Why PKCE (RFC 7636) Replaced Implicit Grant in OAuth 2.1 & OIDC',
      whyPkceText1: 'In the legacy Implicit Flow, access tokens were returned directly in the URL fragment (#), exposing tokens to browser history, Referer headers, and rogue native app custom URI handlers.',
      whyPkceText2: 'With Authorization Code Flow + PKCE, public clients generate a cryptographically random secret (code_verifier) kept only in local memory. Even if an attacker intercepts the code, they cannot redeem it without the verifier.',
      storageMatrixTitle: 'Token Storage & Architecture Security Matrix',
      tblPlatform: 'Platform / Client Type',
      tblStorage: 'Recommended Storage',
      tblXss: 'XSS Risk',
      tblCsrf: 'CSRF Risk',
      tblBestPractice: 'Best Practice Architecture',

      // Footer
      footerSpecs: 'OpenID Connect Core 1.0 • RFC 7636 (PKCE) • RFC 8252 (OAuth for Apps) • OAuth 2.1',
      footerJwks: 'JWKS Endpoint',
      footerUserInfo: 'UserInfo Endpoint',
      footerMetadata: 'OpenID Metadata'
    }
  },

  /**
   * Translates a given key based on the current active language
   */
  t(key) {
    const lang = this.currentLang || 'ar';
    const dict = this.translations[lang] || this.translations['ar'];
    return dict[key] || this.translations['en'][key] || key;
  },

  /**
   * Switches language, updates DOM direction, and triggers UI re-render
   */
  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('oidc_hub_lang', lang);
    
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');

    // Update body font family based on language
    if (lang === 'ar') {
      document.body.style.fontFamily = "'Cairo', 'Inter', sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }

    // Update static HTML elements
    this.updateStaticDom();

    // Re-render active application tab
    if (window.App && typeof window.App.renderActiveTab === 'function') {
      window.App.renderActiveTab();
    }
  },

  toggleLanguage() {
    const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.setLanguage(nextLang);
  },

  updateStaticDom() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
        <span>${this.t('langToggle')}</span>
      `;
    }

    // Update theme toggle label
    if (window.ThemeManager) {
      window.ThemeManager.updateThemeButton();
    }

    const appTitleEl = document.getElementById('app-header-title');
    if (appTitleEl) appTitleEl.textContent = this.t('appTitle');

    const appSubtitleEl = document.getElementById('app-header-subtitle');
    if (appSubtitleEl) appSubtitleEl.textContent = this.t('appSubtitle');

    const discoBtn = document.getElementById('header-discovery-link');
    if (discoBtn) {
      discoBtn.innerHTML = `
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        ${this.t('discoveryJson')}
      `;
    }

    // Update tab labels
    const tabMap = {
      'live-lab': 'tabLiveLab',
      'mobile': 'tabMobile',
      'spa': 'tabSpa',
      'backend': 'tabBackend',
      'tools': 'tabTools'
    };

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const tabKey = btn.getAttribute('data-tab');
      if (tabMap[tabKey]) {
        btn.innerHTML = `<span class="tab-text">${this.t(tabMap[tabKey])}</span>`;
      }
    });

    const footerSpecs = document.getElementById('footer-specs-text');
    if (footerSpecs) footerSpecs.textContent = this.t('footerSpecs');
  }
};
