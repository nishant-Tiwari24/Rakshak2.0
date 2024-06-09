import React from 'react';
import { Line } from 'react-chartjs-2';

const DiseaseSpreadChart = () => {
  const data = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        label: 'Diabetes',
        data: [10000, 12000, 15000, 18000, 20000, 22000],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      },
      {
        label: 'Heart Disease',
        data: [8000, 11000, 14000, 10000, 18000, 20000],
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
        tension: 0.1
      },
      {
        label: 'Kidney Disease',
        data: [8000, 3500, 6000, 6500, 7000, 17500],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1
      },
      {
        label: 'Hypertension',
        data: [4000, 4200, 4400, 4600, 4800, 5000],
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.1
      },
      {
        label: 'Stroke',
        data: [2500, 2700, 2900, 3100, 3300, 3500],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1
      },
    ]
  };

  // Chart.js options
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className='right w-[760px] text-lg mt-4 md:mt-0 md:ml-4 rounded border h-[465px] border-zinc-800 px-8 pt-6 pb-8 overflow-y-auto'>
      <h2 className="text-2xl font-extralight mt-2 ml-2 mb-4">Disease Spread in India</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default DiseaseSpreadChart;
