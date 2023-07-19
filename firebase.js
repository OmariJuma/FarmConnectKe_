// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  databaseURL,
} from '@env';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  databaseURL: databaseURL,
};

// Initialize Firebase
const app =initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase(app);
export const storage = getStorage(app);