import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./ExperiencedLayout.css";
import portraitImage from "../../assets/portrait.png";
import productionDeploymentImage from "../../assets/production-deplyment.webp";
import fitandfineImage from "../../assets/fitandfine.png";
import AnimatedButton from "./components/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

const projects = [
  {
    number: "01",
    title: "Production Backend Deployment",
    client: "Backend / DevOps",
    year: "2026",
    image: productionDeploymentImage,
  },
  {
    number: "02",
    title: "Fit & Fine eCommerce",
    client: "MERN Stack",
    year: "2025",
    image: fitandfineImage,
  },
  {
    number: "03",
    title: "SnapLink",
    client: "Social App",
    year: "2025",
    image:
      "https://res.cloudinary.com/ds8hkne4w/image/upload/v1765646713/majorProThird_upptsf.png",
  },
  {
    number: "04",
    title: "SMTP Lite",
    client: "Email Service",
    year: "2024",
    image:
      "https://res.cloudinary.com/ds8hkne4w/image/upload/v1765646710/majorProFourth_z9owkz.png",
  },
];

const serviceTags = [
  "Backend Development",
  "DevOps",
  "React",
  "Node.js",
  "Cloud Deployment",
];

const clients = ["Awwwards", "FWA", "CSSDA", "Studio Dumbar", "Locomotive", "Build in Amsterdam"];

const pageVariants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.32, ease: [0.64, 0, 0.78, 0] } },
};

const overlayVariants = {
  initial: { y: "100%" },
  animate: {
    y: ["100%", "0%", "-100%"],
    transition: { duration: 1.3, times: [0, 0.48, 1], ease: [0.76, 0, 0.24, 1] },
  },
};

const pageLabels = {
  home: "Home",
  work: "Work",
  about: "About",
  contact: "Contact",
};

const welcomeWords = [
  "Welcome",
  "સ્વાગત",
  "नमस्कार",
  "வணக்கம்",
  "స్వాగతం",
];

const useExperiencedAnimations = (page) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);

    const anchorHandler = (event) => {
      const anchor = event.target.closest("a[href^='#']");
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    };

    document.addEventListener("click", anchorHandler);

    return () => {
      document.removeEventListener("click", anchorHandler);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-hero .exp-word",
        { y: "110%" },
        { y: "0%", duration: 0.85, stagger: 0.06, ease: "power3.out", delay: 0.12 }
      );

      gsap.fromTo(
        ".exp-hero-meta, .exp-scroll-cue",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power2.out", delay: 0.65 }
      );

      gsap.fromTo(
        ".exp-hero-tagline .exp-char",
        { y: "115%" },
        {
          y: "0%",
          duration: 0.72,
          stagger: 0.015,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-hero-tagline", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".exp-about-teaser .exp-char",
        { y: "115%" },
        {
          y: "0%",
          duration: 0.56,
          stagger: 0.008,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-about-teaser", start: "top 82%" },
        }
      );

      gsap.utils.toArray(".exp-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 82%" },
          }
        );
      });

      gsap.fromTo(
        ".exp-project-row",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: ".exp-work-list", start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".exp-footer-title .exp-char",
        { y: "115%" },
        {
          y: "0%",
          duration: 0.72,
          stagger: 0.018,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-footer-title", start: "top 82%" },
        }
      );
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [page]);
};

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let rafId;

    const move = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      gsap.set(dotRef.current, { x: mouse.x, y: mouse.y });
    };

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.08;
      ring.y += (mouse.y - ring.y) * 0.08;
      gsap.set(ringRef.current, { x: ring.x, y: ring.y });
      rafId = requestAnimationFrame(tick);
    };

    const enter = () => ringRef.current?.classList.add("is-active");
    const leave = () => ringRef.current?.classList.remove("is-active");
    const down = () => ringRef.current?.classList.add("is-clicking");
    const up = () => ringRef.current?.classList.remove("is-clicking");

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.querySelectorAll("a, button, input, textarea").forEach((item) => {
      item.addEventListener("mouseenter", enter);
      item.addEventListener("mouseleave", leave);
    });
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.querySelectorAll("a, button, input, textarea").forEach((item) => {
        item.removeEventListener("mouseenter", enter);
        item.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <span className="exp-cursor-dot" ref={dotRef} />
      <span className="exp-cursor-ring" ref={ringRef} />
    </>
  );
};

