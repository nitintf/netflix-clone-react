import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";




const config = {
  apiKey: "AIzaSyAq02YvsCajlyZpX6FwNNFKB8sNw2QVeNI",
  authDomain: "react-netflix-b15af.firebaseapp.com",
  projectId: "react-netflix-b15af",
  storageBucket: "react-netflix-b15af.appspot.com",
  messagingSenderId: "8102877990",
  appId: "1:8102877990:web:06eacda2137de9c0abffe7",
};

firebase.initializeApp(config);

const { FieldValue } = firebase.firestore;

export { firebase, FieldValue };
