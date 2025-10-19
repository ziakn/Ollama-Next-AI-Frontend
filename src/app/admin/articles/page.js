'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
const [lastPage, setLastPage] = useState(1);
  const [form, setForm] = useState({ id: '', title: '', slug: '', summary: '', content: '', category_id: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchArticles = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/articles?page=${page}&limit=10`);
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles);
        setPage(data.pagination.page);
        setLastPage(data.pagination.lastPage);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
    setLoading(false);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this article?')) return;
    const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setMessage('Article deleted successfully');
      fetchArticles();
    } else {
      setMessage(data.message || 'Error deleting article');
    }
  };

  const handleEditClick = (article) => {
    setForm({
      id: article.id,
      title: article.title,
      slug: article.slug,
      summary: article.summary || '',
      content: article.content,
      category_id: article.category_id || '',
    });
    setIsEditing(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `/api/admin/articles/${form.id}` : '/api/admin/articles';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.success) {
      setMessage(isEditing ? 'Article updated successfully' : 'Article added successfully');
      setForm({ id: '', title: '', slug: '', summary: '', content: '', category_id: '' });
      setIsEditing(false);
      fetchArticles();
    } else {
      setMessage(data.message || 'Error saving article');
    }
  };


  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchArticles(newPage);
  };

  return (
    <AdminLayout>
      <h2>Articles Management</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {/* Add/Edit Form */}
      <form className="mb-4" onSubmit={handleFormSubmit}>
        <div className="row g-2 mb-2">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-success w-100">
              {isEditing ? 'Update Article' : 'Add Article'}
            </button>
          </div>
        </div>

        <div className="mb-2">
          <textarea
            placeholder="Summary"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            className="form-control mb-1"
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="form-control"
            rows={5}
            required
          />
        </div>
      </form>

      {/* Articles Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>


    
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.title}</td>
                <td>{a.slug}</td>
                <td>{a.categories?.name || ''}</td>
                <td>{new Date(a.created_at).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditClick(a)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.id)}>
                    Delete
                  </button>
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
    </AdminLayout>
  );
}
