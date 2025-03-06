import React from "react";
import smProFirst from "../../assets/smallProjectImg/smProFirst.png";
import smProSecond from "../../assets/smallProjectImg/smProSecond.jpg";
import smProThird from "../../assets/smallProjectImg/smProThird.png";
import smProFourth from "../../assets/smallProjectImg/smProFourth.png";

const SmallProjects = () => {
  const smallProjects = [
    {
      date: "Oct 18, 2024",
      img: smProFirst,
      projectLink: "https://makwanagautam41.github.io/tic-tac-toe/",
      projectName: "Simple Tic Tac Toe Game",
      projectDescription:
        "A simple portfolio website using React and TailwindCSS.",
    },
    {
      date: "Oct 06, 2024",
      img: smProSecond,
      projectLink: "https://makwanagautam41.github.io/spotify/",
      projectName: "Spotify Clone",
      projectDescription: "A simple Spotify clone using only HTML and CSS.",
    },
    {
      date: "Sep 27, 2024",
      img: smProThird,
      projectLink: "https://makwanagautam41.github.io/simon/",
      projectName: "Simon Game",
      projectDescription:
        "A simple Simon game using HTML, CSS, and JavaScript.",
    },
    {
      date: "Mar 02, 2025",
      img: smProFourth,
      projectLink: "https://mgclipboard.vercel.app",
      projectName: "Full Functional Online Clipboard",
      projectDescription:
        "A simple online clipboard that allows you to send text and image for some time over the intenet.",
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
