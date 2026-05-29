import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import React from "react";
import { pageVariants } from "../data/data";
import portraitImage from "../../../assets/portrait.png";
import Marquee from "../components/Marquee";
import WorkList from "../components/WorkList";
import Footer from "../components/Footer";

const HomePage = ({ onNavigate }) => {
  const heroText = "Building digital experiences with precision and intention";
  const portraitRef = useRef(null);

  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0 },
        {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: ".exp-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="exp-hero">
        <div className="exp-hero-parallax-wrap">
          <img
            ref={portraitRef}
            className="exp-hero-portrait"
            src={portraitImage}
            alt="Gautam Makwana portrait"
          />
        </div>

        <div className="exp-hero-name" aria-label="Gautam Makwana">
          Gautam Makwana
        </div>

        <div className="exp-hero-tagline">
          {heroText.split("").map((char, index) => (
            <span className="exp-char-wrap" key={`${char}-${index}`}>
              <span className="exp-char">{char === " " ? "\u00a0" : char}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="exp-section exp-about-teaser" id="about">
        <div className="exp-container exp-about-grid">
          <h2 className="exp-reveal exp-about-teaser-title">
            {"Mostly focused on the backend side—architecting servers, automating CI/CD pipelines, and streamlining DevOps deployments."
              .split("")
              .map((char, i) => (
                <span className="exp-char-wrap" key={`about-title-${i}`}>
                  <span className="exp-char">{char === " " ? "\u00a0" : char}</span>
                </span>
              ))}
          </h2>
          <div className="exp-reveal">
            <p>
              {"I specialize in building robust backend systems and cloud infrastructures, while keeping frontend and interactive design as a strong second half. I completed my BCA from RK University, Rajkot."
                .split("")
                .map((char, i) => (
                  <span className="exp-char-wrap" key={`about-p-${i}`}>
                    <span className="exp-char">{char === " " ? "\u00a0" : char}</span>
                  </span>
                ))}
            </p>
            <button type="button" onClick={() => onNavigate("about")}>-&gt; About me</button>
          </div>
        </div>
      </section>

      <Marquee />
      <WorkList onNavigate={onNavigate} />

      <Footer />
    </motion.div>
  );
};

export default HomePage;
