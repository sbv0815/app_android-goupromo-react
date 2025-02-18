import React, { useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { homeOutline } from 'ionicons/icons';
import { messaging, getToken } from './firebase-config';  // Asegúrate de que la ruta sea correcta

const SendTokenButton = () => {
  const [statusMessage, setStatusMessage] = useState('');

  const handleSend = async () => {
    try {
      // 1. Solicitar permiso para notificaciones
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setStatusMessage('Permiso para notificaciones no concedido.');
        return;
      }

      // 2. Obtener el token de Firebase (reemplaza YOUR_VAPID_KEY con el valor obtenido en Firebase Console)
      const fcmToken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
      if (!fcmToken) {
        setStatusMessage('No se pudo obtener el token de Firebase.');
        return;
      }
      console.log('Token de Firebase:', fcmToken);

      // 3. Obtener la IP pública usando ipify
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;
      console.log('IP pública:', ip);

      // 4. Enviar token e IP al servidor (reemplaza la URL por la de tu endpoint real)
      const response = await fetch('https://goupromo.com/guardar_token.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token_fcm: fcmToken,
          ip_celular: ip
        })
      });
      const result = await response.json();
      console.log('Respuesta del servidor:', result);
      setStatusMessage(result.message || 'Datos enviados correctamente.');
    } catch (error) {
      console.error('Error al enviar token e IP:', error);
      setStatusMessage('Error al enviar los datos.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <IonButton onClick={handleSend}>
        <IonIcon slot="start" icon={homeOutline} />
        Enviar Token e IP
      </IonButton>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default SendTokenButton;
