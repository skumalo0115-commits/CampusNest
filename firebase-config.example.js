/*
  firebase-config.example.js
  Example Firebase configuration for CampusNest. Replace the placeholder values with your project's keys.

  Two usage options are shown:
  1) Directly import this file (not recommended for real keys in public repos).
  2) Recommended: load values from environment variables (Netlify / local .env) and commit this example only.

  DO NOT COMMIT REAL SECRETS: keep real API keys and secrets out of source control. Use .env or your hosting provider's environment variable settings.
*/

// Option A - simple object with placeholders (quick copy/paste)
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Option B - recommended: read from environment variables (works with build systems and Netlify)
// Example using Node-style environment variables (works during build):
export const firebaseConfigFromEnv = {
  apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project-id.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project-id.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Small usage examples:
// (1) Modular SDK (Firebase v9+)
// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "./firebase-config.example";
// const app = initializeApp(firebaseConfig);

// (2) When using environment variables with a bundler (e.g. Netlify, Vite, or Create React App),
// import { initializeApp } from "firebase/app";
// import { firebaseConfigFromEnv } from "./firebase-config.example";
// const app = initializeApp(firebaseConfigFromEnv);

// Notes:
// - If you use environment variables in the browser build, make sure your build tool exposes them (e.g. Vite uses import.meta.env, CRA prefixes env vars with REACT_APP_)
// - Netlify: add the FIREBASE_* variables in Site settings → Build & deploy → Environment
