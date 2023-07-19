import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDi5qbqQT6GtVnadKe78PPLN209LjULxEk",
  authDomain: "blog-app-840eb.firebaseapp.com",
  projectId: "blog-app-840eb",
  storageBucket: "blog-app-840eb.appspot.com",
  messagingSenderId: "1070357296285",
  appId: "1:1070357296285:web:91a73d3a6ffbfc44935074",
  measurementId: "G-TBG6NLPLDP"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ;
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
