// src/Navbar/admin/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { Container, Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // ← Corrected URL: backend expects POST /api/admin/login
      const res = await axios.post("http://localhost:5000/api/admin/login", form);
      // save token
      if (res.data && res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        // navigate to admin dashboard (make sure your frontend routes match this)
        navigate("/admin/dashboard");
      } else {
        setError("Login failed: invalid response from server");
      }
    } catch (err) {
      console.error("Admin login error:", err?.response?.data || err.message || err);
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 10, p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" name="username" fullWidth margin="normal" onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button type="submit" variant="contained">Login</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
