/**
 * LukestyleLayout — Route-based navigation
 * - / → Home
 * - /work → Work
 * - /info → Info
 * - /contact → Contact
 * - Lenis smooth scroll, GSAP transitions, Preloader
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const LukestyleLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive current page key from URL
  const page = (() => {
    const p = location.pathname;
    if (p === "/work")    return "work";
    if (p === "/info")    return "info";
    if (p === "/contact") return "contact";
    return "home";
  })();

  const [transitioning,      setTransitioning]      = useState(false);
  const [showPreloader,      setShowPreloader]       = useState(true);
  const [preloaderDone,      setPreloaderDone]       = useState(false);
  const [transitionTarget,   setTransitionTarget]    = useState(null);
  const [transitionLabel,    setTransitionLabel]     = useState("");
  const [transitionFromRect, setTransitionFromRect]  = useState(null);
  const [navVisible,         setNavVisible]          = useState(true);

  const lenisRef = useRef(null);

  // ─── Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.8,
      infinite: false,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    // Locked during preloader; unlocked in onComplete
    lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // ─── Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [location.pathname]);

  // ─── Nav visibility: only on home, only when at top
  useEffect(() => {
    if (page !== "home") {
      setNavVisible(false);
      return;
    }
    const handleScroll = () => setNavVisible(window.scrollY < 60);
    setNavVisible(window.scrollY < 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  // ─── Navigate with transition wipe
  const handleNavigate = useCallback((target, clickedLabel = "", fromRect = null) => {
    const targetPath = target === "home" ? "/" : `/${target}`;
    if (location.pathname === targetPath || transitioning) return;
    setTransitioning(true);
    setTransitionTarget(target);
    setTransitionLabel(clickedLabel || pageLabels[target] || "");
    setTransitionFromRect(fromRect);
  }, [location.pathname, transitioning]);

  const onTransitionMidpoint = useCallback(() => {
    const targetPath = transitionTarget === "home" ? "/" : `/${transitionTarget}`;
    navigate(targetPath);
  }, [transitionTarget, navigate]);

  const onTransitionComplete = useCallback(() => {
    setTransitioning(false);
    setTransitionTarget(null);
    setTransitionLabel("");
    setTransitionFromRect(null);
  }, []);

  return (
    <div className="lk-shell" id="lk-top">

      {/* Preloader */}
      {showPreloader && (
        <LkPreloader onComplete={() => {
          setShowPreloader(false);
          setPreloaderDone(true);
          if (lenisRef.current) lenisRef.current.start();
        }} />
      )}

      {/* Navigation */}
      <LkNav
        page={page}
        onNavigate={handleNavigate}
        visible={navVisible && !showPreloader}
      />

      {/* Page content — driven by pathname, no nested Routes needed */}
      <main key={page}>
        {page === "work"    && <LkWorkPage    onNavigate={handleNavigate} />}
        {page === "info"    && <LkInfoPage    onNavigate={handleNavigate} />}
        {page === "contact" && <LkContactPage onNavigate={handleNavigate} />}
        {page === "home"    && <LkHomePage    onNavigate={handleNavigate} preloaderDone={preloaderDone} />}
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
