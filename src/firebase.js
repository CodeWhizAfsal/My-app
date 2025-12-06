import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6YbXoX-1bzt1udadoiJjktVL1q0yq-ao",
    authDomain: "clone-47af2.firebaseapp.com",
    projectId: "clone-47af2",
    storageBucket: "clone-47af2.firebasestorage.app",
    messagingSenderId: "100714310148",
    appId: "1:100714310148:web:8b4912c501833a83552351",
    measurementId: "G-ZB850VRMJW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
