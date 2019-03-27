import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


export function initializeFirebase() {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyB-39dPhBmprjGMhREEaKubQ9RSR0yF2SQ",
        authDomain: "meealwaysawesome.firebaseapp.com",
        databaseURL: "https://meealwaysawesome.firebaseio.com",
        projectId: "meealwaysawesome",
        storageBucket: "meealwaysawesome.appspot.com",
        messagingSenderId: "190884510771"
    };
    firebase.initializeApp(config);
}

export function getFirebaseNamespace() {
    return firebase;
}