const Header = ({ page, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const links = ["work", "about", "contact"];

  const navigate = (target) => {
    onNavigate(target);
    setOpen(false);
  };

  return (
    <header className={`exp-header ${page === "home" ? "is-home" : ""} ${open ? "is-menu-open" : ""}`}>
      <button className="exp-logo" onClick={() => navigate("home")} type="button">
        <span>&copy; Code by Gautam</span>
      </button>

      <nav className="exp-nav" aria-label="Experienced portfolio navigation">
        {links.map((link) => (
          <button
            className={`exp-nav-link ${page === link ? "is-current" : ""}`}
            key={link}
            onClick={() => navigate(link)}
            type="button"
          >
            {link}
          </button>
        ))}
      </nav>

      <button
        className={`exp-menu-toggle ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        type="button"
        aria-label="Toggle menu"
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="exp-mobile-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            
            
            <div className="exp-mobile-menu-links">
              {["home", ...links].map((link, index) => (
                <motion.button
                  key={link}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => navigate(link)}
                  type="button"
                >
                  {link}
                </motion.button>
              ))}
            </div>

            <div className="exp-mobile-menu-socials">
              <div className="exp-mobile-social-links">
                {["Instagram", "Twitter/X", "LinkedIn"].map((social) => (
                  <a href="#top" key={social}>
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const Marquee = () => (
  <section className="exp-marquee" aria-label="Capabilities ticker">
    <div className="exp-marquee-track">
      <span>Backend Developer - DevOps Engineer - Full Stack Developer - </span>
      <span>Backend Developer - DevOps Engineer - Full Stack Developer - </span>
      <span>Backend Developer - DevOps Engineer - Full Stack Developer - </span>
      <span>Backend Developer - DevOps Engineer - Full Stack Developer - </span>
    </div>
  </section>
);

const WorkList = ({ onNavigate }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <section className="exp-section exp-work" id="work">
      <div className="exp-container">
        <div className="exp-section-head exp-reveal">
          <h2>Work</h2>
          <button className="exp-all-work-desktop" type="button" onClick={() => onNavigate("work")}>All work</button>
        </div>

        <div className="exp-work-list">
          {projects.map((project) => (
            <button
              className="exp-project-row"
              key={project.title}
              type="button"
              onMouseEnter={() => setActiveProject(project)}
              onMouseMove={(event) => setPosition({ x: event.clientX, y: event.clientY })}
              onMouseLeave={() => setActiveProject(null)}
            >
              <img className="exp-project-mobile-image" src={project.image} alt="" />
              <span>{project.number}</span>
              <strong>{project.title}</strong>
              <span>{project.client} / {project.year}</span>
            </button>
          ))}
        </div>
        {/* Mobile: show animated button centered after the list */}
        <div className="exp-all-work-mobile">
          <AnimatedButton text={"All work →"} href="#" onClick={() => onNavigate("work")} />
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="exp-project-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: Math.min(position.x + 32, window.innerWidth - 460),
              y: Math.min(position.y - 120, window.innerHeight - 320),
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22 }}
          >
            <img src={activeProject.image} alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const HomePage = ({ onNavigate }) => {
  const heroText = "Building digital experiences with precision and intention";

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="exp-hero">
        <img className="exp-hero-portrait" src={portraitImage} alt="Gautam Makwana portrait" />

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
          {"The combination of my passion for design, code & interaction positions me in a unique place in the web design world.".split("").map((char, i) => (
            <span className="exp-char-wrap" key={`about-title-${i}`}>
              <span className="exp-char">{char === " " ? "\u00a0" : char}</span>
            </span>
          ))}
        </h2>
        <div className="exp-reveal">
          <p>
            {"I build scalable websites from scratch that fit seamlessly with design. My focus is on micro animations, transitions and interaction.".split("").map((char, i) => (
              <span className="exp-char-wrap" key={`about-p-${i}`}>
                <span className="exp-char">{char === " " ? "\u00a0" : char}</span>
              </span>
            ))}
          </p>
          <button type="button" onClick={() => onNavigate("about")}>-&gt; About me</button>
        </div>
      </div>
      </section>

      {/* <IntroSection onNavigate={onNavigate} /> */}
      <Marquee />
      <WorkList onNavigate={onNavigate} />

    <section className="exp-skills exp-reveal">
      <div className="exp-container">
        {serviceTags.map((tag, index) => (
          <React.Fragment key={tag}>
            <span>{tag}</span>
            {index < serviceTags.length - 1 && <i>-</i>}
          </React.Fragment>
        ))}
      </div>
    </section>

    <Footer />
  </motion.div>
  );
};

const IntroSection = ({ onNavigate }) => (
  <section className="exp-intro-section">
    <div className="exp-container exp-intro-grid">
      <div>
        <h2>
          Building reliable web products for the digital era. Clean backend,
          sharp interfaces, and deployment workflows that stay production-ready.
        </h2>
        <span>Recent Work</span>
      </div>

      <div className="exp-intro-side">
        <p>
          The combination of backend development, DevOps, and thoughtful frontend
          craft helps me ship fast, stable, and useful digital experiences.
        </p>
        <button type="button" onClick={() => onNavigate("about")}>
          About me
        </button>
      </div>
    </div>
  </section>
);

const AboutPage = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    <section className="exp-page-hero">
      <div className="exp-container">
        <h1 className="exp-reveal">About</h1>
      </div>
    </section>

    <section className="exp-section">
      <div className="exp-container exp-profile-grid">
        <div className="exp-profile-image exp-reveal">
          <img
            src={portraitImage}
            alt="Gautam Makwana portrait"
          />
        </div>
        <div className="exp-profile-copy exp-reveal">
          <p>
            I am a designer and developer who creates expressive digital products with a strong eye for interaction, rhythm and performance.
          </p>
          <p>
            My work sits between visual systems and careful front-end craft: thoughtful typography, direct layouts, animated feedback and interfaces that feel precise.
          </p>
          <div className="exp-counter-grid">
            <span><strong>12+</strong> Years</span>
            <span><strong>80+</strong> Projects</span>
            <span><strong>18</strong> Awards</span>
          </div>
        </div>
      </div>
    </section>

    <Marquee />
    <ClientStrip />
    <Footer />
  </motion.div>
);

const WorkPage = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    <section className="exp-page-hero">
      <div className="exp-container">
        <h1 className="exp-reveal">Work</h1>
      </div>
    </section>

    <section className="exp-section">
      <div className="exp-container exp-work-grid">
        {projects.map((project) => (
          <article className="exp-work-card exp-reveal" key={project.title}>
            <img src={project.image} alt={project.title} />
            <div>
              <span>{project.year}</span>
              <h2>{project.title}</h2>
            </div>
          </article>
        ))}
      </div>
    </section>
    <Footer />
  </motion.div>
);

const ContactPage = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    <section className="exp-page-hero exp-contact-page">
      <div className="exp-container">
        <h1 className="exp-reveal">Get in touch</h1>
        <a className="exp-large-mail exp-reveal" href="mailto:gautammakwana.dev@gmail.com">
          gautammakwana.dev@gmail.com
        </a>
      </div>
    </section>

    <section className="exp-section">
      <form className="exp-container exp-contact-form">
        <input type="text" placeholder="Name" aria-label="Name" />
        <input type="email" placeholder="Email" aria-label="Email" />
        <textarea placeholder="Message" aria-label="Message" rows="5" />
        <button type="button">Send -&gt;</button>
      </form>
    </section>
    <Footer />
  </motion.div>
);

const ClientStrip = () => (
  <section className="exp-client-strip exp-reveal">
    <div className="exp-container">
      {clients.map((client) => (
        <span key={client}>{client}</span>
      ))}
    </div>
  </section>
);

const Footer = () => {
  const title = "Let's work together";

  return (
    <footer className="exp-footer" id="contact">
      <div className="exp-container">
        <button className="exp-footer-title" type="button">
          {title.split("").map((char, index) => (
            <span className="exp-char-wrap" key={`${char}-${index}`}>
              <span className="exp-char">{char === " " ? "\u00a0" : char}</span>
            </span>
          ))}
        </button>

        <div className="exp-footer-main">
          <a href="mailto:gautammakwana.dev@gmail.com">gautammakwana.dev@gmail.com</a>
          <nav>
            {["Instagram", "Twitter/X", "LinkedIn", "Dribbble"].map((social) => (
              <a href="#top" key={social}>{social}</a>
            ))}
          </nav>
        </div>

        <div className="exp-footer-bottom">
          <span>&copy; Code by Gautam</span>
          <span>Backend Developer & DevOps Engineer</span>
        </div>
      </div>
    </footer>
  );
};

const LandingIntro = ({ onComplete }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const wordTimer = window.setInterval(() => {
      setWordIndex((index) => {
        if (index >= welcomeWords.length - 1) {
          window.clearInterval(wordTimer);
          window.setTimeout(() => setIsLeaving(true), 380);
          return index;
        }

        return index + 1;
      });
    }, 520);

    return () => window.clearInterval(wordTimer);
  }, []);

  return (
    <motion.div
      className="exp-landing-intro"
      initial={{ y: 0 }}
      animate={{ y: isLeaving ? "-100%" : 0 }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (isLeaving) onComplete();
      }}
    >
      <span className="exp-landing-text">
        <span className="exp-landing-dot" />
        {welcomeWords[wordIndex]}
      </span>
    </motion.div>
  );
};

const ExperiencedLayout = () => {
  const [page, setPage] = useState("home");
  const [transitionKey, setTransitionKey] = useState(null);
  const [showLandingIntro, setShowLandingIntro] = useState(true);

  useExperiencedAnimations(page);

  const CurrentPage = useMemo(() => {
    const pages = {
      home: HomePage,
      about: AboutPage,
      work: WorkPage,
      contact: ContactPage,
    };

    return pages[page] || HomePage;
  }, [page]);

  const navigate = (target) => {
    if (target === page) return;
    setTransitionKey((key) => (key === null ? 1 : key + 1));
    setPage(target);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div className="experienced-shell" id="top">
      <Cursor />
      <Header page={page} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        <CurrentPage key={page} onNavigate={navigate} />
      </AnimatePresence>

      <AnimatePresence>
        {showLandingIntro && (
          <LandingIntro onComplete={() => setShowLandingIntro(false)} />
        )}

        {transitionKey !== null && (
          <motion.div
            className="exp-transition-panel"
            key={transitionKey}
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            aria-hidden="true"
          >
            <div className="exp-transition-label">
              <span className="exp-transition-dot" />
              <span>{pageLabels[page] || "Home"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperiencedLayout;
