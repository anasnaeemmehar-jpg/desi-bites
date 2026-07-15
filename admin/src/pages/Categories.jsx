import { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import CategoryModal from '../components/CategoryModal.jsx';
import { api, imageUrl } from '../services/api.js';
import './Products.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setLoading(true);
    api
      .getCategories()
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }

  function openCreateModal() {
    setEditingCategory(null);
    setModalOpen(true);
  }

  function openEditModal(category) {
    setEditingCategory(category);
    setModalOpen(true);
  }

  async function handleSave(formData) {
    if (editingCategory) {
      await api.updateCategory(editingCategory.id, formData);
    } else {
      await api.createCategory(formData);
    }
    setModalOpen(false);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this category? Products in it will become uncategorized.')) return;
    await api.deleteCategory(id);
    loadData();
  }

  return (
    <Layout title="Categories" subtitle="Organize your menu into categories">
      <div className="page-actions">
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Add Category
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
                <th>Slug</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    {cat.image ? (
                      <img src={imageUrl(cat.image)} alt="" className="product-thumb" />
                    ) : (
                      <div className="product-thumb placeholder">🏷️</div>
                    )}
                  </td>
                  <td>
                    <strong>{cat.name}</strong>
                  </td>
                  <td>{cat.slug}</td>
                  <td className="table-actions">
                    <button className="btn btn-secondary" onClick={() => openEditModal(cat)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(cat.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: '#6B6157', padding: 30 }}>
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
}
