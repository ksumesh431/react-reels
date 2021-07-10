import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

firebase.initializeApp({
    apiKey: "AIzaSyDuPycF05xwtmZ0qwDWHQISnM5gb88XIeY",
    authDomain: "reels-48bb3.firebaseapp.com",
    projectId: "reels-48bb3",
    storageBucket: "reels-48bb3.appspot.com",
    messagingSenderId: "423732937930",
    appId: "1:423732937930:web:9d9900ffec59007b0a2033"
})

export const auth = firebase.auth();

const firestore = firebase.firestore(); // we dont export the whole firestore so that users cant use the functions of firestore
export const database = {
    users: firestore.collection("users"),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();


//export auth
//export required database from firestore
//export storage

