import React, { useState } from 'react'
import QuizList from "./QuizList";
import QuizStart from "./QuizStart";

export default function StudentQuiz() {
    const [currentQuiz, setCurrentQuiz] = useState(null);

    const handleStartQuiz = (quiz) => {
      setCurrentQuiz(quiz);
    };
  
  return (
    <div>
      {currentQuiz ? (
        <QuizStart quiz={currentQuiz} />
      ) : (
        <QuizList onStart={handleStartQuiz} />
      )}
    </div>
  )
}
