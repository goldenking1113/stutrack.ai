import React, { useState, useEffect } from "react";
import studentsInfo from "../studentsInfo.json";

function ContestRank() {
  const [rankList, setRankList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState("all");
  const [totalStudents, setTotalStudents] = useState(0);
  const [checkedStudents, setCheckedStudents] = useState(0);

  useEffect(() => {
    generateRankList();
  }, [selectedDept]);

  useEffect(() => {
    setTotalStudents(calculateTotalStudents());
  }, []);

  const calculateTotalStudents = () => {
    const rollNos = new Set();
    for (const student of studentsInfo) {
      rollNos.add(student.RollNo);
    }
    return rollNos.size;
  };

  const generateRankList = async () => {
    setLoading(true);
    setCheckedStudents(0);

    try {
      let filteredStudents = studentsInfo;
      if (selectedDept !== "all") {
        filteredStudents = studentsInfo.filter(
          (student) => student.Department === selectedDept
        );
      }

      const rankedStudents = [];

      for (const student of filteredStudents) {
        try {
          const contestStats = await fetchContestStats(student.LeetcodeId);
          rankedStudents.push({
            ...student,
            contestRating: contestStats.contestRating || 0,
            contestAttend: contestStats.contestAttend || 0,
            contestGlobalRanking: contestStats.contestGlobalRanking || 0,
          });
          setCheckedStudents((prevChecked) => prevChecked + 1);
        } catch (error) {
          console.error(
            `Error fetching contest stats for ${student.Name}:`,
            error
          );
          rankedStudents.push({
            ...student,
            contestRating: 0,
            contestAttend: 0,
            contestGlobalRanking: 0,
          });
        }
      }

      const sortedStudents = rankedStudents.sort(
        (a, b) => b.contestRating - a.contestRating
      );

      setRankList(sortedStudents);
    } catch (error) {
      console.error("Error generating rank list:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContestStats = async (leetcodeId) => {
    try {
      const response = await fetch(
        `https://leetcode-all-stutrack.vercel.app/${leetcodeId}/contest`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch contest stats");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching contest stats:", error);
      throw error;
    }
  };

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
  };

  const exportToExcel = () => {
    const content =
      "Rank,Name,LeetCode ID,Contest Rating,Contest Attendance,Contest Global Ranking\n" +
      rankList
        .map(
          (student, index) =>
            `${index + 1},${student.Name},${student.LeetcodeId},${student.contestRating},${student.contestAttend},${student.contestGlobalRanking}`
        )
        .join("\n");

    const uri = "data:text/csv;charset=utf-8," + encodeURIComponent(content);
    const link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", "contestRank.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <option value="AI&DS">AI&DS</option>
              <option value="CCE">CCE</option>
              <option value="CSBS">CSBS</option>
              <option value="CSEA">CSEA</option>
              <option value="CSEB">CSEB</option>
              <option value="CSEC">CSEC</option>
              <option value="ECEA">ECEA</option>
              <option value="ECEB">ECEB</option>
              <option value="ECEC">ECEC</option>
              <option value="EEE">EEE</option>
              <option value="IT">IT</option>
              <option value="MECH">MECH</option>
            </select>
          </div>
          <div className="overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-20">
              Fetching contest stats for {Math.floor(checkedStudents / 2)} out of {totalStudents} students...
            </div>            
            ) : (
              <>
                <button
                  onClick={exportToExcel}
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
                        Contest Rating
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Contest Attendance
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4 text-left"
                      >
                        Contest Global Ranking
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
                        <td className="text-sm text-gray-800 font-light px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-800 font-light px-6 py-4 whitespace-nowrap">
                          {student.Name}
                        </td>
                        <td className="text-sm text-gray-800 font-light px-6 py-4 whitespace-nowrap">
                          {student.LeetcodeId}
                        </td>
                        <td className="text-sm text-gray-800 font-light px-6 py-4 whitespace-nowrap">
                          {student.contestRating}
                        </td>
                        <td className="text-sm text-gray-800 font-light px-6 py-4 whitespace-nowrap">
                          {student.contestAttend}
                        </td>
                        <td className="text-sm text-gray-800 font-light px-6 py-4 whitespace-nowrap">
                          {student.contestGlobalRanking}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestRank;
