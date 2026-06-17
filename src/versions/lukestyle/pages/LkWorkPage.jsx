/**
 * LkWorkPage — Redesigned with:
 *   - Large sticky project list on the left (lukebaffait.fr style)
 *   - Fixed right-side preview panel with image + project details
 *   - GSAP-driven hover transitions between projects
 *   - Click to expand project details inline
 */
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/data";
import "./LkWorkPage.css";

gsap.registerPlugin(ScrollTrigger);

const LkWorkPage = ({ onNavigate }) => {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [expanded, setExpanded]     = useState(null);
  const [cursorPos, setCursorPos]   = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const previewRef = useRef(null);
  const imgRef     = useRef(null);
  const titleRef   = useRef(null);
  const headerRef  = useRef(null);

  // Track cursor
  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Animate preview image on active project change
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(imgRef.current,
      { opacity: 0, scale: 0.94, filter: "blur(8px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }
    );
  }, [activeIdx]);

  // Header entrance
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1,
    });
  }, []);

  const project = projects[activeIdx];

  const handleHover = useCallback((idx) => {
    setActiveIdx(idx);
    setShowCursor(true);
    // Move the preview in slightly
    if (previewRef.current) {
      gsap.to(previewRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  }, []);

  const handleLeave = useCallback(() => {
    setShowCursor(false);
  }, []);

  return (
    <div className="lk-work">
      {/* Fixed page header */}
      <div ref={headerRef} className="lk-work-header">
        <h1 className="lk-work-title">Work</h1>
      </div>

      {/* Back */}
      <button type="button" className="lk-work-back" onClick={() => onNavigate("home")}>
        BACK
      </button>

      {/* Two-column layout */}
      <div className="lk-work-body">
        {/* LEFT — sticky project list */}
        <div className="lk-work-list">
          <p className="lk-work-count">{projects.length} Projects</p>
          {projects.map((proj, idx) => (
            <div
              key={proj.title}
              className={`lk-work-row${activeIdx === idx ? " active" : ""}${expanded === idx ? " expanded-row" : ""}`}
              onMouseEnter={() => handleHover(idx)}
              onMouseLeave={handleLeave}
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setExpanded(expanded === idx ? null : idx)}
              aria-expanded={expanded === idx}
            >
              <div className="lk-work-row-top">
                <span className="lk-work-row-num">{proj.number}</span>
                <span className="lk-work-row-name">{proj.title}</span>
                <span className="lk-work-row-client">{proj.client}</span>
                <span className="lk-work-row-year">{proj.year}</span>
              </div>

              {/* Expanded detail — slides open */}
              <div className={`lk-work-row-detail${expanded === idx ? " open" : ""}`}>
                <div className="lk-work-row-detail-inner">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="lk-work-detail-img"
                    loading="lazy"
                  />
                  <div className="lk-work-detail-info">
                    <p className="lk-work-detail-desc">{proj.desc}</p>
                    <div className="lk-work-detail-tags">
                      {proj.tech.map((t) => (
                        <span key={t} className="lk-work-detail-tag">{t}</span>
                      ))}
                    </div>
                    <div className="lk-work-detail-links">
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noreferrer" className="lk-work-detail-link">
                          GitHub →
                        </a>
                      )}
                      {proj.live ? (
                        <a href={proj.live} target="_blank" rel="noreferrer" className="lk-work-detail-link">
                          Live ↗
                        </a>
                      ) : (
                        <span className="lk-work-detail-link disabled">Private</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — fixed preview */}
        <div ref={previewRef} className="lk-work-preview" aria-hidden="true">
          <div className="lk-work-preview-card">
            <div className="lk-work-preview-meta">
              <span className="lk-work-preview-label">/ {project.client}</span>
              <span className="lk-work-preview-year">{project.year}</span>
            </div>
            <div className="lk-work-preview-oval">
              <img
                ref={imgRef}
                src={project.image}
                alt={project.title}
                key={project.title}
              />
            </div>
            <p className="lk-work-preview-name">{project.title}</p>
          </div>
        </div>
      </div>

      {/* Custom cursor */}
      <div
        className={`lk-work-cursor${showCursor ? " active" : ""}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
        aria-hidden="true"
      >
        Open
      </div>
    </div>
  );
};

export default LkWorkPage;
