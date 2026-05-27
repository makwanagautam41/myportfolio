import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Header.css";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  const handleNavClick = (id) => {
    setActiveNav(id);
    setToggle(false);
  };

  useEffect(() => {
    const scroller = document.querySelector("[data-scroll-container]");
    const sectionIds = ["#home", "#about", "#projects", "#contact"];
    const triggers = [];

    if (!scroller) {
      return undefined;
    }

    sectionIds.forEach((id) => {
      const section = document.querySelector(id);

      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        scroller,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setActiveNav(id),
        onEnterBack: () => setActiveNav(id),
        onToggle: (self) => {
          if (self.isActive) {
            setActiveNav(id);
          }
        },
      });

      triggers.push(trigger);
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav container" role="navigation">
        <a href="/" className="nav_logo">
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
