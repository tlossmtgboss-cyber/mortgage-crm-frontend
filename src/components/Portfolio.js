import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading portfolio...</div>;

  return (
    <div className="portfolio-container">
      <div className="page-header">
        <h1>📁 Portfolio</h1>
        <p>Closed borrowers and client relationships</p>
      </div>

      <div className="clients-grid">
        {clients.length === 0 ? (
          <div className="empty-state">
            <p>No closed loans in portfolio yet</p>
          </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="client-card">
              <div className="client-card-header">
                <h3>{client.name}</h3>
                <span className="total-loans">{client.loan_count} loans</span>
              </div>
              <div className="client-card-body">
                <div className="client-detail">
                  <span className="label">Total Volume:</span>
                  <span className="value">${client.total_volume?.toLocaleString()}</span>
                </div>
                <div className="client-detail">
                  <span className="label">Last Closed:</span>
                  <span className="value">{new Date(client.last_closed_date).toLocaleDateString()}</span>
                </div>
                <div className="client-detail">
                  <span className="label">Status:</span>
                  <span className="value status-active">Active</span>
                </div>
              </div>
              <div className="client-card-footer">
                <button className="btn-details">View History</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Portfolio;
