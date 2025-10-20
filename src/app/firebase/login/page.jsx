"use client";

import { useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlert("");

    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setAlert("Email not found!");
        return;
      }

      const userDoc = snapshot.docs[0].data();
      const passwordMatch = await bcrypt.compare(password, userDoc.password);

      if (!passwordMatch) {
        setAlert("Incorrect password!");
        return;
      }

      // Save user info in localStorage/session for session management
      localStorage.setItem("currentUser", JSON.stringify({
        id: snapshot.docs[0].id,
        name: userDoc.name,
        email: userDoc.email,
        roleId: userDoc.roleId
      }));

      // Redirect to dashboard
      router.push("/firebase/dashboard");

    } catch (error) {
      console.error(error);
      setAlert("Login failed: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      {alert && <div className="alert alert-danger">{alert}</div>}

      <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: "400px" }}>
        <input type="email" className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
