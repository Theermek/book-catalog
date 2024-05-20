import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBqSrOiGyzyS4UUfSoYzp43dQbPm9e6W1Q",
  authDomain: "newbook-29167.firebaseapp.com",
  projectId: "newbook-29167",
  storageBucket: "newbook-29167.appspot.com",
  messagingSenderId: "890590168825",
  appId: "1:890590168825:web:d0ba933c82f339418f0428",
  measurementId: "G-HE2257YXG8"
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
