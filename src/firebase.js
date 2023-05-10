// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk5MUtoaL9DQOE_n8h4kLCkN5vsxAx99Q",
  authDomain: "reactjs-realor-clone.firebaseapp.com",
  projectId: "reactjs-realor-clone",
  storageBucket: "reactjs-realor-clone.appspot.com",
  messagingSenderId: "729981893629",
  appId: "1:729981893629:web:8faadce46677c1719a3794",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app).useDeviceLanguage();
