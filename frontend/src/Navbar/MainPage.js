import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Index"; // ✅ navbar connected

function MainPage() {
  const images = [
    process.env.PUBLIC_URL + "/gym/10.jpg",
    process.env.PUBLIC_URL + "/gym/4.jpg",
    process.env.PUBLIC_URL + "/gym/13.jpg",
    process.env.PUBLIC_URL + "/gym/22.jpg",
    process.env.PUBLIC_URL + "/gym/15.jpg",
    process.env.PUBLIC_URL + "/gym/14.jpg",
    process.env.PUBLIC_URL + "/gym/16.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Navbar />

      <style>
        {`
          .main-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f7f7f7;
            padding: 20px;
            margin-top: 80px; /* ✅ avoid overlap with navbar */
          }

          .image-section {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .image-section img {
            width: 500px;
            height: 600px;
            border-radius: 15px;
            object-fit: cover;
            transition: opacity 1s ease-in-out;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }

          .text-section {
            flex: 1;
            text-align: center;
            font-size: 28px;
            font-weight: 600;
            line-height: 1.6;
            color: #222;
          }

          .text-section span {
            color: #007bff;
          }

          @media (max-width: 768px) {
            .main-container {
              flex-direction: column;
              text-align: center;
            }

            .image-section img {
              width: 300px;
              height: 300px;
              margin-bottom: 20px;
            }
          }
        `}
      </style>

      <div className="main-container">
        <div className="image-section">
          <img src={images[currentImage]} alt="Gym" key={currentImage} />
        </div>

        <div className="text-section">
          Do you want to look like this too?
          <br />
          Then join our <span>GYM NOW.....</span>
        </div>
      </div>
    </>
  );
}

export default MainPage;
