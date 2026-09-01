# 🔐 OIDC PKCE Master Hub

An interactive playground and developer guide for **OpenID Connect (OIDC) Authorization Code Flow with PKCE (RFC 7636 / RFC 8252 / OAuth 2.1)** across Mobile, SPA, and Backend architectures.

🔗 **Live Demo:** [https://skathery1985.github.io/oidc-hub/](https://skathery1985.github.io/oidc-hub/)

---

## 🚀 How to Run

No installation, terminal commands, or servers needed.

👉 **Double-click `index.html`** in your file explorer to run the app immediately in your browser.

---

## ✨ Features

### 1. 🚀 Interactive PKCE Live Lab
* **Full Step-by-Step Flow:** Discovery (`/.well-known/openid-configuration`), S256 PKCE generation, authorization redirect/popup, code exchange, token cache, and UserInfo query.
* **Built-in Mock IdP:** Test with pre-configured mock users (Alex Morgan, Alice Smith, Bob Johnson) or connect to your own external provider (Auth0, Okta, Keycloak, Azure AD, Google).
* **Token Rotation:** Test Silent Token Refresh and Refresh Token Rotation directly in your browser.

### 2. 📱 Mobile Simulators (RFC 8252)
* Visual smartphone simulators for **iOS (Swift)**, **Android (Kotlin)**, **Flutter**, and **React Native**.
* Demonstrates system browser authentication (`ASWebAuthenticationSession` / Chrome Custom Tabs), deep linking (`oauthredirect`), and hardware keystores.

### 3. 🌐 Single Page App (SPA) Simulators (RFC 7636)
* Browser simulators for **React / TypeScript (`oidc-client-ts`)**, **Angular 17/18/19+ (`angular-auth-oidc-client`)**, and **Vanilla JavaScript (Web Crypto API)**.
* Shows in-memory token storage, PKCE S256 verification, and silent token renewal.

### 4. 🖥️ Backend / Non-SPA Simulators
* Interactive blueprints for **Next.js 14+**, **Node.js**, **Python (FastAPI)**, **Java Spring Boot**, **Java (NimbusDS)**, **C# / .NET 8**, and **Go**.
* Switch between **Confidential Client (Client Secret)** and **Public Client (PKCE)** modes with HttpOnly cookie sessions.

### 5. 🛠️ Developer Tools
* **PKCE S256 Calculator:** Real-time generation of `code_verifier` and SHA-256 `code_challenge`.
* **JWT Inspector:** Decode and inspect headers, claims, and signatures for ID Tokens and Access Tokens.
* **OAuth 2.1 Threat Matrix:** Security best practices and vulnerability mitigation guide.
* **Localization & Themes:** Full English and Arabic (RTL) support with Dark and Light mode themes.

---

## 📄 License

MIT License &copy; 2026 Antigravity

