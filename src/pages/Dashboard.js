import React from 'react';
import './Dashboard.css';

const Dashboard = ({ leads = [], loading = false }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <button className="btn-primary">Add New Lead</button>
          <button className="btn-secondary">Export</button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="stats-section">
          <div className="stat-card">
            <h3>Total Leads</h3>
            <p className="stat-number">{leads.length}</p>
          </div>
          <div className="stat-card">
            <h3>Active Loans</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>Closed Deals</h3>
            <p className="stat-number">0</p>
          </div>
        </div>

        <div className="leads-section">
          <h2>Recent Leads</h2>
          {loading ? (
            <p>Loading leads...</p>
          ) : leads.length > 0 ? (
            <div className="leads-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 10).map((lead, index) => (
                    <tr key={index}>
                      <td>{lead.name || 'N/A'}</td>
                      <td>{lead.email || 'N/A'}</td>
                      <td>{lead.phone || 'N/A'}</td>
                      <td>{lead.status || 'New'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No leads available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
