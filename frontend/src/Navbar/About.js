import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function About() {
  const lines = [
    "🏋️‍♂️ This is the best gym in town!",
    "💪 We have professional and certified trainers.",
    "🔥 State-of-the-art equipment for all fitness levels.",
    "✨ Transform your body and mind with us!",
    "🛠️ We have the best gym accessories!",
    "💰 Our gym is budget-friendly and keeps you motivated!",
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleCount < lines.length) {
        setVisibleCount(visibleCount + 1);
      } else {
        setVisibleCount(0); // reset to loop continuously
      }
    }, 1500); // show next line every 1.5s

    return () => clearTimeout(timer);
  }, [visibleCount, lines.length]);

  return (
    <>
      <style>{`
        .about-section {
          padding: 60px 0;
          background-color: #f8f9fa;
          font-family: "Poppins", sans-serif;
        }

        .video-col {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .about-video {
          width: 80%;
          max-height: 550px;
          border-radius: 12px;
          object-fit: cover;
          display: block;
          margin: 0 auto;
          box-shadow: 0 0 15px rgba(0,0,0,0.25);
        }

        .about-text {
          color: #333;
          padding: 30px;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .about-heading {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 30px;
          text-align: center;
        }

        .about-line {
          font-size: 1.5rem;
          font-weight: 600;
          opacity: 0;
          transform: translateX(-50px);
          animation: slideIn 0.8s ease forwards;
          margin-bottom: 10px;
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .about-section {
            text-align: center;
          }
          .video-col {
            margin-bottom: 20px;
          }
          .about-text {
            padding: 15px;
          }
          .about-line {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="about-section">
        <Container>
          <Row>
            {/* Left Side: Video */}
            <Col md={6} className="video-col">
              <video autoPlay loop muted playsInline className="about-video">
                <source src="./gym/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Col>

            {/* Right Side: Animated Text */}
            <Col md={6} className="about-text">
              <div className="about-heading">About Us</div>
              <div className="animated-lines">
                {lines.slice(0, visibleCount).map((line, index) => (
                  <p key={index} className="about-line">{line}</p>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default About;
