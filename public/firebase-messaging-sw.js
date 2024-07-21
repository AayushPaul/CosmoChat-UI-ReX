// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDR_jxjDLIjlvP5RHhOvq1LKPGGufEEC7Q',
  authDomain: 'cosmochat-ui-rex.firebaseapp.com',
  projectId: 'cosmochat-ui-rex',
  storageBucket: 'cosmochat-ui-rex.appspot.com',
  messagingSenderId: '3790695864',
  appId: '1:3790695864:web:8e44fbf25000fa574cf34d',
  measurementId: 'G-7DZQ9BW7JB',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
