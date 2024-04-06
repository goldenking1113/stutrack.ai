import { useLocation } from "react-router-dom";

export default () => {
  const location = useLocation();

  // Check if the current route is "/testing"
  const isTestingPage = location.pathname === "/testing";

  // If it's the testing page, return null to hide the footer
  if (isTestingPage) {
    return null;
  }
  
  return (
    <footer className="pt-10 bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex-1 mt-5 space-y-6 justify-between sm:flex md:space-y-0">
          <div className="space-y-6">
            <h1 style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '2em' }}>StuTrack</h1>
            <p className="max-w-md text-gray-100">
              StuTrack is a comprehensive platform designed to streamline competitive programming education. From insightful analytics to personalized learning paths, StuTrack offers the tools you need to drive academic excellence and foster a culture of achievement.
            </p>
          </div>
        </div>

        <div className="mt-10 py-10 border-t border-gray-700 items-center justify-between sm:flex">
          <p className="text-gray-300">
            © {new Date().getFullYear()} StuTrack. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};
