// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4nzUUEsmdvn8EiqZ1cTO8jcQ5H7v__E8",
  authDomain: "portfolio-f7557.firebaseapp.com",
  projectId: "portfolio-f7557",
  storageBucket: "portfolio-f7557.appspot.com",
  messagingSenderId: "342054147256",
  appId: "1:342054147256:web:e203df67276fa65fb5904d",
  measurementId: "G-DKQJKGS6V1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}