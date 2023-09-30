// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWcerzYs0FBEJCTXXnn_BOnScab_yC7jk",
  authDomain: "user-authentication-1e564.firebaseapp.com",
  projectId: "user-authentication-1e564",
  storageBucket: "user-authentication-1e564.appspot.com",
  messagingSenderId: "885442876269",
  appId: "1:885442876269:web:4dcce0c0736cf3e7b38064"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;