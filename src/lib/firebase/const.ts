import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyAFrQhVE0LejG70hCYD3c33akb8nhm4rOc',
  authDomain: 'dream-girl-21b13.firebaseapp.com',
  projectId: 'dream-girl-21b13',
  storageBucket: 'dream-girl-21b13.appspot.com',
  messagingSenderId: '1001495672431',
  appId: '1:1001495672431:web:3611a657c0a6a265f87f9a',
  measurementId: 'G-M5PC7TRY0H'
};

export let app: FirebaseApp;
export let firestore: Firestore;
export let auth: Auth;

export const initialiseFirebase = () => {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
  auth = getAuth(app);
};
