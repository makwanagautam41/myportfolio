import React, { useEffect, useRef } from "react";
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
      <span className="cursor-dot" ref={dotRef} />
      <span className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default Cursor;
