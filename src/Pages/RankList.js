import React, { useState, useEffect } from "react";
import studentsInfo from "../studentsInfo.json";

function RankList() {
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState("all");
  const [totalStudents, setTotalStudents] = useState(0);
  const [studentsChecked, setStudentsChecked] = useState(0);

  useEffect(() => {
    setTotalStudents(studentsInfo.length);
    generateRankList();
  }, [selectedDept]);

  const generateRankList = async () => {
    setLoading(true);
    setStudentsChecked(0); // Reset students checked count

    try {
      let filteredStudents = studentsInfo;
      if (selectedDept !== "all") {
        filteredStudents = studentsInfo.filter(
          (student) => student.Department === selectedDept
        );
      }

      const rankedStudents = await Promise.all(
        filteredStudents.map(async (student) => {
          try {
            const leetcodeStats = await fetchLeetCodeStats(student.LeetcodeId);
            const totalSolved = leetcodeStats.totalSolved || 0;
            setStudentsChecked((prev) => prev + 1); // Increment students checked count
            return {
              ...student,
              totalSolved,
            };
          } catch (error) {
            console.error(
              `Error fetching LeetCode stats for ${student.Name}:`,
              error
            );
            return {
              ...student,
              totalSolved: 0,
            };
          }
        })
      );

      const sortedStudents = rankedStudents.sort(
        (a, b) => b.totalSolved - a.totalSolved
      );

      const rankedAndIndexedStudents = sortedStudents.map((student, index) => ({
        ...student,
        rank: index + 1,
      }));

      setRankList(rankedAndIndexedStudents);
    } catch (error) {
      console.error("Error generating rank list:", error);
    } finally {
      if (studentsChecked === totalStudents) {
        setLoading(false); // Set loading to false only when all students are checked
      }
    }
  };

  const fetchLeetCodeStats = async (leetcodeId) => {
    try {
      const response = await fetch(
        `https://leetcode-stutrack.vercel.app/${leetcodeId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch LeetCode stats");
      }
      const data = await response.json();
      return {
        totalSolved: data.totalSolved || 0,
        totalSubmissions: data.totalSubmissions || [],
        totalQuestions: data.totalQuestions || 0,
        easySolved: data.easySolved || 0,
        totalEasy: data.totalEasy || 0,
        mediumSolved: data.mediumSolved || 0,
        totalMedium: data.totalMedium || 0,
        hardSolved: data.hardSolved || 0,
        totalHard: data.totalHard || 0,
        ranking: data.ranking || 0,
        contributionPoint: data.contributionPoint || 0,
        reputation: data.reputation || 0,
        submissionCalendar: data.submissionCalendar || {},
        recentSubmissions: data.recentSubmissions || [],
      };
    } catch (error) {
      console.error("Error fetching LeetCode stats:", error);
      throw error;
    }
  };

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
  };

  const exportToCSV = () => {
    const csvContent =
      "Rank,Name,LeetCode ID,Department,No of Problems Solved\n" +
      rankList
        .map(
          (student) =>
            `${student.rank},${student.Name},${student.LeetcodeId},${student.Department},${student.totalSolved}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
    link.setAttribute("download", "rankList.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="text-white mb-10 flex justify-end">
            <label
              htmlFor="deptSelect"
              className="block text-sm font-medium text-black"
            >
              Select Department:
            </label>
            <select
              id="deptSelect"
              value={selectedDept}
              onChange={handleDeptChange}
              className="mt-1 block py-2 px-3 bg-customBlue text-black rounded-md shadow-sm focus:outline-none focus:ring-customLightBlue focus:border-customLightBlue sm:text-sm ml-auto"
            >
              <option value="all">All</option>
              <option value="ECEA">ECEA</option>
              <option value="ECEB">ECEB</option>
              <option value="ECEC">ECEC</option>
            </select>
          </div>
          <div className="overflow-hidden">
            {!loading ? (
              <>
                <button
                  onClick={exportToCSV}
                  className="mt-1 block py-2 px-3 border bg-customOrange text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ml-auto mb-5"
                >
                  Export to Excel
                </button>
                <table className="min-w-full">
                  <thead className="bg-customDarkBlue text-white">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        LeetCode ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Department
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        No of Problems Solved
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankList.map((student, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-customBlue" : "bg-customLightBlue"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.rank}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.Name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.LeetcodeId}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.Department}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.totalSolved}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(studentsChecked / totalStudents) * 100}%` }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankList;
