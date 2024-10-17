import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"; // Firebase Authentication
import { getFirestore, doc, setDoc, collection } from "firebase/firestore"; // Firestore
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

// Firebase services
export const auth = getAuth(app); // Firebase Authentication
export const db = getFirestore(app); // Firestore
export const storage = getStorage(app); // Firebase Storage

// Function to register user in Firebase Authentication and store additional details in Firestore
export const registerUser = async (email, password, username, role, companyName, companyAddress, phoneNumber, adminEmail) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    const userRef = doc(db, "users", user.uid);
    const userData = {
      username,
      email,
      role,
      companyName,
      companyAddress,
      phoneNumber,
      adminEmail,
      createdAt: new Date(),
    };

    await setDoc(userRef, userData);
    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error(error.message);
  }
};

// Function to login user with email and password
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw new Error(error.message);
  }
};

// Function to add accommodation to Firestore
export const addAccommodation = async (accommodationData) => {
  try {
    const accommodationRef = collection(db, "accommodations");
    const docRef = await setDoc(doc(accommodationRef), accommodationData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding accommodation:", error.message);
    throw new Error(error.message);
  }
};

// Function to upload image to Firebase Storage
export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `accommodation_images/${file.name}`); // Create a reference to the file in Firebase Storage
    const snapshot = await uploadBytes(storageRef, file); // Upload the file to Firebase Storage

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL; // Return the image's download URL
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw new Error(error.message);
  }
};
