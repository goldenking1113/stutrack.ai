import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { emailPasswordSignup, verifyUser } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    // Extract token and tokenId from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const tokenId = searchParams.get("tokenId");

    // Perform user verification if token and tokenId exist
    if (token && tokenId) {
      handleUserVerification(token, tokenId);
    }
  }, [location.search]); // Re-run effect when URL parameters change

  const handleUserVerification = async (token, tokenId) => {
    try {
      // Perform user verification
      await verifyUser(token, tokenId);
      // Redirect user to the desired page upon successful verification
      navigate("/"); // Change to the desired destination
    } catch (error) {
      console.error("User verification failed:", error);
      // Handle failure (e.g., display error message)
    }
  };

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) navigate("/"); // Redirect to home page after signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up for an account</h3>
            <p>Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link></p>
          </div>
        </div>
        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={onFormInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={onFormInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign Up
          </button>
          {error && <div className="text-red-500">{error}</div>}
          <div className="text-center">
            <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
