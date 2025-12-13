import "./ProjectModal.css";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <img src={project.img} alt={project.projectName} loading="eager" />

        <h2>{project.projectName}</h2>
        <p className="modal-date">{project.date}</p>
        <p className="modal-description">{project.projectDescription}</p>

        <a
          href={project.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="modal-link"
        >
          Visit Project
        </a>
      </div>
    </div>
  );
};

export default ProjectModal;
