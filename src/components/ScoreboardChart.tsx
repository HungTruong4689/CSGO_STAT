import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export interface Score {
  ct: number;
  t: number;
}

export const ScoreboardChart = ({ scoreboard }: { scoreboard: Score[] }) => {
  const labels = scoreboard.map((_, i) => `Round ${i + 1}`);
  const ctData = scoreboard.map((s) => s.ct);
  const tData = scoreboard.map((s) => s.t);

  const data = {
    labels,
    datasets: [
      {
        label: 'CT Score',
        data: ctData,
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: 'T Score',
        data: tData,
        borderColor: '#f59e0b',
        backgroundColor: 'transparent',
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'line'>) {
            const round = tooltipItem.dataIndex + 1;
            const ct = data.datasets[0].data[tooltipItem.dataIndex] as number;
            const t = data.datasets[1].data[tooltipItem.dataIndex] as number;
            const datasetLabel = tooltipItem.dataset.label || 'Unknown';
            return `Round ${round}: ${datasetLabel} CT ${ct}, T ${t}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white', maxRotation: 90 },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Scoreboard Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};
