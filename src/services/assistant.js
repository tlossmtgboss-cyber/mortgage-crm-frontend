// src/services/assistant.js
import { api } from './api';

/**
 * Ask the AI assistant a question
 * @param {string} message - The question/prompt to ask
 * @param {string} sessionId - Optional session ID for context
 * @param {object} context - Optional context object (userId, pipelineSummary, etc.)
 * @returns {Promise<{reply: string, model: string, latency_ms: number, usage?: object}>}
 */
export async function askAssistant(
  message,
  sessionId = null,
  context = null
) {
  if (!message || message.trim().length === 0) {
    throw new Error('Message cannot be empty');
  }

  if (message.length > 8000) {
    throw new Error('Message too long (max 8000 characters)');
  }

  try {
    const payload = {
      message: message.trim(),
      sessionId,
      context
    };

    const { data } = await api.post('/api/assistant', payload);
    
    // Validate response structure
    if (!data || typeof data.reply !== 'string') {
      throw new Error('Invalid response from assistant');
    }

    return data;
  } catch (error) {
    // Enhance error message for better debugging
    const errorMessage = error.response?.data?.detail 
      || error.message 
      || 'Failed to get response from assistant';
    
    throw new Error(errorMessage);
  }
}
