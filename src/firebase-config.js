import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBbqoWKub9zcDueL1CfqCUhTvUuVbz52uc",
  authDomain: "simple-todo-d70c4.firebaseapp.com",
  projectId: "simple-todo-d70c4",
  storageBucket: "simple-todo-d70c4.appspot.com",
  messagingSenderId: "59602738076",
  appId: "1:59602738076:web:1d94e83f5c3c10b9e98659",
  measurementId: "G-HS6M05647D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
