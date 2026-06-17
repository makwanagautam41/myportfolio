/**
 * LkPreloader — Premium Cinematic Preloader
 *
 * SEQUENCE (≈ 4.5s total):
 *  0.00s  – Panel in. Ambient glow blooms.
 *  0.20s  – Progress bar + counter appear at bottom.
 *  0.40s  – "Creating digital" reveals char-by-char while counter ticks 0→60
 *  1.20s  – "experiences." reveals char-by-char, counter continues 60→100
 *  2.30s  – Counter reaches 100, bar fills. Brief hold.
 *  2.70s  – Counter HUD slides down/out.
 *  2.90s  – Subtitle fades in.
 *  3.40s  – Hold, then panel scales + fades → onComplete.
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LkPreloader.css";

/* ─── helper: split element text into <span class="lk-pc"> chars ──────────── */
const splitChars = (el) => {
  const raw = el.textContent.trim();
  el.innerHTML = "";
  [...raw].forEach((ch) => {
    const s = document.createElement("span");
    s.className = "lk-pc";
    s.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(s);
  });
  return el.querySelectorAll(".lk-pc");
};

/* ─── component ───────────────────────────────────────────────────────────── */
const LkPreloader = ({ onComplete }) => {
  const panelRef      = useRef(null);
  const glowRef       = useRef(null);
  const line1Ref      = useRef(null);
  const line2Ref      = useRef(null);
  const subtitleRef   = useRef(null);
  const barTrackRef   = useRef(null);
  const barFillRef    = useRef(null);
  const counterRef    = useRef(null);
  const counterHUDRef = useRef(null);
  const overlayRef    = useRef(null);

  useEffect(() => {
    const panel      = panelRef.current;
    const glow       = glowRef.current;
    const line1      = line1Ref.current;
    const line2      = line2Ref.current;
    const subtitle   = subtitleRef.current;
    const barTrack   = barTrackRef.current;
    const barFill    = barFillRef.current;
    const counter    = counterRef.current;
    const counterHUD = counterHUDRef.current;
    const overlay    = overlayRef.current;

    if (!panel || !line1 || !line2) return;

    const chars1 = splitChars(line1);
    const chars2 = splitChars(line2);

    /* ── initial states ─────────────────────────────────────────────────── */
    gsap.set(panel,       { opacity: 1 });
    gsap.set(glow,        { opacity: 0, scale: 0.85 });
    gsap.set([...chars1, ...chars2], { opacity: 0, y: 24, filter: "blur(10px)" });
    gsap.set(barTrack,    { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(barFill,     { scaleX: 0, transformOrigin: "left center" });
    gsap.set(counterHUD,  { opacity: 0, y: 14 });
    gsap.set(subtitle,    { opacity: 0, y: 14, filter: "blur(8px)" });
    gsap.set(overlay,     { opacity: 0 });

    const counterObj = { val: 0 };

    /* ── master timeline ─────────────────────────────────────────────────── */
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    /* 0 — glow bloom */
    tl.to(glow, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 0)

    /* 1 — HUD + bar appear */
      .to(counterHUD, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
      .to(barTrack,   { opacity: 1, scaleX: 1, duration: 0.45, ease: "power2.inOut" }, 0.25)

    /* 2 — progress fills + counter ticks (over the whole char-reveal window) */
      .to(barFill, { scaleX: 1, duration: 2.2, ease: "power1.inOut" }, 0.3)
      .to(counterObj, {
        val: 100,
        duration: 2.2,
        ease: "power1.inOut",
        onUpdate() {
          if (counter) {
            counter.textContent = Math.round(counterObj.val).toString().padStart(3, "0");
          }
        },
      }, 0.3)

    /* 3 — Line 1 char stagger (starts with counter) */
      .to(chars1, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.7,
        stagger: { each: 0.034, ease: "power2.out" },
      }, 0.4)

    /* 4 — Line 2 char stagger (overlaps, after line 1 is ~halfway done) */
      .to(chars2, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.7,
        stagger: { each: 0.034, ease: "power2.out" },
      }, 1.1)

    /* 5 — Hold a beat after 100% */
      .to({}, { duration: 0.38 })

    /* 6 — HUD slides out */
      .to(counterHUD, { opacity: 0, y: 20, duration: 0.4, ease: "power2.in" })

    /* 7 — Subtitle fades in */
      .to(subtitle, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, "-=0.1")

    /* 8 — Hold, then flash overlay + fade panel */
      .to({}, { duration: 0.5 })
      .to(overlay, { opacity: 1, duration: 0.3, ease: "power2.in" })
      .to(panel, {
        opacity: 0,
        scale: 1.03,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete,
      }, "-=0.1");

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={panelRef} className="lk-preloader" aria-hidden="true">

      {/* Ambient glow */}
      <div ref={glowRef} className="lk-pre-glow" />

      {/* Main text reveal lines */}
      <div className="lk-pre-lines">
        <p ref={line1Ref} className="lk-pre-line lk-pre-line1">
          Creating digital
        </p>
        <p ref={line2Ref} className="lk-pre-line lk-pre-line2">
          experiences.
        </p>
      </div>

      {/* Subtitle */}
      <p ref={subtitleRef} className="lk-pre-subtitle">
        I design and build modern web products with precision, motion, and purpose.
      </p>

      {/* Progress HUD — pinned to bottom */}
      <div ref={counterHUDRef} className="lk-pre-hud">
        <div ref={barTrackRef} className="lk-pre-bar-track">
          <div ref={barFillRef} className="lk-pre-bar-fill" />
        </div>
        <span ref={counterRef} className="lk-pre-counter">000</span>
        <span className="lk-pre-pct">%</span>
      </div>

      {/* Exit flash */}
      <div ref={overlayRef} className="lk-pre-overlay" />
    </div>
  );
};

export default LkPreloader;
