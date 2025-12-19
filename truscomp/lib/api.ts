import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
        // Only redirect if we are in the browser
        if (typeof window !== 'undefined') {
            // Prevent infinite redirect loops if already on login page
            if (!window.location.pathname.startsWith('/login')) {
                 window.location.href = '/login';
            }
        }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
