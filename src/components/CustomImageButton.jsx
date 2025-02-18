import React from 'react';
import { IonButton } from '@ionic/react';

const CustomImageButton = ({ onClick }) => {
  return (
    <IonButton onClick={onClick} style={{ padding: 0, border: 'none', background: 'none' }}>
      <img 
        src="/assets/boton.png" 
        alt="Ícono del Botón" 
        style={{ width: '100%', height: 'auto' }} 
      />
    </IonButton>
  );
};

export default CustomImageButton;
