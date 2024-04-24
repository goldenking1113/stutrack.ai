import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/user.context";
import studentsData from "./studentsUsername.json";
import Loading from "./Loading";

export default function StudentsDetails() {
  const { user } = useContext(UserContext);
  const [matchedUsernames, setMatchedUsernames] = useState(null);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [hackerrankData, setHackerrankData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [hackerearthData, setHackerearthData] = useState(null);
  const [Leetcode, setLeetcode] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get("https://stutrackai-server-phi.vercel.app/user_details");
        const studentsData = response.data.user_details;
        const matchedStudent = studentsData.find(
          (student) => student.mailid === user.profile.email
        );
        if (!matchedStudent) {
          throw new Error("Student not found");
        }
        setStudent(matchedStudent);
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError(error.message);
      }
    };

    fetchStudentDetails();
  }, [user.profile.email]);

  useEffect(() => {
    if (student) {
      try {
        const matchedUser = studentsData.find(
          (user) => user.rollNo === student.rollNo
        );
        if (!matchedUser) {
          throw new Error("User not found");
        }
        setMatchedUsernames(matchedUser);
      } catch (error) {
        console.error("Error fetching matching usernames:", error);
        setError(error.message);
      }
    }
  }, [student]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRequests = [];

        if (matchedUsernames && matchedUsernames.leetcode) {
          fetchRequests.push(
            fetch(
              `https://stu-track-score.vercel.app/leetcode/${matchedUsernames.leetcode}`
            ).then((response) => response.json())
          );
        }
        if (matchedUsernames && matchedUsernames.codeforces) {
          fetchRequests.push(
            fetch(
              `https://stu-track-score.vercel.app/codeforces/${matchedUsernames.codeforces}`
            ).then((response) => response.json())
          );
        }
        if (matchedUsernames && matchedUsernames.codechef) {
          fetchRequests.push(
            fetch(
              `https://stu-track-score.vercel.app/codechef/${matchedUsernames.codechef}`
            ).then((response) => response.json())
          );
        }
        if (matchedUsernames && matchedUsernames.hackerrank) {
          fetchRequests.push(
            fetch(
              `https://stu-track-score.vercel.app/hackerrank/${matchedUsernames.hackerrank}`
            ).then((response) => response.json())
          );
        }
        if (matchedUsernames && matchedUsernames.hackerearth) {
          fetchRequests.push(
            fetch(
              `https://stu-track-score.vercel.app/hackerearth/${matchedUsernames.hackerearth}`
            ).then((response) => response.json())
          );
        }

        const [
          leetcodeData,
          codeforcesData,
          codechefData,
          hackerrankData,
          hackerearthData,
        ] = await Promise.all(fetchRequests);

        setLeetcode(leetcodeData);
        setCodeforcesData(codeforcesData);
        setCodechefData(codechefData);
        setHackerrankData(hackerrankData);
        setHackerearthData(hackerearthData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [matchedUsernames]);

  if (error) {
    return <div>Error fetching student details: {error}</div>;
  }

  if (!student) {
    return <Loading />;
  }

  return (
    <>
      <div className="p-6">
        {error ? (
          <div className="text-red-600">
            Error fetching matching usernames: {error}
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2 text-blue-600">
              {student.name}
            </h2>
            <p className="text-gray-800 font-semibold mb-2">
              Roll No: {student.rollNo}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              Degree: {student.degree}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              Department: {student.dept}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              Batch: {student.batch}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              Section: {student.section}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              Mail ID: {student.mailid}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              Mobile No: {student.mobile}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              {student.hosteller ? "Hosteller" : "Day Scholar"}
            </p>
          </>
        )}
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Leetcode ? (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img
                  src="https://assets.leetcode.com/static_assets/public/icons/favicon-96x96.png"
                  alt="LeetCode Logo"
                  className="w-8 h-8 mr-2"
                />
                LeetCode
              </h2>
              <div className="text-gray-800">
                <p className="font-semibold">
                  Total Solved: {Leetcode.totalSolved}
                </p>
                <p className="font-semibold">
                  Easy Problems Solved: {Leetcode.easySolved} /{" "}
                  {Leetcode.totalEasy}
                </p>
                <p className="font-semibold">
                  Medium Problems Solved: {Leetcode.mediumSolved} /{" "}
                  {Leetcode.totalMedium}
                </p>
                <p className="font-semibold">
                  Hard Problems Solved: {Leetcode.hardSolved} /{" "}
                  {Leetcode.totalHard}
                </p>
                <p className="font-semibold">
                  Contest Ranking: {Leetcode.ranking}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <Loading />
            </div>
          )}

          {codeforcesData ? (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png"
                  alt="Codeforces Logo"
                  className="w-8 h-8 mr-2"
                />
                Codeforces
              </h2>
              <div className="text-gray-800">
                <p className="font-semibold">
                  Total Solved: {codeforcesData.TotalsolvedProblems}
                </p>
                <p className="font-semibold">
                  Level: {codeforcesData.maxLevel}
                </p>
                <p className="font-semibold">
                  Contribution: {codeforcesData.contribution}
                </p>
                <p className="font-semibold">
                  Contest Rating: {codeforcesData.contestRating}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <Loading />
            </div>
          )}

          {codechefData ? (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img
                  src="https://avatars.githubusercontent.com/u/11960354?v=4"
                  alt="CodeChef Logo"
                  className="w-8 h-8 mr-2"
                />
                CodeChef
              </h2>
              <div className="text-gray-800">
                <p className="font-semibold">
                  Current Rating: {codechefData.currentRating}
                </p>
                <p className="font-semibold">
                  Highest Rating: {codechefData.highestRating}
                </p>
                <p className="font-semibold">Stars: {codechefData.stars}</p>
                <p className="font-semibold">
                  Global Rank: {codechefData.globalRank}
                </p>
                <p className="font-semibold">
                  Country Rank: {codechefData.countryRank}
                </p>
                <p className="font-semibold">
                  Contests Attended: {codechefData.totalContestAttended}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <Loading />
            </div>
          )}

          {hackerrankData ? (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/HackerRank_logo.png/600px-HackerRank_logo.png"
                  alt="HackerRank Logo"
                  className="w-8 h-8 mr-2"
                />
                HackerRank
              </h2>
              <div className="text-gray-800">
                {hackerrankData.badges && hackerrankData.badges.length > 0 && (
                  <>
                    <p className="font-semibold">Badges:</p>
                    <ul className="list-disc list-inside">
                      {hackerrankData.badges.map((badge, index) => (
                        <li key={index}>
                          {badge.badge_title} - {badge.badge_level}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {hackerrankData.certifications &&
                  hackerrankData.certifications.length > 0 && (
                    <>
                      <p className="font-semibold">Certifications:</p>
                      <ul className="list-disc list-inside">
                        {hackerrankData.certifications.map(
                          (certification, index) => (
                            <li key={index}>
                              {certification.certification_label} -{" "}
                              {certification.certification_level}
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <Loading />
            </div>
          )}

          {hackerearthData && hackerearthData.badgeActivity ? (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png"
                  alt="HackerEarth Logo"
                  className="w-8 h-8 mr-2"
                />
                HackerEarth
              </h2>
              <div className="text-gray-800">
                <p className="font-semibold">
                  Total Badges: {hackerearthData.badgeActivity.NumberOfBadges}
                </p>
                <p className="font-semibold">
                  Problem Solved: {hackerearthData.badgeActivity.ProblemSolved}
                </p>
                <p className="font-semibold">
                  Contest Rating:{" "}
                  {hackerearthData.challengeActivity.contestRatings.Rating}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <Loading />
            </div>
          )}

          {githubData ? (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <div className="flex items-center mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt="GitHub Logo"
                  className="w-8 h-8 mr-2"
                />
                <h2 className="text-lg font-semibold">GitHub</h2>
              </div>
              <div className="text-gray-800">
                <p className="font-semibold">
                  Public Repositories: {githubData.public_repos}
                </p>
                <p className="font-semibold">
                  Followers: {githubData.followers}
                </p>
                <p className="font-semibold">
                  Following: {githubData.following}
                </p>
                <p className="font-semibold">Bio: {githubData.bio}</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
