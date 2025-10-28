import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Dashboard from './pages/Dashboard';
import LeadsTable from './components/LeadsTable';
import ActiveLoans from './components/ActiveLoans';
import Portfolio from './components/Portfolio';
import Tasks from './components/Tasks';
import Calendar from './components/Calendar';
import Scorecard from './components/Scorecard';
import AssistantWidget from './components/AssistantWidget';
import TopNav from './components/TopNav';

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || '/api';

function AppContent() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const navigate = useNavigate();

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

  const handleViewChange = (view) => {
    setCurrentView(view);
    switch(view) {
      case 'dashboard':
        navigate('/');
        break;
      case 'leads':
        navigate('/leads');
        break;
      case 'active-loans':
        navigate('/active-loans');
        break;
      case 'tasks':
        navigate('/tasks');
        break;
      case 'calendar':
        navigate('/calendar');
        break;
      case 'scorecard':
        navigate('/scorecard');
        break;
      case 'portfolio':
        navigate('/portfolio');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="app-container">
      <TopNav currentView={currentView} onViewChange={handleViewChange} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard leads={leads} loading={loading} />} />
          <Route path="/leads" element={<LeadsTable />} />
          <Route path="/active-loans" element={<ActiveLoans />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/scorecard" element={<Scorecard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <AssistantWidget />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
