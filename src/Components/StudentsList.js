import React, { useState, useEffect } from 'react';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    degree: '',
    batch: '',
    section: '',
    hosteller: '',
  });

  useEffect(() => {
    fetch('http://localhost:5050/user_details/')
      .then(response => response.json())
      .then(data => setStudents(data.user_details))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const filteredStudents = students.filter(student => {
    const rollNoMatch = student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const degreeMatch = filters.degree ? student.degree === filters.degree : true;
    const batchMatch = filters.batch ? student.batch === filters.batch : true;
    const sectionMatch = filters.section ? student.section === filters.section : true;
    const hostellerMatch = filters.hosteller !== '' ? (student.hosteller ? student.hosteller.toString() === filters.hosteller : false) : true;

    return (rollNoMatch || nameMatch) && degreeMatch && batchMatch && sectionMatch && hostellerMatch;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Students List</h1>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by Roll No. or Name"
          className="border-gray-300 border rounded-md px-4 py-2 w-1/3"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div>
          <select
            className="border-gray-300 border rounded-md px-4 py-2 mr-2"
            value={filters.degree}
            onChange={e => setFilters({ ...filters, degree: e.target.value })}
          >
            <option value="">All Degrees</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
          </select>
          <select
            className="border-gray-300 border rounded-md px-4 py-2 mr-2"
            value={filters.batch}
            onChange={e => setFilters({ ...filters, batch: e.target.value })}
          >
            <option value="">All Batches</option>
            <option value="2021 - 2025 (III Year)">2021 - 2025 (III Year)</option>
            <option value="2020 - 2024 (IV Year)">2020 - 2024 (IV Year)</option>
          </select>
          <select
            className="border-gray-300 border rounded-md px-4 py-2 mr-2"
            value={filters.section}
            onChange={e => setFilters({ ...filters, section: e.target.value })}
          >
            <option value="">All Sections</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <select
            className="border-gray-300 border rounded-md px-4 py-2"
            value={filters.hosteller}
            onChange={e => setFilters({ ...filters, hosteller: e.target.value })}
          >
            <option value="">All Hostellers</option>
            <option value="true">Hostellers</option>
            <option value="false">Non-Hostellers</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map(student => (
          <div key={student._id} className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-2">{student.name}</h2>
            <p className="text-gray-600">{student.rollNo}</p>
            <p className="text-gray-600">{student.degree}</p>
            <p className="text-gray-600">{student.batch}</p>
            <p className="text-gray-600">{student.section}</p>
            <p className="text-gray-600">{student.hosteller ? 'Hosteller' : 'Day Scholar'}</p>
            <p className="text-gray-600">Department: {student.dept}</p>
            <p className="text-gray-600">User Type: {student.usertype}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
