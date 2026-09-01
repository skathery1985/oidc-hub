/**
 * Comprehensive Certified SDK Catalog, Configuration Blueprints & Multi-Language Demos
 * Covers OpenID Foundation Certified libraries across SPA, Non-SPA, iOS, Android, and Cross-Platform.
 */

window.BRAND_LOGOS = {
  flutter: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.07 11.536L8.01 17.91l3.684 3.702 3.68-3.682 6.31-6.394h-7.3z" fill="#02569B"/><path d="M11.694 21.612L15.378 24h7.308l-6.314-6.394-6.372 4.006z" fill="#0175C2"/><path d="M8.01 17.91l3.684 3.702 3.68-3.682-3.68-3.702-3.684 3.682z" fill="#29B6F6"/></svg>`,
  ios: `<svg class="w-8 h-8 flex-shrink-0 text-slate-800 dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.14.65-2.73 1.35-.53.61-.98 1.68-.93 2.7.07 0 .15.01.23.01.83 0 1.81-.44 2.42-1.19z"/></svg>`,
  android: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#3DDC84"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1557-.2699.0634-.6139-.2064-.7696-.2698-.1557-.6138-.0633-.7695.2064l-2.0238 3.5053c-1.3917-.635-2.9298-.9873-4.5778-.9873s-3.1861.3523-4.5778.9873L5.2984 5.3013c-.1557-.2697-.4997-.3621-.7695-.2064-.2698.1557-.3621.4997-.2064.7696l1.996 3.4572C2.7161 11.2933.2721 15.6174 0 20.6725h24c-.2721-5.0551-2.7161-9.3792-6.1185-11.3511"/></svg>`,
  react: `<svg class="w-8 h-8 flex-shrink-0" viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
  nodejs: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#339933"><path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm-1.12 18.37c-3.18 0-4.88-1.55-4.88-4.42 0-2.85 1.7-4.42 4.88-4.42 3.16 0 4.86 1.57 4.86 4.42 0 2.87-1.7 4.42-4.86 4.42z"/></svg>`,
  python: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24"><path d="M11.91 0C5.55 0 5.92 2.76 5.92 2.76l.01 2.86h6.08v.86H3.59S0 6.08 0 12.48c0 6.4 3.13 6.18 3.13 6.18h1.87v-2.62s-.1-3.13 3.08-3.13h5.27s2.96.05 2.96-2.88V3.03S16.78 0 11.91 0zm-3.28 1.9a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z" fill="#3776AB"/><path d="M12.09 24c6.36 0 5.99-2.76 5.99-2.76l-.01-2.86H12v-.86h8.42s3.59.4 3.59-6c0-6.4-3.13-6.18-3.13-6.18h-1.87v2.62s.1 3.13-3.08 3.13H10.66s-2.96-.05-2.96 2.88v7.02s-.47 3.03 4.39 3.03zm3.28-1.9a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" fill="#FFD43B"/></svg>`,
  spring: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#6DB33F"><path d="M21.57 14.73c-.92 2.65-2.84 4.79-5.38 6.01-1.3.62-2.71.95-4.14.96-5.84 0-10.59-4.75-10.59-10.59 0-3.32 1.54-6.39 4.14-8.38 1.48-1.13 3.25-1.83 5.12-2.02.47-.05.95-.08 1.43-.08 5.84 0 10.59 4.75 10.59 10.59 0 1.23-.21 2.45-.63 3.61-.17.47-.38.92-.63 1.34l-.01.02c.03-.02.06-.04.1-.06.01 0 .02-.01.03-.01.21-.11.39-.28.51-.48.24-.4.27-.89.09-1.32-.17-.4-.52-.7-.94-.8-.42-.1-.87-.01-1.21.23-.35.25-.56.65-.56 1.08 0 .2.05.4.14.58.18.37.52.63.92.73.4.1.82.02 1.15-.22.34-.24.55-.62.58-1.03.03-.41-.12-.81-.41-1.1-.3-.29-.71-.44-1.13-.41-.41.03-.79.23-1.04.56-.25.33-.33.75-.22 1.16.11.41.39.74.77.92.38.17.81.16 1.18-.04.38-.19.64-.54.71-.96.07-.42-.06-.85-.35-1.16-.29-.31-.7-.47-1.13-.44-.43.03-.82.25-1.07.6-.25.35-.32.79-.19 1.21.13.42.43.75.83.9.4.15.84.11 1.2-.11.36-.22.59-.6.63-1.02.04-.42-.11-.84-.42-1.13-.31-.29-.73-.43-1.15-.38z"/></svg>`,
  dotnet: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#512BD4"><path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm7.84 15.65h-2.11l-3.32-5.46v5.46h-2.22V8.35h2.16l3.27 5.37V8.35h2.22zm-9.36 0H4.16V8.35h6.32v1.94H6.38v1.64h3.69v1.89H6.38v1.83h4.1z"/></svg>`,
  go: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#00ADD8"><path d="M1.811 10.231c.427 0 .859.102 1.246.331l2.457 1.418a2.531 2.531 0 0 1 1.266 2.193v2.836c0 .907-.484 1.745-1.266 2.197L3.057 20.62a2.536 2.536 0 0 1-2.512 0L.088 20.354A.824.824 0 0 1 0 19.64V11.05c0-.455.368-.824.824-.824l.987.005zm14.12 3.66a2.766 2.766 0 0 1 2.378-1.378c1.536 0 2.78 1.246 2.78 2.78v.22h-5.558v-.22c0-.528.146-1.02.4-1.402zm8.069 1.402c0-3.082-2.5-5.578-5.578-5.578a5.58 5.58 0 0 0-5.578 5.578c0 3.082 2.5 5.578 5.578 5.578a5.55 5.55 0 0 0 4.14-1.848l-1.92-1.532a3.15 3.15 0 0 1-2.22.98 3.19 3.19 0 0 1-3.178-2.778h8.758v-.4z"/></svg>`,
  angular: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none"><path d="M12 2.5L2.5 5.86L3.95 17.5L12 21.5L20.05 17.5L21.5 5.86L12 2.5Z" fill="#DD0031"/><path d="M12 2.5V21.5L20.05 17.5L21.5 5.86L12 2.5Z" fill="#C3002F"/><path d="M12 6.5L6.85 17.5H8.95L10.05 14.8H13.95L15.05 17.5H17.15L12 6.5ZM13.3 13.1H10.7L12 9.5L13.3 13.1Z" fill="white"/></svg>`,
  js: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M6.5 17.5c0 1.5 1 2.5 2.5 2.5 1.7 0 2.5-1 2.5-2.5V11H9.8v6.5c0 .6-.3.9-.8.9s-.8-.3-.8-.9V14H6.5v3.5zm7.3 1.2c.8.8 1.9 1.3 3.2 1.3 2 0 3.3-1 3.3-2.7 0-1.6-1-2.2-2.5-2.8l-.5-.2c-.8-.3-1.2-.6-1.2-1.2 0-.6.5-1 1.2-1 .7 0 1.3.3 1.8.8l1.2-1.2c-.8-.8-1.8-1.2-3-1.2-2 0-3.1 1.2-3.1 2.6 0 1.5.9 2.2 2.3 2.8l.5.2c.9.4 1.4.7 1.4 1.3 0 .7-.6 1.1-1.4 1.1-.9 0-1.6-.4-2.2-1.1l-1.1 1.2z" fill="#000"/></svg>`,
  java: `<svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#EA2D2E"><path d="M8.85 16.34s-.42.23-.23.36c.8 1.05 3.32.74 4.54.51 1.48-.28 3.52-.96 4.79-.19 0 0 .34-.41-.21-.61-1.39-.51-3.69-.17-5.06-.06-1.57.13-3.13-.01-3.83-.01zm-.72 2.65s-.57.34-.14.48c1.36.45 3.57.39 5.48.24 1.94-.15 4.39-.77 5.37.38 0 0 .26-.41-.33-.66-1.31-.55-3.32-.47-5.01-.39-1.92.1-4.04.14-5.37-.05zm8.93 2.72c-.89.58-2.61.85-4.03.9-1.7.07-3.61-.06-5.11-.64-.26-.1-.45.02-.45.02s-.16.19.12.33c1.78.88 4.29.98 6.39.75 2.1-.23 3.99-.96 4.14-1.28.16-.36-.06-.5-.06-.5s-.45.1-.99.42zM12.9 6.22c.98.98.47 2.06.47 2.06s1.61-1.12.82-2.3c-.83-1.24-2.14-1.9-2.14-1.9s.61.91.85 2.14zm4.27 4.29s.89-.92-.51-2.17c-1.74-1.57-2.67-2.02-4.02-3.33-1.1-1.07-.63-2.6-.63-2.6s-.39.46-.22 1.54c.21 1.34 1.45 2.45 2.53 3.34 1.42 1.18 2.85 2.22 2.85 3.22zm-7.66 4.41s-1.85-.35-2.65.68c-.68.87-.22 1.77.29 2.5 0 0-.15-.22-.05-.48.16-.43.76-.84 1.14-.99.58-.23 1.49-.3 1.89-.55.51-.31.38-.86.38-.86s-.34.02-1-.3zm4.61-3.13s1.77-1.15.52-2.91c-.88-1.24-1.63-1.68-2.58-2.58-1.03-.98-1.08-1.93-1.08-1.93s-.36.79.44 1.94c.82 1.18 1.63 1.73 2.39 2.76 1.02 1.39.31 2.72.31 2.72z"/></svg>`,
  nextjs: `<svg class="w-8 h-8 flex-shrink-0 text-black dark:text-white" viewBox="0 0 180 180" fill="none"><mask id="mask0_next" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black"/></mask><g mask="url(#mask0_next)"><circle cx="90" cy="90" r="90" fill="currentColor" fill-opacity="0.1"/><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.168 149.508 157.52Z" fill="currentColor"/><path d="M115 54H127V126H115V54Z" fill="currentColor"/></g></svg>`,
  github: `<svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`
};

