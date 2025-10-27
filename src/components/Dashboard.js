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
      color: '#3b82f6',
      path: '/leads'
    },
    {
      title: 'Active Loans',
      icon: '💼',
      value: stats.activeLoans,
      description: 'Loans in process from application to approval',
      color: '#8b5cf6',
      path: '/active-loans'
    },
    {
      title: 'Portfolio',
      icon: '📁',
      value: stats.closedLoans,
      description: 'Closed borrowers and client relationships',
      color: '#10b981',
      path: '/portfolio'
    },
    {
      title: 'Tasks',
      icon: '✓',
      value: stats.pendingTasks,
      description: 'AI-powered task completion and management',
      color: '#f59e0b',
      path: '/tasks'
    },
    {
      title: 'Calendar',
      icon: '📅',
      value: stats.upcomingAppointments,
      description: 'Scheduling and appointment management',
      color: '#ef4444',
      path: '/calendar'
    },
    {
      title: 'Scorecard',
      icon: '📈',
      value: '—',
      description: 'Business metrics and performance analytics',
      color: '#06b6d4',
      path: '/scorecard'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's an overview of your mortgage CRM.</p>
      </div>
      
      <div className="module-cards-grid">
        {moduleCards.map((card, index) => (
          <div
            key={index}
            className="module-card"
            onClick={() => handleCardClick(card.path)}
            style={{ borderTopColor: card.color }}
          >
            <div className="module-card-header">
              <span className="module-icon">{card.icon}</span>
              <h3>{card.title}</h3>
            </div>
            <div className="module-card-content">
              <div className="module-value" style={{ color: card.color }}>
                {card.value}
              </div>
              <p className="module-description">{card.description}</p>
            </div>
            <div className="module-card-footer">
              <span className="view-details">View Details →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
