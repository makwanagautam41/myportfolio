import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useHeaderColorObserver from "../hooks/useHeaderColorObserver";
import useWorkSectionObserver from "../hooks/useWorkSectionObserver";
import { projects } from "../data/data";
import "./Header.css";

const Header = ({ page, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [isWorkSection, setIsWorkSection] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth > 900 : true);
  const links = ["work", "about", "contact"];

  const navRef = useRef(null);
  const mobileNavRef = useRef(null);

  useHeaderColorObserver(setOverDark);
  useWorkSectionObserver(setIsWorkSection, page);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const moveDotToElement = (el) => {
    if (!navRef.current || !el) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const x = elRect.left - navRect.left + elRect.width / 2;
    navRef.current.style.setProperty("--nav-dot-x", `${x}px`);
    navRef.current.style.setProperty("--nav-dot-opacity", "1");
    navRef.current.style.setProperty("--nav-dot-scale", "1.15");
  };

  const moveDotToActive = () => {
    if (!navRef.current) return;
    const active = navRef.current.querySelector('.exp-nav-link.is-current');
    if (active) moveDotToElement(active);
    else navRef.current.style.setProperty("--nav-dot-opacity", "0");
  };

  const moveDotToElementMobile = (el) => {
    if (!mobileNavRef.current || !el) return;
    const container = mobileNavRef.current;
    const y = el.offsetTop + el.offsetHeight / 2;
    container.style.setProperty("--mobile-dot-y", `${y}px`);
    container.style.setProperty("--mobile-dot-opacity", "1");
    container.style.setProperty("--mobile-dot-scale", "1.15");
  };

  const moveDotToActiveMobile = () => {
    if (!mobileNavRef.current) return;
    const active = mobileNavRef.current.querySelector('.exp-mobile-menu-links .is-current');
    if (active) moveDotToElementMobile(active);
    else mobileNavRef.current.style.setProperty("--mobile-dot-opacity", "0");
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
      const t = setTimeout(() => moveDotToActiveMobile(), 80);
      const handleUpdate = () => {
        if (typeof requestAnimationFrame !== "undefined") requestAnimationFrame(moveDotToActiveMobile);
        else moveDotToActiveMobile();
      };
      const container = mobileNavRef.current;
      window.addEventListener("resize", handleUpdate);
      if (container) container.addEventListener("scroll", handleUpdate, { passive: true });

      return () => {
        document.body.style.overflow = "";
        if (window.lenis) window.lenis.start();
        clearTimeout(t);
        window.removeEventListener("resize", handleUpdate);
        if (container) container.removeEventListener("scroll", handleUpdate);
      };
    }
    if (mobileNavRef.current) mobileNavRef.current.style.setProperty("--mobile-dot-opacity", "0");
    return undefined;
  }, [open, page]);

  const navigate = (target) => {
    onNavigate(target);
    setOpen(false);
  };

  const isDark = overDark || open;
  const showNav = isDesktop && !isScrolled;
  const showToggle = !isDesktop || isScrolled;

  return (
    <header className={`exp-header ${isDark ? "over-dark" : ""} ${isWorkSection ? "in-work-section" : ""} ${isScrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      {/* LEFT — logo or section name */}
      <button className="exp-logo" onClick={() => navigate("home")} type="button">
        <AnimatePresence mode="wait">
          {!isWorkSection ? (
            <motion.span 
              key="logo-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="exp-logo-row" 
              aria-label="Code by Gautam Makwana"
            >
              <span className="exp-logo-prefix">&copy; Code by</span>
              <span className="exp-logo-name-wrap">
                <span className="exp-logo-first">Gautam</span>
                <span className="exp-logo-surname">Makwana</span>
              </span>
            </motion.span>
          ) : (
            <motion.span 
              key="work-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="exp-logo-row"
            >
              <span className="exp-logo-prefix">&copy; Explore</span>
              <span className="exp-logo-name-wrap">
                <span className="exp-logo-first">Work</span>
                <span className="exp-logo-surname">Section</span>
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* RIGHT SIDE — Nav links or Hamburger */}
      <AnimatePresence mode="wait">
        {showNav && (
          <motion.nav 
            key="desktop-nav"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            ref={navRef} 
            className="exp-nav" 
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <button
                className={`exp-nav-link ${page === link ? "is-current" : ""}`}
                key={link}
                onClick={() => navigate(link)}
                onMouseEnter={(e) => moveDotToElement(e.currentTarget)}
                onMouseLeave={() => moveDotToActive()}
                type="button"
              >
                {link}
              </button>
            ))}
            <span className="exp-nav-dot" aria-hidden="true" />
          </motion.nav>
        )}

        {showToggle && (
          <motion.button
            key="mobile-toggle"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className={`exp-menu-toggle ${open ? "is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </motion.button>
        )}
      </AnimatePresence>

      {/* MOBILE OVERLAY / DESKTOP SIDEBAR */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="exp-mobile-menu"
            initial={isDesktop ? { x: "100%", opacity: 0 } : { y: "-100%", opacity: 0 }}
            animate={isDesktop ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
            exit={isDesktop ? { x: "100%", opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            aria-label="Mobile navigation"
          >
            {isDesktop && (
              <svg className="exp-menu-curve" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  initial={{ d: "M 100 0 Q -50 50 100 100 L 100 0 Z" }}
                  animate={{ d: "M 100 0 Q 100 50 100 100 L 100 0 Z" }}
                  exit={{ d: "M 100 0 Q -50 50 100 100 L 100 0 Z" }}
                  transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                />
              </svg>
            )}

            <div ref={mobileNavRef} className="exp-mobile-menu-links">
              {["home", ...links].map((link, index) => (
                <motion.button
                  key={link}
                  className={`exp-mobile-link ${page === link ? "is-current" : ""}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                  onClick={() => navigate(link)}
                  onMouseEnter={(e) => moveDotToElementMobile(e.currentTarget)}
                  onFocus={(e) => moveDotToElementMobile(e.currentTarget)}
                  onMouseLeave={() => moveDotToActiveMobile()}
                  type="button"
                >
                  {link}
                </motion.button>
              ))}
              <span className="exp-mobile-nav-dot" aria-hidden="true" />
            </div>

            <div className="exp-mobile-menu-socials">
              <span>Socials</span>
              <div className="exp-mobile-social-links">
                <a href="https://www.instagram.com/_gautammakwana_" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://www.linkedin.com/in/gautammakwana/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://github.com/makwanagautam41" target="_blank" rel="noreferrer">GitHub</a>
                <a href="/portfolio/starter">v1</a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
