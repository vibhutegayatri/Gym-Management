import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Carousel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Registration from "./Reg";
import Login from "./Login";

function Index() {
  // ✅ Registration Modal
  const [showReg, setShowReg] = useState(false);
  const handleRegOpen = () => setShowReg(true);
  const handleRegClose = () => setShowReg(false);

  // ✅ Login Modal
  const [showLogin, setShowLogin] = useState(false);
  const handleLoginOpen = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  // ✅ Switch Between Login ↔ Registration
  const switchToRegister = () => {
    setShowLogin(false);
    setShowReg(true);
  };
  const switchToLogin = () => {
    setShowReg(false);
    setShowLogin(true);
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }
          .nav-link-custom {
            font-size: 18px;
            font-weight: 500;
            color: #333 !important;
            transition: color 0.3s;
          }
          .nav-link-custom:hover {
            color: #007bff !important;
          }
          .content-section {
            text-align: center;
            padding: 60px 20px;
          }
          .content-section h2 {
            font-weight: bold;
            margin-bottom: 20px;
          }
          .content-section p {
            font-size: 18px;
            max-width: 700px;
            margin: 0 auto;
          }
        `}
      </style>

      {/* ✅ Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm" fixed="top">
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/gym/logo.jpg"}
              alt="Gym Logo"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span style={{ fontWeight: "bold", fontSize: "22px" }}>
              Fitness Club
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            {/* ✅ Right Side Buttons */}
            <Nav className="align-items-center gap-2">
              <Button variant="outline-primary" onClick={handleRegOpen}>
                Registration
              </Button>
              <Button variant="primary" onClick={handleLoginOpen}>
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Carousel / Images Section */}
      <div style={{ marginTop: "90px" }}>
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/gym/22.jpg"}
              alt="First slide"
              height="550px"
              style={{ objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Push Your Limits</h3>
              <p>Train hard, stay strong, and achieve your fitness goals!</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/gym/144.jpg"}
              alt="Second slide"
              height="550px"
              style={{ objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Transform Yourself</h3>
              <p>Your fitness journey starts today!</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/gym/1.jpg"}
              alt="Third slide"
              height="550px"
              style={{ objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Stronger Every Day</h3>
              <p>Join the best fitness community in town.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* ✅ About Section */}
      <div className="content-section bg-light">
        <h2>Welcome to Fitness Club</h2>
        <p>
          At Fitness Club, we believe in empowering you to achieve your fitness
          goals. Whether you’re looking to build strength, lose weight, or
          simply stay active, our team of professional trainers and top-class
          equipment will help you every step of the way.
        </p>
      </div>

      {/* ✅ Services Section */}
      <div className="content-section">
        <h2>Our Services</h2>
        <p>
          💪 Strength Training | 🧘 Yoga Classes | 🚴 Cardio Workouts | 🥗 Diet
          Planning | 🏋️ Personal Coaching
        </p>
      </div>

      {/* ✅ Footer */}
      <footer
        style={{
          backgroundColor: "#212529",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        © 2025 Fitness Club | All Rights Reserved
      </footer>

      {/* ✅ Registration Modal */}
      <Modal show={showReg} onHide={handleRegClose} centered backdrop="static" size="lg">
        <Modal.Header closeButton />
        <Modal.Body>
          <Registration
            onClose={handleRegClose}
            onOpenLogin={switchToLogin}
            onSuccess={() => {
              handleRegClose();
              window.location.href = "/main";
            }}
          />
        </Modal.Body>
      </Modal>

      {/* ✅ Login Modal */}
      <Modal show={showLogin} onHide={handleLoginClose} centered backdrop="static" size="md">
        <Modal.Header closeButton />
        <Modal.Body>
          <Login
            onClose={handleLoginClose}
            onOpenRegister={switchToRegister}
            onSuccess={() => {
              handleLoginClose();
              window.location.href = "/main";
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Index;
