import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

<RouterProvider router={router} />
=======

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_FKJ2Wsmvxtd12_tjnFk7GJ5J6myquNs",
  authDomain: "weedle-3f1c5.firebaseapp.com",
  projectId: "weedle-3f1c5",
  storageBucket: "weedle-3f1c5.appspot.com",
  messagingSenderId: "312335188057",
  appId: "1:312335188057:web:0c5c2e61cb95713b8db148",
  measurementId: "G-JZRNFEY022"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
>>>>>>> b6167cba357933d02052783751a2ef4d6a897d91

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
<<<<<<< HEAD

=======
>>>>>>> b6167cba357933d02052783751a2ef4d6a897d91
