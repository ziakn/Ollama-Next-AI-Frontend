'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login'); // redirect if not logged in
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload) throw new Error('Invalid token');
      setUser(payload);
    } catch (err) {
      localStorage.removeItem('token');
      router.push('/auth/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '220px' }}>
        <h4 className="text-center mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/admin/dashboard">Dashboard</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/admin/users">Users</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/admin/articles">Articles</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/admin/categories">Categories</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="/admin/images">Images</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-light px-3 d-flex justify-content-between">
          <span className="navbar-text">
            {user ? `Logged in as: ${user.name}` : 'Admin'}
          </span>
          <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </nav>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
