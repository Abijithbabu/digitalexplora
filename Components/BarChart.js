import { memo, useEffect } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function BarChart() {
  useEffect(() => {
    const config = {
      type: "bar",
      data: {
        labels: [
          "January", "February", "March", "April", "May", "June", "July"
        ],
        datasets: [
          {
            label: "Today earned",
            backgroundColor: "#4a5568",
            borderColor: "#4a5568",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          {
            label: "No of teams",
            fill: false,
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: "Orders Chart",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
        },
        scales: {
          x: {
            display: false,
            grid: {
              borderDash: [2],
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.3)",
              zeroLineColor: "rgba(33, 37, 41, 0.3)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
          y: {
            display: true,
            grid: {
              borderDash: [2],
              drawBorder: false,
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.2)",
              zeroLineColor: "rgba(33, 37, 41, 0.15)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        },
      },
    };

    const ctx = document.getElementById("bar-chart").getContext("2d");
    const myBar = new Chart(ctx, config);

    // Clean up function to destroy chart instance
    return () => {
      myBar.destroy();
    };
  }, []);

  return <canvas id="bar-chart" width="300" height="300"></canvas>;
}

export default memo(BarChart);
