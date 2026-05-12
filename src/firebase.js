import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * ⚠️ ACTION REQUIRED: 
 * Go to https://console.firebase.google.com/
 * 1. Create a project.
 * 2. Add a Web App.
 * 3. Copy the firebaseConfig and paste it below.
 * 4. In Firestore Database, create a database and set rules to allow read/write for now.
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
