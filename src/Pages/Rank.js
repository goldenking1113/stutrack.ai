import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

export default function Rank() {
  const cardsData = [
    {
      id: 1,
      title: "Ranklist by Number of Problems Solved",
      route: "/ranklist",
      features: [
        "This ranklist is generated based on the number of problems solved by each participant on LeetCode.",
        "It provides insights into the proficiency and dedication of participants in problem-solving.",
        "The ranklist includes columns for Rank, Name, LeetCode ID, Department, and the Number of Problems Solved by each participant.",
      ],
    },
    {
      id: 2,
      title: "Ranklist by Contest Rating",
      route: "/contestrank",
      features: [
        "This ranklist is created by considering the contest rating of participants on LeetCode.",
        "It offers an overview of participants' performance and competitiveness in LeetCode contests.",
        "The ranklist comprises columns for Rank, Name, LeetCode ID, Contest Rating, Contest Attendance, and Contest Global Ranking.",
      ],
    },
    {
      id: 3,
      title: "Ranklist by Filtered Contest Title",
      route: "/contestwiserank",
      features: [
        "This ranklist is tailored to specific contest titles, allowing for focused analysis and comparison.",
        "It displays participants' details such as Name, LeetCode ID, Status, Rating, Ranking, Problems Solved, and Trend Direction.",
        "You can filter contests based on their titles to generate ranklists.",
      ],
    },
  ];

  return (
    <div className="flex justify-center items-center h-full p-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {cardsData.map((card) => (
          <Link to={card.route} key={card.id} className="w-full h-full">
            <div
              style={{ backgroundColor: '#D9E8F5', transition: 'background-color 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#91BED4'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D9E8F5'}
              className="flex flex-col justify-between px-6 pt-10 pb-8 shadow-xl ring-1 sm:max-w-md sm:rounded-lg sm:px-10 h-full"
            >
              <div className="space-y-6 text-base leading-7">
                <p>{card.title}</p>
                <ul className="space-y-4 text-gray-800">
                  {card.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-6 w-6 flex-none fill-sky-300 stroke-sky-500 stroke-2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx={12} cy={12} r={11} />
                        <path
                          d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                          fill="none"
                        />
                      </svg>
                      <p className="ml-4">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
