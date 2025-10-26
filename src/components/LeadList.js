import React from 'react';
import './LeadList.css';

const LeadList = ({ leads }) => {
  if (!leads || leads.length === 0) {
    return (
      <div className="lead-list-empty">
        <h3>No leads found</h3>
        <p>Start by adding your first mortgage lead to the system.</p>
      </div>
    );
  }

  return (
    <div className="lead-list">
      <h2>Lead List</h2>
      <div className="lead-cards">
        {leads.map((lead) => (
          <div key={lead.id} className="lead-card">
            <div className="lead-header">
              <h3>{lead.firstName} {lead.lastName}</h3>
              <span className={`status status-${lead.status?.toLowerCase() || 'new'}`}>
                {lead.status || 'NEW'}
              </span>
            </div>
            <div className="lead-details">
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Phone:</strong> {lead.phone || 'N/A'}</p>
              <p><strong>Loan Amount:</strong> ${lead.loanAmount?.toLocaleString() || '0'}</p>
              <p><strong>Property Type:</strong> {lead.propertyType || 'N/A'}</p>
              {lead.notes && (
                <p><strong>Notes:</strong> {lead.notes}</p>
              )}
            </div>
            <div className="lead-meta">
              <small>Created: {new Date(lead.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadList;
