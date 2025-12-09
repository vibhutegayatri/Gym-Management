import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
  return (
    <footer
      style={{
        background: `url("https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80") no-repeat center center/cover`,
        position: "relative",
        color: "#fff",
      }}
    >
      <div id="contact" style={{ background: "rgba(0,0,0,0.7)", padding: "50px 0 20px" }}>
        <Container>
          <Row className="py-5 text-white">
            {/* About Section */}
            <Col md={6} className="mb-4">
              <h4 className="fw-bold">🏋️‍♂️ Fitness Club</h4>
              <p>
                Transform your body and mind with us. Our certified trainers and
                world-class equipment help you achieve your fitness goals.
              </p>
              <div style={{ marginTop: "20px" }}>
                <a href="#" style={iconStyle}><i className="bi bi-facebook"></i></a>
                <a href="#" style={iconStyle}><i className="bi bi-instagram"></i></a>
                <a href="#" style={iconStyle}><i className="bi bi-twitter"></i></a>
                <a href="#" style={iconStyle}><i className="bi bi-youtube"></i></a>
              </div>
            </Col>


            {/* Newsletter */}
            <Col md={6} className="mb-4">
              <h5 className="fw-bold">Subscribe</h5>
              <p>Join our newsletter to get the latest fitness tips & offers.</p>
              <Form className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="me-2"
                />
                <Button variant="warning">Join</Button>
              </Form>
              <p className="mt-3"><i className="bi bi-telephone"></i> +91 7119141662</p>
              <p><i className="bi bi-envelope"></i> info@fitnessgym.com</p>
            </Col>
          </Row>
          <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />
          <p className="text-center text-white mb-0">
            © {new Date().getFullYear()} Fitness Club | All Rights Reserved
          </p>
        </Container>
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#ffc107",
  textDecoration: "none",
  display: "block",
  marginBottom: "8px",
  transition: "0.3s",
};

const iconStyle = {
  fontSize: "24px",
  marginRight: "15px",
  color: "#ffc107",
  transition: "0.3s",
};

export default Footer;
