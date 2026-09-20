import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0hAsHP9I8322RQQ7Dib-ebWqxbyqfZl8",
  authDomain: "medicare-38d90.firebaseapp.com",
  projectId: "medicare-38d90",
  storageBucket: "medicare-38d90.firebasestorage.app",
  messagingSenderId: "155847159834",
  appId: "1:155847159834:web:59f5fe5fee03da7f67a1a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;