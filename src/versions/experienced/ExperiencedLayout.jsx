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
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";

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

// ─── DARK BG SECTIONS — selectors used by header color observer
// Anything with dark background should be listed here
const DARK_BG_SELECTORS = [
  ".exp-hero",
  ".exp-footer",
  ".exp-mobile-menu",
  ".exp-landing-intro",
];

// ─── PAGE VARIANTS — improved curtain wipe
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.28, ease: [0.64, 0, 0.78, 0] },
  },
};

// Full-screen curtain: slides up from bottom, pauses centre, then exits up
const curtainVariants = {
  initial: { y: "100%", scaleY: 1 },
  animate: {
    y: ["100%", "0%", "-100%"],
    transition: {
      duration: 1.1,
      times: [0, 0.42, 1],
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// Label fades in at centre then out
const labelVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [12, 0, 0, -12],
    transition: {
      duration: 1.1,
      times: [0, 0.25, 0.7, 1],
    },
  },
};

// ─── ANIMATIONS HOOK
const useExperiencedAnimations = (page) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const updateLenis = (time) => lenis.raf(time * 1000);
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
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Reset scroll to top instantly using Lenis on page change
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    const ctx = gsap.context(() => {
      if (document.querySelector(".exp-hero .exp-word")) {
        gsap.fromTo(
          ".exp-hero .exp-word",
          { y: "110%" },
          {
            y: "0%",
            duration: 0.85,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.12,
          }
        );
      }

      if (document.querySelector(".exp-hero-meta, .exp-scroll-cue")) {
        gsap.fromTo(
          ".exp-hero-meta, .exp-scroll-cue",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.18,
            ease: "power2.out",
            delay: 0.65,
          }
        );
      }

      if (document.querySelector(".exp-hero-tagline .exp-char")) {
        gsap.fromTo(
          ".exp-hero-tagline .exp-char",
          { y: "115%" },
          {
            y: "0%",
            duration: 0.72,
            stagger: 0.015,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".exp-hero-tagline",
              start: "top 85%",
            },
          }
        );
      }

      if (document.querySelector(".exp-about-teaser .exp-char")) {
        gsap.fromTo(
          ".exp-about-teaser .exp-char",
          { y: "115%" },
          {
            y: "0%",
            duration: 0.56,
            stagger: 0.008,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".exp-about-teaser",
              start: "top 82%",
            },
          }
        );
      }

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

      if (document.querySelector(".exp-work-list")) {
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
      }

      if (document.querySelector(".exp-footer-title .exp-char")) {
        gsap.fromTo(
          ".exp-footer-title .exp-char",
          { y: "115%" },
          {
            y: "0%",
            duration: 0.72,
            stagger: 0.018,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".exp-footer-title",
              start: "top 82%",
            },
          }
        );
      }
    });

    const handleRefresh = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    };

    // Trigger initial refresh
    handleRefresh();

    // Trigger multiple refreshes across critical transition phases to fully settle layout heights
    const t1 = setTimeout(handleRefresh, 100);
    const t2 = setTimeout(handleRefresh, 600);
    const t3 = setTimeout(handleRefresh, 1200);

    const refreshOnResize = () => handleRefresh();
    window.addEventListener("resize", refreshOnResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", refreshOnResize);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [page]);
};

// ─── HEADER COLOR OBSERVER
// Watches which section is behind the header and flips color
const useHeaderColorObserver = (setOverDark) => {
  useEffect(() => {
    const headerH = 90;

    const checkHeader = () => {
      let isDark = false;
      DARK_BG_SELECTORS.forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // If top of section is above header midpoint and bottom is below it
        if (rect.top <= headerH && rect.bottom > 10) {
          isDark = true;
        }
      });
      setOverDark(isDark);
    };

    checkHeader();
    window.addEventListener("scroll", checkHeader, { passive: true });
    window.addEventListener("resize", checkHeader);

    return () => {
      window.removeEventListener("scroll", checkHeader);
      window.removeEventListener("resize", checkHeader);
    };
  }, [setOverDark]);
};

// ─── CURSOR
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let rafId;

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.set(dotRef.current, { x: mouse.x, y: mouse.y });
    };

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.08;
      ring.y += (mouse.y - ring.y) * 0.08;
      gsap.set(ringRef.current, { x: ring.x, y: ring.y });
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, input, textarea, .exp-project-row, [role='button']");
      if (target) {
        ringRef.current?.classList.add("is-active");
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("a, button, input, textarea, .exp-project-row, [role='button']");
      if (target) {
        ringRef.current?.classList.remove("is-active");
      }
    };

    const down = () => ringRef.current?.classList.add("is-clicking");
    const up = () => ringRef.current?.classList.remove("is-clicking");

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <span className="exp-cursor-dot" ref={dotRef} />
      <span className="exp-cursor-ring" ref={ringRef} />
    </>
  );
};

