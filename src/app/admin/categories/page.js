'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
const [lastPage, setLastPage] = useState(1);


  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', slug: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchCategories = async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/categories?page=${p}&limit=10`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
        setPage(data.pagination.page);
        setLastPage(data.pagination.lastPage);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > lastPage) return;
    fetchCategories(newPage);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = (category = null) => {
    if (category) {
      setForm({ id: category.id, name: category.name, slug: category.slug });
      setIsEditing(true);
    } else {
      setForm({ id: '', name: '', slug: '' });
      setIsEditing(false);
    }
    setModalVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `/api/admin/categories/${form.id}` : '/api/admin/categories';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setMessage(isEditing ? 'Category updated' : 'Category added');
      fetchCategories();
      setModalVisible(false);
    } else {
      setMessage(data.message || 'Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this category?')) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setMessage('Category deleted');
      fetchCategories();
    } else {
      setMessage(data.message || 'Error deleting category');
    }
  };

  return (
    <AdminLayout>
      <h2>Categories Management</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <button className="btn btn-primary mb-3" onClick={() => openModal()}>
        Add New Category
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>

   
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.slug}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => openModal(c)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        
        </table>
        <nav aria-label="Page navigation">
  <ul className="pagination">
    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</button>
    </li>
    {Array.from({ length: lastPage }, (_, i) => (
      <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
      </li>
    ))}
    <li className={`page-item ${page === lastPage ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => handlePageChange(page + 1)}>Next</button>
    </li>
  </ul>
</nav>

        </>
      )}

      {/* Modal */}
      {modalVisible && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{isEditing ? 'Edit Category' : 'Add Category'}</h5>
                  <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-control mb-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">{isEditing ? 'Update' : 'Add'}</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
