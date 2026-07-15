const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

export const api = {
  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ''}`);
  },
  getProduct: (idOrSlug) => request(`/products/${idOrSlug}`),

  // Categories
  getCategories: () => request('/categories'),

  // Orders
  createOrder: (orderData) =>
    request('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getOrder: (id) => request(`/orders/${id}`),
};

const UPLOADS_BASE = import.meta.env.VITE_API_URL || '';

export function imageUrl(filename) {
  if (!filename) return '/images/foods/placeholder.jpg';
  return `${UPLOADS_BASE}/uploads/${filename}`;
}
