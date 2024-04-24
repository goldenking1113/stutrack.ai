// QuizList.js
import React, { useState, useEffect } from 'react';

export default function QuizList({ onStart }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('https://stutrackai-server-phi.vercel.app/quizz')
      .then(response => response.json())
      .then(data => setQuizzes(data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);

  return (
<div className="container mx-auto px-4">
  <h2 className="text-2xl font-bold mb-4">Quiz List</h2>
  {quizzes.map(quiz => (
    <div key={quiz._id} className="bg-white shadow rounded-lg p-6 mb-4">
      <p className="text-lg font-semibold">Quiz ID: {quiz._id}</p>
      <p className="text-gray-700">No. of Questions: {quiz.questions.length}</p>
      <button onClick={() => onStart(quiz)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Start
      </button>
    </div>
  ))}
</div>
  );
}
