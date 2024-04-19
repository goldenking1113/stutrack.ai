import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function PageRedirect() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Check if the email contains numbers
      const hasNumbers = /\d/.test(user.profile.email);

      if (hasNumbers) {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/StudentsDashboard");
        }, 2000);
      } else {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/FaultyDashboard");
        }, 2000);
      }
    }
  }, [user, navigate]);

  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="w-2/3 h-4 bg-gray-300 rounded mb-2" />
        <div className="w-full h-8 bg-gray-300 rounded mb-2" />
        <div className="w-full h-8 bg-gray-300 rounded mb-2" />
        <div className="w-1/2 h-8 bg-gray-300 rounded" />
      </div>
    </>
  );
}
