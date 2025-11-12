// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqlPR5kriEnM7YeTYMA8O1rYf8zGfKW7U",
  authDomain: "kirishilink.firebaseapp.com",
  projectId: "kirishilink",
  storageBucket: "kirishilink.firebasestorage.app",
  messagingSenderId: "208326452507",
  appId: "1:208326452507:web:6f08c7b9e426a078599fbe",
  measurementId: "G-C73P4F7FP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);