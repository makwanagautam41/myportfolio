import React from "react";

const Backend = () => {
  const skills = [
    { name: "PHP", level: "Intermediate" },
    { name: "Node Js", level: "Basic" },
    { name: "Express", level: "Intermediate" },
    { name: "MySQL", level: "Intermediate" },
    { name: "MongoDB", level: "Intermediate" },
    { name: "SQL", level: "Intermediate" },
  ];

  return (
    <div className="skills_content">
      <h3 className="skills_title">Backend Developer</h3>
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

export default Backend;
