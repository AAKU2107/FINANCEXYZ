// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3xFPs_NJazzgJ0AfqgW9rZe_BPtrmJGo",
  authDomain: "financial-tracker-959ce.firebaseapp.com",
  projectId: "financial-tracker-959ce",
  storageBucket: "financial-tracker-959ce.firebasestorage.app",
  messagingSenderId: "1002293119867",
  appId: "1:1002293119867:web:7a6890c8d00efb56dd8bde",
  measurementId: "G-93V1JWZKSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);