import React, { useState } from 'react';
import './AssistantWidget.css';

const AssistantWidget = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showTips, setShowTips] = useState(true);

  const aiTips = [
    {
      title: 'Quick Lead Capture',
      description: 'Ask me to create a new lead with details and I\'ll add it to your pipeline',
      icon: '🎯'
    },
    {
      title: 'Loan Status Updates',
      description: 'Get instant status updates on any active loan by borrower name',
      icon: '💼'
    },
    {
      title: 'Task Automation',
      description: 'I can help you create follow-up tasks and schedule appointments automatically',
      icon: '✓'
    },
    {
      title: 'Performance Insights',
      description: 'Ask about your monthly stats, conversion rates, or portfolio health',
      icon: '📈'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to use the assistant');
        setLoading(false);
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL || 'https://mortgage-crm-production.up.railway.app';
      
      const res = await fetch(`${apiUrl}/api/assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response from assistant');
      }

      setResponse(data.response);
      setPrompt('');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`assistant-widget ${isOpen ? 'open' : ''}`}>
      <button 
        className="assistant-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
      >
        🤖 AI Assistant
      </button>

      {isOpen && (
        <div className="assistant-panel">
          <div className="assistant-header">
            <h3>🤖 AI Assistant</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {showTips && (
            <div className="assistant-tips">
              <div className="tips-header">
                <h4>💡 How I Can Help</h4>
                <button 
                  className="tips-toggle"
                  onClick={() => setShowTips(false)}
                >
                  Hide Tips
                </button>
              </div>
              <div className="tips-grid">
                {aiTips.map((tip, index) => (
                  <div key={index} className="tip-card">
                    <span className="tip-icon">{tip.icon}</span>
                    <div className="tip-content">
                      <strong>{tip.title}</strong>
                      <p>{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showTips && (
            <button 
              className="show-tips-btn"
              onClick={() => setShowTips(true)}
            >
              💡 Show Tips
            </button>
          )}

          <form onSubmit={handleSubmit} className="assistant-form">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything... (e.g., 'Create a lead for John Doe' or 'What's my conversion rate this month?')"
              rows="4"
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Thinking...' : 'Ask AI'}
            </button>
          </form>

          {error && (
            <div className="assistant-error">
              ⚠️ {error}
            </div>
          )}

          {response && (
            <div className="assistant-response">
              <h4>Response:</h4>
              <div className="response-content">{response}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssistantWidget;
