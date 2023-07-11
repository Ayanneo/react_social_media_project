// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB65nEXeb89F6dm3J-x-nWixxcvNWLRsSI",
  authDomain: "react-socialmedia-project.firebaseapp.com",
  projectId: "react-socialmedia-project",
  storageBucket: "react-socialmedia-project.appspot.com",
  messagingSenderId: "852021137675",
  appId: "1:852021137675:web:cfc4d0f412381da139920e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);