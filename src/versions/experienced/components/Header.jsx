import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useHeaderColorObserver from "../hooks/useHeaderColorObserver";

const Header = ({ page, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const links = ["work", "about", "contact"];

  const navRef = useRef(null);
  const mobileNavRef = useRef(null);

  useHeaderColorObserver(setOverDark);

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
    // use offsetTop (layout offset) instead of getBoundingClientRect to avoid
    // transient positioning errors when the menu is scrolled or transformed
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
    // when mobile menu opens, position dot to the current active item
    if (open) {
      const t = setTimeout(() => moveDotToActiveMobile(), 80);

      // keep dot synced while menu is open (handle scroll/resize)
      const handleUpdate = () => {
        if (typeof requestAnimationFrame !== "undefined") requestAnimationFrame(moveDotToActiveMobile);
        else moveDotToActiveMobile();
      };

      const container = mobileNavRef.current;
      window.addEventListener("resize", handleUpdate);
      if (container) container.addEventListener("scroll", handleUpdate, { passive: true });

      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", handleUpdate);
        if (container) container.removeEventListener("scroll", handleUpdate);
      };
    }
    // hide when closing
    if (mobileNavRef.current) mobileNavRef.current.style.setProperty("--mobile-dot-opacity", "0");
    return undefined;
  }, [open, page]);

  const navigate = (target) => {
    onNavigate(target);
    setOpen(false);
  };

  const isDark = overDark || open;

  return (
    <header className={`exp-header ${isDark ? "over-dark" : ""}`}>
      {/* LEFT — logo */}
      <button className="exp-logo" onClick={() => navigate("home")} type="button">
        <span className="exp-logo-row" aria-label="Code by Gautam Makwana">
          <span className="exp-logo-prefix">&copy; Code by</span>
          <span className="exp-logo-name-wrap">
            <span className="exp-logo-first">Gautam</span>
            <span className="exp-logo-surname">Makwana</span>
          </span>
          </span>
      </button>

      {/* RIGHT DESKTOP — nav links */}
      <nav ref={navRef} className="exp-nav" aria-label="Main navigation">
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
      </nav>

      {/* RIGHT MOBILE — hamburger */}
      <button
        className={`exp-menu-toggle ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span />
        <span />
      </button>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="exp-mobile-menu"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            aria-label="Mobile navigation"
          >
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
