import { motion } from "framer-motion";
import { pageVariants } from "../data/data";
import portraitImage from "../../../assets/portrait.png";
import Marquee from "../components/Marquee";
import Footer from "../components/Footer";

const AboutPage = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    <section className="exp-page-hero">
      <div className="exp-container">
        <h1>About</h1>
      </div>
    </section>

    <section className="exp-section" style={{ paddingTop: "48px" }}>
      <div className="exp-container exp-profile-grid">
        <div className="exp-profile-image exp-reveal">
          <img src={portraitImage} alt="portrait" />

          <div className="exp-profile-meta">
            <div className="exp-meta-row">
              <span className="exp-meta-label">Based in</span>
              <span className="exp-meta-value">Vannes, France</span>
            </div>

            <div className="exp-meta-row">
              <span className="exp-meta-label">Status</span>
              <span className="exp-meta-value">Looking for an apprenticeship</span>
            </div>
          </div>
        </div>

        <div className="exp-profile-copy exp-reveal">
          <h2 className="exp-about-name">Gautam.</h2>

          <p className="exp-about-blurb">
            Creative developer & computer science student, specialized in web development.
          </p>

          <p className="exp-about-blurb">
            I craft tailor-made web experiences where technical precision meets emotion.
            Passionate about animation, interaction and <em>detail</em>, I always seek the
            symbiosis between art and information.
          </p>

          <hr className="exp-about-divider" />

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
                <li>Python</li>
                <li>MySQL · PostgreSQL</li>
                <li>MongoDB · Supabase</li>
              </ul>
            </div>

            <div className="exp-skill-col">
              <h4>APIs & Architecture</h4>
              <ul>
                <li>REST · GraphQL</li>
                <li>WebSockets</li>
                <li>Redis · Caching</li>
                <li>JWT · OAuth 2.0</li>
              </ul>
            </div>

            <div className="exp-skill-col">
              <h4>Security & Tools</h4>
              <ul>
                <li>Linux · Bash</li>
                <li>Docker · Git</li>
                <li>OWASP · Nmap</li>
                <li>Metasploit</li>
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
