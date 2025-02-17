import React from "react";

const Frontend = () => {
  const skills = [
    { name: "HTML", level: "Basic" },
    { name: "CSS", level: "Advanced" },
    { name: "JavaScript", level: "Intermediate" },
    { name: "Bootstrap", level: "Intermediate" },
    { name: "Git", level: "Intermediate" },
    { name: "React", level: "Intermediate" },
  ];

  return (
    <div className="skills_content">
      <h3 className="skills_title">Frontend Developer</h3>
      <div className="skills_box">
        {skills.map((skill, index) => (
          <div className="skills_data" key={index}>
            <i className="fa-solid fa-circle-check"></i>
            <div>
              <h3 className="skills_name">{skill.name}</h3>
              <span className="skills_level">{skill.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frontend;
