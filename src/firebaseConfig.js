// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";  // Import Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp6SzXut3eYFHLEZPLwSiT50uhTF2TY3U",
  authDomain: "hotel-app-7cac9.firebaseapp.com",
  databaseURL: "https://hotel-app-7cac9-default-rtdb.firebaseio.com",
  projectId: "hotel-app-7cac9",
  storageBucket: "hotel-app-7cac9.appspot.com",
  messagingSenderId: "1006236254157",
  appId: "1:1006236254157:web:24bd980dab3f3430004e84",
  measurementId: "G-PKH3YKXW0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);  // Firebase Auth

// Function to register a user with Firebase Auth
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error.message;
  }
};
