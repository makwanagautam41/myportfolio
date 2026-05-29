import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useHeaderColorObserver from "../hooks/useHeaderColorObserver";

const Header = ({ page, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const links = ["work", "about", "contact"];

  useHeaderColorObserver(setOverDark);

  const navigate = (target) => {
    onNavigate(target);
    setOpen(false);
  };

  const isDark = overDark || open;

  return (
    <header className={`exp-header ${isDark ? "over-dark" : ""}`}>
      {/* LEFT — logo */}
      <button className="exp-logo" onClick={() => navigate("home")} type="button">
        <span>&copy; Code by Gautam</span>
      </button>

      {/* RIGHT DESKTOP — nav links */}
      <nav className="exp-nav" aria-label="Main navigation">
        {links.map((link) => (
          <button
            className={`exp-nav-link ${page === link ? "is-current" : ""}`}
            key={link}
            onClick={() => navigate(link)}
            type="button"
          >
            {link}
          </button>
        ))}
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
            <div className="exp-mobile-menu-links">
              {["home", ...links].map((link, index) => (
                <motion.button
                  key={link}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                  onClick={() => navigate(link)}
                  type="button"
                >
                  {link}
                </motion.button>
              ))}
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
