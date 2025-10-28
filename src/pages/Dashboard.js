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
        {/* Metrics Table */}
        <section className="metrics-section">
          <h2>Metrics Overview</h2>
          <div className="table-container">
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Leads</td>
                  <td>{leads.length}</td>
                </tr>
                <tr>
                  <td>Active Loans</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Closed Deals</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Recent Leads Table */}
        <section className="leads-section">
          <h2>Recent Leads</h2>
          {loading ? (
            <p>Loading leads...</p>
          ) : leads.length > 0 ? (
            <div className="table-container">
              <table className="leads-table">
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
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
