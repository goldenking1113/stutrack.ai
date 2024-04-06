import React, { useState } from "react";
import Search from "../assets/svg/Search.svg";
import get from "../assets/svg/get.svg";
import Apply from "../assets/svg/Apply.svg";
const cardData = [
  {
    id: 1,
    title: "1. Track Progress",
    subtitle: "Monitor your progress and improve your skills.",
    imageUrl: Search,
  },
  {
    id: 2,
    title: "2. Solve Problems",
    subtitle: "Engage in problem-solving challenges to enhance your proficiency.",
    imageUrl: Apply,
  },
  {
    id: 3,
    title: "3. Collaborate with Peers",
    subtitle: "Foster collaboration and exchange insights with fellow students.",
    imageUrl: get,
  },
];


export default function HowWorks() {
  const [selectedTab, setSelectedTab] = useState("Resume");

  const tabItems = ["Resume", "Competitions", "Assessments"];

  return (
    <>
      <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 p-10">
        <div className="max-w-xl sm:text-center md:mx-auto">
          <h3 className="text-black text-3xl font-semibold sm:text-4xl">
            How it Works
          </h3>
          <p className="mt-3 text-gray-900 mb-5">
          StuTrack simplifies tracking student performance in competitive programming. Upon registration, users access personalized dashboards and automated analytics. Collaborative features promote teamwork, while intuitive data visualization aids educators in making informed decisions.
          </p>
        </div>

        <div className="absolute inset-0 bg-center dark:bg-black" />

        <div className="flex justify-center flex-wrap">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="group relative m-4 flex h-72 w-96 max-w-xs sm:w-96 sm:max-w-lg rounded-xl shadow-xl ring-gray-900/5"
            >
              <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-100 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                <img
                  src={card.imageUrl}
                  className="animate-fade-in block h-full w-full scale-100 transform p-10 opacity-100 transition duration-300 group-hover:scale-110"
                  alt=""
                />
              </div>

              <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                <h1 className="text-2xl font-bold text-black">{card.title}</h1>
                <h1 className="text-sm font-light text-gray-900">
                  {card.subtitle}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
