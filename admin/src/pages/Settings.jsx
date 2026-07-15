import { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Settings() {
  const { admin } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    setSaving(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      setSuccess('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout title="Settings" subtitle="Manage your admin account">
      <div className="card" style={{ maxWidth: 440, padding: 26 }}>
        <h3 style={{ marginBottom: 4 }}>Account</h3>
        <p style={{ color: '#6B6157', fontSize: '0.88rem', marginBottom: 20 }}>
          Signed in as {admin?.email}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <p style={{ color: '#C0392B', fontSize: '0.85rem', marginBottom: 12 }}>{error}</p>}
          {success && <p style={{ color: '#4E8850', fontSize: '0.85rem', marginBottom: 12 }}>{success}</p>}

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
