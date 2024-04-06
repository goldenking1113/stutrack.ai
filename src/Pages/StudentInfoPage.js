import {
  Link,
  useParams,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
// import Dp from "../assests/Dp.png";
import "../App.css";
import Chart from "../Components/Chart";

function StudentInfoPage({ students }) {
  const { rollno } = useParams();
  const student = students.find((student) => student.RollNo === rollno);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let leetcodeId = student.LeetcodeId;
    fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeId}`)
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [student.LeetcodeId]);

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="max-w-md mx-auto bg-customBlue rounded-xl shadow-md overflow-hidden md:max-w-2xl ">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              {/* <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={Dp}
                alt="Student"
              /> */}
            </div>
            <div className="p-8">
              <h2 className="block mt-1 text-lg leading-tight font-medium text-white hover:underline">
                {student.Name}
              </h2>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-white">Roll no:</span>
                  <span className="ml-2 text-white font-semibold">
                    {student.RollNo}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-white">Department:</span>
                  <span className="ml-2 text-white font-semibold">
                    {student.Department}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-white">Batch:</span>
                  <span className="ml-2 text-white font-semibold">
                    {student.Batch}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-white">Gender:</span>
                  <span className="ml-2 text-white font-semibold">
                    {student.Gender}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-white">Hostel:</span>
                  <span className="ml-2 text-white font-semibold">
                    {student.Hostel}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-white">Placement:</span>
                  <span className="ml-2 text-white font-semibold">
                    {student.Placement}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-white">Official Mail id:</span>
                  <span className="ml-2 text-white font-semibold">
                    {student["Official Mail id"]}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-white">Leetcode ID:</span>
                  <span className="ml-2 text-white font-semibold">
                    {student.LeetcodeId}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-md p-6 max-w-2xl mx-auto bg-gray-80">
            <h1 className="text-2xl font-bold mb-4 text-white">
              LeetCode Statistics
            </h1>
            {stats && <Chart stats={stats} />}

            {stats ? (
              <div className="leetcode-stats grid grid-cols-2 gap-4 text-white mt-10">
                <div>
                  <p>
                    Total Solved: {stats.totalSolved}/{stats.totalQuestions}
                  </p>
                  <div className="bg-gray-500 h-2 rounded-full mt-1">
                    <div
                      className="bg-yellow-300 h-full rounded-full"
                      style={{
                        width: `${
                          (stats.totalSolved / stats.totalQuestions) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p>
                    Easy Solved: {stats.easySolved}/{stats.totalEasy}
                  </p>
                  <div className="bg-gray-500 h-2 rounded-full mt-1">
                    <div
                      className="bg-yellow-300 h-full rounded-full"
                      style={{
                        width: `${(stats.easySolved / stats.totalEasy) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p>
                    Medium Solved: {stats.mediumSolved}/{stats.totalMedium}
                  </p>
                  <div className="bg-gray-500 h-2 rounded-full mt-1">
                    <div
                      className="bg-yellow-300 h-full rounded-full"
                      style={{
                        width: `${
                          (stats.mediumSolved / stats.totalMedium) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p>
                    Hard Solved: {stats.hardSolved}/{stats.totalHard}
                  </p>
                  <div className="bg-gray-500 h-2 rounded-full mt-1">
                    <div
                      className="bg-yellow-300 h-full rounded-full"
                      style={{
                        width: `${(stats.hardSolved / stats.totalHard) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p>Acceptance Rate: {stats.acceptanceRate}%</p>
                  <div className="bg-gray-500 h-2 rounded-full mt-1">
                    <div
                      className="bg-yellow-300 h-full rounded-full"
                      style={{ width: `${stats.acceptanceRate}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p>Ranking: {stats.ranking}</p>
                </div>
                <div>
                  <p>Contribution Points: {stats.contributionPoints}</p>
                </div>
                <div>
                  <p>Reputation: {stats.reputation}</p>
                </div>
              </div>
            ) : (
              <p className="text-white">Loading LeetCode statistics...</p>
            )}
          </div>

          <div className="p-6">
            <Link
              to="/Students"
              className="block text-center w-full bg-customOrange hover:bg-gray-500 text-white py-2 px-4 rounded"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentInfoPage;
