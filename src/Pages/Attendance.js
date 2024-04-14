import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import a calendar library of your choice

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', attendance: 'Present', date: selectedDate },
    { id: 2, name: 'Jane Smith', attendance: 'Absent', date: selectedDate },
    // Add more students as needed
  ]);

  const handleToggleAttendance = (id, status) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, attendance: status, date: selectedDate } : student
      )
    );
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Attendance</h1>

      {/* Calendar */}
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Calendar</h1>

      <div className="mb-8 rounded-lg border border-gray-300 shadow-md p-4">

      <Calendar
  onChange={handleDateChange}
  value={selectedDate}
  className="rounded-lgp-4 mb-8 text-center" // Added text-center to align text at center
  calendarType="US"
  tileClassName={({ date }) =>
    date.getDate() === selectedDate.getDate() ? 'selected-date bg-blue-500 text-white rounded-full' : ''
  }
  showNavigation={true}
  showNeighboringMonth={true}
  tileContent={({ date, view }) => view === 'month' && date.getDate() === 1 ? <div className="font-bold">{date.toLocaleDateString('default', { month: 'short' })}</div> : null}
  prev2Label={null}
  next2Label={null} 
  formatMonthYear={(locale, date) => {
    const year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    return `${month} ${year}`;
  }}
/>

      </div>

      <div className="text-center text-blue-600 text-sm bg-blue-100 p-2 rounded">
  Selected Date: {selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
</div>
    </div>

      {/* Attendance List */}
      <div>
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between border-b py-2">
            <span className="text-lg">{student.name}</span>
            <div>
              <button
                onClick={() => handleToggleAttendance(student.id, 'Present')}
                className={`px-4 py-2 rounded mr-2 ${
                  student.attendance === 'Present'
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                }`}
              >
                Present
              </button>
              <button
                onClick={() => handleToggleAttendance(student.id, 'Absent')}
                className={`px-4 py-2 rounded mr-2 ${
                  student.attendance === 'Absent'
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                }`}
              >
                Absent
              </button>
              <button
                onClick={() => handleToggleAttendance(student.id, 'On Duty')}
                className={`px-4 py-2 rounded mr-2 ${
                  student.attendance === 'On Duty'
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                }`}
              >
                On Duty
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
