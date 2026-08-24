# 🔐 OIDC PKCE Master Hub & Certified Multi-Language SDK Lab

> **OpenID Connect (OIDC) Authorization Code Flow with PKCE (RFC 7636 / RFC 8252 / OAuth 2.1)** interactive developer portal, live testing playground, and multi-language certified SDK showcase across Web (SPA & Non-SPA) and Mobile (iOS, Android, Flutter, React Native).

![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-green)
![OIDC Compliance](https://img.shields.io/badge/OIDC-Core_1.0_Certified-blue)
![PKCE](https://img.shields.io/badge/PKCE-RFC_7636_S256-indigo)
![OAuth 2.1](https://img.shields.io/badge/OAuth-2.1_Standard-purple)
![License](https://img.shields.io/badge/License-MIT-emerald)

---

## 🌟 Overview & Features

This project provides an end-to-end sandbox and developer education platform for implementing **Proof Key for Code Exchange (PKCE)** with OpenID Connect across all client architectures:

```
                                 OIDC PKCE HUB
                                (localhost:3000)
                                       │
      ┌────────────────┬───────────────┴───────────────┬────────────────┐
      ▼                ▼                               ▼                ▼
 🚀 Live PKCE     📱 Mobile & Flutter            🌐 SPA SDKs      🖥️ Non-SPA / Backend
    Sandbox        (iOS & Android)               (Public Client)   (Confidential Client)
 ──────────────   ─────────────────             ────────────────  ──────────────────────
 • S256 Engine    • Flutter (flutter_appauth)   • oidc-client-ts  • Node openid-client
 • Popup SSO      • Swift (AppAuth-iOS)         • React Context   • Python Authlib
 • Token Exchange • Kotlin (AppAuth-Android)    • Web Crypto      • Java Spring Boot 3
 • JWT Inspector  • Keychain / KeyStore         • BFF Pattern     • C# .NET 8 / Go
```

### Key Highlights
* **Built-in Mock OpenID Provider (OP):** Zero-config local OIDC server with Discovery (`/.well-known/openid-configuration`), RS256 JWKS key rotation, interactive user selector (Alex Morgan, Alice Smith, Bob Johnson), and PKCE S256 verification.
* **External Provider Support:** Point the lab to Auth0, Keycloak, Okta, Google, Azure AD, Cognito, or Duende IdentityServer with automatic Discovery parsing.
* **Interactive Mobile Device Simulators:** Visual iPhone and Android simulators demonstrating system browser launches (`ASWebAuthenticationSession` / Chrome Custom Tabs), deep link handling, and hardware secure storage.
* **Multi-Language Certified SDK Blueprints:** Complete runnable code and project setup for TypeScript, React, Vanilla Web Crypto, Node.js, Python, Java Spring Boot, C# .NET 8, Go, Swift, Kotlin, Flutter, and React Native.
* **Developer Utilities:** Bitwise PKCE S256 calculator, JWT header/payload/signature debugger, and OAuth 2.1 threat mitigation matrix.

---

## 📦 Supported Certified SDKs & Languages

| Architecture | Language / Framework | SDK / Library | OpenID Certified | Token Storage Best Practice |
| :--- | :--- | :--- | :---: | :--- |
| **Mobile** | **Flutter / Dart** | [`flutter_appauth`](https://pub.dev/packages/flutter_appauth) | ✅ | `FlutterSecureStorage` (iOS Keychain / Android KeyStore) |
| **Mobile** | **iOS / Swift** | [`AppAuth-iOS`](https://github.com/openid/AppAuth-iOS) | ✅ | iOS Secure Keychain (`SecItemAdd`) |
| **Mobile** | **Android / Kotlin** | [`AppAuth-Android`](https://github.com/openid/AppAuth-Android) | ✅ | `EncryptedSharedPreferences` (AES-256 GCM) |
| **Mobile** | **React Native** | [`react-native-app-auth`](https://github.com/FormidableLabs/react-native-app-auth) | ✅ | `react-native-keychain` / Expo SecureStore |
| **SPA** | **React / TS / Vue** | [`oidc-client-ts`](https://github.com/authts/oidc-client-ts) | ✅ | `sessionStorage` / In-Memory (or BFF pattern) |
| **SPA** | **Vanilla JS** | Native Web Crypto API | Standard | `sessionStorage` (RFC 7636) |
| **Backend** | **Node.js / Express** | [`openid-client`](https://github.com/panva/node-openid-client) | ✅ | HttpOnly Secure Encrypted Session Cookie |
| **Backend** | **Python (FastAPI/Flask)**| [`Authlib`](https://github.com/lepture/authlib) | ✅ | Server-side Session / Secure Cookie |
| **Backend** | **Java (Spring Boot 3)** | `spring-boot-starter-oauth2-client` | ✅ | `HttpSession` / `SecurityContextHolder` |
| **Backend** | **C# / .NET 8** | `Microsoft.AspNetCore.Authentication.OpenIdConnect` | ✅ | Encrypted Authentication Cookie |
| **Backend** | **Go** | `coreos/go-oidc` + `golang.org/x/oauth2` | ✅ | Secure Encrypted Cookie |

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd oidc-pkce-hub
npm install
```

### 2. Start the Server

```bash
npm start
```

Open **`http://localhost:3000`** in your browser.

### 3. Run Automated End-to-End Tests

```bash
node test_flow.js
```

---

## 🔬 How PKCE Works (RFC 7636)

```
+-------------------+                               +--------------------+
|                   |  1. Generate code_verifier    |                    |
|                   |     Compute code_challenge    |                    |
|                   | ----------------------------> |                    |
|                   |  2. GET /authorize            |                    |
|   Client App      |     ?response_type=code       |   OpenID Provider  |
|  (SPA / Mobile /  |     &code_challenge=...       |   (Mock OP / IdP)  |
|    Backend)       |     &code_challenge_method=S256|                    |
|                   |                               |                    |
|                   |  3. Authorization Code        |                    |
|                   | <---------------------------- |                    |
|                   |                               |                    |
|                   |  4. POST /token               |  5. Verify:        |
|                   |     code + code_verifier      |     SHA256(verifier|
|                   | ----------------------------> |     === challenge  |
|                   |                               |                    |
|                   |  6. ID Token (RS256) +        |                    |
|                   |     Access Token + Refresh    |                    |
|                   | <---------------------------- |                    |
+-------------------+                               +--------------------+
```

### Cryptographic Formula
1. **`code_verifier`**: High-entropy cryptographically random string (43 to 128 characters from `[A-Za-z0-9\-._~]`).
2. **`code_challenge`**: `BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))`

---

## 🛠️ Endpoints Reference

* **OpenID Discovery:** `GET /.well-known/openid-configuration`
* **JWKS Key Set:** `GET /mock-idp/jwks.json`
* **Authorization:** `GET /mock-idp/authorize`
* **Token Exchange:** `POST /mock-idp/token`
* **UserInfo:** `GET /mock-idp/userinfo`
* **Live SSE Traffic Stream:** `GET /api/events`

---

## 📄 License

MIT License &copy; 2026 Antigravity
