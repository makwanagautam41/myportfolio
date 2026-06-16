/**
 * LkNav — Bottom navigation bar
 * Passes the clicked button's DOM rect to onNavigate so the transition panel
 * can animate the label FROM that exact position to the top-left corner.
 */
import { useRef } from "react";
import "./LkNav.css";

// ─── Letter-split hover helper
const ChrHover = ({ text, onClick, href, isActive, className = "" }) => {
  const chars = text.split("").map((ch, i) => (
    <span key={i} className="lk-ch-wrap">
      <span className="lk-ch-top" style={{ "--i": i }}>{ch === " " ? "\u00A0" : ch}</span>
      <span className="lk-ch-bot" style={{ "--i": i }}>{ch === " " ? "\u00A0" : ch}</span>
    </span>
  ));

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`lk-chr lk-nav-btn${isActive ? " is-active" : ""} ${className}`}
      >
        {chars}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`lk-chr lk-nav-btn${isActive ? " is-active" : ""} ${className}`}
    >
      {chars}
    </button>
  );
};

const LkNav = ({ page, onNavigate, visible }) => {
  const navLinks = [
    { key: "work",    label: "WORK" },
    { key: "info",    label: "INFO" },
    { key: "contact", label: "CONTACT" },
  ];

  const socials = [
    { label: "BEHANCE",  href: "https://www.behance.net" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/gautammakwana/" },
    { label: "GITHUB",   href: "https://github.com/makwanagautam41" },
  ];

  // Click handler: capture the button's screen rect for the fly animation
  const handleNavClick = (e, key, label) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onNavigate(key, label, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
  };

  return (
    <>
      <div className={`lk-nav-line${visible ? " nav-visible" : ""}`} aria-hidden="true" />
      <nav
        className={`lk-nav${visible ? " nav-visible" : ""}`}
        aria-label="Main navigation"
        aria-hidden={!visible}
      >
        {/* LEFT — version badge */}
        <div className="lk-nav-left">
          <ChrHover text="→V1.0" onClick={(e) => handleNavClick(e, "home", "HOME")} />
        </div>

        {/* CENTER — social external links */}
        <div className="lk-nav-center">
          {socials.map((s, idx) => (
            <span
              key={s.label}
              style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem" }}
            >
              <ChrHover text={s.label} href={s.href} />
              {idx < socials.length - 1 && (
                <span className="lk-nav-sep">/</span>
              )}
            </span>
          ))}
        </div>

        {/* RIGHT — page navigation */}
        <div className="lk-nav-right">
          {navLinks.map((nl) => (
            <ChrHover
              key={nl.key}
              text={nl.label}
              onClick={(e) => handleNavClick(e, nl.key, nl.label)}
              isActive={page === nl.key}
            />
          ))}
        </div>
      </nav>
    </>
  );
};

export default LkNav;
