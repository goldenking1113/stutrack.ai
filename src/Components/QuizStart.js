// QuizStart.js
import React, { useState, useEffect } from 'react';

const QuizStart = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quiz.questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="container mx-auto mt-10">
      {currentQuestion < quiz.questions.length ? (
        <div className="bg-gray-100 p-8 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">{quiz.questions[currentQuestion].question}</h2>
          <div className="grid grid-cols-1 gap-4">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`bg-white border border-gray-300 p-3 rounded-md transition duration-300 hover:bg-gray-200 ${selectedOption === option ? 'bg-blue-200' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quiz completed!</h2>
          <p className="mb-4">Your score: {score}/{quiz.questions.length}</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setSelectedOption('');
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizStart;
