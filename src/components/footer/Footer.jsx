import React, { useEffect, useRef } from "react";
import "./Footer.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const name = nameRef.current;

    gsap.fromTo(
      footer,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      name,
      {
        scale: 0.5,
        opacity: 0,
        rotation: -10,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: name,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      }
    );

    gsap.to(name, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <h1 className="footer-name" ref={nameRef}>
        Gautam
      </h1>
    </footer>
  );
};

export default Footer;
