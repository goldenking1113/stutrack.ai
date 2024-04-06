import React, { useState } from "react";
import studentsInfo from "../studentsInfo.json";

export default () => {
    const [searchedTitle, setSearchedTitle] = useState("");
    const [rankList, setRankList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        try {
            const contestRankList = await Promise.all(
                studentsInfo.map(async (student) => {
                    try {
                        const response = await fetch(`https://stu-track-leet-code.vercel.app/${student.LeetcodeId}/contest`);
                        if (!response.ok) {
                            throw new Error("Failed to fetch contest stats");
                        }
                        const data = await response.json();
                        const searchedContest = data.contestParticipation.find(contest => contest.contest.title === searchedTitle);
                        return {
                            ...student,
                            contestRating: searchedContest.rating || 0,
                            contestAttend: searchedContest.attended ? 1 : 0,
                            contestGlobalRanking: searchedContest.ranking || 0,
                            problemsSolved: searchedContest.problemsSolved || 0,
                            totalProblems: searchedContest.totalProblems || 0,
                            trendDirection: searchedContest.trendDirection || "",
                        };
                    } catch (error) {
                        console.error(`Error fetching contest stats for ${student.Name}:`, error);
                        return {
                            ...student,
                            contestRating: 0,
                            contestAttend: 0,
                            contestGlobalRanking: 0,
                            problemsSolved: 0,
                            totalProblems: 0,
                            trendDirection: "",
                        };
                    }
                })
            );

            const attendedStudents = contestRankList.filter(student => student.contestAttend === 1);

            const sortedStudents = attendedStudents.sort((a, b) => a.contestGlobalRanking - b.contestGlobalRanking);

            setRankList(sortedStudents);
        } catch (error) {
            console.error("Error fetching contest rank list:", error);
        } finally {
            setLoading(false); 
        }
    };

    const handleTitleChange = (event) => {
        setSearchedTitle(event.target.value);
    };

    const exportToExcel = () => {
        const content =
            "Name,LeetCode ID,Status,Rating,Ranking,Problems Solved,Total Problems,Trend Direction\n" +
            rankList.map(
                (student) =>
                    `${student.Name},${student.LeetcodeId},${student.contestAttend ? "Attended" : "Did not attend"},${student.contestRating},${student.contestGlobalRanking},${student.problemsSolved},${student.totalProblems},${student.trendDirection}`
            ).join("\n");

        const uri = "data:text/csv;charset=utf-8," + encodeURIComponent(content);
        const link = document.createElement("a");
        link.setAttribute("href", uri);
        link.setAttribute("download", "contestRank.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="mt-20">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-black text-xl font-bold sm:text-2xl">
                        Search By Contest
                    </h3>
                    <p className="text-black mt-2">
                        Here, you have the option to sort students based on their Ranking in contest participation.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <form onSubmit={handleSearch} className="flex items-center max-w-lg mx-auto">
                        <label htmlFor="contestTitle" className="sr-only">
                            Search Contest Title
                        </label>
                        <input
                            type="text"
                            id="contestTitle"
                            value={searchedTitle}
                            onChange={handleTitleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Contest Title..."
                            required
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
            {loading ? ( 
                <div className="text-black mt-4 text-center">                <div className="glitch-wrapper">
                <div className="glitch-wrapper">
                  <div className="glitch" data-glitch="Loading">
                    Loading
                  </div>
                </div>
              </div></div>
            ) : rankList.length > 0 ? ( 
                <div className="mt-12 relative h-max overflow-auto">
<div className="flex justify-end mb-4">
    <button
        onClick={exportToExcel}
        className="inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
        Export to Excel
    </button>
</div>
<table className="w-full table-auto text-sm text-left">
    <thead className="text-black font-medium bg-customDarkBlue">
        <tr>
        <th className="py-3 pr-6 pl-5">Rank</th>

            <th className="py-3 pr-6">Name</th>
            <th className="py-3 pr-6">LeetCode ID</th>
            <th className="py-3 pr-6">Status</th>
            <th className="py-3 pr-6">Rating</th>
            <th className="py-3 pr-6">Ranking</th>
            <th className="py-3 pr-6">Problems Solved</th>
            <th className="py-3 pr-6">Trend Direction</th>
        </tr>
    </thead>
    <tbody className="text-gray-800">
    {rankList.map((student, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? 'bg-customBlue' : 'bg-customLightBlue'}>
            <td className="pr-6 py-4 whitespace-nowrap pl-5">{idx + 1}</td> 
            <td className="pr-6 py-4 whitespace-nowrap">{student.Name}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{student.LeetcodeId}</td>
            <td className="pr-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-2 rounded-full font-semibold text-xs ${student.contestAttend ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                    {student.contestAttend ? "Attended" : "Did not attend"}
                </span>
            </td>
            <td className="pr-6 py-4 whitespace-nowrap">{student.contestRating}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{student.contestGlobalRanking}</td>
            <td className="pr-6 py-4 whitespace-nowrap">{student.problemsSolved} / {student.totalProblems}</td>
            <td className="pr-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-2 rounded-full font-semibold text-xs ${student.trendDirection === "UP" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}>
                    {student.trendDirection}
                </span>
            </td>
        </tr>
    ))}
</tbody>

</table>

                </div>
            ) : null} 
        </div>
    );
};
