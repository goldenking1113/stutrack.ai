import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuizResultsPage() {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    fetchQuizResults();
  }, []);

  const fetchQuizResults = async () => {
    try {
      const response = await axios.get('http://localhost:5050/results');
      setQuizResults(response.data);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
    }
  };

  const calculatePercentage = (quiz) => {
    const totalQuestions = quiz.responses[0].answers.length;
    const correctResponses = quiz.responses.reduce((acc, response) => {
      return (
        acc +
        response.answers.reduce((acc, answer) => {
          return acc + (answer.isCorrect ? 1 : 0);
        }, 0)
      );
    }, 0);
    return ((correctResponses / totalQuestions) * 100).toFixed(2);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
        Past Quizzes
      </h3>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                Quiz ID
              </th>
              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                No. of Users Attended
              </th>
              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {quizResults.map((quiz, index) => (
              <tr key={index} className="text-gray-500">
                <td className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  {quiz._id}
                </td>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  {quiz.responses.length}
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">
                      {calculatePercentage(quiz)}%
                    </span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div
                          className="bg-cyan-600 h-2 rounded-sm"
                          style={{ width: calculatePercentage(quiz) + '%' }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
