import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 32px;
  height: 400px;
`;

function LineChart({ chartData }) {
  const open = useSelector(state => state.cart.open);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const ctx = chartInstance.canvas.getContext("2d");

      // Create a gradient for filling the area below the line
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(75,192,192,1)'); // Start color
      gradient.addColorStop(1, 'rgba(75,192,192,1)'); // End color (transparent)

      // Apply the gradient as the background color for the dataset
      chartData.datasets[0].backgroundColor = gradient;
      chartData.datasets[0].fill = true; // Enable filling the area under the line
    }
  }, [chartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        backgroundColor : 'red'
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(75, 192, 192)',
        },
      },
    },
  };

  return (
    <Container>
      <Line ref={chartRef} data={chartData} options={options} />
    </Container>
  );
}

export default LineChart;
