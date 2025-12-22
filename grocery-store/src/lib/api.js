import axios from "axios";
import { getToken, clearToken } from "./auth";
import { API_BASE_URL } from "./constants";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses and errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err?.response || err);
    
    // Handle 401 - redirect to login
    if (err?.response?.status === 401) {
      clearToken(); // Clear token
      if (typeof window !== "undefined" && !window.location.pathname.includes("/auth")) {
        window.location.href = "/auth/login";
      }
    }
    
    return Promise.reject(err);
  }
);

export default api;

