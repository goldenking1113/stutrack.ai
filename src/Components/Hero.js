import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrganizeResume from "../assets/OrganizeResume.svg";
import find from "../assets/svg/find.svg";
import explore from "../assets/svg/explore.svg";
import search from "../assets/svg/Search.svg";
import Resume from "./ResumeCheck";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroData, setHeroData] = useState([
    {
      title: "Elevate Student Success with StuTrack",
      description:
        "Transform your college's approach to tracking student performance in competitive programming. Discover insightful analytics and foster collaboration among students with StuTrack.",
      buttons: [
        {
          text: "Get Started",
          color: "white",
          backgroundColor: "gray-800",
          hoverColor: "gray-700",
        },
        {
          text: "Learn More",
          color: "gray-700",
          hoverColor: "gray-900",
          backgroundColor: "white",
        },
      ],
      image: explore,
    },
    {
      title: "Unlock Insights, Empower Your Institution",
      description:
        "Customize analysis, access personalized dashboards, and visualize student performance data effortlessly. Join the journey of exploration and innovation with StuTrack.",
      buttons: [
        {
          text: "Sign Up Now",
          color: "white",
          backgroundColor: "gray-800",
          hoverColor: "gray-700",
        },
        {
          text: "Login here",
          color: "gray-700",
          hoverColor: "gray-900",
          backgroundColor: "white",
        },
      ],
      image: search,
    },
  ]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroData.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative mt-20 h-screen">
      <div className="absolute inset-0 blur-xl h-[580px]"></div>
      <div className="relative">
        <section>
          <div className="max-w-screen-xl mx-auto px-4 pt-28 pb-5 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
            <div className="flex-none space-y-5 max-w-xl">
              <a
                href="javascript:void(0)"
                className="inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white"
              >
                <span className="inline-block rounded-full px-3 py-1 bg-indigo-600 text-white">
                  News
                </span>
                <p className="flex items-center">
                  Explore our chatbot
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              </a>
              <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
                {heroData[currentIndex].title}
              </h1>
              <p>{heroData[currentIndex].description}</p>

              <div className="flex items-center gap-x-3 sm:text-sm">
                {heroData[currentIndex].buttons.map((button, index) => (
                  <a
                    key={index}
                    href="javascript:void(0)"
                    className={`flex items-center justify-center gap-x-1 py-2 px-4 text-${
                      button.color
                    } font-medium bg-${
                      button.backgroundColor
                        ? button.backgroundColor
                        : "gray-800"
                    } duration-150 hover:bg-${
                      button.hoverColor ? button.hoverColor : "gray-700"
                    } active:bg-gray-900 rounded-full md:inline-flex`}
                  >
                    {button.text}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex-1 hidden md:block w-200 h-100">
              <div style={{ overflow: "hidden" }}>
                <motion.img
                  key={heroData[currentIndex].image}
                  src={heroData[currentIndex].image}
                  alt="Organize Resume"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6 mb-10">
            {heroData.map((_, index) => (
              <button
                key={index}
                className={`w-8 h-1 mx-2 rounded-full focus:outline-none ${
                  currentIndex === index ? "bg-gray-800" : "bg-gray-400"
                }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
