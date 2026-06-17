/**
 * LkHomePage — Full redesign with full-viewport footer (lukebaffait.fr style)
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import meImage from "../../../assets/me.png";
import { skillGroups } from "../data/data";
import "./LkHomePage.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Character-split hover link (anchor)
const ChrLink = ({ text, href, target = "_blank", className = "" }) => {
  const chars = text.split("").map((ch, i) => (
    <span key={i} className="lk-ch-wrap">
      <span className="lk-ch-top" style={{ "--i": i }}>{ch === " " ? "\u00a0" : ch}</span>
      <span className="lk-ch-bot" style={{ "--i": i }}>{ch === " " ? "\u00a0" : ch}</span>
    </span>
  ));
  return (
    <a href={href} target={target} rel="noreferrer" className={`lk-chr ${className}`}>
      {chars}
    </a>
  );
};

// ─── Character-split hover button (same animation as navbar, for footer nav)
const ChrFooterBtn = ({ text, onClick, className = "" }) => {
  const chars = text.split("").map((ch, i) => (
    <span key={i} className="lk-ch-wrap">
      <span className="lk-ch-top" style={{ "--i": i }}>{ch}</span>
      <span className="lk-ch-bot" style={{ "--i": i }}>{ch}</span>
    </span>
  ));
  return (
    <button type="button" onClick={onClick} className={`lk-chr lk-footer-chr ${className}`}>
      {chars}
    </button>
  );
};

// ─── Scroll-triggered word reveal
const ScrollRevealText = ({ text, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const words = container.querySelectorAll(".lk-sr-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { opacity: 0, filter: "blur(10px)", y: 16 },
        {
          opacity: 1, filter: "blur(0px)", y: 0,
          duration: 0.65, ease: "power3.out", stagger: 0.045,
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
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

// ─── Skills accordion
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
      <button type="button" className="lk-skill-header"
        onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span className="lk-skill-title">{group.title}</span>
        <span className="lk-skill-icon" aria-hidden="true" />
      </button>
      <div ref={bodyRef} className="lk-skill-body" aria-hidden={!open}>
        <ul className="lk-skill-body-inner">
          {group.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

// ─── Main component
const LkHomePage = ({ onNavigate, preloaderDone }) => {
  const heroRef = useRef(null);
  const gradientRef = useRef(null);
  const taglineRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const photoRef = useRef(null);
  const scrollIndRef = useRef(null);
  const contactSecRef = useRef(null);

  // ─── Hero reveal: re-mount case (navigating back, preloaderDone already true)
  useEffect(() => {
    gsap.set(taglineRef.current, { opacity: 0, y: 16, filter: "blur(6px)" });
    gsap.set(firstRef.current, { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.97 });
    gsap.set(lastRef.current, { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.97 });
    gsap.set(scrollIndRef.current, { opacity: 0 });

    if (!preloaderDone) return;

    const tl = gsap.timeline({ delay: 0.55 });
    tl.to(taglineRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" })
      .to(firstRef.current, { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.0, ease: "power4.out" }, "-=0.7")
      .to(lastRef.current, { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.0, ease: "power4.out" }, "-=0.85")
      .to(scrollIndRef.current, { opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.35");

    return () => tl.kill();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── First-load reveal (fires when preloader completes)
  useEffect(() => {
    if (!preloaderDone) return;
    const tl = gsap.timeline();
    tl.to(taglineRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" })
      .to(firstRef.current, { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.1, ease: "power4.out" }, "-=0.75")
      .to(lastRef.current, { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.1, ease: "power4.out" }, "-=0.9")
      .to(scrollIndRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4");
    return () => tl.kill();
  }, [preloaderDone]);

  // ─── Liquid cursor parallax on hero gradient (5 independent blobs)
  useEffect(() => {
    const hero = heroRef.current;
    const grad = gradientRef.current;
    if (!hero || !grad) return;

    let rafId;
    let mouse = { x: 65, y: 35 };
    let b1 = { x: 65, y: 35 };
    let b2 = { x: 75, y: 20 };
    let b3 = { x: 50, y: 72 };
    let b4 = { x: 80, y: 60 };
    let b5 = { x: 40, y: 20 };

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 100;
      mouse.y = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      b1.x = lerp(b1.x, mouse.x, 0.032);
      b1.y = lerp(b1.y, mouse.y, 0.032);
      b2.x = lerp(b2.x, mouse.x + 15, 0.048);
      b2.y = lerp(b2.y, mouse.y - 18, 0.048);
      b3.x = lerp(b3.x, mouse.x - 14, 0.065);
      b3.y = lerp(b3.y, mouse.y + 24, 0.065);
      b4.x = lerp(b4.x, mouse.x + 28, 0.028);
      b4.y = lerp(b4.y, mouse.y + 18, 0.028);
      b5.x = lerp(b5.x, 100 - mouse.x, 0.022);

      grad.style.background = [
        `radial-gradient(ellipse 75% 65% at ${b1.x}% ${b1.y}%, rgba(201,20,0,0.82) 0%, transparent 58%)`,
        `radial-gradient(ellipse 45% 40% at ${b2.x}% ${b2.y}%, rgba(255,40,0,0.70) 0%, transparent 52%)`,
        `radial-gradient(ellipse 58% 52% at ${b3.x}% ${b3.y}%, rgba(38,0,0,0.90)   0%, transparent 60%)`,
        `radial-gradient(ellipse 35% 32% at ${b4.x}% ${b4.y}%, rgba(180,10,0,0.55) 0%, transparent 48%)`,
        `radial-gradient(ellipse 42% 38% at ${b5.x}% ${b5.y}%, rgba(10,0,0,0.50)   0%, transparent 55%)`,
      ].join(", ");

      rafId = requestAnimationFrame(tick);
    };

    hero.addEventListener("mousemove", onMove, { passive: true });
    tick();

    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ─── Portrait scroll reveal
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0, x: 60, filter: "blur(20px)", duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, []);

  // ─── Contact section scroll-driven background + text inversion
  useEffect(() => {
    const el = contactSecRef.current;
    if (!el) return;

    const ST_CONFIG = { trigger: el, start: "top 72%", end: "top 8%", scrub: 1.8 };

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { backgroundColor: "#0a0a0a", color: "#f0f0f0" },
        { backgroundColor: "#f2f0ed", color: "#0a0a0a", ease: "none", scrollTrigger: ST_CONFIG }
      );
      const row = el.querySelector(".lk-hc-row");
      if (row) {
        gsap.fromTo(row,
          { borderTopColor: "rgba(255,255,255,0.08)" },
          { borderTopColor: "rgba(10,10,10,0.12)", ease: "none", scrollTrigger: ST_CONFIG }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="lk-home">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="lk-hero-scroll-wrap">
        <section ref={heroRef} className="lk-hero" aria-label="Hero">
          <div className="lk-hero-canvas" aria-hidden="true">
            <div ref={gradientRef} className="lk-hero-gradient" />
          </div>

          <p ref={taglineRef} className="lk-hero-tagline">
            Quiet creator,{" "}
            <em>bringing ideas to life,</em>
            <br />
            through motion, detail and softness.
          </p>

          <div className="lk-hero-name" aria-label="Gautam Makwana">
            <span ref={firstRef} className="lk-hero-first">Gautam</span>
            <span ref={lastRef} className="lk-hero-last">Makwana<span className="lk-fn-dot">.</span></span>
          </div>

          <div ref={scrollIndRef} className="lk-hero-scroll-ind" aria-hidden="true">
            <span className="lk-scroll-line" />
          </div>
        </section>
      </div>

      {/* ── Sections below hero ──────────────────────────────────────────── */}
      <div className="lk-section-after">

        {/* ── About ─────────────────────────────────────────────────────── */}
        <section className="lk-about" id="about" aria-label="About">
          <div className="lk-about-photo-wrap">
            <img ref={photoRef} className="lk-about-photo"
              src={meImage} alt="Gautam Makwana portrait" loading="lazy" />
          </div>
          <p
            className="lk-about-text"
            style={{ display: window.innerWidth >= 1024 ? "block" : "none" }}
          >
            <ScrollRevealText text="Mostly focused on the backend side architecting servers, automating CI/CD pipelines, and streamlining DevOps deployments." />
          </p>
          <div className="lk-about-sub">
            <ScrollRevealText text="I specialize in building robust backend systems and cloud infrastructures, while keeping frontend and interactive design as a strong second half." />
          </div>
          <div className="lk-about-btn">
            <button type="button" onClick={() => onNavigate("info")}>→ About me</button>
          </div>
        </section>

        {/* ── Statement ─────────────────────────────────────────────────── */}
        <section className="lk-statement" aria-label="Statement">
          <div className="lk-statement-inner">
            <p className="lk-statement-label">What drives me</p>
            <h2 className="lk-statement-text">
              <ScrollRevealText text="I craft tailor-made web experiences where technical precision meets emotion. Passionate about animation, interaction and detail, I always seek the symbiosis between art and information." />
            </h2>
            <div className="lk-statement-cta">
              <button type="button" onClick={() => onNavigate("work")}>See my work</button>
              <button type="button" onClick={() => onNavigate("contact")} className="lk-cta-secondary">Get in touch</button>
            </div>
          </div>
        </section>

        {/* ── Skills ────────────────────────────────────────────────────── */}
        <section className="lk-skills" id="skills" aria-label="Skills">
          <div className="lk-skills-inner">
            <div className="lk-skills-left">
              <p className="lk-skills-subtitle">Tools I use to build things.</p>
              <h2 className="lk-skills-heading">WHAT I<br />WORK WITH</h2>
              <div className="lk-skills-sep" />
            </div>
            <div className="lk-skills-right">
              {skillGroups.map(group => <SkillGroup key={group.title} group={group} />)}
            </div>
          </div>
        </section>

        {/* ── Contact strip — scroll bg inversion ───────────────────────── */}
        <section ref={contactSecRef} className="lk-home-contact" id="contact-strip" aria-label="Contact">
          <div className="lk-hc-inner">
            <h2 className="lk-hc-heading">Contact</h2>
            <div className="lk-hc-row">
              <div className="lk-hc-left">
                <div className="lk-hc-socials">
                  <ChrLink text="GitHub" href="https://github.com/makwanagautam41" className="lk-hc-social-chr" />
                  <ChrLink text="LinkedIn" href="https://www.linkedin.com/in/gautammakwana/" className="lk-hc-social-chr" />
                  <ChrLink text="Instagram" href="https://www.instagram.com/_gautam.makwana" className="lk-hc-social-chr" />
                </div>
                <a className="lk-hc-email" href="mailto:gautammakwana.dev@gmail.com">
                  gautammakwana.dev@gmail.com@gmail.com
                </a>
              </div>
              <p className="lk-hc-avail">
                I&apos;m available for{" "}
                <em>freelance missions worldwide,</em>{" "}
                on your ambitious projects and international collaborations.
              </p>
            </div>
            <div className="lk-hc-cta">
              <button type="button" onClick={() => onNavigate("contact")}>Get in touch →</button>
            </div>
          </div>
        </section>

        {/* ── Footer — full viewport height, lukebaffait style ──────────── */}
        <footer
          className="lk-home-footer"
          aria-label="Site footer"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
          }}
        >

          {/* Top row:
              Desktop  → meta(left) | socials(center) | nav(right)
              Mobile   → [socials left | nav right] at top, meta centered below */}
          <div className="lk-footer-top">

            {/* Email + year — left on desktop, center on mobile */}
            <div className="lk-footer-meta">
              <a href="mailto:gautammakwana.dev@gmail.com" className="lk-footer-email">
                gautammakwana.dev@gmail.com
              </a>
              <span className="lk-footer-copy">© 2026</span>
            </div>

            {/* Socials + Nav pair — center+right on desktop, left+right on mobile */}
            <div className="lk-footer-links-pair">
              <nav className="lk-footer-socials" aria-label="Social links">
                <ChrLink text="GITHUB" href="https://github.com/makwanagautam41" className="lk-footer-chr" />
                <ChrLink text="LINKEDIN" href="https://www.linkedin.com/in/gautammakwana/" className="lk-footer-chr" />
                <ChrLink text="INSTAGRAM" href="https://www.instagram.com/_gautam.makwana" className="lk-footer-chr" />
              </nav>

              <nav className="lk-footer-nav" aria-label="Page navigation">
                <ChrFooterBtn text="WORK" onClick={() => onNavigate("work")} />
                <ChrFooterBtn text="INFO" onClick={() => onNavigate("info")} />
                <ChrFooterBtn text="CONTACT" onClick={() => onNavigate("contact")} />
              </nav>
            </div>

          </div>

          {/* Particle decoration */}
          <div className="lk-footer-particles" aria-hidden="true" />

          {/* Big name — FK Grotesk "Gautam" + Apparel Display italic "Makwana." */}
          <div className="lk-footer-bigname" aria-label="Gautam Makwana">
            <span className="lk-fn-first">Gautam<span className="lk-fn-dot">.</span></span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default LkHomePage;
