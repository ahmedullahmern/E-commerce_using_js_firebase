import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBxXe40sDWtbWoYCKMs9-Xf-PJwSfCVLZQ",
    authDomain: "my-second-projects-2f4ce.firebaseapp.com",
    projectId: "my-second-projects-2f4ce",
    storageBucket: "my-second-projects-2f4ce.appspot.com",
    messagingSenderId: "853974621544",
    appId: "1:853974621544:web:8304364f3c341c9040cadd",
    measurementId: "G-5ZC5PD4LST"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    auth,
    storage,
    db,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    ref,
    uploadBytes,
    getDownloadURL,
    doc,
    setDoc,
    signOut,
    signInWithEmailAndPassword,
    collection,
    addDoc
}


