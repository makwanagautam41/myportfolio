/**
 * Experienced Version — GSAP Animation Functions
 * Pure animation helpers, each scoped to a specific element type.
 * Called from useExperiencedAnimations (and re-usable anywhere).
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Animate hero heading words up from a clip mask */
export const animateHeroWords = () => {
  if (!document.querySelector(".exp-hero .exp-word")) return;
  gsap.fromTo(
    ".exp-hero .exp-word",
    { y: "110%" },
    { y: "0%", duration: 0.85, stagger: 0.06, ease: "power3.out", delay: 0.12 }
  );
};

/** Fade in hero meta / scroll-cue */
export const animateHeroMeta = () => {
  if (!document.querySelector(".exp-hero-meta, .exp-scroll-cue")) return;
  gsap.fromTo(
    ".exp-hero-meta, .exp-scroll-cue",
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power2.out", delay: 0.65 }
  );
};

/** Stagger-reveal hero tagline chars on scroll */
export const animateHeroTagline = () => {
  if (!document.querySelector(".exp-hero-tagline .exp-char")) return;
  gsap.fromTo(
    ".exp-hero-tagline .exp-char",
    { y: "115%" },
    {
      y: "0%",
      duration: 0.72,
      stagger: 0.015,
      ease: "power3.out",
      scrollTrigger: { trigger: ".exp-hero-tagline", start: "top 85%" },
    }
  );
};

/** Stagger-reveal about-teaser chars on scroll */
export const animateAboutTeaserChars = () => {
  if (!document.querySelector(".exp-about-teaser .exp-char")) return;
  gsap.fromTo(
    ".exp-about-teaser .exp-char",
    { y: "115%" },
    {
      y: "0%",
      duration: 0.56,
      stagger: 0.008,
      ease: "power3.out",
      scrollTrigger: { trigger: ".exp-about-teaser", start: "top 82%" },
    }
  );
};

/** Fade-up reveal for all `.exp-reveal` elements on scroll */
export const animateRevealElements = () => {
  gsap.utils.toArray(".exp-reveal").forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 42 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 82%" },
      }
    );
  });
};

/** Stagger project rows into view when the work list enters the viewport */
export const animateWorkListRows = () => {
  if (!document.querySelector(".exp-work-list")) return;
  gsap.fromTo(
    ".exp-project-row",
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.09,
      ease: "power2.out",
      scrollTrigger: { trigger: ".exp-work-list", start: "top 78%" },
    }
  );
};

/** Stagger footer title chars into view on scroll */
export const animateFooterTitle = () => {
  if (!document.querySelector(".exp-footer-title .exp-char")) return;
  gsap.fromTo(
    ".exp-footer-title .exp-char",
    { y: "115%" },
    {
      y: "0%",
      duration: 0.72,
      stagger: 0.018,
      ease: "power3.out",
      scrollTrigger: { trigger: ".exp-footer-title", start: "top 82%" },
    }
  );
};

/**
 * Run ALL page animations in one call.
 * Called from useExperiencedAnimations on every page change.
 */
export const runAllPageAnimations = () => {
  animateHeroWords();
  animateHeroMeta();
  animateHeroTagline();
  animateAboutTeaserChars();
  animateRevealElements();
  animateWorkListRows();
  animateFooterTitle();
};
