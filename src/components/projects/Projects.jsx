import "./Projects.css";
import Title from "../Title";
import { majorProjects } from "./projectData.js";
import FlowingMenu from "./FlowingMenu";

const Projects = () => {
  const projectItems = majorProjects.map((project) => ({
    link: project.projectLink,
    text: project.projectName,
    image: project.img,
  }));

  return (
    <section className="project section" id="projects">
      <h2 className="section_title">
        <Title text2="Projects" />
      </h2>

      <div className="project_flowing-menu">
        <FlowingMenu
          items={projectItems}
          speed={18}
          textColor="#ffffff"
          bgColor="#141414"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#141414"
          borderColor="rgba(255, 255, 255, 0.28)"
        />
      </div>
    </section>
  );
};

export default Projects;
