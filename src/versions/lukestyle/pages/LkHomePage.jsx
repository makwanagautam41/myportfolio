/**
 * LkHomePage — lukebaffait.fr inspired (CLEANED):
 *   1. Hero: sticky animated gradient, split name, tagline
 *   2. About: blurred-word reveal + right-side portrait
 *   3. Statement: white scroll-text reveal (from Contact animation style)
 *   4. Skills accordion
 *   5. Footer with large name
 *
 * NOTE: All project/work content REMOVED — belongs in Work page only.
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portraitImage from "../../../assets/portrait.png";
import { skillGroups } from "../data/data";
import "./LkHomePage.css";

gsap.registerPlugin(ScrollTrigger);


// ─── Scroll-triggered white text reveal (word by word with blur)
const ScrollRevealText = ({ text, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".lk-sr-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, filter: "blur(12px)", y: 18 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.055,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <span ref={containerRef} className={`lk-scroll-reveal-text ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="lk-sr-word">{word} </span>
      ))}
    </span>
  );
};

// ─── Skills accordion item
const SkillGroup = ({ group }) => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    body.style.height = open ? body.scrollHeight + "px" : "0px";
  }, [open]);

  return (
    <div className={`lk-skill-group${open ? " open" : ""}`}>
      <button
        type="button"
        className="lk-skill-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="lk-skill-title">{group.title}</span>
        <span className="lk-skill-icon" aria-hidden="true" />
      </button>
      <div ref={bodyRef} className="lk-skill-body" aria-hidden={!open}>
        <ul className="lk-skill-body-inner">
          {group.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ─── Main
const LkHomePage = ({ onNavigate, preloaderDone }) => {
  const heroRef    = useRef(null);
  const taglineRef = useRef(null);
  const firstRef   = useRef(null);
  const lastRef    = useRef(null);
  const photoRef   = useRef(null);
  const scrollIndRef = useRef(null);

  // Hide names + tagline on mount; reveal after preloader
  useEffect(() => {
    gsap.set(taglineRef.current, { opacity: 0, y: 16, filter: "blur(6px)" });
    gsap.set(firstRef.current,   { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.97 });
    gsap.set(lastRef.current,    { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.97 });
    if (scrollIndRef.current) gsap.set(scrollIndRef.current, { opacity: 0 });
  }, []);

  useEffect(() => {
    if (!preloaderDone) return;

    const tl = gsap.timeline();

    // Tagline — soft blur fade
    tl.to(taglineRef.current, {
      opacity: 1, y: 0, filter: "blur(0px)",
      duration: 1.0, ease: "power3.out",
    })
    // First name (Georgia serif — left side)
    .to(firstRef.current, {
      opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
      duration: 1.1, ease: "power4.out",
    }, "-=0.75")
    // Last name (Apparel italic — right side)
    .to(lastRef.current, {
      opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
      duration: 1.1, ease: "power4.out",
    }, "-=0.9")
    // Scroll indicator
    .to(scrollIndRef.current, {
      opacity: 1,
      duration: 0.8, ease: "power2.out",
    }, "-=0.4");

    return () => tl.kill();
  }, [preloaderDone]);

  // Portrait reveal
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        x: 60,
        filter: "blur(20px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="lk-home">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="lk-hero-scroll-wrap">
        <section ref={heroRef} className="lk-hero" aria-label="Hero">
          {/* Animated gradient background */}
          <div className="lk-hero-canvas" aria-hidden="true">
            <div className="lk-hero-gradient" />
          </div>

          {/* Tagline — top left */}
          <p ref={taglineRef} className="lk-hero-tagline">
            Quiet creator,{" "}
            <em>bringing ideas to life,</em>
            <br />
            through motion, detail and softness.
          </p>

          {/* Name — bottom, side by side: fades in after preloader */}
          <div className="lk-hero-name" aria-label="Gautam Makwana">
            <span ref={firstRef} className="lk-hero-first">Gautam</span>
            <span ref={lastRef}  className="lk-hero-last">Makwana.</span>
          </div>

          {/* Scroll indicator */}
          <div ref={scrollIndRef} className="lk-hero-scroll-ind" aria-hidden="true">
            <span className="lk-scroll-line" />
          </div>
        </section>
      </div>

      {/* ── Content after hero ─────────────────────────────────────────────── */}
      <div className="lk-section-after">

        {/* ── About ────────────────────────────────────────────────────────── */}
        <section className="lk-about" id="about" aria-label="About">
          {/* Right-side pill portrait */}
          <div className="lk-about-photo-wrap">
            <img
              ref={photoRef}
              className="lk-about-photo"
              src={portraitImage}
              alt="Gautam Makwana portrait"
              loading="lazy"
            />
          </div>

          {/* Main statement */}
          <p className="lk-about-text">
            <ScrollRevealText text="Mostly focused on the backend side—architecting servers, automating CI/CD pipelines, and streamlining DevOps deployments." />
          </p>

          {/* Sub text */}
          <div className="lk-about-sub">
            <ScrollRevealText text="I specialize in building robust backend systems and cloud infrastructures, while keeping frontend and interactive design as a strong second half." />
          </div>

          <div className="lk-about-btn">
            <button type="button" onClick={() => onNavigate("info")}>
              → About me
            </button>
          </div>
        </section>

        {/* ── Scroll-reveal statement section (Contact scroll animation) ────── */}
        <section className="lk-statement" aria-label="Statement">
          <div className="lk-statement-inner">
            <p className="lk-statement-label">What drives me</p>
            <h2 className="lk-statement-text">
              <ScrollRevealText
                text="I craft tailor-made web experiences where technical precision meets emotion. Passionate about animation, interaction and detail, I always seek the symbiosis between art and information."
              />
            </h2>
            <div className="lk-statement-cta">
              <button type="button" onClick={() => onNavigate("work")}>
                See my work →
              </button>
              <button type="button" onClick={() => onNavigate("contact")} className="lk-cta-secondary">
                Get in touch
              </button>
            </div>
          </div>
        </section>

        {/* ── Skills accordion ──────────────────────────────────────────────── */}
        <section className="lk-skills" id="skills" aria-label="Skills">
          <div className="lk-skills-inner">
            {/* Left sticky — arrow removed */}
            <div className="lk-skills-left">
              <p className="lk-skills-subtitle">
                Tools I use to build things.
              </p>
              <h2 className="lk-skills-heading">
                WHAT I<br />WORK WITH
              </h2>
              <div className="lk-skills-sep" />
            </div>

            {/* Right accordion */}
            <div className="lk-skills-right">
              {skillGroups.map((group) => (
                <SkillGroup key={group.title} group={group} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer className="lk-home-footer" aria-label="Site footer">

          {/* Info row */}
          <div className="lk-footer-row">
            <div className="lk-footer-col">
              <span className="lk-footer-label">Contact</span>
              <a href="mailto:makwanagautam41@gmail.com">makwanagautam41@gmail.com</a>
            </div>
            <div className="lk-footer-col">
              <span className="lk-footer-label">Based in</span>
              <span className="lk-footer-val">Rajkot, India</span>
            </div>
            <div className="lk-footer-col">
              <span className="lk-footer-label">Socials</span>
              <a href="https://github.com/makwanagautam41" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/gautammakwana/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>

          {/* Footer big name — only "Gautam" in Apparel Black */}
          <div className="lk-footer-bigname" aria-label="Gautam">
            <span className="lk-fn-first">Gautam</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LkHomePage;
