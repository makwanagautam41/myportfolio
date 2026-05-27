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
    const scroller = document.querySelector("[data-scroll-container]");

    gsap.fromTo(
      footer,
      {
        y: 100,
      },
      {
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: footer,
          scroller,
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
        rotation: -10,
      },
      {
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        immediateRender: false,
        scrollTrigger: {
          trigger: name,
          scroller,
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
