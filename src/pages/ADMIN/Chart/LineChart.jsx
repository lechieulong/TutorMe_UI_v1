import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ monthlyData }) => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số lượng Enrollment",
        data: monthlyData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0, // Set minimum value for y-axis
        max: 200, // Set maximum value for y-axis
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
