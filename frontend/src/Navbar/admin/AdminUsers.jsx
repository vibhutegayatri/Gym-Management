import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div>
      <h2>👥 Users List</h2>
      <table border="1" width="100%" cellPadding="10">
        <thead style={{ background: "#eee" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.gender}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
