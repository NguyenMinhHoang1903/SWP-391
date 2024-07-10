// firebaseConfig.js
import {initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATtcnryN20LxyhcgRgh4eVyVVzPOVQ_fU",
  authDomain: "pet-spa---swp391.firebaseapp.com",
  projectId: "pet-spa---swp391",
  storageBucket: "pet-spa---swp391.appspot.com",
  messagingSenderId: "349131660919",
  appId: "1:349131660919:web:a7ec8626ad3a07c6faf072",
  measurementId: "G-MVVZK4PHLY",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
