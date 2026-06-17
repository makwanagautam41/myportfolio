/**
 * Lukestyle — Root Layout
 * - Lenis smooth scroll (buttery, lerp 0.08)
 * - GSAP page-wipe transition with clicked-link title fly animation
 * - Nav bar: only visible on Home page when scrolled to top, hidden on scroll
 * - Preloader with split name animation
 */
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./LukestyleLayout.css";

import LkNav from "./components/LkNav";
import LkPreloader from "./components/LkPreloader";
import LkTransitionPanel from "./components/LkTransitionPanel";

import LkHomePage from "./pages/LkHomePage";
import LkWorkPage from "./pages/LkWorkPage";
import LkInfoPage from "./pages/LkInfoPage";
import LkContactPage from "./pages/LkContactPage";

import { pageLabels } from "./data/data";

gsap.registerPlugin(ScrollTrigger);

const PAGES = {
  home: LkHomePage,
  work: LkWorkPage,
  info: LkInfoPage,
  contact: LkContactPage,
};

const LukestyleLayout = () => {
  const [page, setPage] = useState("home");
  const [transitioning, setTransitioning] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState(null);
  const [transitionLabel, setTransitionLabel] = useState("");
  const [transitionFromRect, setTransitionFromRect] = useState(null);
  const [navVisible, setNavVisible] = useState(true);
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  // ─── Lenis smooth scroll — connect to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      smoothTouch: true,       // ← enables touch-based smooth scroll on mobile
      touchMultiplier: 1.8,    // ← feels natural on touch screens
      infinite: false,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    // Lock scroll while preloader is active; unlocked in onComplete callback
    lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // ─── Reset scroll on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [page]);

  // ─── Nav visibility: only on home, only when at top
  useEffect(() => {
    if (page !== "home") {
      setNavVisible(false);
      return;
    }

    const handleScroll = () => {
      setNavVisible(window.scrollY < 60);
    };

    setNavVisible(window.scrollY < 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  // ─── Navigate with transition
  const navigate = useCallback((target, clickedLabel = "", fromRect = null) => {
    if (target === page || transitioning) return;
    setTransitioning(true);
    setTransitionTarget(target);
    setTransitionLabel(clickedLabel || pageLabels[target] || "");
    setTransitionFromRect(fromRect);
  }, [page, transitioning]);

  const onTransitionMidpoint = useCallback(() => {
    setPage(transitionTarget);
  }, [transitionTarget]);

  const onTransitionComplete = useCallback(() => {
    setTransitioning(false);
    setTransitionTarget(null);
    setTransitionLabel("");
    setTransitionFromRect(null);
  }, []);

  const CurrentPage = useMemo(() => PAGES[page] || LkHomePage, [page]);

  return (
    <div className="lk-shell" id="lk-top">
      {/* Preloader */}
      {showPreloader && (
        <LkPreloader onComplete={() => {
          setShowPreloader(false);
          setPreloaderDone(true);
          // Unlock scroll now that the intro is done
          if (lenisRef.current) lenisRef.current.start();
        }} />
      )}

      {/* Navigation — only home + at top */}
      <LkNav
        page={page}
        onNavigate={navigate}
        visible={navVisible && !showPreloader}
      />

      {/* Page content */}
      <main key={page}>
        <CurrentPage onNavigate={navigate} preloaderDone={preloaderDone} />
      </main>

      {/* Page transition wipe panel */}
      {transitioning && transitionTarget && (
        <LkTransitionPanel
          label={transitionLabel}
          fromRect={transitionFromRect}
          onMidpoint={onTransitionMidpoint}
          onComplete={onTransitionComplete}
        />
      )}
    </div>
  );
};

export default LukestyleLayout;
