
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Spin } from "antd"; // Import spinner for loading state


const Container = styled.div`
  padding: 32px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function DoughnutChart({ chartData, loading }) {
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Show the legend
        position: "top", // Place legend at the top
       
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  
  
  

  return (
    <Container>
      {loading ? <Spin size="large" /> : <Doughnut data={chartData} options={options} />}
    </Container>
  );
}

export default DoughnutChart;