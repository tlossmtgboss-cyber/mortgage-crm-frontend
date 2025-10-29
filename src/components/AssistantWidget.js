import React, { useState } from 'react';
import { askAssistant } from '../services/assistant';
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
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      // Use the new assistant service with proper contract
      const result = await askAssistant(
        prompt,
        'web-session', // sessionId for tracking
        { source: 'CRM-Dashboard', userId: 'current-user' } // context
      );
      
      // Extract reply from response (following the contract)
      setResponse(result.reply);
      setShowTips(false);
    } catch (err) {
      setError(err.message || 'Failed to get response from assistant');
      console.error('Assistant error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowTips(true);
      setPrompt('');
      setResponse('');
      setError(null);
    }
  };

  const handleTipClick = (tipText) => {
    setPrompt(tipText);
    setShowTips(false);
  };

  return (
    <>
      <div className={`assistant-widget ${isOpen ? 'open' : ''}`}>
        <button className="widget-toggle" onClick={toggleWidget}>
          {isOpen ? '✕' : '🤖'}
        </button>

        {isOpen && (
          <div className="widget-content">
            <div className="widget-header">
              <h3>🤖 AI Assistant</h3>
              <p>Your personal mortgage CRM helper</p>
            </div>

            {showTips && !response && (
              <div className="ai-tips">
                <h4>What can I help you with?</h4>
                <div className="tips-grid">
                  {aiTips.map((tip, index) => (
                    <div
                      key={index}
                      className="tip-card"
                      onClick={() => handleTipClick(tip.description)}
                    >
                      <span className="tip-icon">{tip.icon}</span>
                      <h5>{tip.title}</h5>
                      <p>{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {response && (
              <div className="response-area">
                <div className="response-content">
                  {response}
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="assistant-form">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your question or request..."
                rows="3"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="submit-btn"
              >
                {loading ? '🔄 Thinking...' : '✨ Ask AI'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AssistantWidget;
