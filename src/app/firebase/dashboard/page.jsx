"use client";

import { useEffect, useState } from "react";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.replace("/firebase/login");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/firebase/login");
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
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-5">Welcome, {user.email}</h1>
        <p className="lead">You are successfully logged in to your Firebase Dashboard.</p>
      </div>

      <div className="row g-4">
        {/* Card 1: Add New Idea */}
        <div className="col-md-4">
          <div
            className="card text-center shadow-sm h-100 border-primary"
            onClick={() => router.push("/firebase/ideas/create")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <i className="bi bi-plus-circle-fill display-4 text-primary mb-3"></i>
              <h5 className="card-title">Add New Idea</h5>
              <p className="card-text">Create a new idea to track and manage your projects.</p>
              <button className="btn btn-primary mt-auto">Add Idea</button>
            </div>
          </div>
        </div>

        {/* Card 2: View Ideas */}
        <div className="col-md-4">
          <div
            className="card text-center shadow-sm h-100 border-success"
            onClick={() => router.push("/firebase/ideas")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <i className="bi bi-card-list display-4 text-success mb-3"></i>
              <h5 className="card-title">View Ideas</h5>
              <p className="card-text">See all your ideas in one place and manage them efficiently.</p>
              <button className="btn btn-success mt-auto">View Ideas</button>
            </div>
          </div>
        </div>

        {/* Card 3: Logout */}
        <div className="col-md-4">
          <div
            className="card text-center shadow-sm h-100 border-danger"
            style={{ cursor: "pointer" }}
          >
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <i className="bi bi-box-arrow-right display-4 text-danger mb-3"></i>
              <h5 className="card-title">Logout</h5>
              <p className="card-text">Sign out from your account securely.</p>
              <button className="btn btn-danger mt-auto" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
