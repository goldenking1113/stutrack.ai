import React from "react";
import Hero from "../Components/Hero";
import Partners from "../Components/Partners";
import CompanySpotlight from "../Components/CompanySpotlight";
import JobFuse from "../Components/Features";
import TestimonialSlider from "../Components/TestimonialSlider";
import HowWorks from "../Components/HowWorks";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";


import { Button } from '@mui/material'
import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';


export default function Home() {
  const { logOutUser } = useContext(UserContext);
 
  // This function is called when the user clicks the "Logout" button.
  const logOut = async () => {
    try {
      // Calling the logOutUser function from the user context.
      const loggedOut = await logOutUser();
      // Now we will refresh the page, and the user will be logged out and
      // redirected to the login page because of the <PrivateRoute /> component.
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error)
    }
  }

  const { user } = useContext(UserContext);

  return (
    <>
          <NavBar />

      <Hero />
           <h1>Welcome to Expengo</h1>
           {user ? (
        <p>Welcome, {user.profile.email}!</p>
      ) : (
        <p>Please log in to access this content.</p>
      )}
     <Button variant="contained" onClick={logOut}>Logout</Button>
      <Partners />
      <HowWorks />
      <CompanySpotlight />
      <JobFuse />
      <TestimonialSlider />
      <Footer />

    </>
  );
}
