import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Mortgage CRM</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard" className="nav-item active">
              <i className="icon-dashboard"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/leads" className="nav-item">
              <i className="icon-leads"></i>
              <span>Leads</span>
            </Link>
          </li>
          <li>
            <Link to="/pipeline" className="nav-item">
              <i className="icon-pipeline"></i>
              <span>Pipeline</span>
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="nav-item">
              <i className="icon-contacts"></i>
              <span>Contacts</span>
            </Link>
          </li>
          <li>
            <Link to="/reports" className="nav-item">
              <i className="icon-reports"></i>
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="nav-item">
              <i className="icon-settings"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
