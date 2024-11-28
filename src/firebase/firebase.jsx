// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQgmISGsEYLrKKMWbLq-iVEuUEMYA6KA4",
  authDomain: "my-workout-c79c2.firebaseapp.com",
  projectId: "my-workout-c79c2",
  storageBucket: "my-workout-c79c2.firebasestorage.app",
  messagingSenderId: "1088084142844",
  appId: "1:1088084142844:web:dd06d3566072aacef30579",
  measurementId: "G-89C6GEZVDR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Export de l'authentification
export const auth = getAuth(app);
