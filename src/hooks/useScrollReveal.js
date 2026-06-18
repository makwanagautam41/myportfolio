import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { DURATION, EASE } from "../lib/motion-constants";

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      if (prefersReducedMotion) {
        gsap.set(element, { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.fromTo(
        element,
        {
          opacity: options.fromOpacity ?? 0,
          y: options.fromY ?? 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? DURATION.reveal,
          ease: options.ease ?? EASE.standardOut,
          scrollTrigger: {
            trigger: element,
            start: options.start ?? "top 82%",
            end: options.end,
            scrub: options.scrub,
            toggleActions: options.toggleActions ?? "play none none reverse",
          },
        }
      );
    },
    { scope: ref, dependencies: [prefersReducedMotion] }
  );

  return ref;
};
