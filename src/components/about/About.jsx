import { useState } from "react";
import "./About.css";
import CV from "../../assets/gautam_makwana_CV.pdf";
import Info from "./Info";
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
      <span className="section_subtitle">My Introduction</span>

      <div className="about_container container grid">
        <img
          className="about_img"
          src="https://res.cloudinary.com/ds8hkne4w/image/upload/v1765647127/profile_wfcom2.png"
          alt="Profile"
        />

        <div className="about_data">
          <Info />

          <p className="about_description">
            Frontend developer, I create web pages with UI/UX user interface. I
            have years of experience, and many clients are happy with the
            projects carried out.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
