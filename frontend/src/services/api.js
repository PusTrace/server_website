import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/api/stats');
    return response.data;
  },
  
  getRecentOrders: async (limit) => {
    const response = await api.get(`/api/orders/recent?limit=${limit}`);
    return response.data;
  },
  
  getOrders: async (status = null, orderType = null, limit = 100) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (orderType) params.append('order_type', orderType);
    params.append('limit', limit);
    
    const response = await api.get(`/api/orders?${params}`);
    return response.data;
  },
  
  
  getSkinPriceHistory: async (skinId, days = 30) => {
    const response = await api.get(`/api/skins/price-history?skin_id=${skinId}&days=${days}`);
    return response.data;
  },
  
  getSkinsWithAnalysis: async (skin) => {
    const response = await api.get(`/api/skins/analysis?skin=${encodeURIComponent(skin)}`)
    return response.data;
  },
  
};

export default api;
