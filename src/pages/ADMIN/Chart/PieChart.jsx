import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const data = {
  labels: ['Learner', 'Teacher'],
  datasets: [
    {
      label: 'Users',
      data: [300, 50],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }
  ]
};

function PieChart() {
  return <Pie data={data} />;
}

export default PieChart;
