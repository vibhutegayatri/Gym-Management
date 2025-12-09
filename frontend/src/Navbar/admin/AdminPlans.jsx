import React, { useState } from "react";

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState("");

  const addPlan = () => {
    if (!plan) return alert("Enter plan name");
    setPlans([...plans, { id: Date.now(), name: plan }]);
    setPlan("");
  };

  const deletePlan = (id) => {
    setPlans(plans.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>💪 Workout Plans</h2>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Plan Name"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        />
        <button onClick={addPlan}>Add</button>
      </div>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.length > 0 ? (
            plans.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
                  <button onClick={() => deletePlan(p.id)}>❌ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                No plans added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
