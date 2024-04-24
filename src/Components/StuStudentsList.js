import React, { useState, useEffect } from "react";
import StudentsDetails from "./StuStudentsDetails";

import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';

export default function StudentsList() {
  const { user } = useContext(UserContext);
  const logedCurrentUser = user;
  console.log(logedCurrentUser);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    degree: "",
    batch: "",
    section: "",
    hosteller: "",
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetch("https://stutrackai-server-phi.vercel.app/user_details/")
      .then((response) => response.json())
      .then((data) => setStudents(data.user_details))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const filteredStudents = students.filter((student) => {
    const rollNoMatch = student.rollNo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const nameMatch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const degreeMatch = filters.degree
      ? student.degree === filters.degree
      : true;
    const batchMatch = filters.batch ? student.batch === filters.batch : true;
    const sectionMatch = filters.section
      ? student.section === filters.section
      : true;
    const hostellerMatch =
      filters.hosteller !== ""
        ? student.hosteller
          ? student.hosteller.toString() === filters.hosteller
          : false
        : true;

    return (
      (rollNoMatch || nameMatch) &&
      degreeMatch &&
      batchMatch &&
      sectionMatch &&
      hostellerMatch
    );
  });

  const handleClickStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
  };

  if (selectedStudent) {
    return (
      <div className="container mx-auto py-8 px-10">
        <StudentsDetails student={selectedStudent} onBack={handleBackToList} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-10">
      <h1 className="text-3xl font-bold mb-8 text-revenet">Students List</h1>
      <div className="mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Roll No. or Name"
          className="border-gray-300 border rounded-md px-4 py-2 w-1/3 focus:outline-none focus:ring focus:border-revenet"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-4">
          <select
            className="border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-revenet"
            value={filters.degree}
            onChange={(e) => setFilters({ ...filters, degree: e.target.value })}
          >
            <option value="">All Degrees</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
          </select>
          <select
            className="border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-revenet"
            value={filters.batch}
            onChange={(e) => setFilters(logedCurrentUser.user_details.batch)}
          >
            <option value="">All Batches</option>
            <option value="2021 - 2025 (III Year)">
              2021 - 2025 (III Year)
            </option>
            <option value="2020 - 2024 (IV Year)">2020 - 2024 (IV Year)</option>
          </select>
          <select
            className="border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-revenet"
            value={filters.section}
            onChange={(e) =>
              setFilters({ ...filters, section: e.target.value })
            }
          >
            <option value="">All Sections</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <select
            className="border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-revenet"
            value={filters.hosteller}
            onChange={(e) =>
              setFilters({ ...filters, hosteller: e.target.value })
            }
          >
            <option value="">All Hostellers</option>
            <option value="true">Hostellers</option>
            <option value="false">Non-Hostellers</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStudents.map((student) => (
          <div key={student._id} className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"             onClick={() => handleClickStudent(student)}
          >
            <h2 className="text-xl font-bold mb-2 text-revenet">
              {student.name}
            </h2>
            <p className="text-gray-600 mb-2">Roll No: {student.rollNo}</p>
            <p className="text-gray-600 mb-2">Degree: {student.degree}</p>
            <p className="text-gray-600 mb-2">Batch: {student.batch}</p>
            <p className="text-gray-600 mb-2">Section: {student.section}</p>
            <p className="text-gray-600 mb-2">
              {student.hosteller ? "Hosteller" : "Day Scholar"}
            </p>
            <p className="text-gray-600 mb-2">Department: {student.dept}</p>
            <p className="text-gray-600">User Type: {student.usertype}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
