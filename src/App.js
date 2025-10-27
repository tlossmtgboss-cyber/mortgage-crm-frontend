import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import SidebarNavigation from './components/SidebarNavigation';
import Dashboard from './components/Dashboard';
import LeadList from './components/LeadList';
import ActiveLoans from './components/ActiveLoans';
import Portfolio from './components/Portfolio';
import Tasks from './components/Tasks';
import Calendar from './components/Calendar';
import Scorecard from './components/Scorecard';
import AssistantWidget from './components/AssistantWidget';

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch(`${API_URL}/leads/`);
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
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <>
                <SidebarNavigation />
                <div className="main-content">
                  <Dashboard />
                </div>
                <AssistantWidget />
              </>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <>
                <SidebarNavigation />
                <div className="main-content">
                  <Dashboard />
                </div>
                <AssistantWidget />
              </>
            } 
          />
          <Route 
            path="/leads" 
            element={
              <>
                <SidebarNavigation />
                <div className="main-content">
                  <LeadsPage />
                </div>
                <AssistantWidget />
              </>
            } 
          />
          <Route 
            path="/active-loans" 
            element={
              <>
                <SidebarNavigation />
                <div className="main-content">
                  <ActiveLoans />
                </div>
                <AssistantWidget />
              </>
            } 
          />
          <Route 
            path="/portfolio" 
            element={
              <>
                <SidebarNavigation />
                <div className="main-content">
                  <Portfolio />
                </div>
                <AssistantWidget />
              </>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <>
                <SidebarNavigation />
                <div className="main-content">
                  <Tasks />
                </div>
                <AssistantWidget />
              </>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <>
                <SidebarNavigation />
                <div className="main-content">
                  <Calendar />
                </div>
                <AssistantWidget />
              </>
            } 
          />
          <Route 
            path="/scorecard" 
            element={
              <>
                <SidebarNavigation />
                <div className="main-content">
                  <Scorecard />
                </div>
                <AssistantWidget />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
