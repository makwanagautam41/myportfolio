import React from "react";
import "./About.css";
import AboutImg from "../../assets/profile.jpg";
import CV from "../../assets/gautamsCV.pdf";
import Info from "./Info";
import Title from "../Title";
import AnimatedButton from "../AnimatedButton";

const About = () => {
  return (
    <section className="about section" id="about">
      <h2 className="section_title">
        <Title text2={"About Me"} />
      </h2>
      <span className="section_subtitle">My Introduction</span>
      <div className="about_container container grid">
        <img className="about_img" src={AboutImg} alt="Profile" />
        <div className="about_data">
          <Info />
          <p className="about_description">
            Frontend developer, I create web pages with UI/UX user interface. I
            have years of experience, and many clients are happy with the
            projects carried out.
          </p>

          {/* Use AnimatedButton */}
          <AnimatedButton text="Download CV" href={CV} download />
        </div>
      </div>
    </section>
  );
};

export default About;
