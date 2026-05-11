import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVjuLiDY9hGrf21T6pFN-xg-AI7MNFHnY",
  authDomain: "animeapi-b1f75.firebaseapp.com",
  projectId: "animeapi-b1f75",
  storageBucket: "animeapi-b1f75.firebasestorage.app",
  messagingSenderId: "70321479871",
  appId: "1:70321479871:web:a393e29caa20fe0348e60a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };