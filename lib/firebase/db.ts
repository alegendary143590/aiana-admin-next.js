import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAK6OP1ViTNadnwdd8Ybnf35Cc7ZDbpPS8",
  authDomain: "aiana-bf19d-b794c.firebaseapp.com",
  projectId: "aiana-bf19d",
  storageBucket: "aiana-bf19d.appspot.com",
  messagingSenderId: "302290704868",
  appId: "1:302290704868:web:82275c5f8271418213cff1",
  measurementId: "G-FETTJFMEC1"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

auth.languageCode = "en-GB"

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export { auth, db }
