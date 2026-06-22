/**
 * LkWorkPage — Hover-following square preview (dennissnellenberg.com/work style)
 *   - Full-width project list
 *   - Square preview follows cursor (gsap.quickTo, smooth lag, offset)
 *   - Direction-aware slide: moving DOWN the list → image enters bottom→top.
 *     Moving UP the list → image enters top→bottom. Old slot exits opposite way.
 *   - Square never hides between hovers, only on leaving the whole list
 *     OR while the cursor is over an *expanded* project's detail panel
 *     (fades out smoothly there, fades back in once cursor leaves that panel)
 *   - True square shape (width === height via CSS var), padded color frame
 *     around the image (bg color visible as border, not edge-to-edge image)
 *   - Click still expands inline detail (kept from previous version)
 *   - prefers-reduced-motion respected, gsap.context for full cleanup
 */
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/data";
import LkHoverText from "../components/LkHoverText";
import "./LkWorkPage.css";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";
const EASE_PANEL = "power4.inOut";
const EASE_SLIDE = "power3.inOut";
const SLIDE_DURATION = 0.75;
const CURSOR_OFFSET_X = 40;
const CURSOR_OFFSET_Y = -30;

const getImageLuminance = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 16, 16);
        const data = ctx.getImageData(0, 0, 16, 16).data;
        let sum = 0;
        for (let i = 0; i < data.length; i += 4) {
          sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        }
        resolve(sum / (data.length / 4));
      } catch (err) {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

const LkWorkPage = ({ onNavigate }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  // NEW: true while the cursor sits over an *open* project's detail panel.
  // Used to smoothly hide the floating square at that position, regardless
  // of isHovering (which still tracks whether we're inside the list at all).
  const [isOverOpenDetail, setIsOverOpenDetail] = useState(false);

  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const backRef = useRef(null);
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const detailRefs = useRef([]);

  const squareRef = useRef(null);
  const slotARef = useRef(null);
  const slotBRef = useRef(null);
  const activeSlotRef = useRef("a");
  const isFirstRun = useRef(true);
  const prevIdxRef = useRef(0);

  const quickX = useRef(null);
  const quickY = useRef(null);
  const reduceMotion = useRef(false);
  const luminanceCache = useRef(new Map());

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // ── Square preview follows cursor (quickTo, zero re-renders per mousemove) ──
  useEffect(() => {
    if (!squareRef.current) return;
    gsap.set(squareRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.92 });
    quickX.current = gsap.quickTo(squareRef.current, "x", { duration: 0.5, ease: "power3" });
    quickY.current = gsap.quickTo(squareRef.current, "y", { duration: 0.5, ease: "power3" });

    const move = (e) => {
      quickX.current(e.clientX + CURSOR_OFFSET_X);
      quickY.current(e.clientY + CURSOR_OFFSET_Y);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ── Show / hide square as a whole ──
  // Visible only when: cursor is inside the list AND not currently over an
  // expanded detail panel. Either condition flipping triggers a smooth
  // fade/scale — the square itself never jumps position, only opacity/scale.
  // IMPORTANT: no `overwrite: true` here — that would kill the quickTo x/y
  // tweens above (they live on the same target) and freeze the square in place.
  useEffect(() => {
    if (!squareRef.current) return;
    const shouldShow = isHovering && !isOverOpenDetail;
    gsap.to(squareRef.current, {
      opacity: shouldShow ? 1 : 0,
      scale: shouldShow ? 1 : 0.92,
      duration: 0.45,
      ease: EASE,
    });
  }, [isHovering, isOverOpenDetail]);

  // ── Page entrance + scroll-revealed rows ──
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowRefs.current.filter(Boolean);

      if (reduceMotion.current) {
        gsap.set([headerRef.current, backRef.current, ...rows], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([headerRef.current, backRef.current], { opacity: 0, y: -16 });
      gsap.set(rows, { opacity: 0, y: 32 });

      gsap
        .timeline({ defaults: { ease: EASE } })
        .to(headerRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(backRef.current, { opacity: 1, y: 0, duration: 0.6 }, "<0.1");

      ScrollTrigger.batch(rows, {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: EASE,
            stagger: 0.08,
            overwrite: true,
          }),
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // ── Square content: direction-aware vertical slide between projects ──
  useEffect(() => {
    let isActive = true;
    const showEl = activeSlotRef.current === "a" ? slotARef.current : slotBRef.current;
    const enterEl = activeSlotRef.current === "a" ? slotBRef.current : slotARef.current;
    if (!showEl || !enterEl) return;

    const project = projects[activeIdx];

    const applyBg = (lum) => {
      const bgColor = lum === null ? "var(--lk-surface)" : (lum > 150 ? "var(--lk-bg)" : "#f5f5f0");
      if (reduceMotion.current) {
        gsap.set(squareRef.current, { backgroundColor: bgColor });
      } else {
        gsap.to(squareRef.current, {
          backgroundColor: bgColor,
          duration: SLIDE_DURATION,
          ease: EASE_SLIDE,
          overwrite: "auto",
        });
      }
    };

    if (luminanceCache.current.has(project.image)) {
      applyBg(luminanceCache.current.get(project.image));
    } else {
      getImageLuminance(project.image).then((lum) => {
        if (!isActive) return;
        luminanceCache.current.set(project.image, lum);
        applyBg(lum);
      });
    }

    if (isFirstRun.current) {
      isFirstRun.current = false;
      showEl.src = project.image;
      gsap.set(showEl, { yPercent: 0 });
      gsap.set(enterEl, { yPercent: 100 });
      prevIdxRef.current = activeIdx;
      return () => { isActive = false; };
    }

    // moving to a project further DOWN the list (idx increasing) → bottom-to-top reveal
    // moving to a project further UP the list (idx decreasing) → top-to-bottom reveal
    const movingDown = activeIdx >= prevIdxRef.current;
    prevIdxRef.current = activeIdx;

    if (reduceMotion.current) {
      enterEl.src = project.image;
      gsap.set(enterEl, { yPercent: 0 });
      gsap.set(showEl, { yPercent: movingDown ? -100 : 100 });
      activeSlotRef.current = activeSlotRef.current === "a" ? "b" : "a";
      return () => { isActive = false; };
    }

    gsap.killTweensOf([showEl, enterEl]);
    enterEl.src = project.image;
    // entering image starts off-screen on the side it should travel FROM
    gsap.set(enterEl, { yPercent: movingDown ? 100 : -100 });

    gsap
      .timeline({ defaults: { duration: SLIDE_DURATION, ease: EASE_SLIDE } })
      .to(showEl, { yPercent: movingDown ? -100 : 100 }, 0) // old exits opposite direction
      .to(enterEl, { yPercent: 0 }, 0); // new settles into place

    activeSlotRef.current = activeSlotRef.current === "a" ? "b" : "a";

    return () => { isActive = false; };
  }, [activeIdx]);

  // ── Expand / collapse detail panel (real height + content stagger) ──
  useEffect(() => {
    projects.forEach((_, idx) => {
      const panel = detailRefs.current[idx];
      if (!panel) return;
      const inner = panel.firstElementChild;
      gsap.killTweensOf(panel);

      if (expanded === idx) {
        const targetHeight = inner.scrollHeight;
        gsap.fromTo(
          panel,
          { height: 0 },
          {
            height: targetHeight,
            duration: reduceMotion.current ? 0 : 0.6,
            ease: EASE_PANEL,
            onComplete: () => gsap.set(panel, { height: "auto" }),
          }
        );
        if (!reduceMotion.current) {
          gsap.fromTo(
            inner.querySelectorAll(
              ".lk-work-detail-img, .lk-work-detail-desc, .lk-work-detail-tag, .lk-work-detail-link"
            ),
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, ease: EASE, stagger: 0.04, delay: 0.1 }
          );
        }
      } else {
        gsap.to(panel, {
          height: 0,
          duration: reduceMotion.current ? 0 : 0.45,
          ease: EASE_PANEL,
        });
      }
    });

    // NEW: if a panel collapses while the cursor was "inside" it, make sure
    // the square isn't left stuck hidden — reset the flag whenever the
    // expanded project changes (closing or switching to another one).
    setIsOverOpenDetail(false);
  }, [expanded]);

  // ── Kill any in-flight tweens on unmount ──
  useEffect(() => {
    return () => {
      gsap.killTweensOf([
        squareRef.current,
        slotARef.current,
        slotBRef.current,
        ...detailRefs.current.filter(Boolean),
      ]);
    };
  }, []);

  const handleHover = useCallback((idx) => {
    setActiveIdx(idx);
    setIsHovering(true);
  }, []);

  // NEW: entering/leaving an *expanded* detail panel toggles the square's
  // visibility independently of row hover. Guarded by `expanded === idx` so
  // collapsed (height: 0) panels never trigger it.
  const handleDetailEnter = useCallback(
    (idx) => {
      if (expanded === idx) setIsOverOpenDetail(true);
    },
    [expanded]
  );

  const handleDetailLeave = useCallback(() => {
    setIsOverOpenDetail(false);
  }, []);

  return (
    <div className="lk-work" ref={rootRef}>
      {/* Fixed page header */}
      <div ref={headerRef} className="lk-work-header">
        <h1 className="lk-work-title">Work</h1>
      </div>

      {/* Back */}
      <LkHoverText
        ref={backRef}
        text="BACK"
        onClick={() => onNavigate("home")}
        className="lk-work-back"
      />

      {/* Project list — full width, square preview floats on top */}
      <div className="lk-work-list" ref={listRef} onMouseLeave={() => setIsHovering(false)}>
        <p className="lk-work-count">{projects.length} Projects</p>
        {projects.map((proj, idx) => (
          <div
            key={proj.title}
            ref={(el) => (rowRefs.current[idx] = el)}
            className={`lk-work-row${activeIdx === idx ? " active" : ""}${
              expanded === idx ? " expanded-row" : ""
            }`}
            onMouseEnter={() => handleHover(idx)}
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setExpanded(expanded === idx ? null : idx)}
            aria-expanded={expanded === idx}
          >
            <div className="lk-work-row-top">
              <span className="lk-work-row-num">{proj.number}</span>
              <span className="lk-work-row-name">{proj.title}</span>
              <span className="lk-work-row-client">{proj.client}</span>
              <span className="lk-work-row-year">{proj.year}</span>
            </div>

            {/* Expanded detail — height measured + animated by GSAP.
                Mouse enter/leave here drive the square's hide/show. */}
            <div
              ref={(el) => (detailRefs.current[idx] = el)}
              className={`lk-work-row-detail${expanded === idx ? " open" : ""}`}
              onMouseEnter={() => handleDetailEnter(idx)}
              onMouseLeave={handleDetailLeave}
            >
              <div className="lk-work-row-detail-inner">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="lk-work-detail-img"
                  loading="lazy"
                />
                <div className="lk-work-detail-info">
                  <p className="lk-work-detail-desc">{proj.desc}</p>
                  <div className="lk-work-detail-tags">
                    {proj.tech.map((t) => (
                      <span key={t} className="lk-work-detail-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="lk-work-detail-links">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="lk-work-detail-link">
                        GitHub →
                      </a>
                    )}
                    {proj.live ? (
                      <a href={proj.live} target="_blank" rel="noreferrer" className="lk-work-detail-link">
                        Live ↗
                      </a>
                    ) : (
                      <span className="lk-work-detail-link disabled">No Preview</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating square preview — follows cursor, content slides direction-aware */}
      <div ref={squareRef} className="lk-work-preview-square" aria-hidden="true">
        <div className="lk-work-preview-mask">
          <img ref={slotARef} className="lk-work-preview-slide" alt="" />
          <img ref={slotBRef} className="lk-work-preview-slide" alt="" />
        </div>
        <span className="lk-work-preview-view">View</span>
      </div>
    </div>
  );
};

export default LkWorkPage;