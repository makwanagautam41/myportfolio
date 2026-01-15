import "./ResumeQuickViewModal.css";

const ResumeQuickViewModal = ({ pdf, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="resume_modal_overlay" onClick={onClose}>
      <div className="resume_modal" onClick={(e) => e.stopPropagation()}>
        <button className="resume_close_btn" onClick={onClose}>
          ✕
        </button>

        <iframe
          src={`${pdf}#toolbar=0&navpanes=0&scrollbar=0`}
          title="Resume Preview"
        />
      </div>
    </div>
  );
};

export default ResumeQuickViewModal;
