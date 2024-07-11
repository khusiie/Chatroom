// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW4zJCqv1CXuK_KqvlCC0_3Rg9DuobZRg",
  authDomain: "chatroom-ab4bc.firebaseapp.com",
  projectId: "chatroom-ab4bc",
  storageBucket: "chatroom-ab4bc.appspot.com",
  messagingSenderId: "454969546512",
  appId: "1:454969546512:web:703bdc95fb3133c03bf795"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth();
export  const provider =  new GoogleAuthProvider();
export const db = getFirestore(app);