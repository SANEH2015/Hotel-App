// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";  // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firestore
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage

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
const auth = getAuth(app); // Firebase Auth
const db = getFirestore(app); // Firestore instance
const storage = getStorage(app); // Firebase Storage

// Function to register a user with Firebase Auth
export const registerUser = async (email, password) => {
  try {
    // Attempt to create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return user object on success
  } catch (error) {
    // Handle error by logging it and throwing a more readable message
    console.error("Error registering user:", error.message);
    throw new Error(error.message);
  }
};

// Helper function to upload an image to Firebase Storage
export const uploadImage = async (file, path) => {
  try {
    // Define the reference to where the image will be stored in Firebase Storage
    const storageRef = ref(storage, path);

    // Upload the image file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Retrieve the download URL for the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Return the download URL for the image (can be used to save to Firestore)
    return downloadURL;
  } catch (error) {
    // Handle errors during the upload process
    console.error("Error uploading image to Firebase Storage:", error.message);
    throw new Error("Failed to upload image");
  }
};

// Export Firebase services for use in other files
export { db, storage, auth };
