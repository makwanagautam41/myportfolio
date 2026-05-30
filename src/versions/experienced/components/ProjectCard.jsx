/**
 * ProjectCard — Reusable full-bleed card for the ScrollStack
 *
 * Used by both HomePage (limited set) and WorkPage (all projects).
 * Accepts a `project` object and an optional `onNavigate` callback
 * for the "All works →" button (homepage only; omit on work page).
 *
 * Project shape
 * ─────────────
 *   number  : "01"
 *   title   : "Project Name"
 *   client  : "Category"
 *   year    : "2025"
 *   image   : url | import
 *   desc    : "Short description"          (optional)
 *   tech    : ["React", "Node.js", …]      (optional)
 *   github  : "https://…"                  (optional)
 *   live    : "https://…"                  (optional)
 *
 * To add a new project: update data/data.js only.
 * This component needs no changes.
 */

import "./ProjectCard.css";

/* ── Inline SVG icons (no extra dep) ───────────────────────────────────── */
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ── ProjectCard ─────────────────────────────────────────────────────────── */
const ProjectCard = ({
  project,
  index,          // 1-based display index
  total,          // total cards in this stack (for the counter)
  label = "Projects", // section label shown top-left of card
  onNavigate,     // optional — shows "All works" button when provided
}) => (
  <div className="ss-card">
    {/* Background image */}
    <img
      className="ss-card-bg"
      src={project.image}
      alt={project.title}
      loading="lazy"
    />

    {/* Gradient overlay */}
    <div className="ss-card-overlay" />

    {/* Top strip: section label + counter */}
    <div className="ss-section-head">
      <h2>{label}</h2>
      <span className="ss-counter">
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>

    {/* Bottom content */}
    <div className="ss-card-content">
      <div className="ss-card-meta">
        <span>{project.client}</span>
        <span>{project.year}</span>
      </div>

      <h3 className="ss-card-title">{project.title}</h3>

      {project.desc && (
        <p className="ss-card-desc">{project.desc}</p>
      )}

      {project.tech && project.tech.length > 0 && (
        <div className="ss-card-tags">
          {project.tech.map((tag) => (
            <span className="ss-card-tag" key={tag}>{tag}</span>
          ))}
        </div>
      )}

      <div className="ss-card-actions">
        {project.github && (
          <a
            className="ss-card-btn ss-card-btn--ghost"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository`}
          >
            <GithubIcon /> GitHub
          </a>
        )}
        {project.live && (
          <a
            className="ss-card-btn ss-card-btn--primary"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
          >
            <ExternalIcon /> Live demo
          </a>
        )}
        {onNavigate && (
          <button
            type="button"
            className="ss-card-btn ss-card-btn--ghost"
            onClick={() => onNavigate("work")}
          >
            All works →
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ProjectCard;
