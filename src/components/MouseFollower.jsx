import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MouseFollower = () => {
  const followerRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const moveCursor = (e) => {
      if (
        e.target.tagName.toLowerCase() === "a" ||
        e.target.tagName.toLowerCase() === "span"
      ) {
        gsap.to(followerRef.current, { opacity: 0, duration: 0.2 }); // Hide on buttons
      } else {
        gsap.to(followerRef.current, {
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    const enlargeCursor = () =>
      gsap.to(followerRef.current, {
        scale: 3,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        duration: 0.2,
      });
    const resetCursor = () =>
      gsap.to(followerRef.current, {
        scale: 1,
        backgroundColor: "red",
        duration: 0.2,
      });

    window.addEventListener("mousemove", moveCursor);
    document
      .querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a")
      .forEach((el) => {
        el.addEventListener("mouseenter", enlargeCursor);
        el.addEventListener("mouseleave", resetCursor);
      });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document
        .querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a")
        .forEach((el) => {
          el.removeEventListener("mouseenter", enlargeCursor);
          el.removeEventListener("mouseleave", resetCursor);
        });
    };
  }, []);

  if (window.innerWidth < 768) return null;

  return (
    <div
      ref={followerRef}
      style={{
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: "50%",
        position: "fixed",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        opacity: 1, // Default visible
      }}
    />
  );
};

export default MouseFollower;
