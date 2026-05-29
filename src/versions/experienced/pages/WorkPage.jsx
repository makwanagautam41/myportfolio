import { motion } from "framer-motion";
import { pageVariants, projects } from "../data/data";
import Footer from "../components/Footer";

const WorkPage = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    <section className="exp-page-hero">
      <div className="exp-container">
        <h1>Work</h1>
      </div>
    </section>

    <section className="exp-section" style={{ paddingTop: "48px" }}>
      <div className="exp-container exp-work-grid">
        {projects.map((project) => (
          <article className="exp-work-card exp-reveal" key={project.title}>
            <img src={project.image} alt={project.title} />
            <div>
              <span>{project.year}</span>
              <h2>{project.title}</h2>
            </div>
          </article>
        ))}
      </div>
    </section>
    <Footer />
  </motion.div>
);

export default WorkPage;
