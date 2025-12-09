import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Error fetching payments:", err));
  }, []);

  return (
    <div>
      <h2>💳 Payment History</h2>
      <table border="1" width="100%" cellPadding="10">
        <thead style={{ background: "#eee" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Trainer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.product}</td>
                <td>{p.amount}</td>
                <td>{p.trainer}</td>
                <td>{p.paymentStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
