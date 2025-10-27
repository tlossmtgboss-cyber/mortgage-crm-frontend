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
      setError('Failed to fetch leads');
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
      await leadService.createLead(formData);
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
      fetchLeads();
    } catch (err) {
      console.error('Error creating lead:', err);
      setError('Failed to create lead');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadService.deleteLead(id);
        fetchLeads();
      } catch (err) {
        console.error('Error deleting lead:', err);
        setError('Failed to delete lead');
      }
    }
  };

  return (
    <div className="lead-list-container">
      <div className="header">
        <h2>Leads</h2>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          + Add New Lead
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="leads-table">
        <table>
          <thead>
            <tr>
              <th>Borrower Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Property Address</th>
              <th>Loan Purpose</th>
              <th>Requested Amount</th>
              <th>Status</th>
              <th>Actions</th>
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
                <td>${lead.requestedLoanAmount}</td>
                <td><span className={`status-badge ${lead.status.toLowerCase()}`}>{lead.status}</span></td>
                <td>
                  <button onClick={() => handleDelete(lead.id)} className="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Lead</h3>
              <button onClick={() => setShowModal(false)} className="close-btn">×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Borrower Name *</label>
                <input
                  type="text"
                  name="borrowerName"
                  value={formData.borrowerName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Property Address *</label>
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Loan Purpose *</label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Refinance">Refinance</option>
                  <option value="Cash-Out Refinance">Cash-Out Refinance</option>
                </select>
              </div>

              <div className="form-group">
                <label>Requested Loan Amount *</label>
                <input
                  type="number"
                  name="requestedLoanAmount"
                  value={formData.requestedLoanAmount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="Single Family">Single Family</option>
                  <option value="Condo">Condo</option>
                  <option value="Multi-Family">Multi-Family</option>
                </select>
              </div>

              <div className="form-group">
                <label>Estimated Credit Score</label>
                <select
                  name="estimatedCreditScore"
                  value={formData.estimatedCreditScore}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="Excellent (750+)">Excellent (750+)</option>
                  <option value="Good (700-749)">Good (700-749)</option>
                  <option value="Fair (650-699)">Fair (650-699)</option>
                  <option value="Poor (&lt;650)">Poor (&lt;650)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Estimated Closing Date</label>
                <input
                  type="date"
                  name="estimatedClosingDate"
                  value={formData.estimatedClosingDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Preferred Contact Method</label>
                <select
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="Text">Text</option>
                </select>
              </div>

              <div className="form-group">
                <label>Referral Source</label>
                <input
                  type="text"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Co-Borrower Info</label>
                <input
                  type="text"
                  name="coBorrowerInfo"
                  value={formData.coBorrowerInfo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Creating...' : 'Create Lead'}
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
