import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const title = "Let's work\ntogether";
  const footerRef = useRef(null);
  const location = useLocation(); // re-fires on every route change

  useEffect(() => {
    let ctx;

    const runAnimation = async () => {
      const gsap = (await import("gsap")).default;

      if (!footerRef.current) return;

      const chars = footerRef.current.querySelectorAll(".exp-char");

      // Reset first so re-entry always starts clean
      gsap.set(chars, { y: "110%", opacity: 0 });

      ctx = gsap.context(() => {
        gsap.to(chars, {
          y: "0%",
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.028,
          delay: 0.1,
        });
      }, footerRef);
    };

    runAnimation();

    return () => ctx?.revert();
  }, [location.pathname]); // re-run on every page navigation

  return (
    <footer className="exp-footer" id="contact" ref={footerRef}>
      <div className="exp-footer-inner">

        {/* ── Top: large CTA heading ── */}
        <div className="exp-footer-top">
          <button className="exp-footer-title" type="button">
            {title.split("").map((char, index) =>
              char === "\n" ? (
                <br key={`br-${index}`} />
              ) : (
                <span className="exp-char-wrap" key={`${char}-${index}`}>
                  <span className="exp-char">
                    {char === " " ? "\u00a0" : char}
                  </span>
                </span>
              )
            )}
          </button>

          {/* Mail CTA */}
          <a
            className="exp-footer-mail"
            href="mailto:gautammakwana.dev@gmail.com"
            aria-label="Send email to Gautam"
          >
            gautammakwana.dev@gmail.com
            <span className="exp-footer-mail-arrow">↗</span>
          </a>
        </div>

        {/* ── Middle: availability badge + social nav ── */}
        <div className="exp-footer-mid">
          <div className="exp-footer-status">
            <span className="exp-footer-dot" />
            Available for work
          </div>

          <nav className="exp-footer-nav" aria-label="Social links">
            <a href="https://www.instagram.com/_gautammakwana_" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/gautammakwana/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/makwanagautam41" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="/portfolio/starter">v1</a>
          </nav>
        </div>

        {/* ── Bottom: copyright bar ── */}
        <div className="exp-footer-bottom">
          <span>© Code by Gautam</span>
          <span>Backend Developer &amp; DevOps Engineer</span>
          <span>{new Date().getFullYear()}</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;