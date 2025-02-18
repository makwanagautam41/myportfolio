import React from "react";
import "./Projects.css";
import Title from "../Title";

const Projects = () => {
  return (
    <section className="project section" id="projects">
      <h2 className="section_title">
        <Title text2={"Projects"} />
      </h2>
      <span className="section_subtitle">My Projects</span>
    </section>
  );
};

export default Projects;
