import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SidebarNavigation from './components/SidebarNavigation';
import Dashboard from './components/Dashboard';
import LeadList from './components/LeadList';
import ActiveLoans from './components/ActiveLoans';
import Portfolio from './components/Portfolio';
import Tasks from './components/Tasks';
import Calendar from './components/Calendar';
import Scorecard from './components/Scorecard';
import AssistantWidget from './components/AssistantWidget';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadAdded = (newLead) => {
    // Add the new lead to the leads array
    setLeads(prevLeads => [newLead, ...prevLeads]);
  };

  // LeadsPage component to wrap LeadList with state
  const LeadsPage = () => (
    <LeadList leads={leads} onLeadAdded={handleLeadAdded} />
  );

  return (
    <Router>
      <div className="App">
        <SidebarNavigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/active-loans" element={<ActiveLoans />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/scorecard" element={<Scorecard />} />
          </Routes>
        </div>
        <AssistantWidget />
      </div>
    </Router>
  );
}

export default App;
