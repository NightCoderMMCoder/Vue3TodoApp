import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeRBRYzoy0qKRMzELkVoxJPcTdDAIZnaU",
  authDomain: "todos-app-a2f82.firebaseapp.com",
  projectId: "todos-app-a2f82",
  storageBucket: "todos-app-a2f82.appspot.com",
  messagingSenderId: "299559673505",
  appId: "1:299559673505:web:87d5eef987a3a21bb8dae0",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
