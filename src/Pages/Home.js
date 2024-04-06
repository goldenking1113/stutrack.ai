import React from "react";
import Hero from "../Components/Hero";
import Partners from "../Components/Partners";
import CompanySpotlight from "../Components/CompanySpotlight";
import JobFuse from "../Components/Features";
import TestimonialSlider from "../Components/TestimonialSlider";
import HowWorks from "../Components/HowWorks";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <HowWorks />
      <CompanySpotlight />
      <JobFuse />
      <TestimonialSlider />
    </>
  );
}
