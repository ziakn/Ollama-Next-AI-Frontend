"use client";

import { useState } from "react";
import { db } from "../../../../lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState("");
  const [roleId, setRoleId] = useState(""); // can be admin/user later
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phone || !dob) {
      setAlert({ type: "danger", message: "All fields are required!" });
      return;
    }
  
    setLoading(true);
    setAlert({ type: "", message: "" });
  
    try {
      // Check if email already exists
      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setAlert({ type: "danger", message: "Email already in use!" });
        setLoading(false);
        return;
      }
  
      // Encrypt password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Add user to Firestore
      await addDoc(collection(db, "users"), {
        name,
        email,
        password: hashedPassword,
        phone,
        dob,
        avatar,
        roleId,
        createdAt: serverTimestamp(),
      });
  
      setAlert({ type: "success", message: "User added successfully!" });
  
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setDob("");
      setAvatar("");
      setRoleId("");
  
      setTimeout(() => router.push("/firebase/users"), 1500);
    } catch (error) {
      console.error(error);
      setAlert({ type: "danger", message: "Error: " + error.message });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Add New User</h2>

                {alert.message && (
                  <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <input
                    type="date"
                    className="form-control mb-2"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Avatar URL (optional)"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Role ID (optional)"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                  />

                  <button className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Saving..." : "Add User"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
