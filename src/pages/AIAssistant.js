import React, { useState } from 'react';
import './AIAssistant.css';

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I\'m a demo AI assistant. In a production environment, I would connect to an AI API to provide intelligent responses about your realtor pipeline, loan statuses, and client information.'
      }]);
    }, 500);

    setInput('');
  };

  return (
    <div className={`ai-assistant ${isOpen ? 'open' : ''}`}>
      <button 
        className="ai-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="AI Assistant"
      >
        🤖 AI
      </button>
      
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-header">
            <h3>AI Assistant</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="ai-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ai-${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          
          <form className="ai-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
