"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // ✅ Check user session from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      router.replace("/firebase/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("currentUser");
    router.push("/firebase/login");
  };

  if (!user)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <h3 className="mb-4">Firebase App</h3>
        <p className="mb-4">Welcome, {user.name}</p>

        <nav className="nav flex-column">
          <Link className="nav-link text-white" href="/firebase/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link text-white" href="/firebase/ideas">
            Ideas
          </Link>
          <Link className="nav-link text-white" href="/firebase/tasks">
            Tasks
          </Link>
          <Link className="nav-link text-white" href="/firebase/users">
            Users
          </Link>
          {/* You can add more modules here */}
        </nav>

        <button className="btn btn-danger mt-4" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">{children}</div>
    </div>
  );
}
