import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { pageVariants, projects, HOME_PROJECT_LIMIT } from "../data/data";
import portraitImage from "../../../assets/images/portrait-alt.png";
import Marquee from "../components/Marquee";
import Footer from "../components/Footer";
import VariableProximity from "../components/VariableProximity";
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";
import TextPressure from "../components/TextPressure";

/* ─── HomePage ────────────────────────────────────────────────────────────── */
const HomePage = ({ onNavigate }) => {
  const aboutTitle =
    "Mostly focused on the backend side—architecting servers, automating CI/CD pipelines, and streamlining DevOps deployments.";
  const aboutBodyText =
    "I specialize in building robust backend systems and cloud infrastructures, while keeping frontend and interactive design as a strong second half. I completed my BCA from RK University, Rajkot.";

  const portraitRef            = useRef(null);
  const aboutTitleContainerRef = useRef(null);
  const aboutBodyContainerRef  = useRef(null);

  /* Portrait parallax */
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

  // Slice to the homepage limit — update HOME_PROJECT_LIMIT in data/data.js
  const homeProjects    = projects.slice(0, HOME_PROJECT_LIMIT);
  const remainingCount  = projects.length - HOME_PROJECT_LIMIT;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* ── Hero ── */}
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
          <TextPressure
            text="Gautam Makwana."
            minFontSize={28}
            maxFontSize={999}          
            containerHeight="clamp(80px, 14vw, 200px)"
            textColor="#ffffff"
            width={true}               
            flex={true}
            italic={true}
            weight={true}
          />
        </div>
      </section>

      {/* ── About teaser ── */}
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
            <button type="button" onClick={() => onNavigate("about")}>{"->"} About me</button>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ── Projects ScrollStack (limited preview) ── */}
      <ScrollStack
        itemDistance={0}
        itemStackDistance={30}
        stackPosition="15%"
        baseScale={0.88}
        itemScale={0.04}
        blurAmount={2}
      >
        {homeProjects.map((project, idx) => (
          <ScrollStackItem key={project.title}>
            <ProjectCard
              project={project}
              index={idx + 1}
              total={homeProjects.length}
              label="Projects"
              onNavigate={onNavigate}
            />
          </ScrollStackItem>
        ))}
      </ScrollStack>

      {/* ── View all works strip ── */}
      <div className="ss-view-all-strip">
        <p>
          <strong>{remainingCount} more project{remainingCount !== 1 ? "s" : ""}</strong>{" "}
          waiting — see the full picture on the work page.
        </p>
        <button
          type="button"
          className="ss-view-all-btn"
          onClick={() => onNavigate("work")}
        >
          View all works →
        </button>
      </div>

      <Footer />
    </motion.div>
  );
};

export default HomePage;
