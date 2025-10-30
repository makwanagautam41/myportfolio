import React from "react";
import majorProFirst from "../../assets/majorProjectImg/majorProFirst.png";
import majorProSecond from "../../assets/majorProjectImg/majorProSecond.png";
import majorProThird from "../../assets/majorProjectImg/majorProThird.png";
import majorProFourth from "../../assets/majorProjectImg/majorProFourth.png";

const MajorProjects = () => {
  const majorProjects = [
    {
      date: "January 18, 2025",
      img: majorProFirst,
      projectLink: "https://majorproject-dy2k.onrender.com/",
      projectName: "Look Like Airbnb",
      projectDescription:
        "This is a clone of Airbnb website. It is a full stack project. It is made using Node.js, Express.js, MongoDB, and using EJS as a templating engine.",
    },
    {
      date: "Feb 10, 2025",
      img: majorProSecond,
      projectLink: "https://frontend-zeta-lime.vercel.app/",
      projectName: "eCommerce Website",
      projectDescription:
        "This is an eCommerce website. It is made using MERN stack with all the functionality of an eCommerce website.",
    },
    {
      date: "May 6, 2025",
      img: majorProThird,
      projectLink: "https://snaplink-gilt.vercel.app/",
      projectName: "Instagram Clone – Ultimate-Featured App",
      projectDescription:
        "A fully functional Instagram clone that replicates core features of the original platform. Users can sign up for an account to explore the app and access all functionalities, including posting, following, liking, commenting, stories, and more.",
    },
    {
      date: "Oct 24, 2025",
      img: majorProFourth,
      projectLink: "https://smtp-lite.vercel.app/",
      projectName: "SMTP service providing using gmail",
      projectDescription:
        "A lightweight email service built using the MERN stack that provides reliable email sending functionality through a single API call. Integrated with Gmail SMTP for seamless and secure communication.For more details visit the website documentations.",
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
