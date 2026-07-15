import { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import ProductModal from '../components/ProductModal.jsx';
import { api, imageUrl } from '../services/api.js';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setLoading(true);
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes.data);
        setCategories(catRes.data);
      })
      .finally(() => setLoading(false));
  }

  function openCreateModal() {
    setEditingProduct(null);
    setModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setModalOpen(true);
  }

  async function handleSave(formData) {
    if (editingProduct) {
      await api.updateProduct(editingProduct.id, formData);
    } else {
      await api.createProduct(formData);
    }
    setModalOpen(false);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    await api.deleteProduct(id);
    loadData();
  }

  return (
    <Layout title="Products" subtitle="Manage your menu items">
      <div className="page-actions">
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Add Product
        </button>
      </div>

      <div className="card">
        {loading ? (
          <p style={{ padding: 24 }}>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.image ? (
                      <img src={imageUrl(product.image)} alt="" className="product-thumb" />
                    ) : (
                      <div className="product-thumb placeholder">🍽️</div>
                    )}
                  </td>
                  <td>
                    <strong>{product.name}</strong>
                    {product.is_featured ? <span className="featured-tag">Featured</span> : null}
                  </td>
                  <td>{product.category_name || '—'}</td>
                  <td>
                    Rs {product.discount_price || product.price}
                    {product.discount_price && (
                      <span className="price-old">Rs {product.price}</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${product.is_available ? 'badge-delivered' : 'badge-cancelled'}`}>
                      {product.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button className="btn btn-secondary" onClick={() => openEditModal(product)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: '#6B6157', padding: 30 }}>
                    No products yet. Add your first dish.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
}
