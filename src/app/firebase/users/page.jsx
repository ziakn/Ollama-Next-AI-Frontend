"use client";

import { useEffect, useState } from "react";
import { db, auth } from "../../../lib/firebase";
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this user?")) return;
    try {
      await deleteDoc(doc(db, "users", id));
      alert("User deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Users</h2>
        <button className="btn btn-success" onClick={()=>router.push("/firebase/users/create")}>+ Add User</button>
      </div>

      {users.length === 0 ? <p>No users found.</p> : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.dob}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={()=>router.push(`/firebase/users/${u.id}/edit`)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Layout>);
}
