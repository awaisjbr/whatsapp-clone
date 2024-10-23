import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";
import {GoogleAuthProvider} from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyBUuApd4YuesA6DpYG8HKC7K8GUzBo8JcE",
  authDomain: "react-chatapp-7ed4e.firebaseapp.com",
  projectId: "react-chatapp-7ed4e",
  storageBucket: "react-chatapp-7ed4e.appspot.com",
  messagingSenderId: "768503889443",
  appId: "1:768503889443:web:d808f35be08e0a3e163b96",
  measurementId: "G-T58HE6SP56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider(app);