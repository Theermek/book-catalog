import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCm3igSS7VNVVYzd0w2gCKdhjPXQLCaz6w",
    authDomain: "books-15695.firebaseapp.com",
    projectId: "books-15695",
    storageBucket: "books-15695.appspot.com",
    messagingSenderId: "863505565605",
    appId: "1:863505565605:web:4c3e7765303c31629e8a4c",
    measurementId: "G-7HC1RXMZ3B"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Вероятно, у вас открыто несколько вкладок
      console.error("Multiple tabs open, persistence can only be enabled in one tab at a time.");
    } else if (err.code === 'unimplemented') {
      // Браузер не поддерживает необходимые функции
      console.error("The current browser does not support all of the features required to enable persistence.");
    }
  });
