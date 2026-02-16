# CampusNest 🏡🎓

CampusNest is a student-accommodation web platform that helps university students discover verified rentals, connect with landlords, and submit property enquiries through a modern, mobile-friendly interface.

**Live demo:** https://campusnest-sa.netlify.app/index.html

---

## Project Overview

Finding safe, affordable housing near campus is often fragmented and frustrating. CampusNest centralizes this process by providing:

- A searchable listing marketplace for students.
- Landlord onboarding and property publishing workflows.
- A role-based admin dashboard for moderation and platform operations.
- Firebase-powered authentication and real-time data management.

This project demonstrates practical full-stack web engineering using vanilla JavaScript + Firebase services, including auth-gated flows, Firestore data modeling, and cloud-hosted deployment.

---

## Core Features

### Student-facing
- Browse and filter accommodation listings by location, university, price range, and bedrooms.
- View detailed listing pages with property-specific information.
- Submit property enquiries and contact messages.
- Create an account and log in to unlock protected actions.

### Landlord-facing
- Register as a landlord and manage landlord profile details.
- Add and publish new rental listings.
- View enquiries from prospective tenants.

### Admin-facing
- Secure admin access with role checks.
- Moderate listings (including status updates and deletion).
- Verify/unverify landlords.
- Manage users, enquiries, and inbound contact messages.
- Track dashboard-level platform counts and unread message indicators.

---

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES Modules)
- **Backend services:** Firebase Authentication, Cloud Firestore, Firebase Storage
- **Security & data control:** Firestore security rules + indexes
- **Deployment:** Netlify (static hosting)

---

## Architecture (High Level)

- **Static multi-page app** with page-specific JavaScript modules.
- **Firebase modular SDK (v10)** for auth and database/storage access.
- **Role-based behavior** enforced in app logic (student/landlord/admin workflows).
- **Cloud Firestore collections** for core entities such as listings, landlords, users, enquiries, contacts, and admins.

---

## Getting Started (Local Setup)

### 1) Clone
```bash
git clone https://github.com/skumalo0115-commits/CampusNest.git
cd CampusNest
```

### 2) Configure Firebase
- Copy values from your Firebase project into your app config.
- You can reference `firebase-config.example.js` for structure and environment-variable options.
- Ensure Firestore rules and indexes are deployed for production behavior.

### 3) Run a local static server
Because this is a static multi-page app, you can run with any lightweight local server:

```bash
# Option A
python -m http.server 3000

# Option B
npx http-server .
```

Then open:
- `http://localhost:3000/CampusNest/index.html` (if serving from repo root), or
- `http://localhost:3000/index.html` (if serving inside `CampusNest/` folder).

---

## Repository Structure

```text
CampusNest/
├── CampusNest/
│   ├── index.html
│   ├── listings.html
│   ├── listing-details.html
│   ├── landlords.html
│   ├── enquiries.html
│   ├── admin.html
│   ├── auth.html
│   ├── profile.html
│   ├── contact.html
│   ├── add-listing.html
│   ├── add-landlord.html
│   ├── *.js / *.css
│   └── images/
├── firebase-config.example.js
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## Resume-Ready Project Description

Use any of the options below depending on your resume space.

### 1-line version
**CampusNest** — Built a Firebase-powered student housing platform with listing discovery, landlord onboarding, enquiry flows, and an admin moderation dashboard.

### 2–3 line version
Developed **CampusNest**, a full-stack student accommodation web app using JavaScript, Firebase Authentication, Cloud Firestore, and Netlify. Implemented searchable listing flows, landlord listing management, enquiry/contact workflows, and role-based admin moderation for listings, users, and landlord verification.

### Bullet-point version (ATS-friendly)
- Engineered a multi-page student housing platform using **HTML/CSS/JavaScript + Firebase** for authentication, database, and storage.
- Built listing discovery and filtering workflows with auth-gated detail access and enquiry submission.
- Implemented landlord and admin operations, including listing management, verification workflows, and dashboard moderation tools.
- Deployed and maintained the application on **Netlify**, with production-oriented configuration patterns for Firebase.

---

## Suggested Resume Skills Tags

`JavaScript` · `Firebase Authentication` · `Cloud Firestore` · `Firebase Storage` · `HTML/CSS` · `Netlify` · `CRUD Applications` · `Role-Based Access` · `Frontend Engineering`

---

## Contribution

Contributions are welcome via issues and pull requests. Please review `CONTRIBUTING.md` first.

## Author

GitHub: https://github.com/skumalo0115-commits
