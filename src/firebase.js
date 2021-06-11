import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7rRPlGCmWg9Lrk7KWXU5_IKjeabIyobE",
  authDomain: "whatsapp-firebase-78b26.firebaseapp.com",
  projectId: "whatsapp-firebase-78b26",
  storageBucket: "whatsapp-firebase-78b26.appspot.com",
  messagingSenderId: "749481063639",
  appId: "1:749481063639:web:71e8a3154e610e8c8aec92",
  measurementId: "G-YE4R3ETRXC"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider() 
export {auth,provider};
export default db;