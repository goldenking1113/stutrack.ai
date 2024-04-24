import React, { useState } from "react";
import QuizzResults from "./QuizzResults";
import FileDisplay from "./FileDisplay";
import QuizList from "./QuizList";
import QuizStart from "./QuizStart";
const ClassroomCont = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
  };

  return (
    <main>
      <div className="pt-6 px-4">
      <FileDisplay/>
      </div>
    </main>
  );
};

export default ClassroomCont;
