import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  const handleNavClick = (id) => {
    setActiveNav(id);
    setToggle(false); // Close the menu on link click
  };

  return (
    <header className="header">
      <nav className="nav container" role="navigation">
        <a href="index.html" className="nav_logo">
          Gautam
        </a>
        <div className={toggle ? "nav_menu show-menu" : "nav_menu"}>
          <ul className="nav_list grid">
            <li className="nav_item">
              <a
                href="#home"
                onClick={() => handleNavClick("#home")}
                className={
                  activeNav === "#home" ? "nav_link active-link" : "nav_link"
                }
              >
                <i className="fa-solid fa-house nav_icon"></i> Home
              </a>
            </li>
            <li className="nav_item">
              <a
                href="#about"
                onClick={() => handleNavClick("#about")}
                className={
                  activeNav === "#about" ? "nav_link active-link" : "nav_link"
                }
              >
                <i className="fa-solid fa-address-card nav_icon"></i> About
              </a>
            </li>
            <li className="nav_item">
              <a
                href="#skills"
                onClick={() => handleNavClick("#skills")}
                className={
                  activeNav === "#skills" ? "nav_link active-link" : "nav_link"
                }
              >
                <i className="fa-solid fa-computer nav_icon"></i> Skills
              </a>
            </li>
            <li className="nav_item">
              <a
                href="#projects"
                onClick={() => handleNavClick("#projects")}
                className={
                  activeNav === "#projects"
                    ? "nav_link active-link"
                    : "nav_link"
                }
              >
                <i className="fa-solid fa-diagram-project nav_icon"></i>{" "}
                Projects
              </a>
            </li>
            <li className="nav_item">
              <a
                href="#services"
                onClick={() => handleNavClick("#services")}
                className={
                  activeNav === "#services"
                    ? "nav_link active-link"
                    : "nav_link"
                }
              >
                <i className="fa-solid fa-briefcase nav_icon"></i> Services
              </a>
            </li>
            <li className="nav_item">
              <a
                href="#contact"
                onClick={() => handleNavClick("#contact")}
                className={
                  activeNav === "#contact" ? "nav_link active-link" : "nav_link"
                }
              >
                <i className="fa-regular fa-address-book nav_icon"></i> Contact
              </a>
            </li>
          </ul>

          <i
            className="fa-solid fa-xmark nav_close"
            onClick={() => setToggle(!toggle)}
            aria-label="Close menu"
          ></i>
        </div>
        <div
          className="nav_toggle"
          onClick={() => setToggle(!toggle)}
          aria-label="Open menu"
        >
          <i className="fa-solid fa-grip"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
