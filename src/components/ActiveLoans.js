import React, { useState, useEffect } from 'react';
import './ActiveLoans.css';

const ActiveLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActiveLoans();
  }, []);

  const fetchActiveLoans = async () => {
    try {
      const response = await fetch('/api/loans/active');
      if (response.ok) {
        const data = await response.json();
        setLoans(data);
      }
    } catch (err) {
      setError('Failed to load active loans');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Application': '#3b82f6',
      'Processing': '#f59e0b',
      'Underwriting': '#8b5cf6',
      'Approval': '#10b981',
      'Closing': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) return <div className="loading">Loading active loans...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="active-loans-container">
      <div className="page-header">
        <h1>💼 Active Loans</h1>
        <p>Monitor loans in process from application to approval</p>
      </div>

      <div className="loans-grid">
        {loans.length === 0 ? (
          <div className="empty-state">
            <p>No active loans at the moment</p>
          </div>
        ) : (
          loans.map((loan) => (
            <div key={loan.id} className="loan-card">
              <div className="loan-card-header">
                <h3>{loan.borrower_name}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(loan.status) }}
                >
                  {loan.status}
                </span>
              </div>
              <div className="loan-card-body">
                <div className="loan-detail">
                  <span className="label">Loan Amount:</span>
                  <span className="value">${loan.loan_amount?.toLocaleString()}</span>
                </div>
                <div className="loan-detail">
                  <span className="label">Property Type:</span>
                  <span className="value">{loan.property_type || 'N/A'}</span>
                </div>
                <div className="loan-detail">
                  <span className="label">Application Date:</span>
                  <span className="value">{new Date(loan.application_date).toLocaleDateString()}</span>
                </div>
                {loan.estimated_closing_date && (
                  <div className="loan-detail">
                    <span className="label">Est. Closing:</span>
                    <span className="value">{new Date(loan.estimated_closing_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <div className="loan-card-footer">
                <button className="btn-details">View Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveLoans;
