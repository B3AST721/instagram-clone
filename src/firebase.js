import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB8aFkuKBlVcEnnp8Sggf-IF6MbAnK1iAY",
    authDomain: "instagram-clone-30c66.firebaseapp.com",
    projectId: "instagram-clone-30c66",
    storageBucket: "instagram-clone-30c66.appspot.com",
    messagingSenderId: "51685443686",
    appId: "1:51685443686:web:9eb7136b6862fa10b885a7"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };