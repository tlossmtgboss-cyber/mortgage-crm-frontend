import React from 'react';
import { realtorData } from '../data/realtorData';

function LeadPage() {
  const realtorId = localStorage.getItem('selectedRealtorId') || '1';
  const realtor = realtorData.find(r => r.id === realtorId);
  const leads = realtor ? realtor.leads : [];

  return (
    <div className="page-container">
      <h2>Lead Page</h2>
      {realtor && <h3>Realtor: {realtor.name}</h3>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Contact</th>
            <th>Property Type</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.clientName}</td>
              <td>{lead.contact}</td>
              <td>{lead.propertyType}</td>
              <td>${lead.budget.toLocaleString()}</td>
              <td><span className={`status-badge status-${lead.status.toLowerCase()}`}>{lead.status}</span></td>
              <td>{lead.dateAdded}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {leads.length === 0 && <p className="no-data">No leads found.</p>}
    </div>
  );
}

export default LeadPage;
