"use client";

import { useEffect, useState } from "react";
import { db } from "../../../../../lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Layout from "@/app/firebase/components/Layout";
import bcrypt from "bcryptjs";

export default function EditUser({ params }) {
  const { id } = params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // New password
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState("");
  const [roleId, setRoleId] = useState("");
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = doc(db, "users", id);
      const snapshot = await getDoc(userDoc);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setDob(data.dob);
        setAvatar(data.avatar || "");
        setRoleId(data.roleId || "");
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check if email already exists for other users
    const q = query(collection(db, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);
    const emailTaken = snapshot.docs.some(doc => doc.id !== id);
    if (emailTaken) {
      setAlert({ type: "danger", message: "Email already in use by another user!" });
      return;
    }

    const updatedData = { name, email, phone, dob, avatar, roleId };

    // Encrypt password if provided
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, updatedData);

    setAlert({ type: "success", message: "User updated successfully!" });
    setTimeout(() => router.push("/firebase/users"), 1500);
  };

  if (loading) return <p>Loading user...</p>;

  return (
    <Layout>
      <div className="container mt-5">
        <h2>Edit User</h2>

        {alert.message && (
          <div className={`alert alert-${alert.type}`} role="alert">{alert.message}</div>
        )}

        <form onSubmit={handleUpdate}>
          <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" className="form-control mb-2" placeholder="New Password (leave blank to keep current)" value={password} onChange={e => setPassword(e.target.value)} />
          <input className="form-control mb-2" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input type="date" className="form-control mb-2" value={dob} onChange={e => setDob(e.target.value)} required />
          <input className="form-control mb-2" placeholder="Avatar URL" value={avatar} onChange={e => setAvatar(e.target.value)} />
          <input className="form-control mb-2" placeholder="Role ID" value={roleId} onChange={e => setRoleId(e.target.value)} />
          <button className="btn btn-primary">Update User</button>
        </form>
      </div>
    </Layout>
  );
}
