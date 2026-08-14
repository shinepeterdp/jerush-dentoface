const API_BASE = '/api';

export const apiClient = {
  get: async (url) => {
    const token = localStorage.getItem('jerush_admin_token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['X-Admin-Token'] = token;
    }
    const res = await fetch(`${API_BASE}${url}`, { headers });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }
    return res.json();
  },

  post: async (url, data) => {
    const token = localStorage.getItem('jerush_admin_token');
    const headers = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['X-Admin-Token'] = token;
    }
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }
    return res.json();
  },

  put: async (url, data) => {
    const token = localStorage.getItem('jerush_admin_token');
    const headers = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['X-Admin-Token'] = token;
    }
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }
    return res.json();
  },

  delete: async (url) => {
    const token = localStorage.getItem('jerush_admin_token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['X-Admin-Token'] = token;
    }
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'DELETE',
      headers
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }
    return res.json();
  }
};
