
// src/firebase-config.ts
import { initializeApp } from "firebase/app";
import { getMessaging, Messaging, getToken as firebaseGetToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIz",
  authDomain: "go",
  projectId: "goupromo-eb491",
  storageBucket: "go",
  messagingSenderId: "294",
  appId: "1:294976465249:android:e83"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const messaging: Messaging = getMessaging(app);
export const getToken = firebaseGetToken;
