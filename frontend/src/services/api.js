import axios from 'axios';

// Production defaults for Netlify deployment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://back-2-i866.onrender.com';
const API_KEY = import.meta.env.VITE_API_KEY || 'oHhGXPVm5rIljDywuhkywC6ICx1cTniydSvkJG8D99U';

console.log('API Configuration:', { API_BASE_URL, hasApiKey: !!API_KEY }); // Debug log

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-Key': API_KEY,
  },
  timeout: 30000, // 30 second timeout for large file uploads
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('/upload/transaction', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getTransactions = () => {
  return apiClient.get('/transactions');
};

export const getFraudSummary = () => {
  return apiClient.get('/fraud-summary');
};