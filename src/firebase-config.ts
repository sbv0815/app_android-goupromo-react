
// src/firebase-config.ts
import { initializeApp } from "firebase/app";
import { getMessaging, Messaging, getToken as firebaseGetToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB2om7qZN28pyLTPlgtTF0c7MlwEZ7I8AI",
  authDomain: "goupromo-eb491.firebasestorage.app",
  projectId: "goupromo-eb491",
  storageBucket: "goupromo.appspot.com",
  messagingSenderId: "294976465249",
  appId: "1:294976465249:android:e8365d3515a1ef8a9c7d20"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const messaging: Messaging = getMessaging(app);
export const getToken = firebaseGetToken;