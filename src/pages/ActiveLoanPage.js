import React from 'react';
import { realtorData } from '../data/realtorData';

function ActiveLoanPage() {
  const realtorId = localStorage.getItem('selectedRealtorId') || '1';
  const realtor = realtorData.find(r => r.id === realtorId);
  const activeLoans = realtor ? realtor.activeLoans : [];

  return (
    <div className="page-container">
      <h2>Active Loan Page</h2>
      {realtor && <h3>Realtor: {realtor.name}</h3>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Loan Amount</th>
            <th>Property Address</th>
            <th>Loan Type</th>
            <th>Status</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {activeLoans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.clientName}</td>
              <td>${loan.loanAmount.toLocaleString()}</td>
              <td>{loan.propertyAddress}</td>
              <td>{loan.loanType}</td>
              <td><span className={`status-badge status-${loan.status.toLowerCase()}`}>{loan.status}</span></td>
              <td>{loan.startDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {activeLoans.length === 0 && <p className="no-data">No active loans found.</p>}
    </div>
  );
}

export default ActiveLoanPage;
