import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || '/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    leads: 0,
    activeLoans: 0,
    closedLoans: 0,
    pendingTasks: 0,
    upcomingAppointments: 0
  });

  useEffect(() => {
    // Fetch dashboard stats from backend
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Replace with actual backend endpoint
      const response = await fetch(`${API_URL}/dashboard/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const moduleCards = [
    {
      title: 'Leads',
      icon: '🎯',
      value: stats.leads,
      description: 'New leads and contact attempts',
      color: 'var(--primary-blue)',
      path: '/leads'
    },
    {
      title: 'Active Loans',
      icon: '💼',
      value: stats.activeLoans,
      description: 'Loans in process from application to approval',
      color: 'var(--accent-purple)',
      path: '/active-loans'
    },
    {
      title: 'Portfolio',
      icon: '📁',
      value: stats.closedLoans,
      description: 'All closed loans and your full client portfolio',
      color: 'var(--accent-green)',
      path: '/portfolio'
    },
    {
      title: 'Tasks',
      icon: '✓',
      value: stats.pendingTasks,
      description: 'Follow-up tasks, calls, emails, documents due',
      color: 'var(--accent-orange)',
      path: '/tasks'
    },
    {
      title: 'Calendar',
      icon: '📅',
      value: stats.upcomingAppointments,
      description: 'Upcoming appointments, closings, and reminders',
      color: 'var(--accent-red)',
      path: '/calendar'
    },
    {
      title: 'Scorecard',
      icon: '📊',
      value: null,
      description: 'Performance metrics, conversion rates, and goals',
      color: 'var(--accent-cyan)',
      path: '/scorecard'
    }
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="modules-container">
        {moduleCards.map((card, index) => (
          <div
            key={index}
            className="module-card"
            style={{ borderLeft: `4px solid ${card.color}` }}
            onClick={() => navigate(card.path)}
          >
            <div className="module-header">
              <span className="module-icon">{card.icon}</span>
              <h3>{card.title}</h3>
            </div>
            {card.value !== null && (
              <div className="module-value" style={{ color: card.color }}>
                {card.value}
              </div>
            )}
            <p className="module-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
