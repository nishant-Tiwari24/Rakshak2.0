import React from 'react';
import { Bar } from 'react-chartjs-2';

const FoodNutrientsGraph = () => {
  const data = {
    labels: [
      'Protein', 'Carbohydrates', 'Fat', 'Fiber', 'Vitamins',
      'Calcium', 'Iron', 'Potassium', 'Magnesium', 'Zinc',
      'Sodium', 'Water', 'Omega-3', 'Sugar'
    ],
    datasets: [
      {
        label: 'Nutrient Consumption (g)',
        data: [80, 200, 50, 30, 100, 120, 40, 180, 60, 25, 10, 150, 5, 75],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className='right w-[760px] text-lg mt-4 md:mt-0 md:mr-4 rounded border h-[465px] border-zinc-800 px-8 pt-6 pb-8 overflow-y-auto'>
      <h2 className="text-2xl font-extralight mt-2 ml-2 mb-4">Food and Nutrients Consumption</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FoodNutrientsGraph;
