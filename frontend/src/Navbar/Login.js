import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Assets/CSS/Header.css";

function Login({ onClose, onOpenRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorPopup, setErrorPopup] = useState(""); // Error message popup
  const [successPopup, setSuccessPopup] = useState(false); // Success popup

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorPopup("");
    setSuccessPopup(false);

    if (!username || !password) {
      setErrorPopup("⚠ Please fill in both fields!");
      return;
    }

    try {
      const res = await axios.post("https://gymmanagment-75up.onrender.com/api/users/login", {
        email: username,
        password,
      });

      const userData = {
        name: res.data.name || username.split("@")[0],
        email: res.data.email || username,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      setSuccessPopup(true);

      setTimeout(() => {
        setSuccessPopup(false);
        if (onClose) onClose();
        window.location.href = "/main";
      }, 2000);
    } catch (err) {
      const message =
        err.response?.data?.message || " Username and Password is Invalid!";
      setErrorPopup(message);
    }
  };

  return (
    <>
      {/* Background overlay */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
        }}
      >
        <Container
          maxWidth="sm"
          style={{
            border: "3px solid black",
            paddingTop: "20px",
            marginTop: "40px",
            height: "460px",
            width: "420px",
            borderRadius: "15px",
            backgroundColor: "#fff",
            position: "relative",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {/* Close Icon for modal */}
          <i
            className="bi bi-x-circle-fill"
            style={{
              position: "absolute",
              top: "10px",
              right: "15px",
              fontSize: "26px",
              cursor: "pointer",
              color: "#333",
              transition: "0.3s",
            }}
            onClick={onClose}
            onMouseOver={(e) => (e.target.style.color = "red")}
            onMouseOut={(e) => (e.target.style.color = "#333")}
          ></i>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            Login
          </Typography>

          {/* Login Form */}
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > :not(style)": { m: 1, width: "70%" },
            }}
          >
            <TextField
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label={
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <i className="bi bi-envelope-fill"></i> EMAIL
                </span>
              }
            />

            <TextField
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <i className="bi bi-lock-fill"></i> PASSWORD
                </span>
              }
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ borderRadius: "20px", marginTop: "10px" }}
            >
              Login
            </Button>

            <Typography align="center" sx={{ mt: 3 }} style={{ fontSize: "14px" }}>
              Don’t have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => {
                  if (onClose) onClose();
                  if (onOpenRegister) onOpenRegister();
                }}
              >
                Register here
              </span>
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ px: 2 }}>
                OR
              </Typography>
            </Divider>

            <Typography align="center" gutterBottom>
              Sign in with
            </Typography>

            <div className="icons">
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/fluency/48/facebook-new.png"
                alt="facebook"
                style={{ margin: "0 8px" }}
              />
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google"
                style={{ margin: "0 8px" }}
              />
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/color/48/twitter-circled--v1.png"
                alt="twitter"
                style={{ margin: "0 8px" }}
              />
            </div>
          </Box>
        </Container>
      </div>

      {/* ✅ Success popup */}
      {successPopup && (
        <div
          style={{
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            border: "2px solid green",
            borderRadius: "10px",
            padding: "30px 50px",
            textAlign: "center",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
            zIndex: 2000,
          }}
        >
          <i
            className="bi bi-check-circle-fill"
            style={{ color: "green", fontSize: "40px", marginBottom: "10px" }}
          ></i>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Login Successful!
          </Typography>
        </div>
      )}

      {/* ❌ Error popup with top-left cross, no cross on red circle */}
      {errorPopup && (
        <div
          style={{
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            border: "2px solid red",
            borderRadius: "10px",
            padding: "30px 30px",
            textAlign: "center",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
            zIndex: 2000,
            width: "350px",
          }}
        >
          {/* Top-left cross to close popup */}
          <i
            className="bi bi-x-lg"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              fontSize: "20px",
              cursor: "pointer",
              color: "red",
            }}
            onClick={() => setErrorPopup("")}
          ></i>

          {/* Centered main error icon WITHOUT cross */}
          <i
            // className="bi bi-x-circle-fill"
            style={{ color: "red", fontSize: "40px", marginBottom: "10px" }}
          ></i>

          <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>
            {errorPopup}
          </Typography>
        </div>
      )}
    </>
  );
}

export default Login;
