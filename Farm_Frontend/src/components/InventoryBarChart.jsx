import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const InventoryBarChart = ({ productData }) => {
  const chartData = {
    labels: productData.map(product => product.productname),
    datasets: [{
      label: 'Product Quantities',
      data: productData.map(product => product.quantity),
      backgroundColor: 'rgba(255, 205, 86, 0.2)', // Change the color to yellow
      borderColor: 'rgba(255, 205, 86, 1)',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Product Quantities</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default InventoryBarChart;