import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const StatsChart = ({ stats }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Easy", "Medium", "Hard"],
          datasets: [
            {
              label: "Solved",
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 205, 86, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
              hoverBackgroundColor: [
                "rgba(75, 192, 192, 0.4)",
                "rgba(255, 205, 86, 0.4)",
                "rgba(255, 99, 132, 0.4)",
              ],
              hoverBorderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 205, 86, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              data: [stats.easySolved, stats.mediumSolved, stats.hardSolved],
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "category",
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [stats]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <h2 className="text-white">LeetCode Solved by Difficulty Level</h2>
      <canvas ref={chartRef} width={400} height={400} />
    </div>
  );
};

export default StatsChart;