window.SDK_CATALOG = [
  // =========================================================================
  // 1. SPA - Single Page Applications
  // =========================================================================
  {
    id: 'spa-oidc-client-ts',
    category: 'spa',
    logoKey: 'react',
    shortName: 'React / TypeScript',
    libName: 'oidc-client-ts',
    brandGradient: 'from-[#0369a1] to-[#0284c7]',
    name: 'oidc-client-ts (React / TS / Vue)',
    certified: true,
    certificationName: 'OpenID Certified (JavaScript)',
    badge: 'React / TypeScript',
    badge_ar: 'React / TypeScript',
    language: 'TypeScript / JavaScript',
    framework: 'React / Vue / Angular / Vanilla',
    npmPackage: 'oidc-client-ts / react-oidc-context',
    github: 'https://github.com/authts/oidc-client-ts',
    description: 'The industry-standard OpenID Certified TypeScript library for Single Page Applications (SPA). Handles PKCE S256 code verifier/challenge generation, silent token renew via Web Worker or iframe, state validation, and secure in-memory storage.',
    description_ar: 'المكتبة القياسية والمعتمدة رسمياً من OpenID Foundation للغة TypeScript لتطبيقات الصفحة الواحدة (SPA). تدعم توليد PKCE S256 (code_verifier و code_challenge) والتجديد الصامت للتوكنات والتحقق من صحة ID Token والتخزين الآمن في الذاكرة.',
    securityModel: {
      type: 'Public Client',
      type_ar: 'عميل عام (Public Client)',
      clientSecret: 'Forbidden / Never exposed (No secret is used in SPAs)',
      clientSecret_ar: 'محظور / لا يُستخدم أبداً في تطبيقات SPA العامة',
      pkceEnforced: 'Mandatory (S256)',
      pkceEnforced_ar: 'إلزامي (Mandatory S256)',
      tokenStorage: 'In-Memory / WebStorage (SessionStorage recommended; avoid LocalStorage due to XSS vulnerability). Best Practice: BFF (Backend For Frontend).',
      tokenStorage_ar: 'في الذاكرة (In-Memory) / SessionStorage. يُنصح بتجنب LocalStorage لتفادي ثغرات XSS. النمط المعماري الأفضل: BFF (Backend For Frontend).',
      redirectHandler: 'Browser popup or URL redirect with hash/query parsing'
    },
    installCmd: 'npm install oidc-client-ts react-oidc-context',
    configCode: `import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
 
// 1. Configure the OIDC Client with PKCE enabled
const oidcConfig = {
  authority: 'http://localhost:3000/mock-idp', // OIDC Issuer URL
  client_id: 'my-spa-client-id',
  redirect_uri: 'http://localhost:3000/callback.html',
  post_logout_redirect_uri: 'http://localhost:3000/',
  response_type: 'code', // Authorization Code Flow
  scope: 'openid profile email offline_access',
  
  // PKCE Settings (Enabled by default in oidc-client-ts)
  // Generates S256 code_challenge and stores code_verifier in sessionStorage
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  
  // Automatic Silent Token Renewal
  automaticSilentRenew: true,
  silent_redirect_uri: 'http://localhost:3000/silent-renew.html',
  
  // Security checks
  filterProtocolClaims: true,
  loadUserInfo: true
};

export const userManager = new UserManager(oidcConfig);`,
    loginCode: `// 2. Trigger Login (Redirects with PKCE parameters)
export async function login() {
  await userManager.signinRedirect();
}`,
    userinfoCode: `// 3. UserInfo Claims Query (oidc-client-ts)
export async function fetchUserInfo() {
  // Queries /userinfo using in-memory access token
  const user = await userManager.getUser();
  if (user) {
    console.log('UserInfo Claims:', user.profile);
    return user.profile;
  }
}`,
    refreshCode: `// 4. Silent Token Refresh & Rotation (oidc-client-ts)
export async function refreshTokens() {
  // Executes token refresh in background via Refresh Token Rotation or hidden iframe
  const refreshedUser = await userManager.signinSilent();
  console.log('Rotated Access Token:', refreshedUser.access_token);
  return refreshedUser;
}`,
    logoutCode: `// 5. Logout & Revoke (oidc-client-ts)
export async function logout() {
  // Automatically revokes tokens and redirects to IdP End Session Endpoint
  await userManager.signoutRedirect();
}`,
    callbackCode: `// 6. Callback Handler (e.g. callback.html or /callback route)
export async function handleCallback() {
  try {
    const user = await userManager.signinCallback();
    console.log('Signed in user:', user.profile);
    return user;
  } catch (error) {
    console.error('OIDC Login failed:', error);
    throw error;
  }
}`
  },

  {
    id: 'spa-angular-auth-oidc',
    category: 'spa',
    logoKey: 'angular',
    shortName: 'Angular',
    libName: 'angular-auth-oidc-client',
    brandGradient: 'from-[#be123c] to-[#e11d48]',
    name: 'angular-auth-oidc-client (Angular 17/18/19+)',
    certified: true,
    certificationName: 'OpenID Certified (Angular)',
    badge: 'Angular (Standalone)',
    badge_ar: 'Angular (Standalone)',
    language: 'TypeScript',
    framework: 'Angular 17+ / 18+ / 19+ (Standalone)',
    npmPackage: 'angular-auth-oidc-client',
    github: 'https://github.com/damienbod/angular-auth-oidc-client',
    description: 'The official OpenID Certified, modern Angular standalone library supporting Angular 17, 18, and 19. Features provideAuth(), standalone components, PKCE S256, auto silent token renewal, Auth Guards, and interceptors.',
    description_ar: 'المكتبة المعتمدة رسمياً من OpenID Foundation لتطبيقات Angular الحديثة (إصدارات 17 و 18 و 19). تدعم مزودات standalone عبر provideAuth()، والتحقق التلقائي مع PKCE S256، والتجديد الصامت للتوكنات وحراس التوجيه (Auth Guards).',
    securityModel: {
      type: 'Public Client',
      type_ar: 'عميل عام (Public Client)',
      clientSecret: 'Forbidden / Never exposed in SPA',
      clientSecret_ar: 'محظور / لا يُستخدم أبداً في تطبيقات SPA العامة',
      pkceEnforced: 'Mandatory (S256)',
      pkceEnforced_ar: 'إلزامي (Mandatory S256)',
      tokenStorage: 'In-Memory / SessionStorage (Auto-managed with refresh rotation)',
      tokenStorage_ar: 'في الذاكرة (In-Memory) / SessionStorage مع تجديد تلقائي',
      redirectHandler: 'Angular Router + OidcSecurityService.checkAuth()'
    },
    installCmd: 'npm install angular-auth-oidc-client',
    configCode: `// 1. app.config.ts (Angular 17/18/19 Standalone Configuration)
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth, LogLevel } from 'angular-auth-oidc-client';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    // Modern Standalone OpenID Connect Provider with PKCE
    provideAuth({
      config: {
        authority: 'http://localhost:3000/mock-idp', // OIDC Issuer Discovery
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'angular-pkce-client',
        scope: 'openid profile email offline_access',
        responseType: 'code', // Authorization Code Flow
        
        // PKCE Enforced by default (S256)
        silentRenew: true,
        useRefreshToken: true,
        autoUserInfo: true,
        logLevel: LogLevel.Warn,
      },
    }),
  ],
};`,
    loginCode: `// 2. app.component.ts (Angular Component with Signal/Observable Support)
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="auth-box">
      <h2>Angular OIDC Standalone</h2>
      @if ((auth$ | async)?.isAuthenticated) {
        <button (click)="logout()">Sign Out</button>
      } @else {
        <button (click)="login()">Sign In with Angular PKCE</button>
      }
    </div>
  \`
})
export class AppComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  
  // Observable tracking authentication state and ID Token claims
  readonly auth$ = this.oidcSecurityService.checkAuth();

  ngOnInit() {
    // Automatically handles PKCE token exchange upon redirect callback
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
      console.log('Angular Auth Status:', isAuthenticated, userData);
    });
  }

  login() {
    // Generates S256 code_challenge and redirects to Issuer
    this.oidcSecurityService.authorize();
  }

  logout() {
    // Revokes tokens and initiates RP-Initiated Logout
    this.oidcSecurityService.logoff().subscribe();
  }
}`,
    userinfoCode: `// 3. User Claims Query (Angular Service)
import { inject, Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly oidc = inject(OidcSecurityService);

  // Observable of normalized UserInfo Claims (sub, name, email, roles)
  readonly userData$ = this.oidc.userData$;
  readonly idTokenClaims$ = this.oidc.getPayloadFromIdToken();
}`,
    refreshCode: `// 4. Manual / Silent Token Refresh (Angular)
export function triggerSilentRefresh(oidcSecurityService: OidcSecurityService) {
  // Silent renewal via Refresh Token Rotation or Iframe
  return oidcSecurityService.forceMachineToServer().subscribe((result) => {
    console.log('Rotated Access Token:', result.accessToken);
  });
}`,
    logoutCode: `// 5. RP-Initiated Logout & Revocation (Angular)
export function performLogout(oidcSecurityService: OidcSecurityService) {
  // Revokes tokens in sessionStorage and redirects to IdP End Session Endpoint
  oidcSecurityService.logoffAndRevokeTokens().subscribe();
}`,
    callbackCode: `// 6. Auth Guard Protection (app.routes.ts)
import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [autoLoginPartialRoutesGuard] // Automatically redirects unauthenticated users to OIDC login
  }
];`
  },

  {
    id: 'spa-vanilla-crypto',
    category: 'spa',
    logoKey: 'js',
    shortName: 'Vanilla JS',
    libName: 'Web Crypto API',
    brandGradient: 'from-[#b45309] to-[#d97706]',
    name: 'Vanilla JS (Zero-Dependency Web Crypto PKCE)',
    certified: true,
    certificationName: 'Pure RFC 7636 Web Standards',
    badge: 'Vanilla JavaScript',
    badge_ar: 'Vanilla JavaScript',
    language: 'JavaScript / TypeScript',
    framework: 'Any / Framework-Agnostic',
    npmPackage: 'None (Built into modern browsers)',
    github: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API',
    description: 'Learn exactly how PKCE works under the hood! Direct implementation using the browser standard window.crypto.subtle API with no external packages required.',
    description_ar: 'تعلم كيف يعمل PKCE بالتفصيل تحت الغطاء! تطبيق مباشر ومتكامل اعتماداً على واجهة Web Crypto API (window.crypto.subtle) القياسية في المتصفحات دون أي مكتبات خارجية.',
    securityModel: {
      type: 'Public Client',
      type_ar: 'عميل عام (Public Client)',
      clientSecret: 'None',
      clientSecret_ar: 'لا يوجد',
      pkceEnforced: 'Mandatory (S256)',
      pkceEnforced_ar: 'إلزامي (Mandatory S256)',
      tokenStorage: 'SessionStorage / Memory',
      tokenStorage_ar: 'في الذاكرة (In-Memory) / SessionStorage مؤقتاً أثناء التوجيه',
      redirectHandler: 'Custom URLSearchParams parser'
    },
    installCmd: '# No installation required - 100% native Web Crypto API',
    configCode: `// 1. Pure Web Crypto PKCE Helpers (RFC 7636)
function generateRandomString(length = 64) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = new Uint8Array(length);
  window.crypto.getRandomValues(values);
  return Array.from(values, x => charset[x % charset.length]).join('');
}

function base64UrlEncode(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, '');
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
}`,
    loginCode: `// 2. Start Authorization Flow
async function startPkceLogin() {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateRandomString(32);
  const nonce = generateRandomString(32);

  sessionStorage.setItem('pkce_verifier', codeVerifier);
  sessionStorage.setItem('pkce_state', state);

  const authUrl = new URL('http://localhost:3000/mock-idp/authorize');
  authUrl.searchParams.set('client_id', 'vanilla-pkce-client');
  authUrl.searchParams.set('redirect_uri', window.location.origin + '/callback.html');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid profile email offline_access');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('nonce', nonce);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  window.location.href = authUrl.toString();
}`,
    userinfoCode: `// 3. Fetch UserInfo with Access Token
async function fetchUserInfo(accessToken) {
  const res = await fetch('http://localhost:3000/mock-idp/userinfo', {
    headers: { Authorization: \`Bearer \${accessToken}\` }
  });
  return await res.json();
}`,
    refreshCode: `// 4. Refresh Token Rotation (Vanilla JS Fetch)
async function refreshTokens(refreshToken) {
  const res = await fetch('http://localhost:3000/mock-idp/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: 'vanilla-pkce-client',
      refresh_token: refreshToken
    })
  });
  const newTokens = await res.json();
  console.log('Rotated Tokens:', newTokens);
  return newTokens;
}`,
    logoutCode: `// 5. Logout & Revoke in Vanilla JS
async function logout(idToken, refreshToken) {
  // Step 1: Revoke token
  if (refreshToken) {
    await fetch('http://localhost:3000/mock-idp/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token: refreshToken, token_type_hint: 'refresh_token' })
    });
  }

  // Step 2: Clear storage & redirect to IdP End Session
  sessionStorage.clear();
  window.location.href = \`http://localhost:3000/mock-idp/session/end?id_token_hint=\${idToken}&post_logout_redirect_uri=\${window.location.origin}\`;
}`,
    callbackCode: `// 6. Process Callback on /callback.html
async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const returnedState = params.get('state');

  const savedState = sessionStorage.getItem('pkce_state');
  if (!returnedState || returnedState !== savedState) {
    throw new Error('State mismatch! Possible CSRF attack detected.');
  }

  const codeVerifier = sessionStorage.getItem('pkce_verifier');
  const tokenResponse = await fetch('http://localhost:3000/mock-idp/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: 'vanilla-pkce-client',
      redirect_uri: window.location.origin + '/callback.html',
      code: code,
      code_verifier: codeVerifier
    })
  });

  const tokens = await tokenResponse.json();
  sessionStorage.removeItem('pkce_verifier');
  sessionStorage.removeItem('pkce_state');
  return tokens;
}`
  },

  {
    id: 'backend-nextjs-auth',
    category: 'non-spa',
    logoKey: 'nextjs',
    shortName: 'Next.js',
    libName: 'next-auth (Auth.js)',
    brandGradient: 'from-[#09090b] to-[#27272a]',
    name: 'Next.js 14+ (App Router / Auth.js / NextAuth)',
    certified: true,
    certificationName: 'OpenID Certified Standards (Auth.js)',
    badge: 'Next.js 14+ / Auth.js',
    badge_ar: 'Next.js 14+ / Auth.js',
    language: 'TypeScript / JavaScript',
    framework: 'Next.js 14+ (App Router & Server Components)',
    npmPackage: 'next-auth@beta / @auth/core',
    github: 'https://github.com/nextauthjs/next-auth',
    description: 'The modern Backend For Frontend (BFF) standard for React & Next.js. Implements OpenID Connect Authorization Code Flow with PKCE S256, encrypts session tokens in HttpOnly cookies, and provides type-safe server actions & Server Components auth.',
    description_ar: 'المعيار الحديث لنمط BFF (Backend For Frontend) لتطبيقات React و Next.js. يطبق تدفق Authorization Code Flow مع PKCE S256 تلقائياً، ويشفر التوكنات في ملفات كوكيز HttpOnly محمية من ثغرات XSS، مع دعم كامل لـ Server Components.',
    securityModel: {
      type: 'Confidential Client / BFF (Backend For Frontend)',
      type_ar: 'عميل سري / نمط BFF (Backend For Frontend)',
      clientSecret: 'Stored in server environment (.env.local)',
      clientSecret_ar: 'يُحفظ بأمان في متغيرات بيئة الخادم (.env.local)',
      pkceEnforced: 'Mandatory & Default (PKCE S256)',
      pkceEnforced_ar: 'إلزامي وتلقائي (PKCE S256)',
      tokenStorage: 'Encrypted HttpOnly SameSite Cookie (Immune to XSS)',
      tokenStorage_ar: 'ملف كوكيز مشفر HttpOnly و SameSite (محصن ضد ثغرات XSS)',
      redirectHandler: 'Next.js Route Handler (/api/auth/callback/oidc)'
    },
    installCmd: 'npm install next-auth@beta @auth/core',
    configCode: `// 1. auth.ts (Next.js 14 App Router Root Configuration)
import NextAuth from 'next-auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    {
      id: 'mock-idp',
      name: 'OIDC Mock IdP',
      type: 'oidc',
      issuer: 'http://localhost:3000/mock-idp',
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      
      // Enforce PKCE S256 (Default in Auth.js)
      checks: ['pkce', 'state'],
      
      authorization: {
        params: {
          scope: 'openid profile email offline_access',
          response_type: 'code'
        }
      }
    }
  ],
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET || 'super-secure-jwt-secret'
});`,
    loginCode: `// 2. app/page.tsx (Server Action Login with PKCE S256)
import { signIn } from '@/auth';

export default function LoginPage() {
  return (
    <form action={async () => { 'use server'; await signIn('oidc-provider'); }}>
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">
        Sign In with OIDC + PKCE (S256)
      </button>
    </form>
  );
}`,
    userinfoCode: `// 3. UserInfo Claims Resolution & Profile Extraction
// In auth.ts provider config:
userinfo: 'http://localhost:3000/mock-idp/userinfo',
profile(profile) {
  // profile contains claims fetched with the Access Token from /userinfo
  return {
    id: profile.sub,
    name: profile.name,
    email: profile.email,
    roles: profile.roles ?? ['user'],
    picture: profile.picture
  };
}`,
    refreshCode: `// 4. Refresh Token Rotation (RTR) in NextAuth JWT Callback
async function refreshAccessToken(token: any) {
  const res = await fetch('http://localhost:3000/mock-idp/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.AUTH_OIDC_ID!,
      client_secret: process.env.AUTH_OIDC_SECRET!,
      refresh_token: token.refreshToken
    })
  });
  const refreshed = await res.json();
  if (!res.ok) throw refreshed;

  return {
    ...token,
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token ?? token.refreshToken, // Rotated Refresh Token
    expiresAt: Math.floor(Date.now() / 1000 + refreshed.expires_in)
  };
}

// In callbacks.jwt:
if (Date.now() >= (token.expiresAt as number) * 1000 - 60000) {
  return await refreshAccessToken(token);
}`,
    logoutCode: `// 5. Logout with Token Revocation (RFC 7009) & SSO End Session
'use server';
import { auth, signOut } from '@/auth';

export async function logoutWithRevoke() {
  const session = await auth();
  const refreshToken = (session as any)?.refreshToken;
  const idToken = (session as any)?.idToken;

  // Step A: Revoke refresh token on IdP server
  if (refreshToken) {
    await fetch('http://localhost:3000/mock-idp/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        token: refreshToken,
        token_type_hint: 'refresh_token',
        client_id: process.env.AUTH_OIDC_ID!,
        client_secret: process.env.AUTH_OIDC_SECRET!
      })
    });
  }

  // Step B: Clear local session & redirect to IdP End Session Endpoint
  const idpLogout = new URL('http://localhost:3000/mock-idp/session/end');
  if (idToken) idpLogout.searchParams.set('id_token_hint', idToken);
  idpLogout.searchParams.set('post_logout_redirect_uri', 'http://localhost:3000/');

  await signOut({ redirectTo: idpLogout.toString() });
}`,
    callbackCode: `// 6. Server Component Session Protection (app/dashboard/page.tsx)
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect('/api/auth/signin');

  return <div>Welcome, {session.user?.name}! (Protected via BFF HttpOnly Cookies)</div>;
}`
  },

  {
    id: 'backend-node-openid-client',
    category: 'non-spa',
    logoKey: 'nodejs',
    shortName: 'Node.js',
    libName: 'openid-client',
    brandGradient: 'from-[#14532d] to-[#16a34a]',
    name: 'Node.js / Express (openid-client)',
    certified: true,
    certificationName: 'OpenID Certified (Node.js)',
    badge: 'Node.js',
    badge_ar: 'Node.js',
    language: 'Node.js (JavaScript / TypeScript)',
    framework: 'Express / NestJS / Fastify',
    npmPackage: 'openid-client',
    github: 'https://github.com/panva/node-openid-client',
    description: 'The premier OpenID Certified RP library by Filip Skokan (OpenID Foundation board member). Provides complete Discovery, PKCE generation, JWKS signature verification, and claims validation.',
    description_ar: 'المكتبة الرائدة والمعتمدة رسمياً لـ OpenID Relying Party للمطور Filip Skokan (عضو مجلس إدارة OpenID Foundation). توفر اكتشافاً كاملاً لنقاط Discovery، وتوليد PKCE S256، والتحقق المشفر من توقيعات JWKS ومطالب ID Token.',
    securityModel: {
      type: 'Confidential Client (or Public Backend)',
      type_ar: 'عميل سري (Confidential Client)',
      clientSecret: 'Can use client_secret_post or client_secret_basic (stored securely in server env)',
      clientSecret_ar: 'يمكن استخدام client_secret_post أو client_secret_basic (يُحفظ بأمان في متغيرات بيئة الخادم)',
      pkceEnforced: 'Highly Recommended & Default (RFC 7636 / OAuth 2.1)',
      pkceEnforced_ar: 'موصى به وافتراضي (RFC 7636 / OAuth 2.1)',
      tokenStorage: 'Server-side Encrypted Session Cookie (HttpOnly, Secure, SameSite=Lax/Strict)',
      tokenStorage_ar: 'ملف تعريف ارتباط مشفر للجلسة من جانب الخادم (HttpOnly, Secure, SameSite=Lax)',
      redirectHandler: 'Server-side Express Route Handler'
    },
    installCmd: 'npm install openid-client express express-session',
    configCode: `const express = require('express');
const session = require('express-session');
const { Issuer, generators } = require('openid-client');

const app = express();
app.use(session({ secret: 'some-secret-key', resave: false, saveUninitialized: false }));

let client;
async function initOidc() {
  // 1. Auto-discover endpoints from OIDC Issuer
  const issuer = await Issuer.discover('http://localhost:3000/mock-idp');
  
  // 2. Initialize Relying Party client with PKCE
  client = new issuer.Client({
    client_id: 'node-backend-client',
    client_secret: 'node-super-secret',
    redirect_uris: ['http://localhost:3000/auth/callback'],
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_basic'
  });
}
initOidc();`,
    loginCode: `// 2. Initiate Login Route (/login)
app.get('/login', (req, res) => {
  // Generate PKCE code_verifier and code_challenge (S256)
  const code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);
  const nonce = generators.nonce();
  const state = generators.state();

  // Store verifier and state in server session (immune to client tampering)
  req.session.code_verifier = code_verifier;
  req.session.state = state;
  req.session.nonce = nonce;

  const authUrl = client.authorizationUrl({
    scope: 'openid profile email offline_access',
    code_challenge,
    code_challenge_method: 'S256',
    state,
    nonce
  });

  res.redirect(authUrl);
});`,
    userinfoCode: `// 3. UserInfo Claims Resolution (/api/userinfo)
app.get('/api/userinfo', async (req, res) => {
  if (!req.session.tokenSet) return res.status(401).json({ error: 'Unauthorized' });

  // Query UserInfo endpoint using Bearer Access Token
  const userinfo = await client.userinfo(req.session.tokenSet.access_token);
  console.log('UserInfo claims:', userinfo);
  res.json(userinfo);
});`,
    refreshCode: `// 4. Token Refresh Route (/api/refresh)
app.post('/api/refresh', async (req, res) => {
  if (!req.session.tokenSet?.refresh_token) return res.status(401).send('No refresh token');

  // Exchange Refresh Token for fresh Access Token & rotated Refresh Token
  const refreshedTokenSet = await client.refresh(req.session.tokenSet.refresh_token);
  req.session.tokenSet = refreshedTokenSet;
  res.json({ access_token: refreshedTokenSet.access_token, expires_in: refreshedTokenSet.expires_in });
});`,
    logoutCode: `// 5. Logout & Revoke Route (/logout)
app.get('/logout', async (req, res) => {
  if (req.session.tokenSet?.refresh_token) {
    // Revoke token at authorization server
    await client.revoke(req.session.tokenSet.refresh_token);
  }
  
  // Destroy local server session and redirect to IdP End Session Endpoint
  const endSessionUrl = client.endSessionUrl({ id_token_hint: req.session.tokenSet?.id_token, post_logout_redirect_uri: 'http://localhost:3000/' });
  req.session.destroy(() => {
    res.redirect(endSessionUrl);
  });
});`,
    callbackCode: `// 6. Callback Route (/auth/callback)
app.get('/auth/callback', async (req, res) => {
  const params = client.callbackParams(req);
  
  // Validate state and exchange authorization_code + code_verifier for tokens
  const tokenSet = await client.callback('http://localhost:3000/auth/callback', params, {
    code_verifier: req.session.code_verifier,
    state: req.session.state,
    nonce: req.session.nonce
  });

  req.session.tokenSet = tokenSet;
  console.log('ID Token Claims:', tokenSet.claims());
  res.redirect('/dashboard');
});`
  },

  {
    id: 'backend-python-authlib',
    category: 'non-spa',
    logoKey: 'python',
    shortName: 'Python',
    libName: 'authlib',
    brandGradient: 'from-[#1e3a8a] to-[#2563eb]',
    name: 'Python (Authlib / FastAPI / Flask)',
    certified: true,
    certificationName: 'OpenID Certified (Python)',
    badge: 'Python / FastAPI',
    badge_ar: 'Python / FastAPI',
    language: 'Python 3.9+',
    framework: 'FastAPI / Flask / Django',
    npmPackage: 'authlib, requests, httpx',
    github: 'https://github.com/lepture/authlib',
    description: 'The definitive Python OAuth & OpenID Connect library supporting PKCE, JWT signature validation via JWKS, and seamless integrations with FastAPI, Flask, and Django.',
    description_ar: 'المكتبة القياسية للغة Python لبروتوكولات OAuth و OpenID Connect. تدعم PKCE والتحقق المشفر من توقيعات JWT عبر JWKS مع تكامل مباشر وسلس مع FastAPI و Flask و Django.',
    securityModel: {
      type: 'Confidential Client',
      type_ar: 'عميل سري (Confidential Client)',
      clientSecret: 'Stored in server environment variables (.env)',
      clientSecret_ar: 'يُحفظ بأمان في متغيرات بيئة الخادم (.env)',
      pkceEnforced: 'Enabled via code_challenge_method="S256"',
      pkceEnforced_ar: 'مفعل عبر code_challenge_method="S256"',
      tokenStorage: 'Encrypted Server-side Session / Secure Cookie',
      tokenStorage_ar: 'جلسة خادم مشفرة / ملف تعريف ارتباط آمن HttpOnly',
      redirectHandler: 'FastAPI / Flask route with request.session'
    },
    installCmd: 'pip install authlib httpx uvicorn fastapi itsdangerous',
    configCode: `# 1. main.py (FastAPI + Authlib OIDC Configuration)
from fastapi import FastAPI, Request
from authlib.integrations.starlette_client import OAuth
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="super-secret-session-key")

oauth = OAuth()
oauth.register(
    name='oidc',
    server_metadata_url='http://localhost:3000/mock-idp/.well-known/openid-configuration',
    client_id='python-backend-client',
    client_secret='python-super-secret',
    client_kwargs={
        'scope': 'openid profile email offline_access',
        'code_challenge_method': 'S256' # ENFORCE PKCE S256
    }
)`,
    loginCode: `# 2. FastAPI Login Endpoint
@app.get('/login')
async def login(request: Request):
    redirect_uri = request.url_for('auth_callback')
    # Automatically generates code_verifier and S256 code_challenge
    return await oauth.oidc.authorize_redirect(request, redirect_uri)`,
    userinfoCode: `# 3. UserInfo Claims in Python
@app.get('/api/userinfo')
async def get_userinfo(request: Request):
    user = request.session.get('user')
    if not user:
        return {"error": "Not authenticated"}
    return user`,
    refreshCode: `# 4. Token Refresh in Python (FastAPI)
@app.post('/api/refresh')
async def refresh_token(request: Request):
    token = request.session.get('token')
    if not token or 'refresh_token' not in token:
        return {"error": "No refresh token available"}

    new_token = await oauth.oidc.fetch_access_token(
        grant_type='refresh_token',
        refresh_token=token['refresh_token']
    )
    request.session['token'] = new_token
    return {"status": "refreshed", "access_token": new_token['access_token']}`,
    logoutCode: `# 5. Logout & Session Clearing
@app.get('/logout')
async def logout(request: Request):
    request.session.clear()
    end_session_endpoint = "http://localhost:3000/mock-idp/session/end"
    return {"message": "Logged out successfully", "redirect": end_session_endpoint}`,
    callbackCode: `# 6. Auth Callback Handler
@app.get('/auth/callback')
async def auth_callback(request: Request):
    # Exchanges code + code_verifier and verifies ID token signature via JWKS
    token = await oauth.oidc.authorize_access_token(request)
    user = token.get('userinfo')
    request.session['user'] = user
    request.session['token'] = token
    return {"status": "authenticated", "user": user}`
  },

  {
    id: 'backend-java-spring',
    category: 'non-spa',
    logoKey: 'spring',
    shortName: 'Java (Spring)',
    libName: 'spring-security-oauth2',
    brandGradient: 'from-[#065f46] to-[#059669]',
    name: 'Java (Spring Boot 3 / Spring Security)',
    certified: true,
    certificationName: 'OpenID Certified (Java)',
    badge: 'Java (Spring)',
    badge_ar: 'Java (Spring)',
    language: 'Java 17 / 21',
    framework: 'Spring Boot 3.x + Spring Security 6',
    npmPackage: 'org.springframework.boot:spring-boot-starter-oauth2-client',
    github: 'https://github.com/spring-projects/spring-security',
    description: 'Spring Security OAuth2 Client provides built-in enterprise-grade OpenID Connect 1.0 and PKCE (S256) support out of the box with zero boilerplate.',
    description_ar: 'يوفر عميل Spring Security OAuth2 Client المدمج في Spring Boot 3 دعماً شاملاً لمعيار OpenID Connect 1.0 و PKCE S256 على مستوى المؤسسات وبأقل قدر من الشيفرات البرمجية.',
    securityModel: {
      type: 'Confidential Client',
      type_ar: 'عميل سري (Confidential Client)',
      clientSecret: 'Configured in application.yml or environment properties',
      clientSecret_ar: 'يُضبط في application.yml أو خصائص بيئة التشغيل',
      pkceEnforced: 'Auto-enabled for all authorization code requests in Spring Security 6',
      pkceEnforced_ar: 'مفعل تلقائياً لكافة طلبات رمز التفويض في Spring Security 6',
      tokenStorage: 'HttpSession / Redis / SecurityContextHolder',
      tokenStorage_ar: 'جلسات HttpSession / مخزن Redis الموزع / SecurityContextHolder',
      redirectHandler: 'Spring Security Filter Chain (/login/oauth2/code/*)'
    },
    installCmd: `<!-- Maven pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>`,
    configCode: `# 1. application.yml Configuration
spring:
  security:
    oauth2:
      client:
        registration:
          my-oidc-provider:
            client-id: spring-boot-pkce-client
            client-secret: spring-boot-secret
            client-authentication-method: client_secret_basic
            authorization-grant-type: authorization_code
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
            scope: openid, profile, email
            client-name: My OpenID Provider
        provider:
          my-oidc-provider:
            issuer-uri: http://localhost:3000/mock-idp
            # Spring Boot automatically queries /.well-known/openid-configuration
            # and automatically enforces PKCE S256 for code exchanges!`,
    loginCode: `// 2. Security Configuration Class (SecurityConfig.java)
package com.example.oidcdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/", "/public/**").permitAll()
                .anyRequest().authenticated()
            )
            // Automatically registers OIDC Login endpoints with PKCE S256
            .oauth2Login(Customizer.withDefaults())
            .logout(logout -> logout.logoutSuccessUrl("/"));

        return http.build();
    }
}`,
    userinfoCode: `// 3. UserInfo Claims Extraction (Java Spring Security)
@GetMapping("/api/userinfo")
public Map<String, Object> getUserInfo(@AuthenticationPrincipal OidcUser principal) {
    // Spring Security automatically fetches claims from /userinfo when configured
    return principal.getUserInfo().getClaims();
}
`,
    refreshCode: `// 4. Token Refresh via OAuth2AuthorizedClientManager (Java)
@Autowired
private OAuth2AuthorizedClientManager authorizedClientManager;

public OAuth2AccessToken refreshAccessToken(OAuth2AuthorizedClient client) {
    OAuth2AuthorizeRequest authorizeRequest = OAuth2AuthorizeRequest
        .withAuthorizedClient(client)
        .principal(SecurityContextHolder.getContext().getAuthentication())
        .build();

    // Spring Security automatically triggers POST /token grant_type=refresh_token
    OAuth2AuthorizedClient refreshedClient = this.authorizedClientManager.authorize(authorizeRequest);
    return refreshedClient.getAccessToken();
}`,
    id: 'backend-java-nimbusds',
    category: 'non-spa',
    logoKey: 'java',
    shortName: 'Java',
    libName: 'oauth2-oidc-sdk',
    brandGradient: 'from-[#991b1b] to-[#dc2626]',
    name: 'Java (Nimbus OAuth 2.0 / OIDC SDK)',
    certified: true,
    certificationName: 'OpenID Certified (Java - Connect2id / Nimbus)',
    badge: 'Java (NimbusDS)',
    badge_ar: 'Java (NimbusDS)',
    language: 'Java 11 / 17 / 21',
    framework: 'Java SE / Jakarta EE / Spring / Micronaut / Quarkus',
    npmPackage: 'com.nimbusds:oauth2-oidc-sdk:11.10.1',
    github: 'https://bitbucket.org/connect2id/oauth-2.0-sdk-with-openid-connect-extensions',
    description: 'The industry-standard OpenID Foundation Certified Java library for OAuth 2.0 and OpenID Connect by Connect2id / NimbusDS. Provides comprehensive protocol support including PKCE (S256 / RFC 7636), OIDC Discovery (RFC 8414), token requests, ID token verification via JWKS (Nimbus JOSE+JWT), UserInfo resolution, and Refresh Token Rotation.',
    description_ar: 'المكتبة المعتمدة رسمياً من مؤسسة OpenID Foundation للغة Java لتطوير بروتوكولات OAuth 2.0 و OpenID Connect من تطوير Connect2id و NimbusDS. توفر دعماً شاملاً لـ PKCE (S256)، واكتشاف نقاط Discovery، وطلب التوكنات، والتحقق من تواقيع ID Token عبر JWKS، واستعلام UserInfo وتدوير Refresh Token.',
    securityModel: {
      type: 'Confidential Client (or Public Backend)',
      type_ar: 'عميل سري (أو عميل عام مدعوم)',
      clientSecret: 'ClientSecretBasic / ClientSecretPost / PrivateKeyJWT (Server-side)',
      clientSecret_ar: 'يُدعم ClientSecretBasic و ClientSecretPost و PrivateKeyJWT في بيئة الخادم الآمنة',
      pkceEnforced: 'CodeChallengeMethod.S256 (RFC 7636 Mandatory)',
      pkceEnforced_ar: 'CodeChallengeMethod.S256 (RFC 7636 مدعوم وموصى به)',
      tokenStorage: 'Server-side HttpSession / Redis / Encrypted Cookie',
      tokenStorage_ar: 'جلسة خادم HttpSession / مخزن Redis الموزع / ملفات كوكيز مشفرة',
      redirectHandler: 'Servlet / Spring Controller / JAX-RS / Undertow'
    },
    installCmd: `<!-- Maven pom.xml -->
<dependency>
    <groupId>com.nimbusds</groupId>
    <artifactId>oauth2-oidc-sdk</artifactId>
    <version>11.10.1</version>
</dependency>
<dependency>
    <groupId>com.nimbusds</groupId>
    <artifactId>nimbus-jose-jwt</artifactId>
    <version>9.37.3</version>
</dependency>

// Gradle build.gradle
implementation 'com.nimbusds:oauth2-oidc-sdk:11.10.1'
implementation 'com.nimbusds:nimbus-jose-jwt:9.37.3'`,
    configCode: `// 1. OIDC Provider Discovery & Client Setup (Nimbus OAuth 2.0 / OIDC SDK)
import com.nimbusds.oauth2.sdk.id.ClientID;
import com.nimbusds.oauth2.sdk.id.Issuer;
import com.nimbusds.oauth2.sdk.auth.Secret;
import com.nimbusds.oauth2.sdk.auth.ClientSecretBasic;
import com.nimbusds.openid.connect.sdk.op.OIDCProviderMetadata;
import java.net.URI;

// 1. Auto-discover OIDC Provider Endpoints dynamically (RFC 8414)
Issuer issuer = new Issuer("http://localhost:3000/mock-idp");
OIDCProviderMetadata opMetadata = OIDCProviderMetadata.resolve(issuer);

// 2. Setup Client Credentials & Redirect URI
ClientID clientID = new ClientID("nimbus-java-client");
Secret clientSecret = new Secret("nimbus-super-secret");
ClientSecretBasic clientAuth = new ClientSecretBasic(clientID, clientSecret);
URI redirectURI = new URI("http://localhost:8080/oidc/callback");`,
    loginCode: `// 2. PKCE S256 Generation & Authorization Request (NimbusDS)
import com.nimbusds.oauth2.sdk.pkce.CodeVerifier;
import com.nimbusds.oauth2.sdk.pkce.CodeChallengeMethod;
import com.nimbusds.oauth2.sdk.Scope;
import com.nimbusds.oauth2.sdk.ResponseType;
import com.nimbusds.oauth2.sdk.State;
import com.nimbusds.openid.connect.sdk.Nonce;
import com.nimbusds.openid.connect.sdk.AuthenticationRequest;
import jakarta.servlet.http.HttpSession;

public void initiateLogin(HttpSession session, HttpServletResponse response) throws Exception {
    // Generate PKCE Code Verifier (256-bit entropy) & S256 Challenge (RFC 7636)
    CodeVerifier codeVerifier = new CodeVerifier();
    State state = new State(); // Anti-CSRF token
    Nonce nonce = new Nonce(); // Anti-replay token
    Scope scope = Scope.parse("openid profile email offline_access");

    // Store verifier, state, and nonce in secure server session
    session.setAttribute("pkce_verifier", codeVerifier);
    session.setAttribute("auth_state", state);
    session.setAttribute("auth_nonce", nonce);

    // Build OIDC Authentication Request with S256 PKCE Challenge
    AuthenticationRequest authRequest = new AuthenticationRequest.Builder(
        new ResponseType(ResponseType.Value.CODE),
        scope,
        clientID,
        redirectURI)
        .endpointURI(opMetadata.getAuthorizationEndpointURI())
        .state(state)
        .nonce(nonce)
        .codeChallenge(codeVerifier, CodeChallengeMethod.S256)
        .build();

    // Redirect user to IdP Authorization Endpoint
    response.sendRedirect(authRequest.toURI().toString());
}`,
    userinfoCode: `// 3. UserInfo Claims Resolution (NimbusDS)
import com.nimbusds.oauth2.sdk.token.BearerAccessToken;
import com.nimbusds.openid.connect.sdk.UserInfoRequest;
import com.nimbusds.openid.connect.sdk.UserInfoResponse;
import com.nimbusds.openid.connect.sdk.UserInfoSuccessResponse;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;

public UserInfo fetchUserInfo(String accessTokenString) throws Exception {
    BearerAccessToken token = new BearerAccessToken(accessTokenString);
    UserInfoRequest userInfoReq = new UserInfoRequest(
        opMetadata.getUserInfoEndpointURI(),
        token
    );

    UserInfoResponse userInfoResp = UserInfoResponse.parse(userInfoReq.toHTTPRequest().send());
    if (!userInfoResp.indicatesSuccess()) {
        throw new RuntimeException("UserInfo query failed: " + userInfoResp.toErrorResponse().getErrorObject());
    }

    UserInfoSuccessResponse success = (UserInfoSuccessResponse) userInfoResp;
    UserInfo claims = success.getUserInfo();
    System.out.println("User Sub: " + claims.getSubject().getValue());
    System.out.println("User Name: " + claims.getName());
    System.out.println("User Email: " + claims.getEmailAddress());
    return claims;
}`,
    refreshCode: `// 4. Refresh Token Rotation (RTR) with NimbusDS
import com.nimbusds.oauth2.sdk.RefreshTokenGrant;
import com.nimbusds.oauth2.sdk.token.RefreshToken;
import com.nimbusds.oauth2.sdk.TokenRequest;
import com.nimbusds.oauth2.sdk.TokenResponse;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponse;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponseParser;

public OIDCTokenResponse refreshTokens(String refreshTokenString) throws Exception {
    RefreshToken currentRefreshToken = new RefreshToken(refreshTokenString);

    // Build Token Request with RefreshTokenGrant
    TokenRequest refreshReq = new TokenRequest(
        opMetadata.getTokenEndpointURI(),
        clientAuth,
        new RefreshTokenGrant(currentRefreshToken)
    );

    TokenResponse tokenResponse = OIDCTokenResponseParser.parse(refreshReq.toHTTPRequest().send());
    if (!tokenResponse.indicatesSuccess()) {
        throw new RuntimeException("Token refresh failed: " + tokenResponse.toErrorResponse().getErrorObject());
    }

    OIDCTokenResponse oidcTokens = (OIDCTokenResponse) tokenResponse.toSuccessResponse();
    // Rotated new tokens
    String newAccessToken = oidcTokens.getOIDCTokens().getAccessToken().getValue();
    RefreshToken rotatedRefreshToken = oidcTokens.getOIDCTokens().getRefreshToken();
    System.out.println("New Rotated Refresh Token: " + rotatedRefreshToken.getValue());
    return oidcTokens;
}`,
    logoutCode: `// 5. OIDC RP-Initiated Logout (RFC / OpenID Frontchannel & Backchannel)
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import jakarta.servlet.http.HttpSession;

public void logout(HttpSession session, String idTokenRawString, HttpServletResponse response) throws Exception {
    // 1. Invalidate local application session
    session.invalidate();

    // 2. Redirect to IdP End Session Endpoint with id_token_hint
    URI endSessionEndpoint = opMetadata.getEndSessionEndpointURI();
    String postLogoutRedirect = URLEncoder.encode("http://localhost:8080/", StandardCharsets.UTF_8);

    String logoutRedirectUrl = endSessionEndpoint.toString() + 
        "?id_token_hint=" + URLEncoder.encode(idTokenRawString, StandardCharsets.UTF_8) +
        "&post_logout_redirect_uri=" + postLogoutRedirect;

    response.sendRedirect(logoutRedirectUrl);
}`,
    callbackCode: `// 6. Callback Route: Exchange Code + Verifier & Validate ID Token via JWKS
import com.nimbusds.oauth2.sdk.AuthorizationCode;
import com.nimbusds.oauth2.sdk.AuthorizationCodeGrant;
import com.nimbusds.oauth2.sdk.TokenRequest;
import com.nimbusds.oauth2.sdk.TokenResponse;
import com.nimbusds.openid.connect.sdk.AuthenticationResponse;
import com.nimbusds.openid.connect.sdk.AuthenticationResponseParser;
import com.nimbusds.openid.connect.sdk.AuthenticationSuccessResponse;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponse;
import com.nimbusds.openid.connect.sdk.OIDCTokenResponseParser;
import com.nimbusds.openid.connect.sdk.validators.IDTokenValidator;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;

public void handleCallback(HttpServletRequest req, HttpSession session) throws Exception {
    // 1. Parse authentication response from callback URL
    AuthenticationResponse authResp = AuthenticationResponseParser.parse(new URI(req.getRequestURL() + "?" + req.getQueryString()));
    if (!authResp.indicatesSuccess()) {
        throw new SecurityException("Auth failed: " + authResp.toErrorResponse().getErrorObject());
    }

    AuthenticationSuccessResponse success = (AuthenticationSuccessResponse) authResp;

    // 2. Validate State parameter against session (Anti-CSRF)
    State savedState = (State) session.getAttribute("auth_state");
    if (savedState == null || !savedState.equals(success.getState())) {
        throw new SecurityException("Invalid state parameter - Possible CSRF attack!");
    }

    AuthorizationCode code = success.getAuthorizationCode();
    CodeVerifier codeVerifier = (CodeVerifier) session.getAttribute("pkce_verifier");

    // 3. Exchange Authorization Code + PKCE Code Verifier for Tokens (Backchannel POST /token)
    TokenRequest tokenRequest = new TokenRequest(
        opMetadata.getTokenEndpointURI(),
        clientAuth,
        new AuthorizationCodeGrant(code, redirectURI, codeVerifier)
    );

    TokenResponse tokenResponse = OIDCTokenResponseParser.parse(tokenRequest.toHTTPRequest().send());
    if (!tokenResponse.indicatesSuccess()) {
        throw new RuntimeException("Token exchange failed: " + tokenResponse.toErrorResponse().getErrorObject());
    }

    OIDCTokenResponse oidcTokens = (OIDCTokenResponse) tokenResponse.toSuccessResponse();
    JWT idToken = oidcTokens.getOIDCTokens().getIDToken();
    Nonce savedNonce = (Nonce) session.getAttribute("auth_nonce");

    // 4. Cryptographically Validate ID Token signature via JWKS and claims (iss, aud, exp, nonce)
    IDTokenValidator validator = IDTokenValidator.create(opMetadata, clientID, null);
    JWTClaimsSet claimsSet = validator.validate(idToken, savedNonce);

    // 5. Establish authenticated server session
    session.setAttribute("user_claims", claimsSet.toJSONObject());
    session.setAttribute("access_token", oidcTokens.getOIDCTokens().getAccessToken().getValue());
    session.removeAttribute("pkce_verifier");
}`
  },

  {
    id: 'backend-dotnet-aspnetcore',
    category: 'non-spa',
    logoKey: 'dotnet',
    shortName: 'C# / .NET',
    libName: 'Microsoft.AspNetCore.OpenIdConnect',
    brandGradient: 'from-[#581c87] to-[#7c3aed]',
    name: 'C# / .NET 8 (Microsoft.AspNetCore.Authentication.OpenIdConnect)',
    certified: true,
    certificationName: 'OpenID Certified (.NET)',
    badge: 'C# / .NET',
    badge_ar: 'C# / .NET',
    language: 'C# 12 / .NET 8',
    framework: 'ASP.NET Core / Blazor Server / Razor Pages',
    npmPackage: 'Microsoft.AspNetCore.Authentication.OpenIdConnect',
    github: 'https://github.com/dotnet/aspnetcore',
    description: 'The official ASP.NET Core OpenID Connect middleware. Supports automatic PKCE generation, Discovery document parsing, Token validation, and Cookie-based claims authentication.',
    description_ar: 'الميدلوير الرسمي من Microsoft لـ ASP.NET Core 8. يدعم التوليد التلقائي لـ PKCE S256، والتحقق من Discovery و JWKS، وتخزين التوكنات في ملفات تعريف ارتباط مشفرة ومقسمة.',
    securityModel: {
      type: 'Confidential Client',
      type_ar: 'عميل سري (Confidential Client)',
      clientSecret: 'Stored in appsettings.json / Azure Key Vault',
      clientSecret_ar: 'يُحفظ في appsettings.json أو Azure Key Vault',
      pkceEnforced: 'UsePkce = true (Default in .NET 7/8)',
      pkceEnforced_ar: 'UsePkce = true (مفعل افتراضياً في .NET 7 و 8)',
      tokenStorage: 'Encrypted CookieAuthenticationMiddleware (Chunked & Protected)',
      tokenStorage_ar: 'ملفات تعريف ارتباط مشفرة ومقسمة عبر CookieAuthenticationMiddleware',
      redirectHandler: '/signin-oidc'
    },
    installCmd: 'dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect',
    configCode: `// 1. Program.cs in ASP.NET Core 8
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.Lax;
})
.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    options.Authority = "http://localhost:3000/mock-idp";
    options.ClientId = "dotnet-backend-client";
    options.ClientSecret = "dotnet-super-secret";
    options.ResponseType = OpenIdConnectResponseType.Code;
    options.ResponseMode = OpenIdConnectResponseMode.Query;
    
    // ENFORCE PKCE S256
    options.UsePkce = true; 
    
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    options.Scope.Add("offline_access");

    options.SaveTokens = true; // Stores tokens in encrypted cookie
    options.GetClaimsFromUserInfoEndpoint = true; // Auto-fetches /userinfo
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();`,
    loginCode: `// 2. Challenge endpoint to trigger OIDC PKCE flow
app.MapGet("/login", async (HttpContext ctx) =>
{
    await ctx.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme, new AuthenticationProperties
    {
        RedirectUri = "/dashboard"
    });
});`,
    userinfoCode: `// 3. UserInfo Claims in .NET 8
// Since options.GetClaimsFromUserInfoEndpoint = true:
app.MapGet("/api/userinfo", (ClaimsPrincipal user) =>
{
    return Results.Ok(new
    {
        Subject = user.FindFirst(ClaimTypes.NameIdentifier)?.Value,
        Name = user.Identity?.Name,
        Email = user.FindFirst(ClaimTypes.Email)?.Value,
        AllClaims = user.Claims.Select(c => new { c.Type, c.Value })
    });
});`,
    refreshCode: `// 4. Token Refresh in ASP.NET Core (.NET 8)
app.MapPost("/api/refresh", async (HttpContext ctx, IHttpClientFactory clientFactory) =>
{
    var refreshToken = await ctx.GetTokenAsync("refresh_token");
    var client = clientFactory.CreateClient();

    var response = await client.PostAsync("http://localhost:3000/mock-idp/token", new FormUrlEncodedContent(new Dictionary<string, string>
    {
        { "grant_type", "refresh_token" },
        { "client_id", "dotnet-backend-client" },
        { "client_secret", "dotnet-super-secret" },
        { "refresh_token", refreshToken! }
    }));

    var tokens = await response.Content.ReadFromJsonAsync<JsonElement>();
    return Results.Ok(tokens);
});`,
    logoutCode: `// 5. Logout & SignOutAsync (.NET 8)
app.MapGet("/logout", async (HttpContext ctx) =>
{
    // Destroys local auth cookie and redirects to IdP End Session Endpoint
    await ctx.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    await ctx.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme, new AuthenticationProperties
    {
        RedirectUri = "/"
    });
});`,
    callbackCode: `// 6. Protected Dashboard Endpoint
app.MapGet("/dashboard", [Microsoft.AspNetCore.Authorization.Authorize] async (HttpContext ctx) =>
{
    var user = ctx.User;
    var accessToken = await ctx.GetTokenAsync("access_token");

    return Results.Ok(new
    {
        Name = user.Identity?.Name,
        Subject = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value,
        Email = user.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value,
        AccessTokenPreview = accessToken?.Substring(0, 15) + "..."
    });
});

app.Run();`
  },

  {
    id: 'backend-go-oidc',
    category: 'non-spa',
    logoKey: 'go',
    shortName: 'Go',
    libName: 'coreos/go-oidc',
    brandGradient: 'from-[#075985] to-[#0284c7]',
    name: 'Go (coreos/go-oidc & golang.org/x/oauth2)',
    certified: true,
    certificationName: 'OpenID Certified (Go)',
    badge: 'Go',
    badge_ar: 'Go',
    language: 'Go 1.21+',
    framework: 'net/http / Gin / Fiber / Echo',
    npmPackage: 'github.com/coreos/go-oidc/v3/oidc',
    github: 'https://github.com/coreos/go-oidc',
    description: 'The standard Go OpenID Connect verification library created by CoreOS/Red Hat. Works in conjunction with golang.org/x/oauth2 for PKCE parameter generation and JWKS validation.',
    description_ar: 'المكتبة القياسية للغة Go من CoreOS/Red Hat للتحقق من OpenID Connect. تعمل بتوافق تام مع golang.org/x/oauth2 لتوليد معاملات PKCE والتحقق المشفر من تواقيع JWKS.',
    securityModel: {
      type: 'Confidential Client',
      type_ar: 'عميل سري (Confidential Client)',
      clientSecret: 'Server environment variable',
      clientSecret_ar: 'يُحفظ بأمان في متغيرات بيئة الخادم',
      pkceEnforced: 'oauth2.S256ChallengeOption(verifier)',
      pkceEnforced_ar: 'مفعل عبر oauth2.S256ChallengeOption(verifier)',
      tokenStorage: 'Secure Encrypted Cookie (Gorilla Sessions)',
      tokenStorage_ar: 'ملفات تعريف ارتباط مشفرة ومحمية بالجلسات (Gorilla Sessions)',
      redirectHandler: 'http.HandlerFunc on /auth/callback'
    },
    installCmd: 'go get github.com/coreos/go-oidc/v3/oidc golang.org/x/oauth2',
    configCode: `package main

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"log"
	"net/http"

	"github.com/coreos/go-oidc/v3/oidc"
	"golang.org/x/oauth2"
)

var (
	ctx          = context.Background()
	provider, _  = oidc.NewProvider(ctx, "http://localhost:3000/mock-idp")
	verifier     = provider.Verifier(&oidc.Config{ClientID: "go-pkce-client"})
	oauth2Config = oauth2.Config{
		ClientID:     "go-pkce-client",
		ClientSecret: "go-client-secret",
		RedirectURL:  "http://localhost:8080/auth/callback",
		Endpoint:     provider.Endpoint(),
		Scopes:       []string{oidc.ScopeOpenID, "profile", "email"},
	}
)`,
    loginCode: `// PKCE Helper: generates 43-128 char verifier and S256 challenge
func generatePKCE() (verifier, challenge string) {
	b := make([]byte, 32)
	rand.Read(b)
	verifier = base64.RawURLEncoding.EncodeToString(b)
	h := sha256.Sum256([]byte(verifier))
	challenge = base64.RawURLEncoding.EncodeToString(h[:])
	return verifier, challenge
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	codeVerifier, codeChallenge := generatePKCE()
	state := "random-csrf-state"

	// Store codeVerifier in secure session cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "pkce_verifier",
		Value:    codeVerifier,
		HttpOnly: true,
		Path:     "/",
	})

	// Generate authorization URL with S256 PKCE challenge
	url := oauth2Config.AuthCodeURL(
		state,
		oauth2.SetAuthURLParam("code_challenge", codeChallenge),
		oauth2.SetAuthURLParam("code_challenge_method", "S256"),
	)
	http.Redirect(w, r, url, http.StatusFound)
}`,
    userinfoCode: `// 3. UserInfo Claims Extraction (Go coreos/go-oidc)
func handleUserInfo(w http.ResponseWriter, r *http.Request, token *oauth2.Token) {
	userInfo, err := provider.UserInfo(ctx, oauth2.StaticTokenSource(token))
	if err != nil {
		http.Error(w, "Failed to get userinfo: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var claims map[string]interface{}
	userInfo.Claims(&claims)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(claims)
}`,
    refreshCode: `// 4. Refresh Token Rotation (Go oauth2)
func refreshToken(storedToken *oauth2.Token) (*oauth2.Token, error) {
	tokenSource := oauth2Config.TokenSource(ctx, storedToken)
	// TokenSource automatically sends POST /token with refresh_token if expired
	newToken, err := tokenSource.Token()
	if err != nil {
		return nil, fmt.Errorf("token refresh failed: %w", err)
	}
	return newToken, nil
}`,
    logoutCode: `// 5. Logout & IdP End Session (Go)
func handleLogout(w http.ResponseWriter, r *http.Request, rawIDToken string) {
	// 1. Clear session cookies
	http.SetCookie(w, &http.Cookie{Name: "session_token", Value: "", MaxAge: -1, Path: "/"})

	// 2. Redirect to IdP End Session Endpoint
	endSessionURL := fmt.Sprintf("http://localhost:3000/mock-idp/session/end?id_token_hint=%s&post_logout_redirect_uri=%s",
		url.QueryEscape(rawIDToken),
		url.QueryEscape("http://localhost:8080/"),
	)
	http.Redirect(w, r, endSessionURL, http.StatusFound)
}`,
    callbackCode: `// 6. Callback Handler: Verify RS256 Signature
func handleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	cookie, _ := r.Cookie("pkce_verifier")
	codeVerifier := cookie.Value

	token, err := oauth2Config.Exchange(ctx, code, oauth2.SetAuthURLParam("code_verifier", codeVerifier))
	if err != nil {
		http.Error(w, "Token exchange failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	rawIDToken, _ := token.Extra("id_token").(string)
	idToken, err := verifier.Verify(ctx, rawIDToken)
	if err != nil {
		http.Error(w, "Failed to verify ID Token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var claims map[string]interface{}
	idToken.Claims(&claims)
	w.Write([]byte("Welcome, " + claims["name"].(string)))
}`
  },

  // =========================================================================
  // 3. MOBILE iOS (Swift / AppAuth-iOS)
  // =========================================================================
  {
    id: 'mobile-ios-appauth',
    category: 'mobile',
    logoKey: 'ios',
    shortName: 'iOS (Swift)',
    libName: 'AppAuth-iOS',
    brandGradient: 'from-[#9a3412] to-[#ea580c]',
    name: 'iOS (Swift & AppAuth-iOS)',
    certified: true,
    certificationName: 'OpenID Certified Foundation SDK',
    badge: 'iOS (Swift)',
    badge_ar: 'iOS (Swift)',
    language: 'Swift 5.9+ / SwiftUI',
    framework: 'iOS / iPadOS / macOS',
    npmPackage: 'AppAuth (CocoaPods / SPM)',
    github: 'https://github.com/openid/AppAuth-iOS',
    description: 'The official OpenID Foundation SDK for iOS. Implements RFC 8252 (OAuth 2.0 for Native Apps) using ASWebAuthenticationSession, custom URL scheme / Universal Links, automatic PKCE S256, and iOS Keychain token storage.',
    description_ar: 'حزمة SDK الرسمية من OpenID Foundation لنظام iOS. تطبق المعيار RFC 8252 باستخدام ASWebAuthenticationSession والروابط العميقة Universal Links و PKCE S256 التلقائي وتخزين التوكنات في iOS Keychain.',
    securityModel: {
      type: 'Public Native Client',
      type_ar: 'عميل تطبيق هاتف عام (Public Native Client)',
      clientSecret: 'Forbidden / Never embedded in native mobile binaries',
      clientSecret_ar: 'محظور / لا يُضمن أبداً في حزم تطبيقات الهواتف',
      pkceEnforced: 'Mandatory (S256 automatically generated by OIDAuthorizationRequest)',
      pkceEnforced_ar: 'إلزامي (توليد تلقائي لـ S256 بواسطة OIDAuthorizationRequest)',
      tokenStorage: 'iOS Keychain (kSecClassGenericPassword with kSecAttrAccessibleAfterFirstUnlock)',
      tokenStorage_ar: 'سلسلة المفاتيح المشفرة على مستوى العتاد iOS Keychain (kSecClassGenericPassword)',
      redirectHandler: 'Custom URL Scheme (e.g. com.example.app:/oauth2callback) or Universal Link'
    },
    installCmd: `// Swift Package Manager (SPM):
dependencies: [
    .package(url: "https://github.com/openid/AppAuth-iOS.git", from: "1.6.0")
]

// Or CocoaPods Podfile:
pod 'AppAuth'`,
    configCode: `import UIKit
import AppAuth
import AuthenticationServices

class OIDCManager: NSObject {
    static let shared = OIDCManager()
    
    // OIDC Configuration
    let issuer = URL(string: "http://localhost:3000/mock-idp")!
    let clientID = "ios-mobile-app"
    let redirectURI = URL(string: "com.example.pkceapp:/oauth2callback")!
    
    // AppAuth State & Session holder
    var authState: OIDAuthState?
    var currentAuthorizationFlow: OIDExternalUserAgentSession?
}`,
    loginCode: `// 1. Discover Endpoints & Start PKCE Login with ASWebAuthenticationSession
func login(from presentingViewController: UIViewController, completion: @escaping (Bool) -> Void) {
    // A. Discover OpenID Provider configuration
    OIDAuthorizationService.discoverConfiguration(forIssuer: issuer) { configuration, error in
        guard let config = configuration, error == nil else {
            print("Discovery error: \\(error?.localizedDescription ?? "unknown")")
            completion(false)
            return
        }
        
        // B. Generate PKCE S256 Code Verifier & Challenge automatically!
        // AppAuth-iOS automatically creates 128-byte cryptographic verifier
        // and S256 challenge under the hood.
        let codeVerifier = OIDAuthorizationRequest.generateCodeVerifier()
        let codeChallenge = OIDAuthorizationRequest.codeChallengeS256(forVerifier: codeVerifier)
        
        let request = OIDAuthorizationRequest(
            configuration: config,
            clientId: self.clientID,
            clientSecret: nil, // Public client: NO secret!
            scopes: [OIDScopeOpenID, OIDScopeProfile, OIDScopeEmail],
            redirectURL: self.redirectURI,
            responseType: OIDResponseTypeCode,
            additionalParameters: [
                "code_challenge": codeChallenge!,
                "code_challenge_method": OIDOAuthorizationRequestCodeChallengeMethodS256
            ]
        )
        
        // C. Launch secure system browser (ASWebAuthenticationSession)
        self.currentAuthorizationFlow = OIDAuthState.authState(byPresenting: request, presenting: presentingViewController) { authState, error in
            if let authState = authState {
                self.authState = authState
                // Save tokens in iOS Secure Keychain
                self.saveAuthStateToKeychain(authState)
                print("Logged in! Access Token: \\(authState.lastTokenResponse?.accessToken ?? "")")
                completion(true)
            } else {
                print("Authorization failed: \\(error?.localizedDescription ?? "")")
                completion(false)
            }
        }
    }
}`,
    userinfoCode: `// 3. Fetch UserInfo Claims in Swift
func fetchUserInfo(completion: @escaping ([String: Any]?) -> Void) {
    guard let authState = self.authState else { return }
    authState.performAction { accessToken, idToken, error in
        guard let token = accessToken else { return }
        
        var request = URLRequest(url: URL(string: "http://localhost:3000/mock-idp/userinfo")!)
        request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization")
        
        URLSession.shared.dataTask(with: request) { data, _, _ in
            if let data = data, let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
                completion(json)
            }
        }.resume()
    }
}`,
    refreshCode: `// 4. Automatic Token Refresh & Rotation in Swift
func refreshTokens(completion: @escaping (Bool) -> Void) {
    guard let authState = self.authState else { return }
    
    // AppAuth automatically checks expiration and sends POST /token with grant_type=refresh_token
    authState.performAction(freshTokens: true) { accessToken, idToken, error in
        if let accessToken = accessToken {
            self.saveAuthStateToKeychain(authState) // Save new rotated tokens
            print("Refreshed! New Access Token: \\(accessToken)")
            completion(true)
        } else {
            print("Refresh failed: \\(error?.localizedDescription ?? "")")
            completion(false)
        }
    }
}`,
    logoutCode: `// 5. Logout & Revoke in iOS
func logout(presentingVC: UIViewController) {
    guard let authState = self.authState, let config = authState.lastAuthorizationResponse.request.configuration else { return }
    
    // A. Revoke token on IdP
    if let refreshToken = authState.lastTokenResponse?.refreshToken {
        // POST to /revoke
    }
    
    // B. Launch End Session Request
    let endSessionReq = OIDEndSessionRequest(
        configuration: config,
        idTokenHint: authState.lastTokenResponse?.idToken ?? "",
        postLogoutRedirectURL: URL(string: "com.example.pkceapp:/logoutcallback")!,
        additionalParameters: nil
    )
    
    let userAgent = OIDExternalUserAgentIOS(presenting: presentingVC)
    OIDAuthorizationService.present(endSessionReq, externalUserAgent: userAgent) { _, _ in
        // Clear Keychain
        self.clearKeychain()
    }
}`,
    callbackCode: `// 6. AppDelegate / SceneDelegate Deep Link Handler
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    guard let url = URLContexts.first?.url else { return }
    if let authorizationFlow = OIDCManager.shared.currentAuthorizationFlow,
       authorizationFlow.resumeExternalUserAgentFlow(with: url) {
        OIDCManager.shared.currentAuthorizationFlow = nil
    }
}`
  },

  // =========================================================================
  // 4. MOBILE ANDROID (Kotlin / AppAuth-Android)
  // =========================================================================
  {
    id: 'mobile-android-appauth',
    category: 'mobile',
    logoKey: 'android',
    shortName: 'Android (Kotlin)',
    libName: 'AppAuth-Android',
    brandGradient: 'from-[#064e3b] to-[#10b981]',
    name: 'Android (Kotlin & AppAuth-Android)',
    certified: true,
    certificationName: 'OpenID Certified Foundation SDK',
    badge: 'Android (Kotlin)',
    badge_ar: 'Android (Kotlin)',
    language: 'Kotlin / Java',
    framework: 'Android SDK / Jetpack Compose',
    npmPackage: 'net.openid:appauth (Gradle)',
    github: 'https://github.com/openid/AppAuth-Android',
    description: 'The official OpenID Foundation SDK for Android. Implements RFC 8252 using Chrome Custom Tabs, Intent Filters for deep link redirection, PKCE S256 code verifier generation, and EncryptedSharedPreferences storage.',
    description_ar: 'حزمة SDK الرسمية من OpenID Foundation لنظام Android. تطبق المعيار RFC 8252 باستخدام Chrome Custom Tabs ومرشحات Intent للروابط العميقة وتوليد PKCE S256 وتخزين EncryptedSharedPreferences.',
    securityModel: {
      type: 'Public Native Client',
      type_ar: 'عميل تطبيق هاتف عام (Public Native Client)',
      clientSecret: 'Forbidden / Never packaged in APK or AAB files',
      clientSecret_ar: 'محظور / لا يُضمن أبداً في ملفات APK أو AAB',
      pkceEnforced: 'Mandatory (S256 automatically generated by AuthorizationRequest.Builder)',
      pkceEnforced_ar: 'إلزامي (توليد تلقائي لـ S256 بواسطة AuthorizationRequest.Builder)',
      tokenStorage: 'EncryptedSharedPreferences / Android Keystore System (AES-256 GCM)',
      tokenStorage_ar: 'مخزن EncryptedSharedPreferences المشفر عبر Android Keystore System (AES-256 GCM)',
      redirectHandler: 'Intent Filter in AndroidManifest.xml (e.g. net.openid.appauth.RedirectUriReceiverActivity)'
    },
    installCmd: `// build.gradle.kts (Module: app)
dependencies {
    implementation("net.openid:appauth:0.11.1")
    implementation("androidx.security:security-crypto:1.1.0-alpha06")
}`,
    configCode: `<!-- AndroidManifest.xml Configuration -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application>
        <!-- AppAuth Redirect Receiver Activity -->
        <activity
            android:name="net.openid.appauth.RedirectUriReceiverActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="android.intent.category.BROWSABLE"/>
                <data
                    android:scheme="com.example.pkceapp"
                    android:host="oauth2callback"/>
            </intent-filter>
        </activity>
    </application>
</manifest>`,
    loginCode: `// 1. Initiate PKCE Login in MainActivity.kt
fun startPkceLogin() {
    val issuerUri = Uri.parse("http://10.0.2.2:3000/mock-idp")
    
    AuthorizationServiceConfiguration.fetchFromIssuer(issuerUri) { serviceConfig, ex ->
        if (serviceConfig == null) return@fetchFromIssuer

        val authRequest = AuthorizationRequest.Builder(
            serviceConfig,
            "android-mobile-app",
            ResponseTypeValues.CODE,
            Uri.parse("com.example.pkceapp://oauth2callback")
        )
        .setScopes(AuthorizationRequest.Scope.OPENID, "profile", "email", "offline_access")
        .setCodeVerifier(CodeVerifierUtil.generateRandomCodeVerifier())
        .build()

        val authIntent = authService.getAuthorizationRequestIntent(authRequest)
        authLauncher.launch(authIntent)
    }
}`,
    userinfoCode: `// 3. UserInfo Claims Request in Kotlin
fun fetchUserInfo(accessToken: String, onResult: (JSONObject) -> Unit) {
    Thread {
        val url = URL("http://10.0.2.2:3000/mock-idp/userinfo")
        val conn = url.openConnection() as HttpURLConnection
        conn.setRequestProperty("Authorization", "Bearer $accessToken")
        val response = conn.inputStream.bufferedReader().readText()
        onResult(JSONObject(response))
    }.start()
}`,
    refreshCode: `// 4. Token Refresh with Rotation in Android Kotlin
fun performTokenRefresh() {
    // AppAuth automatically executes POST /token (grant_type=refresh_token)
    val refreshReq = authState.createTokenRefreshRequest()
    authService.performTokenRequest(refreshReq) { tokenResponse, ex ->
        authState.update(tokenResponse, ex)
        if (tokenResponse != null) {
            // Save newly rotated refresh token to EncryptedSharedPreferences
            saveAuthStateEncrypted(authState)
        }
    }
}`,
    logoutCode: `// 5. Logout & End Session in Kotlin
fun logout(endSessionLauncher: ActivityResultLauncher<Intent>) {
    val endSessionReq = EndSessionRequest.Builder(authState.authorizationServiceConfiguration!!)
        .setIdTokenHint(authState.idToken)
        .setPostLogoutRedirectUri(Uri.parse("com.example.pkceapp://logoutcallback"))
        .build()

    val intent = authService.getEndSessionRequestIntent(endSessionReq)
    endSessionLauncher.launch(intent)
    
    // Clear EncryptedSharedPreferences
    clearSecureStorage()
}`,
    callbackCode: `// 6. Token Exchange & Encrypted Storage
private fun exchangeAuthorizationCode(response: AuthorizationResponse) {
    val tokenRequest = response.createTokenExchangeRequest()
    authService.performTokenRequest(tokenRequest) { tokenResponse, ex ->
        authState.update(tokenResponse, ex)
        if (tokenResponse != null) {
            saveAuthStateEncrypted(authState)
        }
    }
}`
  },

  // =========================================================================
  // 5. CROSS-PLATFORM MOBILE (React Native & Flutter)
  // =========================================================================
  {
    id: 'mobile-react-native-appauth',
    category: 'mobile',
    logoKey: 'react',
    shortName: 'React Native',
    libName: 'react-native-app-auth',
    brandGradient: 'from-[#1e1b4b] to-[#3b82f6]',
    name: 'React Native (react-native-app-auth)',
    certified: true,
    certificationName: 'AppAuth Native Bridge',
    badge: 'React Native',
    badge_ar: 'React Native',
    language: 'JavaScript / TypeScript',
    framework: 'React Native / Expo',
    npmPackage: 'react-native-app-auth',
    github: 'https://github.com/FormidableLabs/react-native-app-auth',
    description: 'React Native bridge for AppAuth-iOS and AppAuth-Android. Executes native ASWebAuthenticationSession / Custom Tabs with automatic PKCE S256.',
    description_ar: 'جسر React Native لحزمتي AppAuth-iOS و AppAuth-Android. ينفذ متصفح النظام الأصلي ASWebAuthenticationSession / Custom Tabs مع تطبيق PKCE S256 الإلزامي.',
    securityModel: {
      type: 'Public Native Client',
      type_ar: 'عميل تطبيق هاتف عام (Public Native Client)',
      clientSecret: 'None',
      clientSecret_ar: 'لا يوجد',
      pkceEnforced: 'Mandatory (AppAuth native S256)',
      pkceEnforced_ar: 'إلزامي (AppAuth native S256)',
      tokenStorage: 'react-native-keychain / Expo SecureStore',
      tokenStorage_ar: 'سلسلة المفاتيح المشفرة react-native-keychain / Expo SecureStore',
      redirectHandler: 'Native Deep Linking (custom URL scheme)'
    },
    installCmd: 'npm install react-native-app-auth react-native-keychain',
    configCode: `import { authorize, refresh, revoke } from 'react-native-app-auth';
import * as Keychain from 'react-native-keychain';

const oidcConfig = {
  issuer: 'http://localhost:3000/mock-idp',
  clientId: 'react-native-client',
  redirectUrl: 'com.example.rnapp://oauthredirect',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  usePKCE: true // Enforce PKCE S256
};`,
    loginCode: `export async function loginWithPkce() {
  try {
    const authResult = await authorize(oidcConfig);
    await Keychain.setGenericPassword('oidc_tokens', JSON.stringify(authResult));
    return authResult;
  } catch (error) {
    console.error('Login Failed', error);
  }
}`,
    userinfoCode: `// 3. UserInfo in React Native
export async function getUserInfo(accessToken) {
  const res = await fetch('http://localhost:3000/mock-idp/userinfo', {
    headers: { Authorization: \`Bearer \${accessToken}\` }
  });
  return await res.json();
}`,
    refreshCode: `// 4. Refresh Token Rotation in React Native
export async function rotateRefreshToken(storedRefreshToken) {
  const refreshed = await refresh(oidcConfig, {
    refreshToken: storedRefreshToken
  });
  // Update secure Keychain storage with rotated refresh token
  await Keychain.setGenericPassword('oidc_tokens', JSON.stringify(refreshed));
  return refreshed;
}`,
    logoutCode: `// 5. Logout & Revoke in React Native
export async function logoutAndRevoke(refreshToken) {
  if (refreshToken) {
    await revoke(oidcConfig, { tokenToRevoke: refreshToken, sendClientId: true });
  }
  await Keychain.resetGenericPassword();
}`,
    callbackCode: `export async function getStoredUserTokens() {
  const creds = await Keychain.getGenericPassword();
  return creds ? JSON.parse(creds.password) : null;
}`
  },

  {
    id: 'mobile-flutter-appauth',
    category: 'mobile',
    logoKey: 'flutter',
    shortName: 'Flutter (Dart)',
    libName: 'flutter_appauth',
    brandGradient: 'from-[#0c4a6e] to-[#0284c7]',
    name: 'Flutter (flutter_appauth)',
    certified: true,
    certificationName: 'AppAuth Flutter Plugin',
    badge: 'Flutter (Dart)',
    badge_ar: 'Flutter (Dart)',
    language: 'Dart',
    framework: 'Flutter (iOS / Android / macOS / Windows)',
    npmPackage: 'flutter_appauth',
    github: 'https://github.com/MaikuB/flutter_appauth',
    description: 'The premier Flutter plugin for AppAuth-iOS and AppAuth-Android. Handles PKCE code challenge calculation, deep link redirect parsing, and token storage with flutter_secure_storage.',
    description_ar: 'المكون الإضافي الرائد لـ Flutter المبني على AppAuth-iOS و AppAuth-Android. يتولى حساب PKCE S256 تلقائياً ومعالجة Deep Links وتخزين التوكنات المشفر عبر flutter_secure_storage.',
    securityModel: {
      type: 'Public Native Client',
      type_ar: 'عميل تطبيق هاتف عام (Public Native Client)',
      clientSecret: 'None',
      clientSecret_ar: 'لا يوجد',
      pkceEnforced: 'Automatic (AppAuth S256)',
      pkceEnforced_ar: 'تلقائي وإلزامي (AppAuth S256)',
      tokenStorage: 'flutter_secure_storage (Keychain & EncryptedSharedPreferences)',
      tokenStorage_ar: 'مخزن flutter_secure_storage (iOS Keychain و EncryptedSharedPreferences)',
      redirectHandler: 'Native URL Scheme / Universal Links'
    },
    installCmd: `// pubspec.yaml
dependencies:
  flutter_appauth: ^6.0.7
  flutter_secure_storage: ^9.0.0
  http: ^1.2.0`,
    configCode: `import 'package:flutter_appauth/flutter_appauth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AuthService {
  final FlutterAppAuth _appAuth = const FlutterAppAuth();
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  static const String _issuer = 'http://localhost:3000/mock-idp';
  static const String _clientId = 'flutter-mobile-client';
  static const String _redirectUrl = 'com.example.flutterapp://oauthredirect';
  static const List<String> _scopes = ['openid', 'profile', 'email', 'offline_access'];`,
    loginCode: `  Future<AuthorizationTokenResponse?> login() async {
    final result = await _appAuth.authorizeAndExchangeCode(
      AuthorizationTokenRequest(
        _clientId,
        _redirectUrl,
        issuer: _issuer,
        scopes: _scopes,
      ),
    );

    if (result != null) {
      await _storage.write(key: 'access_token', value: result.accessToken);
      await _storage.write(key: 'id_token', value: result.idToken);
      await _storage.write(key: 'refresh_token', value: result.refreshToken);
    }
    return result;
  }`,
    userinfoCode: `  // 3. UserInfo Claims in Flutter
  Future<Map<String, dynamic>?> fetchUserInfo() async {
    final accessToken = await _storage.read(key: 'access_token');
    if (accessToken == null) return null;

    final response = await http.get(
      Uri.parse('$_issuer/userinfo'),
      headers: {'Authorization': 'Bearer $accessToken'},
    );
    return jsonDecode(response.body);
  }`,
    refreshCode: `  // 4. Refresh Token Rotation in Flutter
  Future<TokenResponse?> rotateRefreshToken() async {
    final storedRefreshToken = await _storage.read(key: 'refresh_token');
    if (storedRefreshToken == null) return null;

    final response = await _appAuth.token(
      TokenRequest(
        _clientId,
        _redirectUrl,
        issuer: _issuer,
        grantType: 'refresh_token',
        refreshToken: storedRefreshToken,
      ),
    );

    if (response != null) {
      await _storage.write(key: 'access_token', value: response.accessToken);
      await _storage.write(key: 'refresh_token', value: response.refreshToken); // Rotated token
    }
    return response;
  }`,
    logoutCode: `  // 5. Logout & Revoke in Flutter
  Future<void> logout() async {
    final idToken = await _storage.read(key: 'id_token');
    final refreshToken = await _storage.read(key: 'refresh_token');

    // Revoke Refresh Token on IdP
    if (refreshToken != null) {
      await http.post(
        Uri.parse('$_issuer/revoke'),
        body: {'token': refreshToken, 'token_type_hint': 'refresh_token'},
      );
    }

    // End Session SSO
    await _appAuth.endSession(
      EndSessionRequest(
        idTokenHint: idToken,
        postLogoutRedirectUrl: 'com.example.flutterapp://logoutredirect',
        issuer: _issuer,
      ),
    );

    await _storage.deleteAll();
  }`,
    callbackCode: `  Future<String?> getAccessToken() async {
    return await _storage.read(key: 'access_token');
  }
}`
  }
];
