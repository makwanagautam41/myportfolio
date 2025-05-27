import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./FullScreenAnimation.css"; 

const FullScreenAnimation = ({ onComplete }) => {
  const fsRef = useRef(null);
  const elemRef = useRef(null);
  const whiteRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let tl = gsap.timeline({
      onComplete: () => {
        containerRef.current.style.display = "none"; 
        onComplete();
      },
    });

    tl.to(textRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "expo.out",
    })
      .to(textRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "expo.inOut",
      })
      .to(
        fsRef.current,
        {
          height: 0,
          duration: 2,
          ease: "expo.inOut",
        },
        "-=1"
      )
      .to(
        elemRef.current,
        {
          height: "100%",
          duration: 1.5,
          ease: "expo.inOut",
        },
        "-=2"
      )
      .to(
        whiteRef.current,
        {
          height: "100%",
          duration: 2,
          ease: "expo.inOut",
        },
        "-=2"
      );
  }, [onComplete]);

  return (
    <div ref={containerRef} className="animation-container">
      <div ref={fsRef} className="fs"></div>
      <div ref={elemRef} className="elem"></div>
      <div ref={whiteRef} className="white"></div>
      <div ref={textRef} className="text">
        Gautam{" "}
        <span>
          <i>Makwana</i>
        </span>
        !
      </div>
    </div>
  );
};

export default FullScreenAnimation;
