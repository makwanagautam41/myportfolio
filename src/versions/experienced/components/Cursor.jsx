import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursor.css";

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
      if (target) ringRef.current?.classList.add("is-active");
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("a, button, input, textarea, .exp-project-row, [role='button']");
      if (target) ringRef.current?.classList.remove("is-active");
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

export default Cursor;
