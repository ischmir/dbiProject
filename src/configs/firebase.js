// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDqqXNyUnLbdBq38gU9ssHwaNci6CQBA6U',
  authDomain: 'dbifirestore.firebaseapp.com',
  projectId: 'dbifirestore',
  storageBucket: 'dbifirestore.firebasestorage.app',
  messagingSenderId: '31538445955',
  appId: '1:31538445955:web:3219d56b0e6e9ce55e25b6',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth(app);