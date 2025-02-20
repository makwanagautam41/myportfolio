import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Social = () => {
  const socialRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      socialRef.current.children,
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="home_social" ref={socialRef}>
      <a
        href="https://www.instagram.com/_gautammakwana_"
        className="home_social-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-instagram"></i>
      </a>

      <a
        href="https://www.linkedin.com/in/gautammakwana/"
        className="home_social-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-linkedin"></i>
      </a>

      <a
        href="https://github.com/makwanagautam41"
        className="home_social-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-github"></i>
      </a>
    </div>
  );
};

export default Social;
