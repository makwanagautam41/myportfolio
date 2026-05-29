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
          <img src={portraitImage} alt="Gautam Makwana portrait" />
        </div>
        <div className="exp-profile-copy exp-reveal">
          <p>
            I am a backend developer and DevOps engineer dedicated to building high-performance
            server architectures, robust APIs, and streamlined CI/CD pipelines.
          </p>
          <p>
            While my core expertise is rooted in server-side development, database management,
            and cloud deployments, I approach frontend development and design as a vital second
            half to build cohesive, end-to-end digital solutions.
          </p>
          <p>
            I completed my Bachelor of Computer Applications (BCA) from RK University, Rajkot,
            which grounded my foundations in software engineering and computational logic.
          </p>
        </div>
      </div>
    </section>

    <Marquee />
    <Footer />
  </motion.div>
);

export default AboutPage;
