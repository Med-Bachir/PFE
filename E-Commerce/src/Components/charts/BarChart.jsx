import React from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart component
import { Chart as ChartJS } from "chart.js/auto";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { theme } from "antd";
import { colorAccentDark, colorAccentMain, colorAccentMediumTransparent, colorAccentMoreTransparent, lightMain, main } from "../../Colors";

const Container = styled.div`
  padding: 32px;
  height: 400px;
`;

function BarChart({ chartData }) {
  

  const options = {
    
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Allow chart to resize based on container width
    elements: {
      bar: {
        borderRadius: 5, // Add rounded corners to bars
      },
      
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
    }
  };

  return (
    <Container>
      <Bar data={chartData} options={options} />
    </Container>
  );
}

export default BarChart;


