import React, { useState } from "react";
import ClassroomCont from "../Components/StudentClassroomCont";
const TeamManagement = () => {
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [showExamCreate, setShowExamCreate] = useState(false);

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
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-10">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Classroom
              </h3>
              <p className="text-gray-600 mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="flex"></div>
          </div>
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <ClassroomCont />
          </div>
        </div>
    </>
  );
};

export default TeamManagement;
