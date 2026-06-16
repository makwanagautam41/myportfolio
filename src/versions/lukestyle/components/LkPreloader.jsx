/**
 * LkPreloader — Reliable scale-up name reveal
 *
 * FLOW:
 *   1. Text appears at a clearly VISIBLE size centered on screen
 *   2. Scales up + drifts to bottom (fills screen width)
 *   3. Brief hold → entire panel fades out → home page shown
 *
 * Fixes:
 *   - Uses document.fonts.ready before measuring (fonts must be loaded)
 *   - Starts at scale 1 (natural font size = visible), no invisible 0.08 trick
 *   - Base font ~6vw so initial appearance is clearly readable
 *   - targetScale computed from actual rendered width after fonts load
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LkPreloader.css";

// Must match hero CSS bottom offset: calc(3rem + 4.5rem)
const HERO_BOTTOM_PX = (3 + 4.5) * 16; // 120px

const LkPreloader = ({ onComplete }) => {
  const panelRef = useRef(null);
  const wrapRef  = useRef(null);
  const firstRef = useRef(null);
  const lastRef  = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    const wrap  = wrapRef.current;
    const first = firstRef.current;
    const last  = lastRef.current;
    if (!panel || !wrap || !first || !last) return;

    let tl;

    // GSAP owns the transform — center the container
    gsap.set(wrap, { xPercent: -50, yPercent: -50, scale: 1, y: 0 });
    // Names visible from the start (base font size is already readable)
    gsap.set([first, last], { opacity: 0 });

    // Wait for fonts to load THEN measure for correct dimensions
    const run = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const rect     = wrap.getBoundingClientRect();
      const naturalW = rect.width  || vw * 0.5; // fallback
      const naturalH = rect.height || 80;        // fallback

      // How much to scale so text fills 95% of screen width
      const targetScale = Math.min((vw * 0.95) / naturalW, 5);

      // Move wrap center down so text BOTTOM = vh - HERO_BOTTOM_PX
      const scaledH = naturalH * targetScale;
      const deltaY  = (vh - HERO_BOTTOM_PX - scaledH / 2) - (vh / 2);

      tl = gsap.timeline({
        onComplete: () => {
          // Pause, then fade ENTIRE panel (text + background)
          gsap.to(panel, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete,
          });
        },
      });

      // 1 — Names fade in at natural (visible) size, centered
      tl.to([first, last], {
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.1,
      })

      // 2 — Scale up + drift to bottom (single smooth motion)
      .to(wrap, {
        scale: targetScale,
        y: deltaY,
        duration: 1.5,
        ease: "power3.inOut",
      }, "+=0.4")

      // 3 — Hold briefly at full size
      .to({}, { duration: 0.2 });
    };

    // Wait for fonts, then run (with 100ms minimum so fonts finish rasterising)
    document.fonts.ready.then(() => {
      setTimeout(run, 100);
    });

    return () => {
      if (tl) tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={panelRef} className="lk-preloader" aria-hidden="true">
      <div ref={wrapRef} className="lk-pre-inner">
        <span ref={firstRef} className="lk-pre-first">Gautam</span>
        <span ref={lastRef}  className="lk-pre-last">Makwana.</span>
      </div>
    </div>
  );
};

export default LkPreloader;
