
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAVpRe0RIdiZQs6sQUE2Zneo3F8ew9GYOQ",
  authDomain: "new-one-57b43.firebaseapp.com",
  projectId: "new-one-57b43",
  storageBucket: "new-one-57b43.appspot.com",
  messagingSenderId: "627233056977",
  appId: "1:627233056977:web:4aa66a2e7eef26e1b83df0",
  measurementId: "G-EL50CHH05M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };