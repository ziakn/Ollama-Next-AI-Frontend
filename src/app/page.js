'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('z@z.com');
  const [password, setPassword] = useState('123465');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login logic
    // if (email === 'z@z.com' && password === '123456') {
      localStorage.setItem('token', 'my_dummy_token');
      router.push('/agents');
    // } else {
    //   alert('Invalid credentials');
    // }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <div
            className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #ff00e4, #f22f10)',
              boxShadow: '0 4px 12px rgba(255, 0, 0, 0.4)',
              color: '#fff',
            }}
          >
            <i className="bi bi-person-lock fs-3"></i>
          </div>
          <h4 className="fw-bold text-primary">AI Agents Portal</h4>
          <p className="text-muted small mb-0">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 rounded-pill">
            <i className="bi bi-box-arrow-in-right me-1"></i> Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">© 2025 AI Agents Platform</small>
        </div>
      </div>
    </div>
  );
}