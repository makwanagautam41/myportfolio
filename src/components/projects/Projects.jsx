import React, { useState } from "react";
import "./Projects.css";
import Title from "../Title";
import { smallProjects, majorProjects } from "./projectData.js";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // <-- REQUIRED FOR AUTOPLAY TO WORK

const Projects = () => {
  const [showMajorProjects, setShowMajorProjects] = useState(true);

  const projectsToShow = showMajorProjects ? majorProjects : smallProjects;

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

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1.1 },
          480: { slidesPerView: 1.3 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="project-swiper"
      >
        {projectsToShow.map((project, index) => (
          <SwiperSlide key={index}>
            <a
              href={project.projectLink}
              className="project-card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="project-card fixed-card">
                <img src={project.img} alt={project.projectName} />
                <div className="project-content">
                  <span className="project-category">
                    {project.projectName}
                  </span>
                  <h3 className="project-title one-line-title">
                    {project.projectDescription}
                  </h3>
                  <div className="project-meta">
                    <span>{project.date}</span>
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Projects;
