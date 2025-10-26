import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PipelineStats from '../components/PipelineStats';
import LeadsTable from '../components/LeadsTable';
import LeadDetailPanel from '../components/LeadDetailPanel';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedLead, setSelectedLead] = useState(null);

  const handleLeadSelect = (lead) => {
    setSelectedLead(lead);
  };

  const handleClosePanel = () => {
    setSelectedLead(null);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <button className="btn-primary">Add New Lead</button>
            <button className="btn-secondary">Export</button>
          </div>
        </header>
        <PipelineStats />
        <div className="dashboard-content">
          <div className="leads-section">
            <h2>Recent Leads</h2>
            <LeadsTable onLeadSelect={handleLeadSelect} />
          </div>
          {selectedLead && (
            <LeadDetailPanel lead={selectedLead} onClose={handleClosePanel} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
