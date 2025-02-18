// src/firebase.js
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// Configuración de Firebase (usa la de tu proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyB2om7qZN28pyLTPlgtTF0c7MlwEZ7I8AI",
  authDomain: "goupromo-eb491.firebaseapp.com",
  projectId: "goupromo-eb491",
  storageBucket: "goupromo-eb491.firebasestorage.app",
  messagingSenderId: "294976465249",
  appId: "1:294976465249:android:e8365d3515a1ef8a9c7d20"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Obtener el token FCM
export const getFirebaseToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "CsaXfvdDhqrmGkHGrF3pdsjcfum84iaUYC9j8GqYQUs" });
    if (token) {
      console.log("✅ Token FCM obtenido:", token);
      return token;
    } else {
      console.warn("⚠️ No se pudo obtener el token FCM");
      return null;
    }
  } catch (error) {
    console.error("❌ Error al obtener el token FCM:", error);
    return null;
  }
};

// Escuchar mensajes en primer plano
onMessage(messaging, (payload) => {
  console.log("📩 Mensaje recibido:", payload);
});
