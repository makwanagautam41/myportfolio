import { useState } from "react";
import "./About.css";
import CV from "../../assets/gautam_makwana_CV.pdf";
import Title from "../Title";
import AnimatedButton from "../AnimatedButton";
import ResumeQuickViewModal from "./ResumeQuickViewModal";

const About = () => {
  const [openResume, setOpenResume] = useState(false);

  return (
    <section className="about section" id="about">
      <h2 className="section_title">
        <Title text2={"About Me"} />
      </h2>
      <div className="about_container container grid">
        <div className="about_visual" aria-hidden="true">
          <div className="about_portrait"></div>
          <div className="about_badge">
            <span>Available</span>
            <strong>for work</strong>
          </div>
        </div>

        <div className="about_data">
          <span className="about_kicker">Frontend Developer</span>
          <h3 className="about_heading">
            I build clean, responsive web experiences with a strong focus on
            React and practical product details.
          </h3>

          <p className="about_description">
            I enjoy turning ideas into usable interfaces, from polished landing
            pages to full stack MERN applications. My work focuses on clear
            layouts, smooth interactions, maintainable code, and experiences
            that feel simple for people to use.
          </p>
          <div className="about_actions">
            <AnimatedButton text="Download CV" href={CV} download />
            <button
              className="button--ghost"
              onClick={() => setOpenResume(true)}
            >
              Quick View CV
            </button>
          </div>
        </div>
      </div>

      <ResumeQuickViewModal
        pdf={CV}
        isOpen={openResume}
        onClose={() => setOpenResume(false)}
      />
    </section>
  );
};

export default About;
