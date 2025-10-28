import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';
import LeadFormModal from '../components/LeadFormModal';

function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await api.get('/leads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      setLoading(false);
    }
  };

  const handleAddNewLead = () => {
    setShowLeadForm(true);
  };

  const handleCloseModal = () => {
    setShowLeadForm(false);
  };

  const handleLeadCreated = (newLead) => {
    setLeads([newLead, ...leads]);
    setShowLeadForm(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {/* Header Section */}
        <section className="dashboard-header">
          <h1>Dashboard</h1>
          <button className="btn-primary" onClick={handleAddNewLead}>
            + Add New Lead
          </button>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-card">
            <h3>Pipeline Overview</h3>
            <table className="stats-table">
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
      
      {/* Lead Form Modal */}
      {showLeadForm && (
        <LeadFormModal
          onClose={handleCloseModal}
          onLeadCreated={handleLeadCreated}
        />
      )}
    </div>
  );
};

export default Dashboard;
