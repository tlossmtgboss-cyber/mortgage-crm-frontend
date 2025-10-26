import React, { useState } from 'react';
import './TeamsIntegration.css';
import teamsService from '../services/teamsService';

/**
 * TeamsIntegration Component
 * Provides a button and modal interface for users to configure Microsoft Teams integration
 * by entering their API credentials (Client ID, Tenant ID, and Client Secret)
 */
const TeamsIntegration = () => {
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({
    clientId: '',
    tenantId: '',
    clientSecret: ''
  });
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validate inputs
    if (!credentials.clientId || !credentials.tenantId || !credentials.clientSecret) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      // Initialize Teams service with credentials
      const result = await teamsService.initialize(credentials);
      
      if (result.success) {
        setIsConnected(true);
        setSuccessMessage('Successfully connected to Microsoft Teams!');
        
        // Store credentials securely (in production, use backend)
        localStorage.setItem('teamsCredentials', JSON.stringify(credentials));
        
        // Close modal after 2 seconds
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setErrorMessage(result.error || 'Failed to connect to Microsoft Teams');
      }
    } catch (error) {
      setErrorMessage('An error occurred while connecting to Microsoft Teams');
      console.error('Teams integration error:', error);
    }
  };

  const handleDisconnect = () => {
    teamsService.disconnect();
    setIsConnected(false);
    setCredentials({
      clientId: '',
      tenantId: '',
      clientSecret: ''
    });
    localStorage.removeItem('teamsCredentials');
    setSuccessMessage('Disconnected from Microsoft Teams');
  };

  return (
    <div className="teams-integration">
      {!isConnected ? (
        <button className="teams-integration-button" onClick={handleOpenModal}>
          <span className="teams-icon">📞</span>
          Connect to Microsoft Teams
        </button>
      ) : (
        <div className="teams-connected">
          <button className="teams-integration-button connected">
            <span className="teams-icon">✓</span>
            Microsoft Teams Connected
          </button>
          <button className="disconnect-button" onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Microsoft Teams Integration</h2>
              <button className="close-button" onClick={handleCloseModal}>&times;</button>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">
                Enter your Microsoft Teams API credentials to enable SMS, calling, and receiving call features.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="clientId">Client ID</label>
                  <input
                    type="text"
                    id="clientId"
                    name="clientId"
                    value={credentials.clientId}
                    onChange={handleInputChange}
                    placeholder="Enter your Microsoft Teams Client ID"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tenantId">Tenant ID</label>
                  <input
                    type="text"
                    id="tenantId"
                    name="tenantId"
                    value={credentials.tenantId}
                    onChange={handleInputChange}
                    placeholder="Enter your Microsoft Teams Tenant ID"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="clientSecret">Client Secret</label>
                  <input
                    type="password"
                    id="clientSecret"
                    name="clientSecret"
                    value={credentials.clientSecret}
                    onChange={handleInputChange}
                    placeholder="Enter your Microsoft Teams Client Secret"
                    required
                  />
                </div>

                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
                
                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}

                <div className="modal-footer">
                  <button type="button" className="cancel-button" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Connect
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsIntegration;
