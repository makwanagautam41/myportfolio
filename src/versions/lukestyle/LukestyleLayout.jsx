/**
 * LukestyleLayout — Route-based navigation
 * - / → Home
 * - /work → Work
 * - /info → Info
 * - /contact → Contact
 * - Shared Lenis smooth scroll, shared GSAP transitions, Preloader
 */
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LukestyleLayout.css";

import LkNav from "./components/LkNav";
import LkPreloader from "./components/LkPreloader";
import LkTransitionPanel from "./components/LkTransitionPanel";

import LkHomePage from "./pages/LkHomePage";
import LkWorkPage from "./pages/LkWorkPage";
import LkInfoPage from "./pages/LkInfoPage";
import LkContactPage from "./pages/LkContactPage";

import { useSmoothScroll } from "../../providers/SmoothScrollProvider";
import { pageLabels } from "./data/data";

const LukestyleLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lenis, start, stop } = useSmoothScroll();

  // Derive current page key from URL
  const page = (() => {
    const p = location.pathname;
    if (p === "/work")    return "work";
    if (p === "/info")    return "info";
    if (p === "/contact") return "contact";
    return "home";
  })();

  const [showPreloader,      setShowPreloader]       = useState(true);
  const [preloaderDone,      setPreloaderDone]       = useState(false);
  const [navVisible,         setNavVisible]          = useState(true);
  const [transitioning,      setTransitioning]       = useState(false);
  const [transitionTarget,   setTransitionTarget]    = useState(null);
  const [transitionLabel,    setTransitionLabel]     = useState("");
  const [transitionFromRect, setTransitionFromRect]  = useState(null);

  // ─── Nav visibility: only on home, only when at top
  useEffect(() => {
    if (page !== "home") {
      setNavVisible(false);
      return;
    }

    if (!lenis) {
      const handleScroll = () => setNavVisible(window.scrollY < 60);
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const handleLenisScroll = ({ scroll }) => {
      setNavVisible(scroll < 60);
    };

    handleLenisScroll({ scroll: lenis.scroll ?? 0 });
    lenis.on("scroll", handleLenisScroll);

    return () => {
      lenis.off("scroll", handleLenisScroll);
    };
  }, [lenis, page]);

  useEffect(() => {
    if (showPreloader) {
      stop();
      return;
    }

    start();
  }, [showPreloader, start, stop]);

  // ─── Navigate directly
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
  }, [navigate, transitionTarget]);

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
        {page === "home"    && <LkHomePage onNavigate={handleNavigate} preloaderDone={preloaderDone} />}
      </main>

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
