import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import studentsInfo from "../studentsInfo.json";
import StudentInfoPage from "../Pages/StudentInfoPage";
import RankList from "../Pages/RankList";
import ContestRank from "../Pages/ContestRank";
import ContestWiseRank from "../Pages/ContestWiseRank";
import Rank from "../Pages/Rank";
import Home from "../Pages/Home"

;
export default function Students() {
    const [searchText, setSearchText] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
  
    const filteredStudents = studentsInfo.filter((student) => {
      return (
        (student.RollNo.toLowerCase().includes(searchText.toLowerCase()) ||
          student.Name.toLowerCase().includes(searchText.toLowerCase())) &&
        (!selectedDepartment || student.Department === selectedDepartment)
      );
    });
  
    function goToRankList() {
      window.location.href = "/Rank";
    }
  
  return (
<>
  <div className="text-gray-800 w-full">
    <h3 className="text-3xl font-semibold mb-4">
      III ECE LeetCode Performance
    </h3>
    <p className="text-gray-600 mb-6">
      This dashboard provides an overview of the LeetCode
      performance of students in the ECE department.
    </p>
    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
      <div className="flex-grow mb-4 lg:mb-0">
        <input
          type="text"
          placeholder="Search by RollNo or Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 bg-white text-gray-800 rounded-md p-2 mr-4 flex-grow focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border border-gray-300 bg-white text-gray-800 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">All Departments</option>
          <option value="ECEA">ECEA</option>
          <option value="ECEB">ECEB</option>
          <option value="ECEC">ECEC</option>
        </select>
      </div>
      <button
  type="button"
  onClick={goToRankList}
  style={{ backgroundColor: '#F26101', transition: 'background-color 0.3s ease' }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff8b33'}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F26101'}
  className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100"
>
  Get RankList
</button>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
    {filteredStudents.map((student, index) => (
        <Link
  key={index}
  to={`/students/${student.RollNo}`}
  style={{ backgroundColor: '#D9E8F5', transition: 'background-color 0.3s ease' }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#91BED4'}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D9E8F5'}
  className="text-gray-800 rounded-lg p-6 shadow-lg transition duration-300"
>
  <div>
    <h4 className="text-xl font-semibold">{student.Name}</h4>
    <p className="mt-2 text-gray-600 text-sm">
      {student.RollNo} | {student.Department}
    </p>
  </div>
</Link>
    ))}
  </div>
</>

  )
}
