import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCPzR_H04cPFuJDWnZQksPHmWQm-eVvL34",
    authDomain: "book-catalog-25fc9.firebaseapp.com",
    projectId: "book-catalog-25fc9",
    storageBucket: "book-catalog-25fc9.appspot.com",
    messagingSenderId: "262735096013",
    appId: "1:262735096013:web:bb371cbb7b0fb1f2f12184",
    measurementId: "G-EGNLXJPQFP"
  };  

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)

// enableIndexedDbPersistence(db)
//   .catch((err) => {
//     if (err.code === 'failed-precondition') {
//       console.error("Multiple tabs open, persistence can only be enabled in one tab at a time.");
//     } else if (err.code === 'unimplemented') {
//       console.error("The current browser does not support all of the features required to enable persistence.");
//     }
//   });

const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistent local cache
const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

export { app, db };
