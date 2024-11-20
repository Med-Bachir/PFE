import React from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart component
import { Chart as ChartJS } from "chart.js/auto";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 32px;
  height: 400px;
`;

function BarChart({ chartData }) {
  const open = useSelector(state => state.cart.open);

  const options = {
    
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Allow chart to resize based on container width
    elements: {
      bar: {
        backgroundColor: chartData.datasets.map(dataset => dataset.backgroundColor), // Set bar colors from data
        borderRadius: 5, // Add rounded corners to bars
        
      },
      
    },
    scales: {
      xAxes: [
        {
          stacked: true, // Enable stacking if desired (adjust yAxes accordingly)
          ticks: {
            beginAtZero: true, // Start y-axis from 0
          },
        },
      ],
      yAxes: [
        {
          stacked: true, // Enable stacking if desired (adjust xAxes accordingly)
          ticks: {
            beginAtZero: true, // Start y-axis from 0
          },
        },
      ],
    },
  };

  return (
    <Container>
      <Bar data={chartData} options={options} />
    </Container>
  );
}

export default BarChart;


