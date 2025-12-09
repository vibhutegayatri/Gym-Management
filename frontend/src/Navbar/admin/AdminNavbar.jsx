// src/Navbar/admin/AdminNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div style={{
      width: "220px", height: "100vh", background: "#1E1E2F",
      color: "white", display: "flex", flexDirection: "column", padding: "20px"
    }}>
      <h3>🏋️ Admin Panel</h3>
      <Link to="/admin/users" style={linkStyle}>👥 Users</Link>
      <Link to="/admin/trainers" style={linkStyle}>🧑‍🏫 Trainers</Link>
      <Link to="/admin/plans" style={linkStyle}>💪 Workout Plans</Link>
      <Link to="/admin/payments" style={linkStyle}>💳 Payments</Link>
      <button onClick={logout} style={btnStyle}>Logout</button>
    </div>
  );
}

const linkStyle = {
  color: "white", textDecoration: "none", margin: "10px 0", fontSize: "18px"
};

const btnStyle = {
  marginTop: "auto", background: "#ff4d4d", color: "white", border: "none",
  padding: "10px", borderRadius: "6px", cursor: "pointer"
};
