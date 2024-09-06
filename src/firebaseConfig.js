// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAc-cSMsNThP_OrOvUXkrr9_vbo7rn_dJw",
  authDomain: "tutorme-cf260.firebaseapp.com",
  projectId: "tutorme-cf260",
  storageBucket: "tutorme-cf260.appspot.com",
  messagingSenderId: "494374119554",
  appId: "1:494374119554:web:5d1a80c1a96c0338dd2c9b",
  measurementId: "G-DMEWEVM08W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Storage and export it
export const storage = getStorage(app);
