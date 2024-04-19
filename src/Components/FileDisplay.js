import React, { useState, useEffect } from 'react';
import FileIcon from '../assets/file.png'
export default function FileDisplay() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5050/classroom')
      .then(response => response.json())
      .then(data => {
        // Set the classrooms state with the fetched data
        setClassrooms(data.classrooms);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to fetch data only once when component mounts

  return (
    <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900">
          Latest Files
        </h3>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {classrooms.map(classroom => (
            classroom.files.map((file, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                          className="h-8 w-8"
                          src= {FileIcon}
                          alt="Word"
                        />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {file.description}
                    </p>
                  </div>
                  <a className="inline-flex items-center text-base font-semibold text-gray-900" href={file.file_url}>
                    View File
                  </a>
                </div>
              </li>
            ))
          ))}
        </ul>
      </div>
    </div>
  );
}
