import React, { useEffect, useState } from 'react';

const LeetCodeDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [contestData, setContestData] = useState(null);
  const [solvedData, setSolvedData] = useState(null);
const id="mahsook";
useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://leetcode-all-stutrack.vercel.app/${id}/contest`);
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch contest data
        const contestResponse = await fetch(`https://leetcode-all-stutrack.vercel.app/${id}/contest`);
        const contestData = await contestResponse.json();
        setContestData(contestData);

        // Fetch solved data
        const solvedResponse = await fetch(`https://leetcode-all-stutrack.vercel.app/${id}/solved`);
        const solvedData = await solvedResponse.json();
        setSolvedData(solvedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
<>
{userData && (
  <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
    <h2 className="text-lg font-semibold mb-2 flex items-center">
      <img src="https://assets.leetcode.com/static_assets/public/icons/favicon-96x96.png" alt="LeetCode Logo" className="w-8 h-8 mr-2" />
      LeetCode
    </h2>
    <div className="flex justify-between items-center mb-4">
      <div>
        <p className="text-gray-600">Contest Rating: {userData.contestRating}</p>
        <p className="text-gray-600">Contests Attended: {userData.contestAttend}</p>
        <p className="text-gray-600">Total Problems Solved: {solvedData ? solvedData.solvedProblem : 'Loading...'}</p>
        <p className="text-gray-600">Easy Problems Solved: {solvedData ? solvedData.easySolved : 'Loading...'}</p>
        <p className="text-gray-600">Medium Problems Solved: {solvedData ? solvedData.mediumSolved : 'Loading...'}</p>
        <p className="text-gray-600">Hard Problems Solved: {solvedData ? solvedData.hardSolved : 'Loading...'}</p>
      </div>
    </div>
  </div>
)}

</>
  );
}

export default LeetCodeDashboard;
