import React, { useState } from 'react';
import './AssistantWidget.css';

const AssistantWidget = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
        body: JSON.stringify({
          prompt: prompt,
          context: 'Mortgage CRM system'
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Failed to get response from assistant');
      }

      setResponse(data.response);
      setPrompt('');
    } catch (err) {
      setError(err.message || 'An error occurred while communicating with the assistant');
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
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className="assistant-panel">
          <div className="assistant-header">
            <h3>AI Assistant</h3>
            <p className="assistant-subtitle">Ask me anything about your mortgage CRM</p>
          </div>

          <div className="assistant-content">
            {response && (
              <div className="assistant-response">
                <strong>Assistant:</strong>
                <p>{response}</p>
              </div>
            )}

            {error && (
              <div className="assistant-error">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="assistant-form">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question about leads, loans, or CRM operations..."
              className="assistant-input"
              rows="3"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="assistant-submit"
              disabled={loading || !prompt.trim()}
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssistantWidget;
