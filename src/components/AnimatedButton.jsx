import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const AnimatedButton = ({ text, href, download }) => {
  const xTo = useRef(null);
  const yTo = useRef(null);
  const buttonRef = useRef(null);
  const divRef = useRef(null);
  const textRef = useRef(null);
  const [gradient, setGradient] = useState("to right, white 0%, white 100%");

  const { contextSafe } = useGSAP(
    () => {
      xTo.current = gsap.quickTo(divRef.current, "x", {
        duration: 0.8,
        ease: "power3",
      });
      yTo.current = gsap.quickTo(divRef.current, "y", {
        duration: 0.8,
        ease: "power3",
      });

      gsap.set(divRef.current, {
        scale: 0,
        xPercent: -50,
        yPercent: -50,
        zIndex: -10,
      });
    },
    { scope: buttonRef }
  );

  const handleMouseEnter = contextSafe(() => {
    if (divRef.current) {
      gsap.to(divRef.current, { scale: 1, duration: 0.3 });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (divRef.current) {
      gsap.to(divRef.current, { scale: 0, duration: 0.3 });
    }
    setGradient("to right, white 0%, white 100%");
  });

  const handleMouseMove = contextSafe((e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xTo.current(x);
      yTo.current(y);

      // Check if text is inside the hover area
      if (divRef.current && textRef.current) {
        const hoverRect = divRef.current.getBoundingClientRect();
        const textRect = textRef.current.getBoundingClientRect();

        const intersectionLeft = Math.max(hoverRect.left, textRect.left);
        const intersectionRight = Math.min(hoverRect.right, textRect.right);
        const intersectionWidth = intersectionRight - intersectionLeft;
        const textWidth = textRect.width;

        if (intersectionWidth > 0) {
          const percentageCovered = (intersectionWidth / textWidth) * 100;

          setGradient(
            `to right, black ${percentageCovered}%, white ${
              percentageCovered + 5
            }%`
          );
        } else {
          setGradient("to right, white 0%, white 100%");
        }
      }
    }
  });

  return (
    <a
      href={href}
      download={download ? "" : undefined}
      className="button button--flex"
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        border: "1px solid #000",
        padding: "10px 20px",
        borderRadius: "24px",
        color: "#4f9e8e",
        overflow: "hidden",
        background: "#000",
        cursor: "pointer",
        zIndex: 0,
        display: "inline-block",
        textDecoration: "none",
        transition: "color 0.3s ease-in-out",
      }}
    >
      <div
        ref={divRef}
        style={{
          position: "absolute",
          width: "200px",
          height: "150px",
          backgroundColor: "#fff",
          left: 0,
          top: 0,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: -10,
        }}
      ></div>
      <span
        ref={textRef}
        style={{
          position: "relative",
          zIndex: 10,
          backgroundImage: `linear-gradient(${gradient})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {text}
      </span>
    </a>
  );
};

export default AnimatedButton;
