import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const useExperiencedAnimations = (page) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const updateLenis = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);

    const anchorHandler = (event) => {
      const anchor = event.target.closest("a[href^='#']");
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    };

    document.addEventListener("click", anchorHandler);

    return () => {
      document.removeEventListener("click", anchorHandler);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    const ctx = gsap.context(() => {
      if (document.querySelector(".exp-hero .exp-word")) {
        gsap.fromTo(
          ".exp-hero .exp-word",
          { y: "110%" },
          { y: "0%", duration: 0.85, stagger: 0.06, ease: "power3.out", delay: 0.12 }
        );
      }

      if (document.querySelector(".exp-hero-meta, .exp-scroll-cue")) {
        gsap.fromTo(
          ".exp-hero-meta, .exp-scroll-cue",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power2.out", delay: 0.65 }
        );
      }

      if (document.querySelector(".exp-hero-tagline .exp-char")) {
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
      }

      if (document.querySelector(".exp-about-teaser .exp-char")) {
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
      }

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

      if (document.querySelector(".exp-work-list")) {
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
      }

      if (document.querySelector(".exp-footer-title .exp-char")) {
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
      }
    });

    const handleRefresh = () => {
      if (lenisRef.current) lenisRef.current.resize();
      ScrollTrigger.refresh();
    };

    handleRefresh();
    const t1 = setTimeout(handleRefresh, 100);
    const t2 = setTimeout(handleRefresh, 600);
    const t3 = setTimeout(handleRefresh, 1200);
    const refreshOnResize = () => handleRefresh();
    window.addEventListener("resize", refreshOnResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", refreshOnResize);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [page]);
};

export default useExperiencedAnimations;
