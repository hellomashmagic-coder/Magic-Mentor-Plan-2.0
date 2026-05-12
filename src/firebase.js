import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your real web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPxbmwCwD5WIBEolgfpDIYi90M4qU-jeg",
  authDomain: "magicmentor-c2199.firebaseapp.com",
  projectId: "magicmentor-c2199",
  storageBucket: "magicmentor-c2199.firebasestorage.app",
  messagingSenderId: "1063334828777",
  appId: "1:1063334828777:web:1b12d6fdf9acb8b26f6e78",
  measurementId: "G-63H81NXYHZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
