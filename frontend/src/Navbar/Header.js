

import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, Modal, Offcanvas, Form, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [userData, setUserData] = useState({ name: "Guest User", email: "guest@example.com" });
  const [userImage, setUserImage] = useState(null);
  const [myPlans, setMyPlans] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);

      axios.get(`http://localhost:5000/api/orders/${parsedUser.email}`)
        .then(res => setMyPlans(res.data))
        .catch(err => console.error("Error fetching plans:", err));
    }

    const savedImage = localStorage.getItem("userImage");
    if (savedImage) setUserImage(savedImage);
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserImage(reader.result);
        localStorage.setItem("userImage", reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLogout = () => setShowLogout(true);
  const handleLogoutYes = () => { localStorage.clear(); navigate("/"); };
  const handleLogoutNo = () => setShowLogout(false);

  const handleEditName = () => { setEditingName(true); setNewName(userData.name); };
  const handleSaveName = () => { const updatedUser = { ...userData, name: newName }; setUserData(updatedUser); localStorage.setItem("user", JSON.stringify(updatedUser)); setEditingName(false); };

  const navLinkStyle = { textDecoration: "none", color: "black", fontWeight: "bold", fontSize: "18px" };

  const getExpiredDate = (purchasedAt, duration) => {
    const date = new Date(purchasedAt);
    date.setMonth(date.getMonth() + Number(duration));
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm" fixed="top" expanded={expanded}>
        <Container fluid className="d-flex align-items-center justify-content-between">
          <Navbar.Brand style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={process.env.PUBLIC_URL + "/gym/logo.jpg"}
              alt="Gym Logo"
              style={{ width: "55px", height: "55px", borderRadius: "50%", objectFit: "cover" }}
            />
            <span style={{ fontWeight: "bold", fontSize: "22px" }}>Fitness Club</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />

          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
            <Nav className="mx-auto d-flex align-items-center gap-3 justify-content-center">
              <Nav.Link href="#home" style={navLinkStyle} onClick={() => setExpanded(false)}>Home</Nav.Link>
              <Nav.Link href="#about" style={navLinkStyle} onClick={() => setExpanded(false)}>About</Nav.Link>
              <Nav.Link href="#work" style={navLinkStyle} onClick={() => setExpanded(false)}>Workout Plans</Nav.Link>
              <Nav.Link href="#trainers" style={navLinkStyle} onClick={() => setExpanded(false)}>Trainers</Nav.Link>
              <Nav.Link href="#contact" style={navLinkStyle} onClick={() => setExpanded(false)}>Contact Us</Nav.Link>
            </Nav>

            <div className="d-flex align-items-center">
              <Button variant="link" className="p-0 border-0" onClick={() => setShowProfile(true)} style={{ color: "black" }}>
                <i className="bi bi-person" style={{ fontSize: "30px" }}></i>
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Modal */}
      <Modal show={showLogout} onHide={handleLogoutNo} centered>
        <Modal.Body className="text-center fs-5">✅ Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogoutYes}>Yes</Button>
          <Button variant="secondary" onClick={handleLogoutNo}>No</Button>
        </Modal.Footer>
      </Modal>

      {/* Profile Offcanvas */}
      <Offcanvas show={showProfile} onHide={() => setShowProfile(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="text-center" style={{ overflowY: "auto", maxHeight: "80vh" }}>
          <img
            src={userImage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/User_icon_BLACK-01.png"}
            alt="User"
            className="rounded-circle mb-2 border border-3"
            width="120"
            height="120"
          />

          <Form.Group controlId="formFile" className="mb-3 mt-3">
            <Button variant="primary" onClick={() => document.getElementById("fileInput").click()}>
              {userImage ? "Change Image" : "Add Image"}
            </Button>
            <Form.Control type="file" id="fileInput" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
          </Form.Group>

          {editingName ? (
            <div className="d-flex justify-content-center align-items-center gap-2">
              <Form.Control type="text" value={newName} onChange={(e) => setNewName(e.target.value)} style={{ width: "70%" }} />
              <Button variant="success" size="sm" onClick={handleSaveName}>Save</Button>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center gap-2">
              <h4 className="mb-0">{userData.name}</h4>
              <Button variant="link" onClick={handleEditName} style={{ fontSize: "20px", color: "black", padding: 0 }}>
                <i className="bi bi-pencil-square"></i>
              </Button>
            </div>
          )}

          <p className="text-muted">{userData.email}</p>

          {/* My Plans */}
          <div className="mt-4 text-start">
            <h5>My Workout Plans</h5>
            <hr />
            {myPlans.length > 0 ? (
              myPlans.map((plan) => (
                <div key={plan._id} className="p-3 border rounded bg-light mb-3">
                  <strong>{plan.product}</strong> <br />
                  <small>Trainer: {plan.trainer}</small> <br />
                  <small>Duration: {plan.duration} Month(s)</small> <br />
                  <small>Status: {plan.paymentStatus}</small> <br />
                  <small>Purchased On: {new Date(plan.createdAt).toLocaleDateString()}</small> <br />
                  <small>Expires On: {new Date(new Date(plan.createdAt).setMonth(new Date(plan.createdAt).getMonth() + Number(plan.duration))).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <p className="text-muted">No workout plan purchased yet.</p>
            )}
          </div>

          <Button variant="danger" className="mt-4" onClick={() => setShowLogout(true)}>Logout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
