'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ id: '', name: '', email: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this user?')) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setMessage('User deleted successfully');
      fetchUsers();
    } else {
      setMessage(data.message || 'Error deleting user');
    }
  };

  const handleEditClick = (user) => {
    setForm({ id: user.id, name: user.name, email: user.email, password: '' });
    setIsEditing(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing ? `/api/admin/users/${form.id}` : '/api/admin/users';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.success) {
      setMessage(isEditing ? 'User updated successfully' : 'User added successfully');
      setForm({ id: '', name: '', email: '', password: '' });
      setIsEditing(false);
      fetchUsers();
    } else {
      setMessage(data.message || 'Error saving user');
    }
  };

  return (
    <AdminLayout>
      <h2>Users Management</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Add/Edit Form */}
      <form className="mb-4" onSubmit={handleFormSubmit}>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="password"
              placeholder={isEditing ? 'Leave blank to keep password' : 'Password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-control"
              {...(!isEditing && { required: true })}
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-success w-100">
              {isEditing ? 'Update User' : 'Add User'}
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{new Date(u.created_at).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditClick(u)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
