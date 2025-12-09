

import React, { useState } from "react";

const logos = [
  { src: "./gym/1.jpg" },
  { src: "./gym/4.jpg" },
  { src: "./gym/10.jpg" },
  { src: "./gym/5.jpg" },
  { src: "./gym/6.jpg" },
  { src: "./gym/11.jpg" },
  { src: "./gym/7.jpg" },
  { src: "./gym/8.jpg" },
  { src: "./gym/12.jpg" },
  { src: "./gym/9.jpg" },
  { src: "./gym/15.jpg" },
  { src: "./gym/13.jpg" },
  { src: "./gym/16.jpg" },
  { src: "./gym/17.jpg" },
  { src: "./gym/14.jpg" },
  { src: "./gym/18.jpg" },
  { src: "./gym/19.jpg" },
  { src: "./gym/22.jpg" },
  { src: "./gym/10.jpg" },
];

const Marquee = () => {
  const [isPaused, setIsPaused] = useState(false);

  const containerStyle = {
    overflow: "hidden",
    width: "100%",
  
    padding: "10px 0",
    boxSizing: "border-box",
    position: "relative",
  };

  const wrapperStyle = {
    display: "flex",
    width: "100%",
  };

  const trackStyle = {
    display: "flex",
    width: "max-content",
    animation: `marquee 90s linear infinite`,
    animationPlayState: isPaused ? "paused" : "running",
  };

  const logoStyle = {
    flex: "0 0 auto",
    marginRight: "30px",
    cursor: "pointer",
  };

  const imgStyle = {
    height: "300px",
    width: "auto",
    display: "block",
    borderRadius: "10px",
  };

  return (
    <section style={containerStyle}>
      {/* Clean Overlay Text */}
      <div className="overlay-text">
        {/* Do you want to look like this too?<br/>
        Then join our GYM NOW..... */}
      </div>

      <div
        style={wrapperStyle}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div style={trackStyle} className="marquee-track">
          {[...Array(2)].map((_, setIndex) =>
            logos.map((logo, index) => (
              <div key={`${setIndex}-${index}`} style={logoStyle} className="logo-container">
                <img src={logo.src} alt="logo" style={imgStyle} />
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          /* Clean Text Overlay */
          .overlay-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            z-index: 10;
            text-shadow: 0 0 20px rgba(0,0,0,0.7);
            pointer-events: none;
          }

          /* Image Hover Effect */
          .marquee-track .logo-container img:hover {
            transform: scale(1.1);
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.4);
          }

          /* Responsive */
          @media (max-width: 768px) {
            .marquee-track img {
              height: 200px !important;
            }
            .overlay-text {
              font-size: 1.5rem;
              text-shadow: 0 0 10px rgba(0,0,0,0.5);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Marquee;
