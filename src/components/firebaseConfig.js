import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBoLWIUHP1Rg_vlT6rqzCsAorRJiQgwdns",
  authDomain: "cineasta-48ac5.firebaseapp.com",
  databaseURL: "https://cineasta-48ac5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cineasta-48ac5",
  storageBucket: "cineasta-48ac5.appspot.com",
  messagingSenderId: "431519264343",
  appId: "1:431519264343:web:f43018c6f032febb4cbd12",
  measurementId: "G-539C3GWWV2"
};

const app = initializeApp(firebaseConfig);

export default app;