// firebaseの機能を利用する為のimport
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"

const firebaseConfig = {

    apiKey: "AIzaSyAGe-wnWz7-1O4mNsOqGqMvzH7OT0RsTQI",
    authDomain: "react-preport.firebaseapp.com",
    databaseURL: "https://react-preport-default-rtdb.firebaseio.com",
    projectId: "react-preport",
    storageBucket: "react-preport.appspot.com",
    messagingSenderId: "584015182079",
    appId: "1:584015182079:web:c77bc8e5d1763622ae74ca",
    measurementId: "G-JVPK2NR97R",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);


