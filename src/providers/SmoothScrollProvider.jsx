import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { LENIS_CONFIG } from "../lib/motion-constants";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const SmoothScrollContext = createContext({
  lenis: null,
  scrollTo: () => {},
  start: () => {},
  stop: () => {},
  isReducedMotion: false,
});

export const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const tickerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.classList.add("reduced-motion");
      return () => document.documentElement.classList.remove("reduced-motion");
    }

    const lenis = new Lenis(LENIS_CONFIG);
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    tickerRef.current = updateTicker;
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
      document.documentElement.classList.remove("reduced-motion");
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const refresh = () => ScrollTrigger.refresh();
    const onResize = gsap.delayedCall(0.2, refresh).pause();
    const handleResize = () => onResize.restart(true);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", refresh);

    const images = Array.from(document.images).filter((img) => !img.complete);
    const cleanupFns = images.map((img) => {
      const handleLoad = () => refresh();
      img.addEventListener("load", handleLoad, { once: true });
      img.addEventListener("error", handleLoad, { once: true });
      return () => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleLoad);
      };
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", refresh);
      onResize.kill();
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);

  const scrollTo = useCallback((target, options = {}) => {
    if (prefersReducedMotion || !lenisRef.current) {
      const value = typeof target === "number" ? target : 0;
      window.scrollTo({ top: value, behavior: "auto" });
      return;
    }

    lenisRef.current.scrollTo(target, options);
  }, [prefersReducedMotion]);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const value = useMemo(
    () => ({
      lenis: lenisRef.current,
      scrollTo,
      start,
      stop,
      isReducedMotion: prefersReducedMotion,
    }),
    [prefersReducedMotion, scrollTo, start, stop]
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => useContext(SmoothScrollContext);
