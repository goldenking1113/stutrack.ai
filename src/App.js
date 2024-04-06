import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
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

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
