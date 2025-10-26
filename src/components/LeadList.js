import React, { useState } from 'react';
import './LeadList.css';

const LeadList = ({ leads, onLeadAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    loanAmount: '',
    propertyType: '',
    notes: '',
    status: 'NEW'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add lead');
      }

      const newLead = await response.json();
      
      // Reset form and close modal
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        loanAmount: '',
        propertyType: '',
        notes: '',
        status: 'NEW'
      });
      setShowModal(false);
      
      // Notify parent component to refresh leads
      if (onLeadAdded) {
        onLeadAdded(newLead);
      }
    } catch (err) {
      setError(err.message || 'Failed to add lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      loanAmount: '',
      propertyType: '',
      notes: '',
      status: 'NEW'
    });
  };

  if (!leads || leads.length === 0) {
    return (
      <div className="lead-list-empty">
        <h3>No leads found</h3>
        <p>Start by adding your first mortgage lead to the system.</p>
        <button className="btn-add-lead" onClick={() => setShowModal(true)}>
          Add New Lead
        </button>
      </div>
    );
  }

  return (
    <div className="lead-list">
      <div className="lead-list-header">
        <h2>Lead List</h2>
        <button className="btn-add-lead" onClick={() => setShowModal(true)}>
          + Add New Lead
        </button>
      </div>
      
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

      {/* Add Lead Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Lead</h2>
              <button className="btn-close" onClick={handleCloseModal}>&times;</button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="lead-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="loanAmount">Loan Amount</label>
                  <input
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="propertyType">Property Type</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select type...</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Multi-Family">Multi-Family</option>
                    <option value="Investment">Investment</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Add any additional notes about this lead..."
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadList;
