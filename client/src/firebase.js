import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Access env variables using import.meta.env
  authDomain: "mern-blog-8f87e.firebaseapp.com",
  projectId: "mern-blog-8f87e",
  storageBucket: "mern-blog-8f87e.appspot.com",
  messagingSenderId: "99663948712",
  appId: "1:99663948712:web:e85eaa8c0081388d378b9d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
