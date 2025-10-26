import axios from 'axios';

// Use relative API path for Vercel proxy
const API_URL = '/api';

const leadService = {
  // Get all leads
  getLeads: async () => {
    try {
      const response = await axios.get(`${API_URL}/leads`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  // Get a single lead by ID
  getLeadById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/leads/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching lead ${id}:`, error);
      throw error;
    }
  },

  // Create a new lead
  createLead: async (leadData) => {
    try {
      const response = await axios.post(`${API_URL}/leads`, leadData);
      return response.data;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  // Update an existing lead
  updateLead: async (id, leadData) => {
    try {
      const response = await axios.put(`${API_URL}/leads/${id}`, leadData);
      return response.data;
    } catch (error) {
      console.error(`Error updating lead ${id}:`, error);
      throw error;
    }
  },

  // Delete a lead
  deleteLead: async (id) => {
    try {
      await axios.delete(`${API_URL}/leads/${id}`);
    } catch (error) {
      console.error(`Error deleting lead ${id}:`, error);
      throw error;
    }
  },

  // Health check endpoint
  healthCheck: async () => {
    try {
      const response = await axios.get(`${API_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('Backend health check failed:', error);
      throw error;
    }
  }
};

export default leadService;
