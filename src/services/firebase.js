import firebase from "firebase";


const config = {
  apiKey: process.env.KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.TORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_APP_ID,
  measurementId: process.env.MEASUREMNT_ID,
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
