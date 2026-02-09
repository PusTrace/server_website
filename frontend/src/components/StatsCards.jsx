import React from 'react';
import { TrendingUp, Activity, DollarSign, Package, Wallet } from 'lucide-react';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Placed orders',
      value: stats?.placed_orders || 0,
      icon: Activity,
      color: 'var(--accent-primary)',
      bgColor: 'rgba(0, 255, 136, 0.1)',
    },
    {
      title: 'Placed to sell',
      value: stats?.placed_to_sell || 0,
      icon: Package,
      color: 'var(--accent-primary)',
      bgColor: 'rgba(0, 255, 136, 0.1)',
    },
    {
      title: 'Balance',
      value: `${(stats?.balance || 0).toFixed(2)}`,
      icon: Wallet,
      color: 'var(--accent-purple)',
      bgColor: 'rgba(204, 0, 255, 0.1)',
    },
    {
      title: 'Buy',
      value: `${(stats?.buy || 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'rgba(255, 0, 0, 1)',
      bgColor: 'rgba(255, 0, 0, 0.1)',
    },
    {
      title: 'Sell',
      value: `${(stats?.sell || 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'rgba(4, 255, 0, 1)',
      bgColor: 'rgba(4, 255, 0, 0.1)',
    },
    {
      title: 'Total profit',
      value: `${(stats?.total_profit || 0).toFixed(2)}`,
      icon: TrendingUp,
      color: stats?.total_profit >= 0 ? 'var(--status-profit)' : 'var(--status-loss)',
      bgColor: stats?.total_profit >= 0 ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 0, 102, 0.1)',
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="stat-card" style={{ '--card-bg': card.bgColor }}>
            <div className="stat-icon" style={{ color: card.color }}>
              <Icon size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-title">{card.title}</div>
              <div className="stat-value">{card.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
