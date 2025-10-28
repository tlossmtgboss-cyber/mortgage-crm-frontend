import React from 'react';
import { realtorData } from '../data/realtorData';

function DeadLeadPage() {
  const realtorId = localStorage.getItem('selectedRealtorId') || '1';
  const realtor = realtorData.find(r => r.id === realtorId);
  const deadLeads = realtor ? realtor.deadLeads : [];

  return (
    <div className="page-container">
      <h2>Dead Lead Tab</h2>
      {realtor && <h3>Realtor: {realtor.name}</h3>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Contact</th>
            <th>Property Type</th>
            <th>Budget</th>
            <th>Reason</th>
            <th>Date Closed</th>
          </tr>
        </thead>
        <tbody>
          {deadLeads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.clientName}</td>
              <td>{lead.contact}</td>
              <td>{lead.propertyType}</td>
              <td>${lead.budget.toLocaleString()}</td>
              <td>{lead.reason}</td>
              <td>{lead.dateClosed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {deadLeads.length === 0 && <p className="no-data">No dead leads found.</p>}
    </div>
  );
}

export default DeadLeadPage;
