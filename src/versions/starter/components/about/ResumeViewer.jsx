import { useNavigate } from "react-router-dom";
import "./ResumeViewer.css";
import CV from "../../../../assets/pdfs/gautam-makwana-resume.pdf";

const ResumeViewer = () => {
  const navigate = useNavigate();

  return (
    <section className="resume_viewer" aria-label="Resume preview">
      <div className="resume_viewer_topbar">
        <button className="resume_viewer_back" onClick={() => navigate("/")}>
          Back
        </button>
      </div>

      <iframe
        className="resume_viewer_frame"
        src={`${CV}#toolbar=1&navpanes=0&scrollbar=1`}
        title="Resume Preview"
      />
    </section>
  );
};

export default ResumeViewer;