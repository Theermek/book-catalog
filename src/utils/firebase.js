import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCPzR_H04cPFuJDWnZQksPHmWQm-eVvL34",
    authDomain: "book-catalog-25fc9.firebaseapp.com",
    projectId: "book-catalog-25fc9",
    storageBucket: "book-catalog-25fc9.appspot.com",
    messagingSenderId: "262735096013",
    appId: "1:262735096013:web:bb371cbb7b0fb1f2f12184",
    measurementId: "G-EGNLXJPQFP"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)