// components/Navbar.js
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3 py-2">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" href="/">🤖 AI Portal</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/agents">Agents</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/chatbots">Chatbots</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard">Dashboard</Link>
            </li>
            
          </ul>

          <div className="d-flex">
            {isLoggedIn ? (
              <button className="btn btn-outline-light btn-sm rounded-pill" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link href="/" className="btn btn-outline-light btn-sm rounded-pill">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
