import { useNavigate } from "react-router-dom";
import "./About.css";
import CV from "../../../../assets/pdfs/gautam-makwana-resume.pdf";
import Title from "../Title";
import AnimatedButton from "../AnimatedButton";

const About = () => {
  const navigate = useNavigate();

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
          <span className="about_kicker">Backend Engineer & DevOps</span>
          <h3 className="about_heading">
            I build reliable backend systems and deployment workflows with a
            strong focus on performance, automation, and production readiness.
          </h3>

          <p className="about_description">
            I enjoy designing APIs, building scalable server-side logic, and
            setting up clean deployment pipelines that keep applications
            stable in production. My work centers on secure services,
            automation, monitoring, and maintainable code that supports
            long-term growth.
          </p>
          <div className="about_actions">
            <AnimatedButton text="Download CV" href={CV} download />
            <button
              className="button--ghost"
              onClick={() => navigate("/resume")}
            >
              Quick View CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
