import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
    organization?: string;
  }) => api.post('/auth/register', userData),
  
  getProfile: () => api.get('/auth/me'),
  
  updateProfile: (data: {
    firstName?: string;
    lastName?: string;
    organization?: string;
  }) => api.put('/auth/profile', data),
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  
  getById: (id: string) => api.get(`/projects/${id}`),
  
  create: (projectData: FormData) => 
    api.post('/projects', projectData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  update: (id: string, projectData: FormData) =>
    api.put(`/projects/${id}`, projectData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  delete: (id: string) => api.delete(`/projects/${id}`),
  
  getStats: (id: string) => api.get(`/projects/${id}/stats`),
};

// Map Features API
export const mapAPI = {
  getFeatures: (projectId: string) => api.get(`/maps/project/${projectId}`),
  
  createFeature: (featureData: any) => api.post('/maps', featureData),
  
  updateFeature: (id: string, featureData: any) => api.put(`/maps/${id}`, featureData),
  
  deleteFeature: (id: string) => api.delete(`/maps/${id}`),
  
  getStats: (projectId: string) => api.get(`/maps/stats/${projectId}`),
};

// Simulations API
export const simulationsAPI = {
  getByProject: (projectId: string) => api.get(`/simulations/project/${projectId}`),
  
  create: (simulationData: {
    name: string;
    type: string;
    parameters: any;
    projectId: string;
  }) => api.post('/simulations', simulationData),
  
  getById: (id: string) => api.get(`/simulations/${id}`),
  
  delete: (id: string) => api.delete(`/simulations/${id}`),
};

// Compliance API
export const complianceAPI = {
  getByProject: (projectId: string) => api.get(`/compliance/project/${projectId}`),
  
  runCheck: (checkData: {
    standard: string;
    projectId: string;
  }) => api.post('/compliance', checkData),
  
  getById: (id: string) => api.get(`/compliance/${id}`),
};

export default api;