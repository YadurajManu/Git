import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Add a request interceptor to include the Firebase ID Token
api.interceptors.request.use(
  async (config) => {
    const { auth } = await import('../config/firebase');
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const workflowsApi = {
  list: (repo?: string) => api.get('/workflows', { params: { repo } }).then((res) => res.data),
  listRepositories: () => api.get('/workflows/repositories').then((res) => res.data),
  getDetails: (id: string) => api.get(`/workflows/${id}`).then((res) => res.data),
  getStats: () => api.get('/stats').then((res) => res.data),
};

export default api;
