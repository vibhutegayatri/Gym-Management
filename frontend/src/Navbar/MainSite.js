import React from "react";
import Header from "./Header";
import Home from "./Home";
import Trainers from "./Trainers";
import WorkoutPlans from "./WorkoutPlans";
import About from "./About";
import Footer from "./Footer";
import Marquee from "./Marquee";

function MainSite() {
  return (
    <>
      <Header />
      <section id="home" style={{ padding: "80px 0" }}>
        <Home />
      </section>
      <section style={{ padding: "60px 0" }}>
        <Marquee />
      </section>
      <section id="workouts" style={{ padding: "0px 0" }}>
        <WorkoutPlans />
      </section>
      <section id="trainers" style={{ padding: "40px 0" }}>
        <Trainers />
      </section>
      
      <section id="about" style={{ padding: "60px 0" }}>
        <About />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </>
  );
}

export default MainSite;
