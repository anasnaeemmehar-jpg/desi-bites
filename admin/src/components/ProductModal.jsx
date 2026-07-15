import { useState, useEffect } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, categories, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    discount_price: '',
    is_available: true,
    is_featured: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        category_id: product.category_id || '',
        description: product.description || '',
        price: product.price ?? '',
        discount_price: product.discount_price ?? '',
        is_available: !!product.is_available,
        is_featured: !!product.is_featured,
      });
    }
  }, [product]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category_id', form.category_id);
      formData.append('description', form.description);
      formData.append('price', form.price);
      if (form.discount_price) formData.append('discount_price', form.discount_price);
      formData.append('is_available', form.is_available ? '1' : '0');
      formData.append('is_featured', form.is_featured ? '1' : '0');
      if (imageFile) formData.append('image', imageFile);

      await onSave(formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category_id" value={form.category_id} onChange={handleChange} required>
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (Rs)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Discount Price (optional)</label>
              <input
                type="number"
                name="discount_price"
                value={form.discount_price}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-row checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="is_available"
                checked={form.is_available}
                onChange={handleChange}
              />
              Available
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="is_featured"
                checked={form.is_featured}
                onChange={handleChange}
              />
              Featured
            </label>
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
