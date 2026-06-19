import { forwardRef } from "react";
import "./LkHoverText.css";

const LkHoverText = forwardRef(({ text, onClick, href, isActive, className = "" }, ref) => {
  const chars = text.split("").map((ch, i) => (
    <span key={i} className="lk-ch-wrap">
      <span className="lk-ch-top" style={{ "--i": i }}>{ch === " " ? "\u00A0" : ch}</span>
      <span className="lk-ch-bot" style={{ "--i": i }}>{ch === " " ? "\u00A0" : ch}</span>
    </span>
  ));

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`lk-chr${isActive ? " is-active" : ""} ${className}`}
      >
        {chars}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`lk-chr${isActive ? " is-active" : ""} ${className}`}
    >
      {chars}
    </button>
  );
});

LkHoverText.displayName = "LkHoverText";

export default LkHoverText;
