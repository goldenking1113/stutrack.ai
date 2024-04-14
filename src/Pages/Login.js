import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyAaSn-jTG1Kkjaxf2_AeqzwAe69f7jWPeg",
  authDomain: "stutrack-20470.firebaseapp.com",
  projectId: "stutrack-20470",
  storageBucket: "stutrack-20470.appspot.com",
  messagingSenderId: "736390886991",
  appId: "1:736390886991:web:01afbfdab2c7cffb059c3a",
  measurementId: "G-MT933W0LM3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log("User signed in:", user.uid);
        // Redirect or perform other actions
      })
      .catch((error) => {
        // Handle errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign in error:", errorMessage);
        const errorText = errorMessage.split("/")[1];
console.log(errorText);
        toast.error(errorText);
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log("User registered:", user.uid);
        // Redirect or perform other actions
      })
      .catch((error) => {
        // Handle errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Registration error:", errorMessage);
        const errorText = errorMessage.split("/")[1];
console.log(errorText);
        toast.error(errorText);
      });
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
          <ToastContainer />

      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
        <Link to="/">
<h1 style={{ fontWeight: 'bold', fontSize: '2em' }}>StuTrack</h1>          </Link>
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
          </div>
        </div>
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign in
          </button>
        </form>
        <p className="text-center">Don't have an account? <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
      </div>
    </main>
  );
}
