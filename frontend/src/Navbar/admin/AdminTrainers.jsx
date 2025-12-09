import React, { useState } from "react";

export default function AdminTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [name, setName] = useState("");

  const addTrainer = () => {
    if (!name) return alert("Enter trainer name");
    setTrainers([...trainers, { id: Date.now(), name }]);
    setName("");
  };

  const deleteTrainer = (id) => {
    setTrainers(trainers.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>🧑‍🏫 Manage Trainers</h2>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Trainer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addTrainer}>Add</button>
      </div>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainers.length > 0 ? (
            trainers.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>
                  <button onClick={() => deleteTrainer(t.id)}>❌ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                No trainers added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
