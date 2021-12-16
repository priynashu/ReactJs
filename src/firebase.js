import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAFU0M_WwPJOyoX4XE4XgQ97q1orvedhJI",
  authDomain: "ecommerce-75e95.firebaseapp.com",
  projectId: "ecommerce-75e95",
  storageBucket: "ecommerce-75e95.appspot.com",
  messagingSenderId: "1087511152733",
  appId: "1:1087511152733:web:d40d840d2420241d18a5b4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
