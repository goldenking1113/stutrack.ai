import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Blog from "./Components/Blog";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Student from "./Pages/Students";
import Rank from "./Pages/Rank";
import ContestRank from "./Pages/ContestRank";
import RankList from "./Pages/RankList";
import ContestWiseRank from "./Pages/ContestWiseRank";
import Students from "./Pages/Students";
import StudentInfoPage from "./Pages/StudentInfoPage";
import Testing from "./Pages/Testing";
import studentsInfo from "./studentsInfo.json";
import { UserProvider } from "./contexts/user.context";
import PrivateRoute from "./Pages/PrivateRoute.page";
import VerifyUser from "./Pages/VerifyUser";
import FaultyDashboard from "./Pages/FaultyDashboard";
import StudentsDashboard from "./Pages/StudentsDashboard";
import PageRedirect from "./Pages/pageredirect";
function App() {
  return (
<Router>
  <UserProvider>
    <div>
      <Routes>
        {/* Regular routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Home />} />
        <Route path="/Rank" element={<Rank />} />
        <Route path="/ContestRank" element={<ContestRank />} />
        <Route path="/RankList" element={<RankList />} />
        <Route path="/ContestWiseRank" element={<ContestWiseRank />} />
        <Route path="/Students" element={<Students />} />
        <Route
          path="/students/:rollno"
          element={<StudentInfoPage students={studentsInfo} />}
        />
        <Route path="/testing" element={<Testing />} />
        <Route path="/FaultyDashboard" element={<FaultyDashboard />} />
        <Route path="/StudentsDashboard" element={<StudentsDashboard />} />
        <Route path="/PageRedirect" element={<PageRedirect />} />

        {/* Authentication routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
        <Route path="/PageRedirect" element={<PageRedirect />} />
        </Route>
        <Route exact path="/verify-user" element={<VerifyUser />} />
      </Routes>
    </div>
  </UserProvider>
</Router>


  );
}

export default App;
