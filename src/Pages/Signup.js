import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log("User registered:", user.uid);
        // Redirect to login page after successful registration
        redirectToLogin();
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

  const redirectToLogin = () => {
    // Redirect logic here
    window.location.href = '/login'; // Redirect using window.location
  };

  return (
    <main className="w-full flex">
          <ToastContainer />

      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        {/* Left Side Content */}
      </div>
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <img src="https://floatui.com/logo.svg" width={150} className="lg:hidden" alt="Logo" />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
              <p className="">Already have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</a></p>
            </div>
          </div>
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
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
              Create account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
