import axios from 'axios';
import { API_BASE_URL } from '../constant';
import { updateTokens, logout } from '../../AppRedux/userSlice';

// Define a type for the token refresh response

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a function to set the store dynamically
let reduxStore;
export const setStore = (store) => {
  reduxStore = store;
};

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {};
    }
    // Access the token from the dynamically set Redux state
    const state = reduxStore.getState();
    const token = state.user?.token; // Adjust the path based on your state structure
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh using dynamically set store
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = "";
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        const { data } = await axios.post(`${API_BASE_URL}/refresh-token`, { refreshToken });
        reduxStore.dispatch(updateTokens({ accessToken: data.access_token, refreshToken: data.refresh_token }));
        if (!api.defaults.headers.common) {
          api.defaults.headers.common = {};
        }
        api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        reduxStore.dispatch(logout());
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// CRUD utility functions
const apiClient = {
  get: (url , config ) => api.get(url, config),
  post: (url , data, config ) => api.post(url, data, config),
  put: (url , data, config ) => api.put(url, data, config),
  delete: (url , config ) => api.delete(url, config),
};

// File upload utility
export const uploadFile = (url, file, config, { header}) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post(url, formData, {
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default apiClient;
