import { motion } from "framer-motion";
import { pageVariants } from "../data/data";
import portraitImage from "../../../assets/portrait.png";
import Marquee from "../components/Marquee";
import Footer from "../components/Footer";
import TextPressure from "../components/TextPressure";

const AboutPage = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    <section className="exp-page-hero">
      {/* <div className="exp-container">
        <h1>About</h1>
      </div> */}
    </section>

    <section className="exp-section" style={{ paddingTop: "0" }}>
      <div className="exp-container exp-profile-grid">
        <div className="exp-profile-left">
          <div className="exp-profile-image exp-reveal">
            <img src={portraitImage} alt="portrait" />
          </div>

          <div className="exp-profile-meta">
            <div className="exp-meta-row">
              <span className="exp-meta-label">Based in</span>
              <span className="exp-meta-value">Gujarat, India</span>
            </div>

            <div className="exp-meta-row">
              <span className="exp-meta-label">Status</span>
              <span className="exp-meta-value">Looking for an apprenticeship</span>
            </div>
          </div>
        </div>

        <div className="exp-profile-copy exp-reveal">
          <div className="exp-about-name exp-reveal">
            <TextPressure
              text="Gautam."
              minFontSize={28}
              maxFontSize={220}
              containerHeight="clamp(120px, 18vw, 260px)"
              textColor="#0a0a0a"
              width={true}
              flex={true}
              italic={true}
              weight={true}
            />
          </div>

          <hr className="exp-about-divider" />

          <div className="exp-profile-copy-body">
            <p className="exp-about-blurb exp-reveal">
              Backend-focused developer and systems engineer, experienced in building scalable
              server architectures, resilient APIs, and reliable data platforms. I prioritise
              performance, security and observability while collaborating closely with frontend
              teams to deliver cohesive products.
            </p>

            <p className="exp-about-blurb exp-reveal">
              I craft end-to-end solutions where robust backend systems meet thoughtful frontend
              interfaces — focusing on clear API design, data modelling, CI/CD and automated
              deployments. I also care about UX: subtle interactions, performance and polish
              that make the experience feel complete.
            </p>
          </div>

          <div className="exp-skill-columns">
            <div className="exp-skill-col">
              <h4>Frontend</h4>
              <ul>
                <li>HTML / CSS</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>React · Next.js</li>
                <li>Tailwind</li>
              </ul>
            </div>

            <div className="exp-skill-col">
              <h4>Backend</h4>
              <ul>
                <li>Node.js · Express</li>
                <li>NestJS · TypeScript</li>
                <li>Python · FastAPI</li>
                <li>Java · Spring</li>
              </ul>
            </div>

            <div className="exp-skill-col">
              <h4>APIs & Architecture</h4>
              <ul>
                <li>REST · GraphQL</li>
                <li>gRPC · WebSockets</li>
                <li>Microservices · Serverless</li>
                <li>Event-driven Systems</li>
              </ul>
            </div>

            <div className="exp-skill-col">
              <h4>Databases · DevOps</h4>
              <ul>
                <li>PostgreSQL</li>
                <li>SQL</li>
                <li>Redis · Caching</li>
                <li>MongoDB</li>
                <li>AWS</li>
                <li>Docker</li>
                <li>CI/CD</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Marquee />
    <Footer />
  </motion.div>
);

export default AboutPage;
