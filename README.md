# SSO Node.js Keycloak Connect Adapter

A simple Node.js Express application demonstrating Single Sign-On (SSO) integration with [Keycloak](https://www.keycloak.org/) using the `keycloak-connect` adapter. This project provides secure authentication and session management for your Node.js APIs.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Endpoints](#endpoints)
- [Development Notes](#development-notes)
- [Persian Guide (راهنمای فارسی)](#راهنمای-فارسی)

---

## Features

- Integrates Keycloak authentication with Express.js
- Session management using `express-session`
- Example of a protected route (`/secure`)
- Health check endpoint (`/`)
- In-memory session store (for development)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Access to a running [Keycloak](https://www.keycloak.org/) server
- A Keycloak realm and client configured

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/h-assefi/sso-nodejs-keycloak-connect-adapter.git
   cd sso-nodejs-keycloak-connect-adapter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Configuration

- Edit `src/index.js` and update the `kcConfig` object with your Keycloak realm, client, and secret.
- For development with self-signed certificates, SSL verification is disabled by setting:
  ```js
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  ```
  **Warning:** Never use this in production!

---

## Running the Application

```bash
npm start
```

Or directly:

```bash
node src/index.js
```

The server will run on [http://localhost:3000](http://localhost:3000).

---

## Endpoints

- `GET /`  
  Public health check endpoint.

- `GET /secure`  
  Protected endpoint. Requires authentication via Keycloak.

---

## Development Notes

- The session store is in-memory and not suitable for production. Use Redis or another store for production deployments.
- SSL certificate validation is disabled for development. Always use valid certificates in production.

---

# راهنمای فارسی

## معرفی

این پروژه یک نمونه ساده از یک برنامه Node.js با Express است که ورود یکپارچه (SSO) را با استفاده از [Keycloak](https://www.keycloak.org/) و ماژول `keycloak-connect` پیاده‌سازی می‌کند.

---

## پیش‌نیازها

- [Node.js](https://nodejs.org/) (نسخه ۱۴ یا بالاتر)
- [npm](https://www.npmjs.com/)
- دسترسی به یک سرور Keycloak فعال
- پیکربندی Realm و Client در Keycloak

---

## نصب

۱. **کلون کردن مخزن:**

```bash
git clone https://github.com/h-assefi/sso-nodejs-keycloak-connect-adapter.git
cd sso-nodejs-keycloak-connect-adapter
```

۲. **نصب وابستگی‌ها:**

```bash
npm install
```

---

## پیکربندی

- فایل `src/index.js` را باز کرده و مقادیر مربوط به Keycloak (realm، client، secret) را تنظیم کنید.
- برای توسعه و تست با گواهی‌های self-signed، اعتبارسنجی SSL غیرفعال شده است:
  ```js
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  ```
  **هشدار:** هرگز این گزینه را در محیط عملیاتی استفاده نکنید!

---

## اجرای برنامه

```bash
npm start
```

یا مستقیماً:

```bash
node src/index.js
```

سرور روی [http://localhost:3000](http://localhost:3000) اجرا خواهد شد.

---

## مسیرها

- `GET /`  
  مسیر سلامت (Health check) عمومی

- `GET /secure`  
  مسیر محافظت‌شده که نیاز به احراز هویت Keycloak دارد.

---

## نکات توسعه

- ذخیره‌سازی session به صورت in-memory است و برای محیط عملیاتی مناسب نیست. برای تولید از Redis یا سایر ذخیره‌سازها استفاده کنید.
- اعتبارسنجی گواهی SSL فقط برای توسعه غیرفعال شده است. در محیط عملیاتی حتماً از گواهی معتبر استفاده کنید.

---
