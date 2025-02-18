// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB2om7qZN28pyLTPlgtTF0c7MlwEZ7I8AI",
  authDomain: "goupromo-eb491.firebaseapp.com",
  projectId: "goupromo-eb491",
  storageBucket: "goupromo-eb491.firebasestorage.app",
  messagingSenderId: "294976465249",
  appId: "1:294976465249:android:e8365d3515a1ef8a9c7d20"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Mensaje recibido en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

