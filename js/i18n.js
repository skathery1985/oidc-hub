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
      scrollDownHint: 'المزيد من التفاصيل بالأسفل',
      
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
      mobileSsoSubtitle: 'تسجيل الدخول الموحد عبر PKCE',
      mobileConsentDescPrefix: 'يطلب التطبيق',
      mobileConsentDescSuffix: 'الوصول إلى ملف تعريف المستخدم.',
      mobileAuthorizeTitle: 'Authorize Sign-In',
      mobileApproveBtn: 'الموافقة والمتابعة (Approve)',
      mobileDenyBtn: 'إلغاء (Deny)',
      mobileDeepLinkCallback: 'استدعاء Deep Link Callback...',
      mobileVerifyingPkce: 'التحقق من PKCE وتبادل التوكنات...',
      mobileAuthenticated: 'تمت المصادقة بنجاح',
      mobileSignOutBtn: 'تسجيل الخروج (مسح الذاكرة الآمنة)',
      mobileBlueprintsTitle: '📦 أدلة الإعداد والتكوين لتطبيقات الهواتف المعتمدة',
      mobileBlueprintsDesc: 'طريقة إعداد الحزم، أذونات Manifest، روابط Deep Linking، وحفظ التوكنات في المفاتيح الآمنة.',

      // SPA Simulator & Catalog
      spaSimTitle: '🌐 محاكي تطبيقات الصفحة الواحدة وحزم SDK المعتمدة (SPA)',
      spaSimSubtitle: 'تطبيق معيار RFC 7636 و OpenID Connect للعملاء العموميين في المتصفح بحفظ التوكنات الآمن في الذاكرة In-Memory.',
      spaTitle: '🌐 حزم SDK المعتمدة لتطبيقات الصفحة الواحدة (SPA)',
      spaSubtitle: 'عملاء عموميون في المتصفح دون أسرار خادم. تطبيق PKCE S256 إلزامي لمنع اعتراض رمز التفويض.',
      spaBlueprintsTitle: '📦 أدلة الإعداد والتكوين لتطبيقات SPA المعتمدة',
      spaBlueprintsDesc: 'طريقة إعداد حزم TypeScript/React و Web Crypto API وإدارة التوكنات في الذاكرة مع التجديد الصامت.',

      // Backend Simulator & Catalog
      backendSimTitle: '🖥️ محاكي خوادم الواجهة الخلفية ونمط BFF المعتمد (Backend & BFF)',
      backendSimSubtitle: 'تطبيق نمط Backend For Frontend (BFF) والعملاء السريين مع أسرار الخادم وملفات تعريف ارتباط HttpOnly المشفرة.',
      backendTitle: '🖥️ حزم SDK المعتمدة لتطبيقات الواجهة الخلفية (Non-SPA)',
      backendSubtitle: 'عملاء سريون وخوادم SSR. استخدام PKCE S256 مع ملفات تعريف ارتباط مشفرة HttpOnly والتحقق من JWKS.',
      backendBlueprintsTitle: '📦 أدلة الإعداد والتكوين لتطبيقات الواجهة الخلفية والخوادم',
      backendBlueprintsDesc: 'تكوين متغيرات البيئة .env، أسرار العميل، التحقق من JWKS، وملفات تعريف الارتباط المشفرة HttpOnly.',
      availableSdks: 'حزم SDK المتاحة:',
      activeLanguage: 'مفعّل',
      selectToView: 'اختر للعرض',
      authModeTitle: 'نوع حماية العميل (Client Security):',
      authModePkce: 'PKCE S256 (Public)',
      authModeSecret: 'Client Secret (Confidential)',
      certifiedBadge: 'معتمد رسمياً',
      copyCmd: 'نسخ الأمر',
      secSpecsTitle: 'المواصفات الأمنية:',
      secClientType: 'نوع العميل:',
      secPkceEnforcement: 'تطبيق PKCE:',
      secStorage: 'تخزين التوكنات الموصى به:',
      sectionInstall: '1. أمر تثبيت الحزم (Dependencies)',
      sectionConfig: '2. الإعداد والتهيئة (Configuration & Setup)',
      sectionLogin: '3. بدء تسجيل الدخول عبر PKCE (Login Trigger)',
      sectionUserinfo: '4. استعلام نقطة بيانات المستخدم (UserInfo Endpoint)',
      sectionRefresh: '5. تجديد التوكنات وتدويرها (Refresh Token Rotation - RTR)',
      sectionLogout: '6. تسجيل الخروج وإبطال التوكنات (Logout with Revocation - RFC 7009)',
      sectionCallback: 'معالجة Callback وتخزين التوكنات المشفر (Token Storage)',

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
      scrollDownHint: 'Scroll for Details',

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
      mobileSsoSubtitle: 'Single Sign-On with PKCE',
      mobileConsentDescPrefix: 'Application',
      mobileConsentDescSuffix: 'requests profile access.',
      mobileAuthorizeTitle: 'Authorize Sign-In',
      mobileApproveBtn: 'Approve & Continue',
      mobileDenyBtn: 'Deny',
      mobileDeepLinkCallback: 'Deep Link Callback...',
      mobileVerifyingPkce: 'Verifying PKCE & Exchanging Tokens...',
      mobileAuthenticated: 'Authenticated',
      mobileSignOutBtn: 'Sign Out (Clear Storage)',
      mobileBlueprintsTitle: '📦 Mobile & Cross-Platform SDK Configuration Blueprints',
      mobileBlueprintsDesc: 'Complete setup, manifest permissions, deep linking, and secure keyrings for mobile platforms.',

      // SPA Simulator & Catalog
      spaSimTitle: '🌐 Single Page Application (SPA) Interactive Simulators & SDKs',
      spaSimSubtitle: 'RFC 7636 & OIDC implementation for public browser clients with in-memory tokens and PKCE S256.',
      spaTitle: '🌐 Certified Single Page Application (SPA) SDKs',
      spaSubtitle: 'Public browser clients without server secrets. Enforces S256 PKCE to prevent authorization code interception.',
      spaBlueprintsTitle: '📦 Certified SPA SDK Configuration & Setup Guides',
      spaBlueprintsDesc: 'Package installation, in-memory session management, and silent token renewal via Web Worker or iframe.',

      // Backend Simulator & Catalog
      backendSimTitle: '🖥️ Backend & BFF Server-Side Interactive Simulators & SDKs',
      backendSimSubtitle: 'Backend For Frontend (BFF) and confidential clients with client secrets and encrypted HttpOnly cookies.',
      backendTitle: '🖥️ Certified Non-SPA / Traditional Backend SDKs',
      backendSubtitle: 'Confidential & SSR server-side clients. Uses PKCE S256 with HttpOnly secure sessions and JWKS signature verification.',
      backendBlueprintsTitle: '📦 Certified Backend & BFF Server Configuration Guides',
      backendBlueprintsDesc: 'Configuring .env secrets, JWKS validation, and encrypted HttpOnly session cookies.',
      availableSdks: 'Available Certified SDKs:',
      activeLanguage: 'Active',
      selectToView: 'Select to view',
      authModeTitle: 'Client Security Mode:',
      authModePkce: 'PKCE S256 (Public)',
      authModeSecret: 'Client Secret (Confidential)',
      certifiedBadge: 'Certified',
      copyCmd: 'Copy Command',
      secSpecsTitle: 'Security Specifications:',
      secClientType: 'Client Type:',
      secPkceEnforcement: 'PKCE Enforcement:',
      secStorage: 'Recommended Token Storage:',
      sectionInstall: '1. Dependencies & Package Installation',
      sectionConfig: '2. Configuration & Initialization',
      sectionLogin: '3. Execute PKCE Login Flow (S256)',
      sectionUserinfo: '4. UserInfo Endpoint & Profile Claims',
      sectionRefresh: '5. Refresh Token Rotation (RTR)',
      sectionLogout: '6. Logout & Token Revocation (RFC 7009)',
      sectionCallback: 'Callback Handler & Secure Token Storage',

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
  },

  commentTranslationsAr: [
    // 1. SPA / Pure Web Crypto
    [/\/\/\s*1\.\s*Pure Web Crypto PKCE Helpers \(RFC 7636\)/gi, '// 1. دوال مساعدة لـ PKCE بواسطة Web Crypto API (معيار RFC 7636)'],
    [/\/\/\s*2\.\s*Start Authorization Flow/gi, '// 2. بدء تدفق التفويض (Authorization Flow)'],
    [/\/\/\s*3\.\s*Fetch UserInfo with Access Token/gi, '// 3. استعلام بيانات المستخدم (UserInfo) بواسطة Access Token'],
    [/\/\/\s*4\.\s*Refresh Token Rotation \(Vanilla JS Fetch\)/gi, '// 4. تدوير رمز التحديث Refresh Token Rotation عبر Fetch'],
    [/\/\/\s*5\.\s*Logout & Token Revocation \(RFC 7009\) & SSO/gi, '// 5. تسجيل الخروج وإبطال التوكنات وإنهاء الجلسة SSO'],
    [/\/\/\s*6\.\s*Callback Handler \(e\.g\. callback\.html or \/callback route\)/gi, '// 6. معالج صفحة Callback وتخزين التوكنات'],
    [/\/\/\s*6\.\s*Process Callback on \/callback\.html/gi, '// 6. معالجة Callback في صفحة callback.html'],
    [/^#\s*No installation required - 100% native Web Crypto API/gmi, '# لا يتطلب أي تثبيت - يعتمد 100% على Web Crypto API القياسية'],

    // oidc-client-ts
    [/\/\/\s*1\.\s*Configure the OIDC Client with PKCE enabled/gi, '// 1. تهيئة عميل OIDC مع تفعيل PKCE S256'],
    [/\/\/\s*1\.\s*Initialize OpenID Certified Client with PKCE S256/gi, '// 1. تهيئة عميل OpenID المعتمد مع تطبيق PKCE S256'],
    [/\/\/\s*PKCE Settings \(Enabled by default in oidc-client-ts\)/gi, '// إعدادات PKCE (مفعلة افتراضياً في oidc-client-ts)'],
    [/\/\/\s*Generates S256 code_challenge and stores code_verifier in sessionStorage/gi, '// يولد S256 code_challenge ويحفظ code_verifier في sessionStorage'],
    [/\/\/\s*Automatic Silent Token Renewal/gi, '// التجديد الصامت التلقائي للتوكنات'],
    [/\/\/\s*Security checks/gi, '// الفحوصات الأمنية'],
    [/\/\/\s*2\.\s*Trigger Login \(Redirects with PKCE parameters\)/gi, '// 2. بدء تسجيل الدخول (إعادة التوجيه مع معاملات PKCE)'],
    [/\/\/\s*2\.\s*Trigger Login Redirect/gi, '// 2. إطلاق إعادة التوجيه لتسجيل الدخول'],
    [/\/\/\s*3\.\s*UserInfo Claims Query \(oidc-client-ts\)/gi, '// 3. استعلام مطالب المستخدم UserInfo (مكتبة oidc-client-ts)'],
    [/\/\/\s*Queries \/userinfo using in-memory access token/gi, '// يستعلم نقطة /userinfo باستخدام Access Token المحفوظ في الذاكرة'],
    [/\/\/\s*4\.\s*Silent Token Refresh & Rotation \(oidc-client-ts\)/gi, '// 4. تجديد التوكنات وتدويرها صامتاً (oidc-client-ts)'],
    [/\/\/\s*Executes token refresh in background via Refresh Token Rotation or hidden iframe/gi, '// ينفذ تجديد التوكنات في الخلفية عبر RTR أو iframe مخفي'],
    [/\/\/\s*5\.\s*Logout & Revoke \(oidc-client-ts\)/gi, '// 5. تسجيل الخروج وإبطال التوكنات (oidc-client-ts)'],
    [/\/\/\s*Automatically revokes tokens and redirects to IdP End Session Endpoint/gi, '// يبطل التوكنات تلقائياً ويعيد التوجيه لنقطة إنهاء الجلسة لدى IdP'],
    [/\/\/\s*PKCE is enforced automatically by oidc-client-ts/gi, '// يتم تطبيق PKCE S256 تلقائياً بواسطة oidc-client-ts'],
    [/\/\/\s*Tokens are securely held In-Memory/gi, '// تُحفظ التوكنات بأمان في الذاكرة (In-Memory)'],

    // Next.js (BFF / Auth.js)
    [/\/\/\s*1\.\s*auth\.ts \(Next\.js 14 App Router Root Configuration\)/gi, '// 1. ملف auth.ts (تهيئة الجذر لـ Next.js 14 App Router)'],
    [/\/\/\s*Next\.js 14 App Router Auth\.js Configuration/gi, '// تهيئة Auth.js في تطبيق Next.js 14 App Router'],
    [/\/\/\s*2\.\s*app\/page\.tsx \(Server Action Login with PKCE S256\)/gi, '// 2. ملف app/page.tsx (تسجيل الدخول عبر Server Action مع PKCE)'],
    [/\/\/\s*3\.\s*UserInfo Claims Resolution & Profile Extraction/gi, '// 3. استخراج بيانات ومطالب المستخدم من UserInfo'],
    [/\/\/\s*In auth\.ts provider config:/gi, '// داخل إعدادات المزود في auth.ts:'],
    [/\/\/\s*profile contains claims fetched with the Access Token from \/userinfo/gi, '// يحتوي كائن profile على المطالب المستلمة من /userinfo'],
    [/\/\/\s*4\.\s*Refresh Token Rotation \(RTR\) in NextAuth JWT Callback/gi, '// 4. تدوير رمز التحديث (RTR) في كولباك JWT لـ NextAuth'],
    [/\/\/\s*In callbacks\.jwt:/gi, '// داخل دالة callbacks.jwt:'],
    [/\/\/\s*5\.\s*Logout with Token Revocation \(RFC 7009\) & SSO End Session/gi, '// 5. تسجيل الخروج وإبطال التوكنات (RFC 7009) وإنهاء الجلسة SSO'],
    [/\/\/\s*Step A:\s*Revoke refresh token on IdP server/gi, '// الخطوة أ: إبطال رمز التحديث على خادم IdP'],
    [/\/\/\s*Step B:\s*Clear local session & redirect to IdP End Session Endpoint/gi, '// الخطوة ب: مسح الجلسة المحلية وإعادة التوجيه لنقطة إنهاء الجلسة'],
    [/\/\/\s*6\.\s*Server Component Session Protection \(app\/dashboard\/page\.tsx\)/gi, '// 6. حماية جلسة Server Component في (app/dashboard/page.tsx)'],
    [/\/\/\s*Enforce PKCE S256/gi, '// تطبيق PKCE S256 الإلزامي'],
    [/\/\/\s*Encrypted HttpOnly SameSite cookie/gi, '// ملف كوكيز مشفر HttpOnly و SameSite'],

    // Node.js (openid-client)
    [/\/\/\s*1\.\s*Auto-discover OIDC endpoints via Discovery URL/gi, '// 1. اكتشاف نقاط OIDC تلقائياً عبر Discovery URL'],
    [/\/\/\s*Node\.js openid-client Configuration/gi, '// تهيئة مكتبة openid-client في Node.js'],
    [/\/\/\s*Confidential client secret/gi, '// السر المشفر للعميل السري (Client Secret)'],
    [/\/\/\s*2\.\s*Login Route:\s*Generate PKCE & Redirect/gi, '// 2. مسار تسجيل الدخول: توليد PKCE وإعادة التوجيه'],
    [/\/\/\s*Generate PKCE code_verifier and S256 code_challenge/gi, '// توليد PKCE code_verifier وحساب code_challenge بطريقة S256'],
    [/\/\/\s*Generate PKCE parameters and store in session/gi, '// توليد معاملات PKCE وحفظها في الجلسة'],
    [/\/\/\s*Store verifier, state, and nonce in server-side session/gi, '// حفظ verifier و state و nonce في جلسة الخادم'],
    [/\/\/\s*Build authorization URL with PKCE parameters/gi, '// بناء رابط التفويض مع معاملات PKCE'],
    [/\/\/\s*3\.\s*UserInfo Claims Endpoint \(Node\.js\)/gi, '// 3. نقطة مطالب المستخدم UserInfo (في Node.js)'],
    [/\/\/\s*Queries \/userinfo using the Bearer access_token/gi, '// يستعلم نقطة /userinfo باستخدام Bearer access_token'],
    [/\/\/\s*4\.\s*Refresh Token Rotation \(Node\.js openid-client\)/gi, '// 4. تدوير رمز التحديث (Node.js openid-client)'],
    [/\/\/\s*Sends POST \/token \(grant_type=refresh_token\) and gets rotated tokens/gi, '// يرسل طلب POST /token (grant_type=refresh_token) ويستلم توكنات مجددة'],
    [/\/\/\s*Store new rotated refresh token/gi, '// حفظ رمز التحديث الجديد المدوّر'],
    [/\/\/\s*Step 1:\s*Revoke token at IdP/gi, '// الخطوة 1: إبطال التوكن لدى مزود الهوية IdP'],
    [/\/\/\s*Step 2:\s*Destroy local session & redirect to IdP End Session Endpoint/gi, '// الخطوة 2: تدمير الجلسة المحلية والتحويل لنقطة إنهاء الجلسة'],
    [/\/\/\s*6\.\s*Callback Route:\s*Exchange Code \+ Verifier for Tokens/gi, '// 6. مسار Callback: تبادل الرمز مع Verifier لاستلام التوكنات'],

    // Python (FastAPI / Authlib)
    [/^#\s*1\.\s*FastAPI \+ Authlib OIDC Configuration with PKCE/gmi, '# 1. تهيئة FastAPI + Authlib مع PKCE S256'],
    [/^#\s*Python FastAPI \/ Authlib/gmi, '# كود Python FastAPI مع مكتبة Authlib'],
    [/^#\s*Enforce PKCE S256!/gmi, '# تطبيق PKCE S256 الإلزامي!'],
    [/^#\s*2\.\s*Login Route:\s*Automatically generates PKCE & redirects/gmi, '# 2. مسار تسجيل الدخول: يولد PKCE تلقائياً ويعيد التوجيه'],
    [/^#\s*3\.\s*UserInfo Endpoint Claims Fetching \(Python\)/gmi, '# 3. جلب مطالب نقطة UserInfo (بايثون)'],
    [/^#\s*Fetch profile claims from \/userinfo endpoint/gmi, '# جلب بيانات الملف الشخصي من نقطة /userinfo'],
    [/^#\s*4\.\s*Refresh Token Rotation \(Python\)/gmi, '# 4. تدوير رمز التحديث Refresh Token Rotation (بايثون)'],
    [/^#\s*POST to \/token endpoint with grant_type=refresh_token/gmi, '# إرسال POST لنقطة /token مع grant_type=refresh_token'],
    [/^#\s*Store rotated refresh token/gmi, '# حفظ رمز التحديث الجديد'],
    [/^#\s*5\.\s*Logout with Token Revocation \(RFC 7009\) & SSO End Session/gmi, '# 5. تسجيل الخروج وإبطال التوكنات وإنهاء الجلسة SSO'],
    [/^#\s*Step 1:\s*Revoke token on IdP/gmi, '# الخطوة 1: إبطال التوكن على مزود الهوية IdP'],
    [/^#\s*Step 2:\s*Clear local session & redirect to IdP logout/gmi, '# الخطوة 2: مسح الجلسة المحلية والتحويل لصفحة تسجيل خروج IdP'],
    [/^#\s*6\.\s*Callback Route:\s*Exchanges Code \+ Verifier & Validates JWT/gmi, '# 6. مسار Callback: تبادل الرمز والتحقق من صحة JWT'],

    // Java Spring Boot 3
    [/<!--\s*pom\.xml\s*-->/gi, '<!-- ملف pom.xml لتضمين مكتبات Maven -->'],
    [/^#\s*1\.\s*application\.yml Configuration/gmi, '# 1. ملف إعدادات application.yml'],
    [/^#\s*Spring Boot automatically queries \/\.well-known\/openid-configuration/gmi, '# يستعلم Spring Boot نقطة openid-configuration تلقائياً'],
    [/^#\s*and automatically enforces PKCE S256 for code exchanges!/gmi, '# ويطبق PKCE S256 تلقائياً عند تبادل الرموز!'],
    [/\/\/\s*2\.\s*Security Configuration Class \(SecurityConfig\.java\)/gi, '// 2. فئة إعدادات الأمان (SecurityConfig.java)'],
    [/\/\/\s*Automatically registers OIDC Login endpoints with PKCE S256/gi, '// يسجل نقاط تسجيل الدخول لـ OIDC مع PKCE S256 تلقائياً'],
    [/\/\/\s*3\.\s*UserInfo Claims Extraction \(Java Spring Security\)/gi, '// 3. استخراج مطالب UserInfo (في Spring Security)'],
    [/\/\/\s*Spring Security automatically fetches claims from \/userinfo when configured/gi, '// يجلب Spring Security المطالب من /userinfo تلقائياً عند تهيئته'],
    [/\/\/\s*4\.\s*Token Refresh via OAuth2AuthorizedClientManager \(Java\)/gi, '// 4. تجديد التوكنات عبر OAuth2AuthorizedClientManager'],
    [/\/\/\s*Spring Security automatically triggers POST \/token grant_type=refresh_token/gi, '// يطلق Spring Security طلب POST /token لتجديد التوكنات تلقائياً'],
    [/\/\/\s*5\.\s*OidcClientInitiatedLogoutSuccessHandler \(Java Spring Boot 3\)/gi, '// 5. معالج تسجيل الخروج OidcClientInitiatedLogoutSuccessHandler'],
    [/\/\/\s*Clears session & redirects to IdP End Session Endpoint with id_token_hint/gi, '// يمسح الجلسة ويعيد التوجيه لنقطة إنهاء الجلسة مع id_token_hint'],
    [/\/\/\s*6\.\s*Accessing Authenticated User Claims \(UserController\.java\)/gi, '// 6. الوصول لمطالب المستخدم المصادق عليه (UserController.java)'],

    // C# ASP.NET Core 8
    [/\/\/\s*1\.\s*Program\.cs in ASP\.NET Core 8/gi, '// 1. ملف Program.cs في ASP.NET Core 8'],
    [/\/\/\s*C# ASP\.NET Core 8 Program\.cs/gi, '// ملف C# ASP.NET Core 8 Program.cs'],
    [/\/\/\s*ENFORCE PKCE S256/gi, '// تطبيق PKCE S256 الإلزامي'],
    [/\/\/\s*Mandatory PKCE S256/gi, '// تطبيق PKCE S256 الإلزامي'],
    [/\/\/\s*Stores tokens in encrypted cookie/gi, '// حفظ التوكنات في ملفات تعريف ارتباط مشفرة'],
    [/\/\/\s*Auto-fetches \/userinfo/gi, '// جلب بيانات /userinfo تلقائياً'],
    [/\/\/\s*2\.\s*Challenge endpoint to trigger OIDC PKCE flow/gi, '// 2. نقطة Challenge لبدء تدفق OIDC مع PKCE'],
    [/\/\/\s*3\.\s*UserInfo Claims in \.NET 8/gi, '// 3. مطالب UserInfo في .NET 8'],
    [/\/\/\s*Since options\.GetClaimsFromUserInfoEndpoint = true:/gi, '// بما أن GetClaimsFromUserInfoEndpoint مفعلة:'],
    [/\/\/\s*4\.\s*Token Refresh in ASP\.NET Core \(\.NET 8\)/gi, '// 4. تجديد التوكنات في ASP.NET Core (.NET 8)'],
    [/\/\/\s*5\.\s*Logout & SignOutAsync \(\.NET 8\)/gi, '// 5. تسجيل الخروج عبر SignOutAsync في (.NET 8)'],
    [/\/\/\s*Destroys local auth cookie and redirects to IdP End Session Endpoint/gi, '// يحذف كوكيز المصادقة المحلية ويعيد التوجيه لنقطة إنهاء الجلسة'],
    [/\/\/\s*6\.\s*Protected Dashboard Endpoint/gi, '// 6. نقطة لوحة التحكم المحمية'],

    // Go (coreos/go-oidc)
    [/\/\/\s*PKCE Helper:\s*generates 43-128 char verifier and S256 challenge/gi, '// دالة مساعدة لـ PKCE: تولد verifier و S256 challenge'],
    [/\/\/\s*Store codeVerifier in secure session cookie/gi, '// حفظ codeVerifier في كوكيز جلسة آمنة'],
    [/\/\/\s*Generate authorization URL with S256 PKCE challenge/gi, '// توليد رابط التفويض مع S256 PKCE challenge'],
    [/\/\/\s*Generate code_verifier & S256 challenge/gi, '// توليد code_verifier وحساب تحدي S256'],
    [/\/\/\s*3\.\s*UserInfo Claims Extraction \(Go coreos\/go-oidc\)/gi, '// 3. استخراج مطالب UserInfo (Go coreos/go-oidc)'],
    [/\/\/\s*4\.\s*Refresh Token Rotation \(Go oauth2\)/gi, '// 4. تدوير رمز التحديث (Go oauth2)'],
    [/\/\/\s*TokenSource automatically sends POST \/token with refresh_token if expired/gi, '// يرسل TokenSource طلب POST /token تلقائياً عند انتهاء صلاحية التوكن'],
    [/\/\/\s*5\.\s*Logout & IdP End Session \(Go\)/gi, '// 5. تسجيل الخروج وإنهاء الجلسة لدى IdP (Go)'],
    [/\/\/\s*1\.\s*Clear session cookies/gi, '// 1. مسح ملفات تعريف ارتباط الجلسة'],
    [/\/\/\s*2\.\s*Redirect to IdP End Session Endpoint/gi, '// 2. إعادة التوجيه لنقطة إنهاء الجلسة لدى IdP'],
    [/\/\/\s*6\.\s*Callback Handler:\s*Verify RS256 Signature/gi, '// 6. معالج Callback: التحقق من توقيع RS256'],

    // Mobile (iOS Swift, Android Kotlin, Flutter, React Native)
    [/\/\/\s*Swift Package Manager \(SPM\):/gi, '// مدير حزم Swift (SPM):'],
    [/\/\/\s*Or CocoaPods Podfile:/gi, '// أو عبر CocoaPods Podfile:'],
    [/\/\/\s*OIDC Configuration/gi, '// إعدادات OpenID Connect'],
    [/\/\/\s*AppAuth State & Session holder/gi, '// كائن إدارة حالة وجلسة AppAuth'],
    [/\/\/\s*1\.\s*Discover Endpoints & Start PKCE Login with ASWebAuthenticationSession/gi, '// 1. اكتشاف النقاط وبدء تسجيل الدخول مع ASWebAuthenticationSession'],
    [/\/\/\s*A\.\s*Discover OpenID Provider configuration/gi, '// أ. اكتشاف إعدادات مزود OpenID'],
    [/\/\/\s*B\.\s*Generate PKCE S256 Code Verifier & Challenge automatically!/gi, '// ب. توليد PKCE S256 Code Verifier و Challenge تلقائياً!'],
    [/\/\/\s*AppAuth-iOS automatically creates 128-byte cryptographic verifier/gi, '// تنشئ AppAuth-iOS مفتاح verifier تشفيري عشوائي بطول 128 بايت'],
    [/\/\/\s*and S256 challenge under the hood\./gi, '// وحساب تحدي S256 تلقائياً تحت الغطاء.'],
    [/\/\/\s*Public client:\s*NO secret!/gi, '// عميل عمومي: بدون سر خادم (No Secret)!'],
    [/\/\/\s*C\.\s*Launch secure system browser \(ASWebAuthenticationSession\)/gi, '// ج. إطلاق متصفح النظام الآمن (ASWebAuthenticationSession)'],
    [/\/\/\s*Save tokens in iOS Secure Keychain/gi, '// حفظ التوكنات في سلسلة المفاتيح الآمنة iOS Keychain'],
    [/\/\/\s*3\.\s*Fetch UserInfo Claims in Swift/gi, '// 3. جلب مطالب UserInfo بلغة Swift'],
    [/\/\/\s*4\.\s*Automatic Token Refresh & Rotation in Swift/gi, '// 4. التجديد والتدوير التلقائي للتوكنات في Swift'],
    [/\/\/\s*AppAuth automatically checks expiration and sends POST \/token with grant_type=refresh_token/gi, '// تتحقق AppAuth تلقائياً من الصلاحية وترسل POST /token'],
    [/\/\/\s*Save new rotated tokens/gi, '// حفظ التوكنات المدوّرة الجديدة'],
    [/\/\/\s*5\.\s*Logout & Revoke in iOS/gi, '// 5. تسجيل الخروج والإبطال في iOS'],
    [/\/\/\s*A\.\s*Revoke token on IdP/gi, '// أ. إبطال التوكن على مزود الهوية IdP'],
    [/\/\/\s*POST to \/revoke/gi, '// إرسال طلب POST لنقطة /revoke'],
    [/\/\/\s*B\.\s*Launch End Session Request/gi, '// ب. إطلاق طلب إنهاء الجلسة End Session'],
    [/\/\/\s*Clear Keychain/gi, '// مسح التوكنات من Keychain'],
    [/\/\/\s*6\.\s*AppDelegate \/ SceneDelegate Deep Link Handler/gi, '// 6. معالج الروابط العميقة Deep Link في AppDelegate'],
    [/\/\/\s*build\.gradle\.kts \(Module:\s*app\)/gi, '// ملف build.gradle.kts (Module: app)'],
    [/<!--\s*AndroidManifest\.xml Configuration\s*-->/gi, '<!-- إعدادات ملف AndroidManifest.xml -->'],
    [/<!--\s*AppAuth Redirect Receiver Activity\s*-->/gi, '<!-- نشاط استقبال إعادة التوجيه لـ AppAuth -->'],
    [/\/\/\s*1\.\s*Initiate PKCE Login in MainActivity\.kt/gi, '// 1. بدء تسجيل الدخول بـ PKCE في MainActivity.kt'],
    [/\/\/\s*3\.\s*UserInfo Claims Request in Kotlin/gi, '// 3. طلب مطالب UserInfo بلغة Kotlin'],
    [/\/\/\s*4\.\s*Token Refresh with Rotation in Android Kotlin/gi, '// 4. تجديد التوكنات وتدويرها في Android Kotlin'],
    [/\/\/\s*AppAuth automatically executes POST \/token \(grant_type=refresh_token\)/gi, '// تنفذ AppAuth طلب POST /token تلقائياً لتجديد التوكنات'],
    [/\/\/\s*Save newly rotated refresh token to EncryptedSharedPreferences/gi, '// حفظ رمز التحديث المدوّر في EncryptedSharedPreferences'],
    [/\/\/\s*5\.\s*Logout & End Session in Kotlin/gi, '// 5. تسجيل الخروج وإنهاء الجلسة في Kotlin'],
    [/\/\/\s*Clear EncryptedSharedPreferences/gi, '// مسح التخزين المشفر EncryptedSharedPreferences'],
    [/\/\/\s*6\.\s*Token Exchange & Encrypted Storage/gi, '// 6. تبادل التوكنات والتخزين المشفر في KeyStore'],
    [/\/\/\s*3\.\s*UserInfo in React Native/gi, '// 3. جلب بيانات UserInfo في React Native'],
    [/\/\/\s*4\.\s*Refresh Token Rotation in React Native/gi, '// 4. تدوير رمز التحديث في React Native'],
    [/\/\/\s*Update secure Keychain storage with rotated refresh token/gi, '// تحديث Keychain برمز التحديث الجديد المدوّر'],
    [/\/\/\s*5\.\s*Logout & Revoke in React Native/gi, '// 5. تسجيل الخروج والإبطال في React Native'],
    [/\/\/\s*pubspec\.yaml/gi, '// ملف pubspec.yaml'],
    [/\/\/\s*3\.\s*UserInfo Claims in Flutter/gi, '// 3. مطالب UserInfo في Flutter'],
    [/\/\/\s*4\.\s*Refresh Token Rotation in Flutter/gi, '// 4. تدوير رمز التحديث في Flutter'],
    [/\/\/\s*5\.\s*Logout & Revoke in Flutter/gi, '// 5. تسجيل الخروج والإبطال في Flutter'],
    [/\/\/\s*Revoke Refresh Token on IdP/gi, '// إبطال رمز التحديث على مزود الهوية IdP'],
    [/\/\/\s*End Session SSO/gi, '// إنهاء جلسة تسجيل الدخول الموحد SSO'],
    [/\/\/\s*1\.\s*Generate high-entropy code_verifier/gi, '// 1. توليد code_verifier عالي الإنتروبيا'],
    [/\/\/\s*2\.\s*Compute SHA-256 code_challenge/gi, '// 2. حساب بصمة SHA-256 لـ code_challenge'],
    [/\/\/\s*3\.\s*Launch Authorization Request/gi, '// 3. إطلاق طلب التفويض (Authorization Request)']
  ],

  /**
   * Localizes comments within source code blocks based on active language
   */
  localizeCodeComments(codeStr) {
    if (!codeStr || typeof codeStr !== 'string') return codeStr;
    const isAr = (this.currentLang || 'ar') === 'ar';
    if (!isAr) return codeStr;

    let localized = codeStr;
    for (const [pattern, replacement] of this.commentTranslationsAr) {
      localized = localized.replace(pattern, replacement);
    }
    return localized;
  }
};
