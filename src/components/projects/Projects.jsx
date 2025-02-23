import React, { useState } from "react";
import "./Projects.css";
import Title from "../Title";
import proFirst from "../../assets/proFirst.png";
import proSecond from "../../assets/proSecond.png";
import proThird from "../../assets/proThird.png";
import proFourth from "../../assets/proFourth.jpg";
import proFifth from "../../assets/proFifth.png";
import MajorProjects from "./MajorProjects";
import SmallProjects from "./SmallProjects";

const Projects = () => {
  const [showMajorProjects, setShowMajorProjects] = useState(true);

  const majorProjects = [
    {
      date: "January 18, 2025",
      img: proFirst,
      projectLink: "https://majorproject-dy2k.onrender.com/",
      projectName: "Airbnb Clone",
      projectDescription:
        "This is a clone of Airbnb website. It is a full stack project. It is made using Node.js, Express.js, MongoDB, and using EJS as a templating engine.",
    },
    {
      date: "Feb 10, 2025",
      img: proSecond,
      projectLink: "https://frontend-zeta-lime.vercel.app/",
      projectName: "eCommerce Website",
      projectDescription:
        "This is an eCommerce website. It is made using MERN stack with all the functionality of an eCommerce website.",
    },
  ];

  const smallProjects = [
    {
      date: "Ocy 18, 2024",
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
      projectDescription: "A simple Simon game using HTML, CSS, and JavaScript.",
    },
  ];

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
        {showMajorProjects ? (
          <MajorProjects projects={majorProjects} />
        ) : (
          <SmallProjects projects={smallProjects} />
        )}
      </div>
    </section>
  );
};

export default Projects;
