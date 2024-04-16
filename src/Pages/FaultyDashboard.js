import { useState } from "react";
import Classroom from "./Classroom";
import Rank from "./Rank";
import Circulars from "./Circulars";
import Attendance from "./Attendance";
import TeacherDashboard from "../Components/TeacherDashboard";

const Sidebar = () => {
    const navigation = [
        {
            id: 'home',
            href: 'javascript:void(0)',
            name: 'Home',
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
            component: <TeacherDashboard />,
        },
        {
            id: 'classroom',
            href: 'javascript:void(0)',
            name: 'Classroom',
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
            component: <Classroom />,
        },
        {
            id: 'rank',
            href: 'javascript:void(0)',
            name: 'Student Performance',
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
            component: <Rank />,
        },
        {
            id: 'circulars',
            href: 'javascript:void(0)',
            name: 'Circulars & Notices',
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
            component: <Circulars />,
        },
        {
            id: 'attendance',
            href: 'javascript:void(0)',
            name: 'Attendance',
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
            component: <Attendance />,
        },
    ];

    const [selectedComponent, setSelectedComponent] = useState(<TeacherDashboard />);    const [activeSection, setActiveSection] = useState(null);

    // Function to handle menu item click
    const handleItemClick = (item) => {
        setSelectedComponent(item.component);
        setActiveSection(item.id);
    };

    // Function to handle logout
    const handleLogout = () => {
        // Implement your logout logic here
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-64"> {/* Adjusted width here */}
                <div className="flex flex-col h-full px-4">
                    <div className="w-full flex items-center gap-x-4 py-6"> {/* Adjusted padding and vertical alignment */}
                        <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full" />
                        <div>
                            <span className="block text-gray-700 text-sm font-semibold">Alivika tony</span>
                            <span className="block mt-px text-gray-600 text-xs">
                                Hobby Plan
                            </span>
                        </div>
                        <div className="relative flex-1 text-right">
                            <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"  />
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
                                            activeSection === item.id ? 'bg-gray-200' : ''
                                        }`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item.icon ? <div className="text-gray-500">{item.icon}</div> : ""}
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleLogout} className="mt-auto p-2 w-full text-gray-600 hover:bg-gray-50 active:bg-gray-100 duration-150">Logout</button>
                </div>
            </nav>
            {/* Render the selected component */}
            <div className="ml-64">{selectedComponent}</div> {/* Adjusted margin here */}
        </>
    );
};

export default Sidebar;
