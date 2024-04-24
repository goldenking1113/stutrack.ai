import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('https://stutrackai-server-phi.vercel.app/quizz');
        const data = await response.json();
        if (data && data.length > 0) {
          setQuizData(data[0].questions);
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const correctAnswer = quizData[currentQuestion].correct_answer;
    const isCorrect = selectedOption === correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedOption('');
    setCurrentQuestion(currentQuestion + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption('');
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  const { question, options } = quizData[currentQuestion];

  return (
    <div className="container mx-auto mt-10">
      {quizData && quizData.length > 0 ? (
        currentQuestion < quizData.length ? (
          <div className="bg-gray-100 p-8 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">{quizData[currentQuestion].question}</h2>
            <div className="grid grid-cols-1 gap-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`bg-white border border-gray-300 p-3 rounded-md transition duration-300 hover:bg-gray-200 ${
                    selectedOption === option ? 'bg-blue-200' : ''
                  }`}
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
            <p className="mb-4">Your score: {score}/{quizData.length}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={restartQuiz}
            >
              Restart Quiz
            </button>
          </div>
        )
      ) : (
        <div>No quiz data available</div>
      )}
    </div>
  );
  
};

export default Quiz;
