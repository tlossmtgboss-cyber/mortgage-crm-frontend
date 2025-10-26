import React, { useState, useEffect } from 'react';
import './LeadList.css';
import leadService from '../services/leadService';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
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

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await leadService.getLeads();
      setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Failed to load leads');
    }
  };

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
      const newLead = await leadService.createLead(formData);
      setLeads([...leads, newLead]);
      setShowModal(false);
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
    } catch (err) {
      setError(err.message || 'Failed to add lead');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
  };

  return (
    <div className="lead-list-container">
      <div className="lead-list-header">
        <h2>Leads</h2>
        <button className="btn-add-lead" onClick={() => setShowModal(true)}>
          + Add New Lead
        </button>
      </div>
      
      <table className="lead-table">
        <thead>
          <tr>
            <th>Borrower Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Property Address</th>
            <th>Loan Purpose</th>
            <th>Requested Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.borrowerName}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.propertyAddress}</td>
              <td>{lead.loanPurpose}</td>
              <td>{lead.requestedLoanAmount}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Lead</h3>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="propertyAddress">Property Address</label>
                <input
                  type="text"
                  id="propertyAddress"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="loanPurpose">Loan Purpose</label>
                <select
                  id="loanPurpose"
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleInputChange}
                >
                  <option value="">Select purpose...</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Refinance">Refinance</option>
                  <option value="Cash-Out Refinance">Cash-Out Refinance</option>
                  <option value="Home Equity">Home Equity</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="requestedLoanAmount">Requested Loan Amount</label>
                <input
                  type="number"
                  id="requestedLoanAmount"
                  name="requestedLoanAmount"
                  value={formData.requestedLoanAmount}
                  onChange={handleInputChange}
                  placeholder="$"
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
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="estimatedCreditScore">Estimated Credit Score</label>
                <select
                  id="estimatedCreditScore"
                  name="estimatedCreditScore"
                  value={formData.estimatedCreditScore}
                  onChange={handleInputChange}
                >
                  <option value="">Select range...</option>
                  <option value="Excellent (740+)">Excellent (740+)</option>
                  <option value="Good (700-739)">Good (700-739)</option>
                  <option value="Fair (650-699)">Fair (650-699)</option>
                  <option value="Poor (<650)">Poor (<650)</option>
                </select>
              </div>

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
                <label htmlFor="preferredContactMethod">Preferred Contact Method</label>
                <select
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleInputChange}
                >
                  <option value="">Select method...</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="Text">Text</option>
                </select>
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
