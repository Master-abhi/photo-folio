// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMafbgUr4k2Z4oaz4pEVUcYHYWj3A7tzQ",
  authDomain: "photo-folio-cc222.firebaseapp.com",
  projectId: "photo-folio-cc222",
  storageBucket: "photo-folio-cc222.appspot.com",
  messagingSenderId: "566740873493",
  appId: "1:566740873493:web:817f2e779b61726870f91c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);