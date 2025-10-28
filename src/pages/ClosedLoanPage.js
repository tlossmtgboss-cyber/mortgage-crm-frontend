import React from 'react';
import { realtorData } from '../data/realtorData';

function ClosedLoanPage() {
  const realtorId = localStorage.getItem('selectedRealtorId') || '1';
  const realtor = realtorData.find(r => r.id === realtorId);
  const closedLoans = realtor ? realtor.closedLoans : [];

  return (
    <div className="page-container">
      <h2>Closed Loan Page</h2>
      {realtor && <h3>Realtor: {realtor.name}</h3>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Loan Amount</th>
            <th>Property Address</th>
            <th>Loan Type</th>
            <th>Close Date</th>
            <th>Commission</th>
          </tr>
        </thead>
        <tbody>
          {closedLoans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.clientName}</td>
              <td>${loan.loanAmount.toLocaleString()}</td>
              <td>{loan.propertyAddress}</td>
              <td>{loan.loanType}</td>
              <td>{loan.closeDate}</td>
              <td>${loan.commission.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {closedLoans.length === 0 && <p className="no-data">No closed loans found.</p>}
    </div>
  );
}

export default ClosedLoanPage;
