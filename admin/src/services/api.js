const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

function getToken() {
  return localStorage.getItem('desibites_admin_token');
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...(options.isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

export const api = {
  // Auth
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getProfile: () => request('/auth/profile'),
  changePassword: (currentPassword, newPassword) =>
    request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  // Products
  getProducts: () => request('/products'),
  createProduct: (formData) =>
    request('/products', { method: 'POST', body: formData, isFormData: true }),
  updateProduct: (id, formData) =>
    request(`/products/${id}`, { method: 'PUT', body: formData, isFormData: true }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => request('/categories'),
  createCategory: (formData) =>
    request('/categories', { method: 'POST', body: formData, isFormData: true }),
  updateCategory: (id, formData) =>
    request(`/categories/${id}`, { method: 'PUT', body: formData, isFormData: true }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: 'DELETE' }),

  // Orders
  getOrders: (status) => request(`/orders${status ? `?status=${status}` : ''}`),
  getOrderStats: () => request('/orders/stats'),
  updateOrderStatus: (id, status) =>
    request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteOrder: (id) => request(`/orders/${id}`, { method: 'DELETE' }),

  // Customers
  getCustomers: () => request('/customers'),
  deleteCustomer: (id) => request(`/customers/${id}`, { method: 'DELETE' }),
};

const UPLOADS_BASE = import.meta.env.VITE_API_URL || '';

export function imageUrl(filename) {
  if (!filename) return null;
  return `${UPLOADS_BASE}/uploads/${filename}`;
}

export { getToken };
