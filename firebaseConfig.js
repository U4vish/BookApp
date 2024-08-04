// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAHAfoy0CGJcTIdSDEXixifpaFMnPRP7IY",
    authDomain: "lab4atmd.firebaseapp.com",
    projectId: "lab4atmd",
    storageBucket: "lab4atmd.appspot.com",
    messagingSenderId: "141565661432",
    appId: "1:141565661432:web:a8a4015b68c3887f0c6b0d"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);


