import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============ LEADS API ============

// Get all leads
export const getLeads = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/leads?${params}`);
  return response.data;
};

// Get single lead
export const getLead = async (id) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};

// Create lead
export const createLead = async (leadData) => {
  const response = await api.post("/leads", leadData);
  return response.data;
};

// Update lead
export const updateLead = async (id, leadData) => {
  const response = await api.patch(`/leads/${id}`, leadData);
  return response.data;
};

// Delete lead
export const deleteLead = async (id) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};

// Add comment
export const addComment = async (leadId, commentData) => {
  const response = await api.post(`/leads/${leadId}/comments`, commentData);
  return response.data;
};

// ============ AGENTS API ============

// Get all agents
export const getAgents = async () => {
  const response = await api.get("/agents");
  return response.data;
};

// Create agent
export const createAgent = async (agentData) => {
  const response = await api.post("/agents", agentData);
  return response.data;
};

export default api;
