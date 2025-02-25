import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import AnimatedButton from "../AnimatedButton";

const words = ["Designer", "Developer", "Creator", "Freelancer"];

const Data = () => {
  const containerRef = useRef(null);
  const wordRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    const elements = containerRef.current.children;

    // Fade-in animation for entire text container
    tl.set(elements, { opacity: 0, y: 30, scale: 0.95 }).to(elements, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Word changing animation
    const interval = setInterval(() => {
      gsap.to(wordRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
          gsap.fromTo(
            wordRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.in" }
          );
        },
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home_data" ref={containerRef}>
      <h1 className="home_title">
        Gautam Makwana <span className="home_hand">🖐️</span>
      </h1>
      <h3 className="home_subtitle">
        Visual <span ref={wordRef}>{words[index]}</span>
      </h3>
      <p className="home_description">
        I'm a creative Designer based in India, and I'm very passionate and
        dedicated to my work.
      </p>
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
