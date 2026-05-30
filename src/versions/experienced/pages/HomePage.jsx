import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import React from "react";
import { pageVariants } from "../data/data";
import portraitImage from "../../../assets/portrait.png";
import Marquee from "../components/Marquee";
import WorkList from "../components/WorkList";
import Footer from "../components/Footer";
import VariableProximity from "../components/VariableProximity";
import "./HomePage.css";

const HomePage = ({ onNavigate }) => {
  const aboutTitle =
    "Mostly focused on the backend side—architecting servers, automating CI/CD pipelines, and streamlining DevOps deployments.";
  const aboutBodyText =
    "I specialize in building robust backend systems and cloud infrastructures, while keeping frontend and interactive design as a strong second half. I completed my BCA from RK University, Rajkot.";
  const portraitRef = useRef(null);
  const heroTaglineContainerRef = useRef(null);
  const aboutTitleContainerRef = useRef(null);
  const aboutBodyContainerRef = useRef(null);

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
      </section>

      <section className="exp-section exp-about-teaser" id="about">
        <div className="exp-container exp-about-grid">
          <h2
            ref={aboutTitleContainerRef}
            className="exp-reveal exp-about-teaser-title"
            style={{ position: "relative" }}
          >
            <VariableProximity
              label={aboutTitle}
              className="exp-about-title-variable"
              fromFontVariationSettings="'wght' 420, 'opsz' 12"
              toFontVariationSettings="'wght' 980, 'opsz' 36"
              containerRef={aboutTitleContainerRef}
              radius={120}
              falloff="gaussian"
            />
          </h2>
          <div ref={aboutBodyContainerRef} className="exp-reveal" style={{ position: "relative" }}>
            <p>
              <VariableProximity
                label={aboutBodyText}
                className="exp-about-body-variable"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 760, 'opsz' 22"
                containerRef={aboutBodyContainerRef}
                radius={95}
                falloff="exponential"
              />
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
