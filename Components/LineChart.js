import { memo, useEffect } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const LineChart = () => {
  useEffect(() => {
    const config = {
      type: "line",
      data: {
        labels: [
          "January", "February", "March", "April", "May", "June", "July"
        ],
        datasets: [
          {
            label: "Total revenue",
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: "Team revenue",
            fill: false,
            backgroundColor: "#edf2f7",
            borderColor: "#edf2f7",
            data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: "Sales Charts",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            ticks: {
              fontColor: "rgba(255,255,255,.7)",
            },
            display: true,
            grid: {
              display: false,
              borderDash: [2],
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.3)",
              zeroLineColor: "rgba(0, 0, 0, 0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
          y: {
            ticks: {
              fontColor: "rgba(255,255,255,.7)",
            },
            display: true,
            grid: {
              borderDash: [3],
              borderDashOffset: [3],
              drawBorder: false,
              color: "rgba(255, 255, 255, 0.15)",
              zeroLineColor: "rgba(33, 37, 41, 0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        },
      },
    };

    const ctx = document.getElementById("line-chart").getContext("2d");
    const myLine = new Chart(ctx, config);

    return () => {
      myLine.destroy();
    };
  }, []);

  return <canvas id="line-chart" width="300" height="300"></canvas>;
};

export default memo(LineChart);
