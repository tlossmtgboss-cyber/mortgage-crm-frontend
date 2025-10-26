import React, { useState } from 'react';
import './LeadList.css';

const LeadList = ({ leads, onLeadAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    borrowerName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    loanPurpose: '',
    requestedLoanAmount: '',
    propertyType: '',
    estimatedCreditScore: '',
    estimatedClosingDate: '',
    preferredContactMethod: '',
    referralSource: '',
    coBorrowerInfo: '',
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
      const response = await fetch(process.env.REACT_APP_API_URL, {
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
        borrowerName: '',
        email: '',
        phone: '',
        propertyAddress: '',
        loanPurpose: '',
        requestedLoanAmount: '',
        propertyType: '',
        estimatedCreditScore: '',
        estimatedClosingDate: '',
        preferredContactMethod: '',
        referralSource: '',
        coBorrowerInfo: '',
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
      borrowerName: '',
      email: '',
      phone: '',
      propertyAddress: '',
      loanPurpose: '',
      requestedLoanAmount: '',
      propertyType: '',
      estimatedCreditScore: '',
      estimatedClosingDate: '',
      preferredContactMethod: '',
      referralSource: '',
      coBorrowerInfo: '',
      notes: '',
      status: 'NEW'
    });
  };

  if (!leads || leads.length === 0) {
    return (
      <div className="lead-list-empty">
        No leads found
        Start by adding your first mortgage lead to the system.
        <button className="btn-add-lead" onClick={() => setShowModal(true)}>
          Add New Lead
        </button>
      </div>
    );
  }

  return (
    <div className="lead-list">
      <div className="lead-list-header">
        Lead List
        <button className="btn-add-lead" onClick={() => setShowModal(true)}>
          + Add New Lead
        </button>
      </div>
      
      <div className="lead-cards">
        {leads.map((lead) => (
          <div key={lead.id} className="lead-card">
            <div className="lead-header">
              {lead.borrowerName}
              <span className={`status status-${lead.status?.toLowerCase() || 'new'}`}>
                {lead.status || 'NEW'}
              </span>
            </div>
            <div className="lead-details">
              Email: {lead.email}
              Phone: {lead.phone || 'N/A'}
              Property Address: {lead.propertyAddress || 'N/A'}
              Loan Purpose: {lead.loanPurpose || 'N/A'}
              Requested Amount: ${lead.requestedLoanAmount?.toLocaleString() || '0'}
              Property Type: {lead.propertyType || 'N/A'}
              Credit Score: {lead.estimatedCreditScore || 'N/A'}
              Closing Date: {lead.estimatedClosingDate || 'N/A'}
              Contact Method: {lead.preferredContactMethod || 'N/A'}
              Referral Source: {lead.referralSource || 'N/A'}
              {lead.coBorrowerInfo && (
                Co-Borrower: {lead.coBorrowerInfo}
              )}
              {lead.notes && (
                Notes: {lead.notes}
              )}
            </div>
            <div className="lead-meta">
              Created: {new Date(lead.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Add Lead Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              Add New Lead
              <button className="btn-close" onClick={handleCloseModal}>×</button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form className="lead-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="borrowerName">Borrower Name *</label>
                <input
                  type="text"
                  id="borrowerName"
                  name="borrowerName"
                  value={formData.borrowerName}
                  onChange={handleInputChange}
                  required
                />
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
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="propertyAddress">Property Address *</label>
                <input
                  type="text"
                  id="propertyAddress"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="loanPurpose">Loan Purpose *</label>
                  <select
                    id="loanPurpose"
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select purpose...</option>
                    <option value="Purchase">Purchase</option>
                    <option value="Refinance">Refinance</option>
                    <option value="Cash-out">Cash-out</option>
                    <option value="Home Equity">Home Equity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="requestedLoanAmount">Requested Loan Amount *</label>
                  <input
                    type="number"
                    id="requestedLoanAmount"
                    name="requestedLoanAmount"
                    value={formData.requestedLoanAmount}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="propertyType">Property Type *</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="Single-family">Single-family</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Multi-family">Multi-family</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="estimatedCreditScore">Estimated Credit Score</label>
                  <input
                    type="number"
                    id="estimatedCreditScore"
                    name="estimatedCreditScore"
                    value={formData.estimatedCreditScore}
                    onChange={handleInputChange}
                    placeholder="300-850"
                    min="300"
                    max="850"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="estimatedClosingDate">Estimated Closing Date</label>
                  <input
                    type="date"
                    id="estimatedClosingDate"
                    name="estimatedClosingDate"
                    value={formData.estimatedClosingDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferredContactMethod">Preferred Contact Method *</label>
                  <select
                    id="preferredContactMethod"
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select method...</option>
                    <option value="Phone">Phone</option>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="referralSource">Referral Source</label>
                <select
                  id="referralSource"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                >
                  <option value="">Select source...</option>
                  <option value="Agent">Agent</option>
                  <option value="Website">Website</option>
                  <option value="Past Client">Past Client</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="coBorrowerInfo">Co-Borrower Information</label>
                <input
                  type="text"
                  id="coBorrowerInfo"
                  name="coBorrowerInfo"
                  value={formData.coBorrowerInfo}
                  onChange={handleInputChange}
                  placeholder="Name, contact info, etc."
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes/Comments</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Add any special circumstances, priorities, or needs..."
                ></textarea>
              </div>

              <div className="form-actions">
                <button className="btn-cancel" onClick={handleCloseModal} type="button">
                  Cancel
                </button>
                <button className="btn-submit" disabled={loading} type="submit">
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
