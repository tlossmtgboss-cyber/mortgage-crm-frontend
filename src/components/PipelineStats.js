import React from 'react';
import './PipelineStats.css';

const PipelineStats = ({ stats }) => {
  const defaultStats = [
    { label: 'Total Leads', value: 142, change: '+12%', trend: 'up' },
    { label: 'In Progress', value: 38, change: '+5%', trend: 'up' },
    { label: 'Closed Won', value: 24, change: '+18%', trend: 'up' },
    { label: 'Conversion Rate', value: '16.9%', change: '+2.3%', trend: 'up' }
  ];

  const displayStats = stats || defaultStats;

  return (
    <div className="pipeline-stats">
      {displayStats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-label">{stat.label}</div>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.trend}`}>
            <span className="change-icon">{stat.trend === 'up' ? '↑' : '↓'}</span>
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PipelineStats;
