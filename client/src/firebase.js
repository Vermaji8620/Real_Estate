import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-estate-2d943.firebaseapp.com",
  projectId: "mern-estate-2d943",
  storageBucket: "mern-estate-2d943.appspot.com",
  messagingSenderId: "920172033151",
  appId: "1:920172033151:web:f2930ad45cd25c3581fb4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
