import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import TradesTable from '../components/TradesTable';
import StatsCards from '../components/StatsCards';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);           // состояние рынка
  const [recentTrades, setRecentTrades] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Параллельно получаем stats и recent_orders
      const [statsData, tradesData] = await Promise.all([
        dashboardAPI.getStats(),          // статистика/состояние рынка
        dashboardAPI.getRecentOrders(20) // только recent_orders
      ]);

      console.log("STATS RAW:", statsData);
      console.log("TRADES RAW:", tradesData);

      setStats(statsData);
      setRecentTrades(tradesData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Market Overview</h1>
        <p>Real-time recent trades</p>
      </div>

      {stats && <StatsCards stats={stats} />}

      <TradesTable trades={recentTrades} />
    </div>
  );
};

export default Dashboard;
