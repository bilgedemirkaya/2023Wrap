// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCl1K0uoG516ScU72Awu6H8ocTfzTg-DZk",
    authDomain: "wth-992c7.firebaseapp.com",
    projectId: "wth-992c7",
    storageBucket: "wth-992c7.appspot.com",
    messagingSenderId: "187061484338",
    appId: "1:187061484338:web:b3fbbde0564caf5a05b52b",
    measurementId: "G-57C50P1HK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };
