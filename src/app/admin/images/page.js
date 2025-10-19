'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminImagesPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ id: '', title: '', file: null });
  const [preview, setPreview] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Fetch images with pagination
  const fetchImages = async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/images?page=${p}&limit=6`);
      const data = await res.json();
      if (data.success) {
        setImages(data.images || []);
        setPage(data.pagination.page);
        setLastPage(data.pagination.lastPage);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  // Open modal for add/edit
  const openModal = (image = null) => {
    if (image) {
      setForm({ id: image.id, title: image.title, file: null });
      setPreview(image.file_path);
    } else {
      setForm({ id: '', title: '', file: null });
      setPreview(null);
    }
    setModalVisible(true);
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Submit form (Add/Edit)
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('title', form.title);
  if (form.file) formData.append('file', form.file);

  try {
    let res;
    if (!form.id) {
      // POST (new image)
      res = await fetch('/api/admin/images', { method: 'POST', body: formData });
    } else {
      // PUT (update existing image)
      // Use dynamic [id] route
      const url = `/api/admin/images/${form.id}`;
      if (form.file) {
        // Update with new file
        res = await fetch(url, { method: 'PUT', body: formData });
      } else {
        // Update without file
        res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: form.title }),
        });
      }
    }

    const data = await res.json();
    if (data.success) {
      setMessage(form.id ? 'Updated successfully' : 'Added successfully');
      setModalVisible(false);
      fetchImages(page);
    } else {
      setMessage(data.message || 'Error saving image');
    }
  } catch (err) {
    setMessage(err.message);
  }
};

// Delete image
const handleDelete = async (id) => {
  if (!confirm('Are you sure?')) return;

  try {
    // DELETE uses dynamic [id] route
    const res = await fetch(`/api/admin/images/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) fetchImages(page);
    else setMessage(data.message || 'Error deleting image');
  } catch (err) {
    setMessage(err.message);
  }
};

  // Pagination
  const handlePageChange = (p) => {
    if (p >= 1 && p <= lastPage) {
      setPage(p);
      fetchImages(p);
    }
  };

  return (
    <AdminLayout>
      <h2>Gallery</h2>
      <button className="btn btn-success mb-3" onClick={() => openModal()}>Add Image</button>
      {message && <div className="alert alert-info">{message}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {images.map((img) => (
            <div key={img.id} className="col-md-4 mb-3">
              <div className="card">
                <img src={img.file_path} className="card-img-top" alt={img.title} />
                <div className="card-body">
                  <h5 className="card-title">{img.title?.toString()}</h5>
                  <button className="btn btn-primary me-2" onClick={() => openModal(img)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(img.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <nav>
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

      {/* Modal */}
      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{form.id ? 'Edit Image' : 'Add Image'}</h5>
                  <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
                </div>
                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                  <input type="file" className="form-control mb-2" onChange={handleFileChange} />
                  {preview && <img src={preview} alt="Preview" className="img-fluid" />}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>Close</button>
                  <button type="submit" className="btn btn-primary">{form.id ? 'Update' : 'Add'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
