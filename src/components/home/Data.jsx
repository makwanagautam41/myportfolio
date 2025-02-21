import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedButton from "../AnimatedButton";

const Data = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const elements = containerRef.current.children;

    tl.set(elements, { opacity: 0, y: 30, scale: 0.95 }).to(elements, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="home_data" ref={containerRef}>
      <h1 className="home_title">
        Gautam Makwana <span className="home_hand">🖐️</span>
      </h1>
      <h3 className="home_subtitle">Visual Designer</h3>
      <p className="home_description">
        I'm a creative Designer based in India, and I'm very passionate and
        dedicated to my work.
      </p>

      {/* Use AnimatedButton with Font Awesome icon */}
      <AnimatedButton
        text={
          <>
            Say Hello <i className="fa-solid fa-paper-plane"></i>
          </>
        }
        href="#contact"
      />
    </div>
  );
};

export default Data;
