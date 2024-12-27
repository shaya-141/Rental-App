// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrrfz8qaXhinbWiblSLqBPyoMd4xfu-sE",
  authDomain: "rental-app-e1832.firebaseapp.com",
  projectId: "rental-app-e1832",
  storageBucket: "rental-app-e1832.firebasestorage.app",
  messagingSenderId: "199880771075",
  appId: "1:199880771075:web:bd3504ebd104e5cdd77036",
  measurementId: "G-NCGWB66PR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

const db = getFirestore(app)
const storage = getStorage(app);

console.log("app");


export {
    app,
    auth,
    db,
    analytics,
    storage
}