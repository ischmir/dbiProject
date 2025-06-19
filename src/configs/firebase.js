// Importerer Firebase-funktioner
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase konfiguration (forbinder app til Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDqqXNyUnLbdBq38gU9ssHwaNci6CQBA6U",
  authDomain: "dbifirestore.firebaseapp.com",
  projectId: "dbifirestore",
  storageBucket: "dbifirestore.firebasestorage.app",
  messagingSenderId: "31538445955",
  appId: "1:31538445955:web:3219d56b0e6e9ce55e25b6",
};

// Initialiserer Firebase / starter Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Eksporterer auth og db
export { auth, db };
