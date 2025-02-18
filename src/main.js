// src/main.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSXXXXXXXXXXXXXX",
  authDomain: "goupromo-eb491.firebaseapp.com",
  projectId: "goupromo-eb491",
  storageBucket: "goupromo-eb491.firebasestorage.app",
  messagingSenderId: "29XXXXXXXXXX",
  appId: "1:294976465249:android:XXXXXXXXXXXXXXXXXX"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Obtener el token de Firebase
async function obtenerToken() {
  try {
    const permission = await Notification.requestPermission();
    console.log("🔔 Estado del permiso de notificaciones:", permission);
    
    if (permission === "granted") {
      const token = await getToken(messaging);
      if (token) {
        console.log("✅ Token FCM obtenido:", token);
        
        // Obtener la IP del celular antes de enviarlo
        fetch("https://api.ipify.org?format=json")
          .then(response => response.json())
          .then(ipData => {
            const ipCelular = ipData.ip || "IP_NO_DISPONIBLE";
            console.log("🌍 IP del celular obtenida:", ipCelular);
            
            // Enviar los datos a guardar_token.php
            enviarDatosServidor(token, ipCelular);
          })
          .catch(error => console.error("❌ Error obteniendo la IP:", error));
      } else {
        console.warn("⚠️ No se pudo obtener el token FCM.");
      }
    } else {
      console.warn("⚠️ Permiso de notificaciones denegado.");
    }
  } catch (error) {
    console.error("❌ Error al obtener el token FCM:", error);
  }
}

// Enviar token e IP a `guardar_token.php`
function enviarDatosServidor(token, ipCelular) {
    console.log("📡 Enviando token e IP al servidor:", token, ipCelular);
  
    fetch("https://goupromo.com/guardar_token.php", {
      method: "POST",  // Aseguramos que sea POST
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token_fcm: token,
        ip_celular: ipCelular
      })
    })
    .then(response => response.json())
    .then(data => console.log("📡 Respuesta del servidor:", data))
    .catch(error => console.error("❌ Error al enviar los datos al servidor:", error));
  }
  
