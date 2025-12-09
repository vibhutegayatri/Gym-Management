// src/Navbar/admin/AdminPanel.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminUsers from "./AdminUsers";
import AdminTrainers from "./AdminTrainers";
import AdminPlans from "./AdminPlans";
import AdminPayments from "./AdminPayments";

export default function AdminPanel() {
  return (
    <div style={{ display: "flex" }}>
      <AdminNavbar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="users" element={<AdminUsers />} />
          <Route path="trainers" element={<AdminTrainers />} />
          <Route path="plans" element={<AdminPlans />} />
          <Route path="payments" element={<AdminPayments />} />
        </Routes>
      </div>
    </div>
  );
}
