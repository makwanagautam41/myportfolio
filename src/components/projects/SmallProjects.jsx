import React from "react";
import proThird from "../../assets/proThird.png";
import proFourth from "../../assets/proFourth.jpg";
import proFifth from "../../assets/proFifth.png";

const SmallProjects = () => {
  const smallProjects = [
    {
      date: "Oct 18, 2024",
      img: proThird,
      projectLink: "https://makwanagautam41.github.io/tic-tac-toe/",
      projectName: "Simple Tic Tac Toe Game",
      projectDescription:
        "A simple portfolio website using React and TailwindCSS.",
    },
    {
      date: "Oct 06, 2024",
      img: proFourth,
      projectLink: "https://makwanagautam41.github.io/spotify/",
      projectName: "Spotify Clone",
      projectDescription: "A simple Spotify clone using only HTML and CSS.",
    },
    {
      date: "Sep 27, 2024",
      img: proFifth,
      projectLink: "https://makwanagautam41.github.io/simon/",
      projectName: "Simon Game",
      projectDescription:
        "A simple Simon game using HTML, CSS, and JavaScript.",
    },
  ];

  return (
    <div className="project-grid">
      {smallProjects.map((project, index) => (
        <a
          key={index}
          href={project.projectLink}
          className="project-card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="project-card">
            <img src={project.img} alt={project.projectName} />
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
