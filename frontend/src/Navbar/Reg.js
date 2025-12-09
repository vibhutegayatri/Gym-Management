import React, { useState, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

function Reg({ onClose, onOpenLogin, onSuccess }) {
  const initialFormState = {
    name: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    terms: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errorField, setErrorField] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "accepted" : "") : value,
    });
    if (errorField === name) {
      setErrorField("");
      setErrorMsg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ["name", "password", "email", "phone", "address", "gender"];

    for (let field of required) {
      if (!formData[field]) {
        setErrorField(field);
        setErrorMsg(`⚠️ Please fill the ${field}`);
        return;
      }
    }

    if (formData.terms !== "accepted") {
      setErrorField("terms");
      setErrorMsg("⚠️ Please accept Terms and Conditions!");
      return;
    }

    try {
      setLoading(true);

      // Clear previous storage
      localStorage.clear();
      sessionStorage.clear();

      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      console.log("✅ Registration Success:", res.data);

      setSuccessMsg("🎉 Registration Successful!");
      if (audioRef.current) audioRef.current.play();

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          isNewUser: false,
        })
      );

      // Reset form after 5 seconds
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg("");
        setFormData(initialFormState); // Reset all form fields
        setErrorField("");
        setErrorMsg("");
        onSuccess && onSuccess();
      }, 5000); // 5 seconds
    } catch (err) {
      setLoading(false);

      // Show alert if user already exists
      if (err.response?.data?.message === "User already exists") {
        alert("⚠️ User already registered! Please login.");
        onOpenLogin && onOpenLogin();
      } else {
        const msg = err.response?.data?.message || "Registration failed!";
        setErrorField("server");
        setErrorMsg(msg);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 3,
          borderRadius: 3,
          position: "relative",
        }}
      >
        <Typography variant="h5" align="center" fontWeight="bold" mb={2}>
          Registration Form
        </Typography>

        <form onSubmit={handleSubmit}>
          {["name", "password", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                margin="dense"
                variant="standard"
              />
              {errorField === field && (
                <Typography color="error" fontSize={12}>
                  {errorMsg}
                </Typography>
              )}
            </div>
          ))}

          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={formData.gender} onChange={handleChange}>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          {errorField === "gender" && (
            <Typography color="error" fontSize={12}>
              {errorMsg}
            </Typography>
          )}

          <label style={{ fontSize: "14px", marginTop: "10px", display: "block" }}>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms === "accepted"}
              onChange={handleChange}
              style={{ marginRight: "5px" }}
            />
            Accept all <Link to="/terms">Terms and Conditions</Link>
          </label>
          {errorField === "terms" && (
            <Typography color="error" fontSize={12}>
              {errorMsg}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: "20px" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>

          {errorField === "server" && (
            <Typography
              align="center"
              color="error"
              sx={{ mt: 1, fontSize: 13 }}
            >
              {errorMsg}
            </Typography>
          )}

          <Typography align="center" sx={{ mt: 2, fontSize: 14 }}>
            Already have an account?{" "}
            <span
              onClick={onOpenLogin}
              style={{
                color: "#1976d2",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Login here
            </span>
          </Typography>
        </form>

        {successMsg && (
          <Typography
            align="center"
            sx={{
              mt: 2,
              backgroundColor: "#4caf50",
              color: "#fff",
              p: 1,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            {successMsg}
          </Typography>
        )}

        <audio ref={audioRef} src="./gym/laptopspaceaudio.mp3" />
      </Paper>
    </Box>
  );
}

export default Reg;
