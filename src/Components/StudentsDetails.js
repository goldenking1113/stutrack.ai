import React, { useEffect, useState } from 'react';
import studentsData from "./studentsUsername.json";
import ChartComponent from './ChartComponent';
import axios from 'axios'; // Import axios module
import qs from 'qs'; // Import qs module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentsDetails({ student, onBack }) {
  const [matchedUsernames, setMatchedUsernames] = useState(null);
  const [error, setError] = useState(null);
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [hackerrankData, setHackerrankData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [hackerearthData,setHackerearthData]= useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const matchedUser = studentsData.find((user) => user.rollNo === student.rollNo);
      if (!matchedUser) {
        throw new Error("User not found");
      }
      setMatchedUsernames(matchedUser);
    } catch (error) {
      console.error("Error fetching matching usernames:", error);
      setError(error.message);
    }
  }, [student.rollNo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (matchedUsernames && matchedUsernames.leetcode) {
          const leetCodeResponse = await fetch(`http://localhost:8000/leetcode/${matchedUsernames.leetcode}`);
          const leetCodeData = await leetCodeResponse.json();
          setUserData(leetCodeData);
        }
        if (matchedUsernames && matchedUsernames.codeforces) {
          const codeforcesResponse = await fetch(`http://localhost:8000/codeforces/${matchedUsernames.codeforces}`);
          const codeforcesData = await codeforcesResponse.json();
          setCodeforcesData(codeforcesData);
        }
        if (matchedUsernames && matchedUsernames.codechef) {
          const codechefResponse = await fetch(`http://localhost:8000/codechef/${matchedUsernames.codechef}`);
          const codechefData = await codechefResponse.json();
          setCodechefData(codechefData);
        }
        if (matchedUsernames && matchedUsernames.hackerrank) {
          const hackerrankResponse = await fetch(`http://localhost:8000/hackerrank/${matchedUsernames.hackerrank}`);
          const hackerrankData = await hackerrankResponse.json();
          setHackerrankData(hackerrankData);
        }
        if (matchedUsernames && matchedUsernames.hackerearth) {
          const hackerearthResponse = await fetch(`http://localhost:8000/hackerearth/${matchedUsernames.hackerearth}`);
          const hackerearthData = await hackerearthResponse.json();
          setHackerearthData(hackerearthData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [student, matchedUsernames]);




  const sendMessageToWhatsApp = () => {
    // Check if message has already been sent

    const message = `Congratulations to ${student.name} for their remarkable achievements! With a total of ${userData.totalSolved} problems solved across ${Object.keys(matchedUsernames).filter(platform => matchedUsernames[platform]).length} platforms and a commendable contest rating of ${codeforcesData.contestRating}, they have showcased exceptional problem-solving skills. Their dedication is evident with badges earned, including ${hackerrankData.badges.length} badges across platforms like LeetCode, Codeforces, CodeChef, HackerRank, and HackerEarth. Keep up the fantastic work, ${student.name}!`;

    const formattedMobileNumber = `+91${student.mobile}`;

    const url = `https://api.ultramsg.com/instance69649/messages/chat?token=en6d5fzd8ph8crwm&to=${formattedMobileNumber}&body=${encodeURIComponent(message)}&priority=10`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            console.log('Message sent successfully');
            toast.success('Message sent successfully!');
            return;
            
        })
        .catch(error => {
            console.error('Error sending message:', error);
            toast.error('Error sending message:', error);

        });
};
  

  return (
    <>
      <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        <button onClick={onBack} className="text-blue-600 mb-4">&lt; Back to List</button>
        {error ? (
          <div className="text-red-600">Error fetching matching usernames: {error}</div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2 text-blue-600">{student.name}</h2>
            <p className="text-gray-800 font-semibold mb-2">Roll No: {student.rollNo}</p>
            <p className="text-gray-800 font-semibold mb-2">Degree: {student.degree}</p>
            <p className="text-gray-800 font-semibold mb-2">Department: {student.dept}</p>
            <p className="text-gray-800 font-semibold mb-2">Batch: {student.batch}</p>
            <p className="text-gray-800 font-semibold mb-2">Section: {student.section}</p>
            <p className="text-gray-800 font-semibold mb-2">Mail ID: {student.mailid}</p>
            <p className="text-gray-800 font-semibold mb-2">Mobile No: {student.mobile}</p>
            <p className="text-gray-800 font-semibold mb-2">{student.hosteller ? "Hosteller" : "Day Scholar"}</p>
          </>
        )}
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userData && (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img src="https://assets.leetcode.com/static_assets/public/icons/favicon-96x96.png" alt="LeetCode Logo" className="w-8 h-8 mr-2" />
                LeetCode
              </h2>
              <div className="text-gray-800">
                <p className="font-semibold">Total Solved: {userData.totalSolved}</p>
                <p className="font-semibold">Easy Problems Solved: {userData.easySolved} / {userData.totalEasy}</p>
                <p className="font-semibold">Medium Problems Solved: {userData.mediumSolved} / {userData.totalMedium}</p>
                <p className="font-semibold">Hard Problems Solved: {userData.hardSolved} / {userData.totalHard}</p>
                <p className="font-semibold">Contest Ranking: {userData.ranking}</p>
              </div>
            </div>
          )}
  
          {codeforcesData && (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png" alt="Codeforces Logo" className="w-8 h-8 mr-2" />
                Codeforces
              </h2>
              <div className="text-gray-800">
                <p className="font-semibold">Total Solved: {codeforcesData.TotalsolvedProblems}</p>
                <p className="font-semibold">Level: {codeforcesData.maxLevel}</p>
                <p className="font-semibold">Contribution: {codeforcesData.contribution}</p>
                <p className="font-semibold">Contest Rating: {codeforcesData.contestRating}</p>
              </div>
            </div>
          )}
  
          {codechefData && (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img src="https://avatars.githubusercontent.com/u/11960354?v=4" alt="CodeChef Logo" className="w-8 h-8 mr-2" />
                CodeChef
              </h2>
              <div className="text-gray-800">
                <p className="font-semibold">Current Rating: {codechefData.currentRating}</p>
                <p className="font-semibold">Highest Rating: {codechefData.highestRating}</p>
                <p className="font-semibold">Stars: {codechefData.stars}</p>
                <p className="font-semibold">Global Rank: {codechefData.globalRank}</p>
                <p className="font-semibold">Country Rank: {codechefData.countryRank}</p>
                <p className="font-semibold">Contests Attended: {codechefData.totalContestAttended}</p>
              </div>
            </div>
          )}
  
          {hackerrankData && (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/HackerRank_logo.png/600px-HackerRank_logo.png" alt="LeetCode Logo" className="w-8 h-8 mr-2" />
                HackerRank
              </h2>
              <div className="text-gray-800">
                <p className="font-semibold">Badges:</p>
                <ul className="list-disc list-inside">
                  {hackerrankData.badges.map((badge, index) => (
                    <li key={index}>
                      {badge.badge_title} - {badge.badge_level}
                    </li>
                  ))}
                </ul>
                <p className="font-semibold">Certifications:</p>
                <ul className="list-disc list-inside">
                  {hackerrankData.certifications.map((certification, index) => (
                    <li key={index}>
                      {certification.certification_label} - {certification.certification_level}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
  
          {hackerearthData && (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center text-blue-600">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png" alt="LeetCode Logo" className="w-8 h-8 mr-2" />
                HackerEarth
              </h2>
              <div className="text-gray-800">
                <p className="font-semibold">Total Badges: {hackerearthData.badgeActivity.NumberOfBadges}</p>
                <p className="font-semibold">Problem Solved: {hackerearthData.badgeActivity.ProblemSolved}</p>
                <p className="font-semibold">Contest Rating: {hackerearthData.challengeActivity.contestRatings.Rating}</p>
              </div>
            </div>
          )}
  
          {githubData ? (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <div className="flex items-center mb-4">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Logo" className="w-8 h-8 mr-2" />
                <h2 className="text-lg font-semibold">GitHub</h2>
              </div>
              <div className="text-gray-800">
                <p className="font-semibold">Public Repositories: {githubData.public_repos}</p>
                <p className="font-semibold">Followers: {githubData.followers}</p>
                <p className="font-semibold">Following: {githubData.following}</p>
                <p className="font-semibold">Bio: {githubData.bio}</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg shadow-lg p-4">
              <div className="text-gray-800">
                <p>GitHub data not available</p>
              </div>
            </div>
          )}
  
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-4">
  <h2 className="text-lg font-bold mb-4 text-blue-600">Summary</h2>
  {userData && codeforcesData && hackerrankData ? (
    <p className="text-gray-800">
      Congratulations to {student.name} for their remarkable achievements! With a total of {userData.totalSolved} problems solved across {Object.keys(matchedUsernames).filter(platform => matchedUsernames[platform]).length} platforms and a commendable contest rating of {codeforcesData.contestRating}, they have showcased exceptional problem-solving skills. Their dedication is evident with badges earned, including {hackerrankData.badges.length} badges across platforms like LeetCode, Codeforces, CodeChef, HackerRank, and HackerEarth. Keep up the fantastic work, {student.name}!
    </p>
  ) : (
    <p className="text-gray-800">Summary data is not available yet. Please wait for the information to load.</p>
  )}
  <button
  type="button"
  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-5" onClick={sendMessageToWhatsApp}
>
  Send to Student Mobile
</button>

</div>



    </>
  );
  
  
}
