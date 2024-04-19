import React, { useState } from 'react';
import ExamCreate from '../Components/ExamCreate';
import UploadFile from '../Components/UploadFile';
import ClassroomCont from '../Components/ClassroomCont';
const TeamManagement = () => {
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [showExamCreate, setShowExamCreate] = useState(false);

  const tableItems = [
    {
      name: 'Liam James',
      email: 'liamjames@example.com',
      position: 'Software engineer',
      salary: '$100K'
    },
    {
      name: 'Olivia Emma',
      email: 'oliviaemma@example.com',
      position: 'Product designer',
      salary: '$90K'
    },
    {
      name: 'William Benjamin',
      email: 'william.benjamin@example.com',
      position: 'Front-end developer',
      salary: '$80K'
    },
    {
      name: 'Henry Theodore',
      email: 'henrytheodore@example.com',
      position: 'Laravel engineer',
      salary: '$120K'
    },
    {
      name: 'Amelia Elijah',
      email: 'amelia.elijah@example.com',
      position: 'Open source manager',
      salary: '$75K'
    }
  ];

  const toggleUploadFile = () => {
    setShowUploadFile(!showUploadFile);
    setShowExamCreate(false); // Ensure ExamCreate is hidden when UploadFile is shown
  };

  const toggleExamCreate = () => {
    setShowExamCreate(!showExamCreate); // Toggle the state of ExamCreate
    setShowUploadFile(false); // Ensure UploadFile is hidden when ExamCreate is shown
  };

  return (
    <>
      {!showUploadFile && !showExamCreate && (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-10">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Team members</h3>
              <p className="text-gray-600 mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="flex">
  <button onClick={toggleUploadFile} className="flex items-center justify-center px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm hover:ring-2 hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
    <svg className="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
    </svg>
    <span className='ml-3'>Upload Files</span>
  </button>
  <button onClick={toggleExamCreate} className="flex items-center justify-center px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm hover:ring-2 hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ml-3">
    <svg stroke="none" fill="white" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
    </svg>
    <span className='ml-3'>Create a test</span>
  </button>
</div>


          </div>
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">




<ClassroomCont/>
          </div>
        </div>
      )}
      {showUploadFile && <UploadFile />}
      {showExamCreate && <ExamCreate />}
    </>
  );
};

export default TeamManagement;
