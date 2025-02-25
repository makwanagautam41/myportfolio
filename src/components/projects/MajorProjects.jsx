import React from "react";
import proFirst from "../../assets/proFirst.png";
import proSecond from "../../assets/proSecond.png";

const MajorProjects = () => {
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

  return (
    <div className="project-grid">
      {majorProjects.map((project, index) => (
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

export default MajorProjects;
