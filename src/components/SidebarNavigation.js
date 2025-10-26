import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SidebarNavigation.css';

const SidebarNavigation = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/leads', icon: '🎯', label: 'Leads' },
    { path: '/active-loans', icon: '💼', label: 'Active Loans' },
    { path: '/portfolio', icon: '📁', label: 'Portfolio' },
    { path: '/tasks', icon: '✓', label: 'Tasks' },
    { path: '/calendar', icon: '📅', label: 'Calendar' },
    { path: '/scorecard', icon: '📈', label: 'Scorecard' }
  ];

  return (
    <aside className="sidebar-navigation">
      <div className="sidebar-header">
        <h2>Mortgage CRM</h2>
      </div>
      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
              <Link to={item.path}>
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNavigation;
