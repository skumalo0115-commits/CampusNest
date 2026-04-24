# CampusNest 🏡🎓

> Find safe, verified student accommodation faster — with modern web tooling, Firebase-powered auth, and a clean user flow. 🚀

[![Status](https://img.shields.io/badge/status-active-success)](#) [![Built%20with](https://img.shields.io/badge/Built%20with-Firebase-orange)](#) [![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-blue)](#)

<img width="1900" height="917" alt="image" src="https://github.com/user-attachments/assets/e1be9d9f-c6db-4de1-883d-e2d02a2ca554" />

---

## ✨ What is CampusNest?

**CampusNest** is a student accommodation web platform built to help students:

- 🔎 Discover nearby rentals quickly
- ✅ View verified landlord listings
- 💬 Send enquiries to landlords
- 👤 Create accounts and manage profiles
- 🛡️ Access role-based admin workflows

It is designed to be practical, mobile-friendly, and easy to scale.

---

## 🌍 Live Demo

- **Website:** https://campusnest-production.up.railway.app/index.html
- **Alternative Website:** https://campus-nest-gamma.vercel.app
- **Vercel-ready:** This repo now includes `vercel.json` plus a Vercel build step.

---

## 🧩 Core Features

### 👩‍🎓 Student Features
- Search listings by location, price range, and bedrooms
- Open listing details with richer property info
- Submit enquiries and contact messages
- Sign up/sign in with email/password or Google (Firebase Auth)

### 🧑‍💼 Landlord Features
- Register landlord profile
- Add and manage property listings
- Receive student enquiries

### 🛠️ Admin Features
- Admin login with role checks
- Moderate listings (approve/update/delete)
- Verify/unverify landlords
- Manage users, enquiries, and contact messages

---

## 🧰 Tools & Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES Modules)
- **Backend Services:** Firebase Authentication, Cloud Firestore, Firebase Storage
- **Hosting/Deploy:** Railway, Netlify, Vercel
- **Version Control:** Git + GitHub
- **Testing/Debugging:** Browser DevTools, Playwright smoke checks

---

## 🚀 Quick Start (Local)

```bash
git clone https://github.com/s-kumalo0115/CampusNest.git
cd CampusNest
npm install
npm run dev
```

Then open:

- `http://localhost:5500/Pages/index.html`

## Vercel Deployment

This project keeps the existing Railway setup and now also supports Vercel.

1. Import the repository into Vercel
2. Vercel reads `vercel.json`
3. The deployment runs `npm run build:vercel`
4. Vercel serves the generated `dist/` folder

The Vercel build publishes the same layout that Railway already serves:

- `app/Pages/*` -> `dist/`
- `app/css` -> `dist/css`
- `app/js` -> `dist/js`
- `app/assets` -> `dist/assets`

---

## 🔐 Firebase Setup Checklist (Important)

If authentication fails, confirm these first:

1. Firebase Console → **Authentication** → **Sign-in method**
   - Enable **Email/Password**
   - Enable **Google**
2. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
   - Add your deployed domain (example: `campusnest-production.up.railway.app`)
   - If you deploy on Vercel, also add your `*.vercel.app` domain or custom domain
3. Confirm your Firebase config values in `app/js/core/firebase.js`

---

## 📁 Project Structure

```text
CampusNest/
├── app/
│   ├── Pages/
│   ├── css/
│   ├── js/
│   └── assets/
├── firebase/
├── README.md
└── package.json
```

## 🤝 Contribution

PRs and feedback are welcome! Open an issue, suggest improvements, and help improve student housing access with tech. 💙

---

## 👤 Author

- GitHub: https://github.com/skumalo0115-commits
