import React, { useState } from "react";
import "./Projects.css";
import Title from "../Title";
import MajorProjects from "./MajorProjects";
import SmallProjects from "./SmallProjects";

const Projects = () => {
  const [showMajorProjects, setShowMajorProjects] = useState(true);

  return (
    <section className="project section" id="projects">
      <h2 className="section_title">
        <Title text2="Projects" />
      </h2>
      <span className="section_subtitle">My Projects</span>

      <div className="toggle-container">
        <button
          className={`toggle-button ${showMajorProjects ? "active" : ""}`}
          onClick={() => setShowMajorProjects(true)}
        >
          Major Projects
        </button>
        <button
          className={`toggle-button ${!showMajorProjects ? "active" : ""}`}
          onClick={() => setShowMajorProjects(false)}
        >
          Small Projects
        </button>
      </div>

      <div className="container grid">
        {showMajorProjects ? <MajorProjects /> : <SmallProjects />}
      </div>
    </section>
  );
};

export default Projects;
