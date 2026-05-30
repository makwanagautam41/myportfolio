/**
 * ScrollStack — Full-viewport card-stack animation
 *
 * Architecture
 * ────────────
 * • Outer <section> is (count * slotH + vh) px tall — provides scroll room.
 * • Inner <div> is `position: sticky; top: 0; height: 100vh` — viewport lock.
 * • Each card wrapper is `position: absolute; inset: 0` — always 100 × 100vh.
 * • JS only touches `transform`, `filter`, `zIndex`, `opacity` — nothing else.
 *
 * Scroll model  (slot = vh + itemDistance)
 * ─────────────────────────────────────────
 *   activeIndex  = min(count-1,  floor(scrolled / slot))
 *   subP         = (scrolled - activeIndex*slot) / slot   ← 0→1 within active slot
 *
 * Card states
 * ───────────
 *   ACTIVE  (i === activeIndex)          scale 1→baseScale, blur 0→blurAmount — sits below rising NEXT
 *   NEXT    (i === activeIndex + 1)      rises from translateY(100%)→0, scale 0.92→1, z ABOVE active
 *   PASSED  (i < activeIndex)            scale baseScale-(depth-1)*itemScale, blurred, stacked
 *   QUEUED  (i > activeIndex + 1)        parked below viewport (translateY 100%), opacity 0
 */

import React, { useEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";

/* ─── ScrollStackItem ─────────────────────────────────────────────────────── */
export const ScrollStackItem = ({ children, className = "" }) => (
  <div className={`scroll-stack-item ${className}`}>{children}</div>
);

/* ─── ScrollStack ─────────────────────────────────────────────────────────── */
const ScrollStack = ({
  children,
  itemDistance    = 0,
  itemStackDistance = 30,
  stackPosition   = "15%",   // kept for API compat; visual handled by CSS perspective
  baseScale       = 0.88,
  itemScale       = 0.04,
  blurAmount      = 2,
}) => {
  const sectionRef = useRef(null);
  const itemsRef   = useRef([]);
  const rafRef     = useRef(null);

  const setItemRef = useCallback((el, i) => {
    if (el) itemsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = itemsRef.current.filter(Boolean);
    const count = items.length;
    if (!count) return;

    // ─── Helpers ──────────────────────────────────────────────────────────
    const vh   = () => window.innerHeight;
    const slot = () => vh() + itemDistance; // scroll distance per card

    // Section height gives scroll room.
    // Formula:  totalH = count * slot + vh
    //   scrollable = totalH - vh = count * slot
    //   activeIndex = min(count-1, floor(scrolled / slot))
    //
    // Why +1 slot vs old formula:
    //   OLD  (count-1)*slot + vh → last card had 0 dwell; sticky unpinned
    //        the instant it became active → footer appeared mid-card.
    //   NEW  count*slot + vh     → last card gets a full slot of scroll room
    //        so it stays pinned at full-screen until the user scrolls past it.
    const setHeight = () => {
      section.style.height = `${count * slot() + vh()}px`;
    };
    setHeight();

    // ─── Per-frame update ─────────────────────────────────────────────────
    const update = () => {
      const rect     = section.getBoundingClientRect();
      const viewH    = vh();
      const s        = slot();
      const scrolled = Math.max(0, -rect.top); // px scrolled past section top

      // Which card is currently "active"
      const activeIdx = Math.min(count - 1, Math.floor(scrolled / s));
      // Sub-progress within the active slot (0 = just entered, 1 = just leaving)
      const isLast = activeIdx === count - 1;
      const subP   = isLast
        ? 0
        : Math.min(1, (scrolled - activeIdx * s) / s);

      items.forEach((item, i) => {
        if (i === activeIdx) {
          // ── ACTIVE ──────────────────────────────────────────────────────
          // Scales down and blurs as the next card rises over it.
          // z-index is BELOW the rising NEXT card so NEXT slides on top.
          const scale = isLast ? 1 : 1 - (1 - baseScale) * subP;
          const blur  = isLast ? 0 : blurAmount * subP;

          item.style.transform       = `scale(${scale})`;
          item.style.filter          = `blur(${blur}px)`;
          item.style.zIndex          = count + 5;   // below NEXT card
          item.style.opacity         = "1";
          item.style.transformOrigin = "center center";

        } else if (i === activeIdx + 1) {
          // ── NEXT — rises from below, growing to fill the screen ──────────
          //
          // subP 0 → 1 (driven by scroll through the ACTIVE card's slot):
          //   translateY  : 100% (fully below viewport)  →  0% (full screen)
          //   scale       : 0.92 (slightly small at entry)  →  1.0 (full)
          //
          // z-index is ABOVE the active card — the rising card slides over it.
          const riseY   = (1 - subP) * 100;               // 100 → 0  (% of element height)
          const riseScale = 0.92 + 0.08 * subP;           // 0.92 → 1.0

          item.style.transform       = `translateY(${riseY}%) scale(${riseScale})`;
          item.style.filter          = "blur(0px)";
          item.style.zIndex          = count + 10;  // above ACTIVE — slides over it
          item.style.opacity         = "1";
          item.style.transformOrigin = "center center";

        } else if (i < activeIdx) {
          // ── PASSED / STACKED ────────────────────────────────────────────
          // Cards pile up behind — each slightly smaller and nudged upward.
          const depth   = activeIdx - i;           // 1 = most recent, 2, 3…
          const scale   = Math.max(0.5, baseScale - (depth - 1) * itemScale);
          const yOffset = (depth - 1) * itemStackDistance;

          item.style.transform       = `scale(${scale}) translateY(-${yOffset}px)`;
          item.style.filter          = `blur(${blurAmount}px)`;
          item.style.zIndex          = i + 1;      // older = lower
          item.style.opacity         = "1";
          item.style.transformOrigin = "center center";

        } else {
          // ── FAR QUEUED ──────────────────────────────────────────────────
          // Park cards that are 2+ positions ahead below the viewport so they
          // are ready to rise without any pop when they become NEXT.
          item.style.transform       = "translateY(100%) scale(0.92)";
          item.style.filter          = "blur(0px)";
          item.style.zIndex          = i + 1;
          item.style.opacity         = "0";
          item.style.transformOrigin = "center center";
        }
      });
    };

    // ─── Scroll listener (throttled with rAF) ────────────────────────────
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // initial paint

    // Recalculate on resize
    const ro = new ResizeObserver(() => { setHeight(); update(); });
    ro.observe(section);

    // ─── Cleanup ─────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      section.style.height = "";
      items.forEach((item) => {
        item.style.transform = "";
        item.style.filter    = "";
        item.style.zIndex    = "";
        item.style.opacity   = "";
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseScale, blurAmount, itemDistance, itemScale, itemStackDistance]);

  const childArray = React.Children.toArray(children);

  return (
    <section className="scroll-stack-section" ref={sectionRef} id="work">
      <div className="scroll-stack-sticky">
        {childArray.map((child, i) => (
          <div
            key={i}
            className="scroll-stack-item-wrap"
            ref={(el) => setItemRef(el, i)}
          >
            {child}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollStack;