// ─── HEADER
const Header = ({ page, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const links = ["work", "about", "contact"];

  useHeaderColorObserver(setOverDark);

  const navigate = (target) => {
    onNavigate(target);
    setOpen(false);
  };

  // When menu is open, header always shows white text (menu is dark)
  const isDark = overDark || open;

  return (
    <header
      className={`exp-header ${isDark ? "over-dark" : ""}`}
    >
      {/* LEFT — logo */}
      <button className="exp-logo" onClick={() => navigate("home")} type="button">
        <span>&copy; Code by Gautam</span>
      </button>

      {/* RIGHT DESKTOP — nav links */}
      <nav className="exp-nav" aria-label="Main navigation">
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

      {/* RIGHT MOBILE — hamburger */}
      <button
        className={`exp-menu-toggle ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span />
        <span />
      </button>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.nav
          className="exp-mobile-menu"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Mobile navigation"
        >
          <div className="exp-mobile-menu-links">
            {["home", ...links].map((link, index) => (
              <motion.button
                key={link}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 + index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                  duration: 0.5,
                }}
                onClick={() => navigate(link)}
                type="button"
              >
                {link}
              </motion.button>
            ))}
          </div>

          <div className="exp-mobile-menu-socials">
            <span>Socials</span>
            <div className="exp-mobile-social-links">
              <a href="https://www.instagram.com/_gautammakwana_" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/gautammakwana/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/makwanagautam41" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="/portfolio/starter">
                v1
              </a>
            </div>
          </div>
        </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

// ─── MARQUEE
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

// ─── WORK LIST
const WorkList = ({ onNavigate }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <section className="exp-section exp-work" id="work">
      <div className="exp-container">
        <div className="exp-section-head exp-reveal">
          <h2>Work</h2>
          <button
            className="exp-all-work-desktop"
            type="button"
            onClick={() => onNavigate("work")}
          >
            All work
          </button>
        </div>

        <div className="exp-work-list">
          {projects.map((project) => (
            <button
              className="exp-project-row"
              key={project.title}
              type="button"
              onMouseEnter={() => setActiveProject(project)}
              onMouseMove={(e) =>
                setPosition({ x: e.clientX, y: e.clientY })
              }
              onMouseLeave={() => setActiveProject(null)}
            >
              <img
                className="exp-project-mobile-image"
                src={project.image}
                alt=""
              />
              <span>{project.number}</span>
              <strong>{project.title}</strong>
              <span>
                {project.client} / {project.year}
              </span>
            </button>
          ))}
        </div>

        <div className="exp-all-work-mobile">
          <AnimatedButton
            text="All work →"
            href="#"
            onClick={() => onNavigate("work")}
          />
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

// ─── HOME PAGE
const HomePage = ({ onNavigate }) => {
  const heroText =
    "Building digital experiences with precision and intention";

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="exp-hero">
        <img
          className="exp-hero-portrait"
          src={portraitImage}
          alt="Gautam Makwana portrait"
        />

        <div className="exp-hero-name" aria-label="Gautam Makwana">
          Gautam Makwana
        </div>

        <div className="exp-hero-tagline">
          {heroText.split("").map((char, index) => (
            <span className="exp-char-wrap" key={`${char}-${index}`}>
              <span className="exp-char">
                {char === " " ? "\u00a0" : char}
              </span>
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
                  <span className="exp-char">
                    {char === " " ? "\u00a0" : char}
                  </span>
                </span>
              ))}
          </h2>
          <div className="exp-reveal">
            <p>
              {"I specialize in building robust backend systems and cloud infrastructures, while keeping frontend and interactive design as a strong second half. I completed my BCA from RK University, Rajkot."
                .split("")
                .map((char, i) => (
                  <span className="exp-char-wrap" key={`about-p-${i}`}>
                    <span className="exp-char">
                      {char === " " ? "\u00a0" : char}
                    </span>
                  </span>
                ))}
            </p>
            <button type="button" onClick={() => onNavigate("about")}>
              -&gt; About me
            </button>
          </div>
        </div>
      </section>

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

// ─── ABOUT PAGE
const AboutPage = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <section className="exp-page-hero">
      <div className="exp-container">
        <h1>About</h1>
      </div>
    </section>

    <section className="exp-section" style={{ paddingTop: "48px" }}>
      <div className="exp-container exp-profile-grid">
        <div className="exp-profile-image exp-reveal">
          <img src={portraitImage} alt="Gautam Makwana portrait" />
        </div>
        <div className="exp-profile-copy exp-reveal">
          <p>
            I am a backend developer and DevOps engineer dedicated to building high-performance server architectures, robust APIs, and streamlined CI/CD pipelines.
          </p>
          <p>
            While my core expertise is rooted in server-side development, database management, and cloud deployments, I approach frontend development and design as a vital second half to build cohesive, end-to-end digital solutions.
          </p>
          <p>
            I completed my Bachelor of Computer Applications (BCA) from RK University, Rajkot, which grounded my foundations in software engineering and computational logic.
          </p>
        </div>
      </div>
    </section>

    <Marquee />
    <Footer />
  </motion.div>
);

// ─── WORK PAGE
const WorkPage = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <section className="exp-page-hero">
      <div className="exp-container">
        <h1>Work</h1>
      </div>
    </section>

    <section className="exp-section" style={{ paddingTop: "48px" }}>
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

// ─── CONTACT PAGE
// ─── CONTACT PAGE
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);

    const htmlContent = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong> ${formData.description}</p>
    `;

    const sendEmail = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          to: "gautammakwana671@gmail.com",
          subject: "📩 New Contact Message From Portfolio",
          html: htmlContent,
        }),
      });

      const data = await res.json();
      return data.id;
    };

    const listenForUpdates = async (emailId) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/email/events/${emailId}`,
        {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }
      );

      if (!response.ok) {
        toast.error("SSE connection failed");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();

        for (const chunk of parts) {
          const line = chunk.split("\n").find((entry) => entry.startsWith("data:"));

          if (!line) continue;

          const json = line.replace("data:", "").trim();

          try {
            const event = JSON.parse(json);

            if (event.status === "sent") {
              toast.success("Email delivered successfully!");
              reader.cancel();
              return;
            }

            if (event.status === "failed") {
              toast.error("Email failed!");
              reader.cancel();
              return;
            }
          } catch {
            // Ignore malformed event payloads.
          }
        }
      }
    };

    try {
      const id = await sendEmail();

      if (!id) {
        toast.error("Failed to send message.");
        return;
      }

      setFormData({ name: "", email: "", description: "" });
      listenForUpdates(id);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="exp-page-hero exp-contact-page">
        <div className="exp-container">
          <h1>Contact</h1>
        </div>
      </section>

      <section className="exp-section" style={{ paddingTop: "0" }}>
        <form className="exp-container exp-contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            aria-label="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            aria-label="Email"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Message"
            aria-label="Message"
            rows="5"
            required
          />
          <button
            type="submit"
            className={loading ? "is-loading" : ""}
            disabled={loading}
          >
            {loading ? (
              <>
                <PiSpinner
                  className="spinner-icon"
                  style={{ animation: "spin 1s linear infinite", marginRight: "8px", verticalAlign: "middle" }}
                />
                Submitting...
              </>
            ) : (
              "Send ->"
            )}
          </button>
        </form>
      </section>
      <Footer />
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spinner-icon {
            font-size: 20px;
          }
        `}
      </style>
    </motion.div>
  );
};


