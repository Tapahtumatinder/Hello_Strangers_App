// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3eGuf3dYCtzAEvkjPms9ko5C9buA7Fuc",
  authDomain: "hellostrangersapp.firebaseapp.com",
  projectId: "hellostrangersapp",
  storageBucket: "hellostrangersapp.appspot.com",
  messagingSenderId: "517712954235",
  appId: "1:517712954235:web:3520d40500ba3c77f933de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);