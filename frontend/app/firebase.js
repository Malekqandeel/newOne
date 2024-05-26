// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1lXSkixnIDnl3it35qkGvP9trwcZkng8",
  authDomain: "photonotnull.firebaseapp.com",
  projectId: "photonotnull",
  storageBucket: "photonotnull.appspot.com",
  messagingSenderId: "569559975269",
  appId: "1:569559975269:web:686c18a5f89b6fc94b4d8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
