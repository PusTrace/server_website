import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar
} from "recharts";
import { dashboardAPI } from "../services/api";
import "./PriceChart.css";

const PriceChart = ({ skinId, title }) => {
  const [days, setDays] = useState(30);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!skinId) return;

    const loadHistory = async () => {
      try {
        const history = await dashboardAPI.getSkinPriceHistory(skinId, days);
        setData(history);
      } catch (err) {
        console.error("Price history load failed", err);
      }
    };

    loadHistory();
  }, [skinId, days]);

  const chartData = data.map(item => ({
    date: item.date,
    price: parseFloat(item.price),
    volume: item.volume
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p><b>{payload[0].payload.date}</b></p>
          <p style={{ color: "#4ade80" }}>Price: ₸{payload[0].payload.price.toFixed(2)}</p>
          <p style={{ color: "#60a5fa" }}>Volume: {payload[0].payload.volume}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container card">
      <h3 className="chart-title">{title}</h3>

      <div className="chart-controls">
        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={7}>7 days</option>
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            yAxisId="left"
            tickFormatter={(v) => `₸${v}`}
            stroke="#4ade80"
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => v}
            stroke="#60a5fa"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            stroke="#4ade80"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="volume"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
