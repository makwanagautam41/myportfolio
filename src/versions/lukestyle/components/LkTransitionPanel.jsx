/**
 * LkTransitionPanel — Label flies FROM the clicked nav button's position TO top-left.
 *
 * Props:
 *   label       — text to show (e.g. "WORK")
 *   fromRect    — { x, y, width, height } of the clicked button (screen coords)
 *   onMidpoint  — fires when red panel covers screen (swap page here)
 *   onComplete  — fires when animation is fully done
 *
 * Timeline:
 *   1. Red panel sweeps up from bottom
 *   2. Label appears AT the button's position
 *   3. Label slides to top-left corner (3rem, 3rem)
 *   4. onMidpoint() fires
 *   5. Dark panel covers red
 *   6. Both exit downward → onComplete()
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LkTransitionPanel.css";

const LkTransitionPanel = ({ label, fromRect, onMidpoint, onComplete }) => {
  const redRef   = useRef(null);
  const darkRef  = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const red   = redRef.current;
    const dark  = darkRef.current;
    const lbl   = labelRef.current;
    if (!red || !dark || !lbl) return;

    // Starting position: where the button was on screen
    const startX = fromRect?.x ?? window.innerWidth / 2;
    const startY = fromRect?.y ?? window.innerHeight - 80;

    // Set label to start at button position
    gsap.set(lbl, {
      left: startX,
      top: startY,
      opacity: 0,
      fontSize: "1.05rem",
    });

    const tl = gsap.timeline();

    // 1. Red panel sweeps up
    tl.to(red, { y: "0%", duration: 0.55, ease: "power3.inOut" })

    // 2. Label appears at button position
    .to(lbl, { opacity: 1, duration: 0.18, ease: "power2.out" }, "-=0.2")

    // 3. Label travels to top-left
    .to(lbl, {
      left: "3rem",
      top: "3rem",
      duration: 0.6,
      ease: "power3.inOut",
    })

    // 4. Swap page
    .add(() => onMidpoint(), "+=0.05")

    // 5. Dark panel sweeps up
    .to(dark, { y: "0%", duration: 0.52, ease: "power3.inOut" }, "+=0.02")
    .to(lbl, { opacity: 0, duration: 0.2 }, "-=0.45")

    // 6. Both exit downward
    .to([red, dark], {
      y: "-100%",
      duration: 0.48,
      ease: "power3.inOut",
      stagger: 0.05,
      onComplete,
    });

    return () => tl.kill();
  }, []); // eslint-disable-line

  return (
    <div className="lk-tp-wrap" aria-hidden="true">
      <div ref={redRef}  className="lk-tp-red">
        <span ref={labelRef} className="lk-tp-label">{label}</span>
      </div>
      <div ref={darkRef} className="lk-tp-dark" />
    </div>
  );
};

export default LkTransitionPanel;
