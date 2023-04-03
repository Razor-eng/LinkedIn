import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBbBBgvF9PUvA0KIsN6F_U7mBjLKJ3FF1k",
    authDomain: "linkedin-98.firebaseapp.com",
    projectId: "linkedin-98",
    storageBucket: "linkedin-98.appspot.com",
    messagingSenderId: "597788304580",
    appId: "1:597788304580:web:4a0c1eafb377bf09f79591"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db 
