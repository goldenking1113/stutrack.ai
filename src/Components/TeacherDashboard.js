import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import studentsInfo from '../studentsInfo.json'; // Assuming the JSON file is in the same directory

function Dashboard() {
  const [platformData, setPlatformData] = useState(null);

  useEffect(() => {
    // Aggregate platform data for all students
    const aggregatedData = {};

    studentsInfo.forEach(student => {
      const platformScores = student.user_platform_scores;

      Object.keys(platformScores).forEach(platform => {
        if (!aggregatedData[platform]) {
          aggregatedData[platform] = [];
        }

        const platformScore = platformScores[platform].data;
        const total = calculateTotalScore(platformScore);
        aggregatedData[platform].push(total);
      });
    });

    // Calculate average score for each platform
    const averages = {};
    Object.keys(aggregatedData).forEach(platform => {
      const platformScores = aggregatedData[platform];
      const averageScore = calculateAverageScore(platformScores);
      averages[platform] = averageScore;
    });

    setPlatformData(averages);
  }, []);

  useEffect(() => {
    if (platformData) {
      renderChart();
    }
  }, [platformData]);

  const calculateTotalScore = (platformScore) => {
    // Calculate total score based on platform-specific metrics
    let total = 0;

    if (platformScore.badgeActivity) {
      total += platformScore.badgeActivity.ProblemSolved || 0;
    }

    if (platformScore.challengeActivity && platformScore.challengeActivity.contestRatings) {
      total += platformScore.challengeActivity.contestRatings.Rating || 0;
    }

    if (platformScore.badges) {
      total += platformScore.badges.length;
    }

    if (platformScore.certifications) {
      total += platformScore.certifications.length;
    }

    if (platformScore.currentRating) {
      total += platformScore.currentRating;
    }

    if (platformScore.totalContestAttended) {
      total += parseInt(platformScore.totalContestAttended);
    }

    if (platformScore.totalSolved) {
      total += parseInt(platformScore.totalSolved);
    }

    return total;
  };

  const calculateAverageScore = (scores) => {
    // Calculate average score for a platform
    const total = scores.reduce((acc, score) => acc + score, 0);
    return total / scores.length;
  };

  const renderChart = () => {
    const ctx = document.getElementById('platformChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(platformData),
          datasets: [{
            label: 'Average Performance',
            data: Object.values(platformData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold my-4">Overall Performance Dashboard</h1>
      <div className="p-4 border rounded shadow">
        <canvas id="platformChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
}

export default Dashboard;