// ─── FOOTER
const Footer = () => {
  const title = "Let's work together";

  return (
    <footer className="exp-footer" id="contact">
      <div className="exp-container">
        <button className="exp-footer-title" type="button">
          {title.split("").map((char, index) => (
            <span className="exp-char-wrap" key={`${char}-${index}`}>
              <span className="exp-char">
                {char === " " ? "\u00a0" : char}
              </span>
            </span>
          ))}
        </button>

        <div className="exp-footer-main">
          <a href="mailto:gautammakwana.dev@gmail.com">
            gautammakwana.dev@gmail.com
          </a>
          <nav>
            <a href="https://www.instagram.com/_gautammakwana_" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/gautammakwana/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/makwanagautam41" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="/portfolio/starter">
              v1
            </a>
          </nav>
        </div>

        <div className="exp-footer-bottom">
          <span>&copy; Code by Gautam</span>
          <span>Backend Developer &amp; DevOps Engineer</span>
        </div>
      </div>
    </footer>
  );
};

// ─── LANDING INTRO
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
      <AnimatePresence mode="wait">
        <motion.span
          key={wordIndex}
          className="exp-landing-text"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="exp-landing-dot" />
          {welcomeWords[wordIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

// ─── ROOT
const ExperiencedLayout = () => {
  const [page, setPage] = useState("home");
  const [transitionKey, setTransitionKey] = useState(null);
  const [transitionLabel, setTransitionLabel] = useState("Home");
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
    setTransitionLabel(pageLabels[target] || "Home");
    setTransitionKey((k) => (k === null ? 1 : k + 1));
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

      {/* ─── PAGE TRANSITION CURTAIN */}
      <AnimatePresence>
        {transitionKey !== null && (
          <motion.div
            className="exp-transition-panel"
            key={transitionKey}
            variants={curtainVariants}
            initial="initial"
            animate="animate"
            aria-hidden="true"
          >
            <motion.div
              className="exp-transition-label"
              variants={labelVariants}
              initial="initial"
              animate="animate"
            >
              <span className="exp-transition-dot" />
              <span>{transitionLabel}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── LANDING INTRO */}
      <AnimatePresence>
        {showLandingIntro && (
          <LandingIntro onComplete={() => setShowLandingIntro(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperiencedLayout;