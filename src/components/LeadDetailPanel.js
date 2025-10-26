import React from 'react';
import './LeadDetailPanel.css';

const LeadDetailPanel = ({ lead, onClose }) => {
  if (!lead) {
    return (
      <div className="lead-detail-panel empty">
        <p>Select a lead to view details</p>
      </div>
    );
  }

  return (
    <div className="lead-detail-panel">
      <div className="panel-header">
        <h3>Lead Details</h3>
        <button className="btn-close" onClick={onClose}>&times;</button>
      </div>
      <div className="panel-content">
        <section className="lead-info">
          <h4>Contact Information</h4>
          <div className="info-group">
            <label>Name:</label>
            <span>{lead.name}</span>
          </div>
          <div className="info-group">
            <label>Email:</label>
            <span>{lead.email}</span>
          </div>
          <div className="info-group">
            <label>Phone:</label>
            <span>{lead.phone}</span>
          </div>
        </section>
        <section className="loan-info">
          <h4>Loan Information</h4>
          <div className="info-group">
            <label>Loan Value:</label>
            <span>{lead.value}</span>
          </div>
          <div className="info-group">
            <label>Status:</label>
            <span className={`status-badge ${lead.status.toLowerCase()}`}>{lead.status}</span>
          </div>
          <div className="info-group">
            <label>Last Contact:</label>
            <span>{lead.lastContact}</span>
          </div>
        </section>
        <section className="actions">
          <button className="btn-primary">Send Email</button>
          <button className="btn-secondary">Schedule Call</button>
          <button className="btn-secondary">Add Note</button>
        </section>
      </div>
    </div>
  );
};

export default LeadDetailPanel;
