import React from "react";

const SmallProjects = ({ projects }) => {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <a
          key={index}
          href={project.projectLink}
          className="project-card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="project-card">
            <img src={project.img} alt="Project" />
            <div className="project-content">
              <span className="project-category">{project.projectName}</span>
              <h3 className="project-title">{project.projectDescription}</h3>
              <div className="project-meta">
                <span>{project.date}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SmallProjects;
