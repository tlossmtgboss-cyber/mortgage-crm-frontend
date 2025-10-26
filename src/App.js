import React, { useState, useEffect } from 'react';
import './App.css';
import LeadList from './components/LeadList';
import leadService from './services/leadService';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await leadService.getLeads();
      setLeads(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leads. Backend may not be running.');
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mortgage CRM Frontend</h1>
        <p>Lead Management System</p>
      </header>
      <main className="App-main">
        {loading && <p>Loading leads...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && <LeadList leads={leads} />}
      </main>
    </div>
  );
}

export default App;
