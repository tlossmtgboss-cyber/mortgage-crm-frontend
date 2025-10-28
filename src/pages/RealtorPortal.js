import React, { useState } from 'react';
import './RealtorPortal.css';
import LeadPage from './LeadPage';
import ActiveLoanPage from './ActiveLoanPage';
import DeadLeadPage from './DeadLeadPage';
import ClosedLoanPage from './ClosedLoanPage';
import AIAssistant from './AIAssistant';

function RealtorPortal() {
  const [activeTab, setActiveTab] = useState('leads');

  const renderContent = () => {
    switch(activeTab) {
      case 'leads':
        return <LeadPage />;
      case 'activeLoans':
        return <ActiveLoanPage />;
      case 'deadLeads':
        return <DeadLeadPage />;
      case 'closedLoans':
        return <ClosedLoanPage />;
      default:
        return <LeadPage />;
    }
  };

  return (
    <div className="realtor-portal">
      <header className="portal-header">
        <h1>Realtor Portal</h1>
        <nav className="portal-nav">
          <button 
            className={activeTab === 'leads' ? 'active' : ''}
            onClick={() => setActiveTab('leads')}
          >
            Lead Page
          </button>
          <button 
            className={activeTab === 'activeLoans' ? 'active' : ''}
            onClick={() => setActiveTab('activeLoans')}
          >
            Active Loan Page
          </button>
          <button 
            className={activeTab === 'deadLeads' ? 'active' : ''}
            onClick={() => setActiveTab('deadLeads')}
          >
            Dead Lead Tab
          </button>
          <button 
            className={activeTab === 'closedLoans' ? 'active' : ''}
            onClick={() => setActiveTab('closedLoans')}
          >
            Closed Loan Page
          </button>
        </nav>
      </header>
      
      <div className="portal-content">
        {renderContent()}
      </div>

      <AIAssistant />
    </div>
  );
}

export default RealtorPortal;
