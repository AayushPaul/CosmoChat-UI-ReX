// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFunctions, httpsCallable } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR_jxjDLIjlvP5RHhOvq1LKPGGufEEC7Q",
  authDomain: "cosmochat-ui-rex.firebaseapp.com",
  projectId: "cosmochat-ui-rex",
  storageBucket: "cosmochat-ui-rex.appspot.com",
  messagingSenderId: "3790695864",
  appId: "1:3790695864:web:8e44fbf25000fa574cf34d",
  measurementId: "G-7DZQ9BW7JB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
const functions = getFunctions(app);

export {analytics};
export {messaging, functions, httpsCallable};  