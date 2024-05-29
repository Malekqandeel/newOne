import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const secret = process.env;
const firebaseConfig = {
  apiKey: secret.APIKEY,
  authDomain: secret.AUTHDOMAI,
  projectId: secret.PROJECTID,
  storageBucket: secret.STORAGEBUKET,
  messagingSenderId: secret.MESSAGINGSENDERID,
  appId: secret.APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

