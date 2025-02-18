import React, { useState } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonLoading 
} from '@ionic/react';

// Función simulada para obtener el token de Firebase.
// En tu proyecto real, importa o define la función que integre Firebase Cloud Messaging.
const getFirebaseToken = async (): Promise<string> => {
  // Aquí deberías implementar la lógica para obtener el token de Firebase.
  // Por ejemplo, usando el SDK de Firebase y pidiendo permiso.
  // Para fines de ejemplo, devolvemos un token simulado:
  return "TOKEN_SIMULADO_FIREBASE";
};

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleButtonPress = async () => {
    setLoading(true);

    try {
      // 1. Obtener el token de Firebase
      const token = await getFirebaseToken();
      console.log("Token de Firebase:", token);

      // 2. Obtener la IP pública
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;
      console.log("IP pública:", ip);

      // 3. Enviar token e IP a tu endpoint (reemplaza la URL por la de tu servidor)
      const postData = { token_fcm: token, ip_celular: ip };
      const response = await fetch('https://goupromo.com/guardar_token.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      // 4. Mostrar splash con logo3.png durante 3 segundos y luego redirigir
      setTimeout(() => {
        window.location.href = 'https://goupromo.com/login_form.php';
      }, 3000);

    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
    // Nota: No cerramos el loading inmediatamente para dejar visible el splash.
    // El IonLoading se cerrará al redirigir o puedes gestionarlo según prefieras.
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Botón para iniciar el proceso */}
        <IonButton expand="block" onClick={handleButtonPress}>
          Iniciar
        </IonButton>

        {/* IonLoading se mostrará mientras se envían los datos y se espera la redirección */}
        <IonLoading
          isOpen={loading}
          message={"Enviando datos..."}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
