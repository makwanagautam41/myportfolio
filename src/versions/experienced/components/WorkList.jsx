import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import { projects } from "../data/data";

const WorkList = ({ onNavigate }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <section className="exp-section exp-work" id="work">
      <div className="exp-container">
        <div className="exp-section-head exp-reveal">
          <h2>Work</h2>
          <button
            className="exp-all-work-desktop"
            type="button"
            onClick={() => onNavigate("work")}
          >
            All work
          </button>
        </div>

        <div className="exp-work-list">
          {projects.map((project) => (
            <button
              className="exp-project-row"
              key={project.title}
              type="button"
              onMouseEnter={() => setActiveProject(project)}
              onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
              onMouseLeave={() => setActiveProject(null)}
            >
              <img className="exp-project-mobile-image" src={project.image} alt="" />
              <span>{project.number}</span>
              <strong>{project.title}</strong>
              <span>{project.client} / {project.year}</span>
            </button>
          ))}
        </div>

        <div className="exp-all-work-mobile">
          <AnimatedButton text="All work →" href="#" onClick={() => onNavigate("work")} />
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="exp-project-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: Math.min(position.x + 32, window.innerWidth - 460),
              y: Math.min(position.y - 120, window.innerHeight - 320),
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22 }}
          >
            <img src={activeProject.image} alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkList;
