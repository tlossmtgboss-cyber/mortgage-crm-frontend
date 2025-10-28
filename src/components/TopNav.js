import React from 'react';
import './TopNav.css';

function TopNav({ currentView, onViewChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'leads', label: 'Leads' },
    { id: 'active-loans', label: 'Active Loans' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'scorecard', label: 'Scorecard' },
    { id: 'portfolio', label: 'Portfolio' }
  ];

  return (
    <nav className="top-nav">
      <div className="nav-buttons">
        {navItems.map(item => (
          <button
            key={item.id}
            className={currentView === item.id ? 'active' : ''}
            onClick={() => onViewChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default TopNav;
