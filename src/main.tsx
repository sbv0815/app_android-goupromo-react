import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import './index.css';

/* Ionic CSS */
import '@ionic/react/css/core.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(registration => {
      console.log('Service Worker registrado con alcance:', registration.scope);
    })
    .catch(error => {
      console.error('Fallo en el registro del Service Worker:', error);
    });
}

