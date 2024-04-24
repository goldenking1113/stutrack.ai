import { useState,useEffect } from "react";
import Classroom from "./Classroom";
import Rank from "./Rank";
import Circulars from "./Circulars";
import Attendance from "./Attendance";
import TeacherDashboard from "../Components/TeacherDashboard";
import StudentsList from "../Components/StudentsList";

import StudentQuiz from "../Components/StudentQuiz";

import StudentHome from "../Components/StudentHome";
import StudentClass from "../Components/StudentClass";
import StudentCirculars from "../Components/StudentCirculars";
import StudentProfile from "../Components/StudentProfile";
import StudentAttendance from "./StudentAttendance";

import Quiz from "../Components/Quiz";

import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";

import DP from "../assets/dp.png";
const Sidebar = () => {

  // set currentuser
  const [currentuser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const navigation = [
    {
      id: "home",
      href: "javascript:void(0)",
      name: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          {/* SVG path */}
        </svg>
      ),
      component: <StudentHome/>,
    },
    {
      id: "classroom",
      href: "javascript:void(0)",
      name: "Classroom",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          {/* SVG path */}
        </svg>
      ),
      component: <StudentClass/>,
    },
    {
      id: "rank",
      href: "javascript:void(0)",
      name: "Batchmates Performance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          {/* SVG path */}
        </svg>
      ),
      component: <StudentsList/>,
    },
    {
      id: "exam",
      href: "javascript:void(0)",
      name: "Exames & Quizzes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          {/* SVG path */}
        </svg>
      ),
      component: <StudentQuiz/>,
    },

    {
      id: "circulars",
      href: "javascript:void(0)",
      name: "Circulars & Notices",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          {/* SVG path */}
        </svg>
      ),
      component: <StudentCirculars />,
    },
    {
      id: "attendance",
      href: "javascript:void(0)",
      name: "Attendance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
        </svg>
      ),
      component: <Quiz/>,
    },
  ];

  const [selectedComponent, setSelectedComponent] = useState(
    <StudentHome />
  );
  const [activeSection, setActiveSection] = useState(null);

  const handleItemClick = (item) => {
    setSelectedComponent(item.component);
    setActiveSection(item.id);
  };

  const { logOutUser } = useContext(UserContext);

  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();

      if (loggedOut) {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  const { user } = useContext(UserContext);
  const { logedCurrentUser } = useContext(UserContext);


  


  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-64">
        {" "}
        <div className="flex flex-col h-fullpx-4">
          <div className="w-full flex items-center gap-x-4 py-6">
            {" "}
            <img
              src={DP}
              className="w-10 h-10 rounded-full"
            />
<div className="w-30">
  <span className="text-gray-700 text-sm font-semibold">
    {logedCurrentUser.user_details.name}
  </span>
  <span className="block mt-px text-gray-600 text-xs overflow-auto break-all">
    {user.profile.email}
  </span>
</div>
            <div className="relative flex-1 text-right">
              <button
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                onClick={logOut}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="overflow-auto">
            <ul className="text-sm font-medium flex-1">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150 ${
                      activeSection === item.id ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.icon ? (
                      <div className="text-gray-500">{item.icon}</div>
                    ) : (
                      ""
                    )}
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="ml-64">{selectedComponent}</div>{" "}
    </>
  );
};

export default Sidebar;
