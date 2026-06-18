import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { DURATION, EASE } from "../../lib/motion-constants";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useSmoothScroll } from "../../providers/SmoothScrollProvider";
import "./route-transition.css";

const RouteTransitionContext = createContext({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export const RouteTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollTo } = useSmoothScroll();
  const prefersReducedMotion = usePrefersReducedMotion();
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const labelRef = useRef(null);
  const timelineRef = useRef(null);
  const pendingNavigationRef = useRef(null);
  const isCoveringRef = useRef(false);
  const pathnameRef = useRef(location.pathname);
  const [transitionState, setTransitionState] = useState({
    active: false,
    label: "",
  });

  useEffect(() => {
    pathnameRef.current = location.pathname;
    scrollTo(0, { immediate: true });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [location.pathname, scrollTo]);

  useEffect(() => () => timelineRef.current?.kill(), []);

  const finishTransition = useCallback(() => {
    isCoveringRef.current = false;
    timelineRef.current = null;
    pendingNavigationRef.current = null;
    setTransitionState({ active: false, label: "" });
    ScrollTrigger.refresh();
  }, []);

  const revealNewPage = useCallback(() => {
    const panel = panelRef.current;
    const label = labelRef.current;

    if (!panel || !label) {
      finishTransition();
      return;
    }

    timelineRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: finishTransition,
    });

    timelineRef.current = tl;

    tl.to(label, {
      opacity: 0,
      y: -12,
      duration: 0.22,
      ease: EASE.standardOut,
    }).to(panel, {
      yPercent: -100,
      duration: DURATION.transitionReveal,
      ease: EASE.standardInOut,
      delay: 0.08,
    });
  }, [finishTransition]);

  const navigateWithTransition = useCallback((targetPath, options = {}) => {
    if (!targetPath || targetPath === pathnameRef.current) return;

    if (prefersReducedMotion) {
      navigate(targetPath);
      return;
    }

    timelineRef.current?.kill();

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const label = labelRef.current;

    if (!overlay || !panel || !label) {
      navigate(targetPath);
      return;
    }

    pendingNavigationRef.current = targetPath;
    isCoveringRef.current = true;
    setTransitionState({
      active: true,
      label: options.label ?? "",
    });
    label.textContent = options.label ?? "";

    gsap.set(overlay, { pointerEvents: "auto" });
    gsap.set(panel, { yPercent: 100 });
    gsap.set(label, { opacity: 0, y: 18 });

    const tl = gsap.timeline();

    timelineRef.current = tl;

    tl.to(panel, {
      yPercent: 0,
      duration: DURATION.transitionCover,
      ease: EASE.standardInOut,
    })
      .to(
        label,
        {
          opacity: options.label ? 1 : 0,
          y: 0,
          duration: 0.3,
          ease: EASE.standardOut,
        },
        "-=0.24"
      )
      .add(() => {
        navigate(pendingNavigationRef.current);
      });
  }, [finishTransition, navigate, prefersReducedMotion]);

  useEffect(() => {
    if (!isCoveringRef.current) return;
    if (pendingNavigationRef.current !== location.pathname) return;

    requestAnimationFrame(() => {
      revealNewPage();
    });
  }, [location.pathname, revealNewPage]);

  useEffect(() => {
    if (!transitionState.active && overlayRef.current) {
      gsap.set(overlayRef.current, { pointerEvents: "none" });
    }
  }, [transitionState.active]);

  const contextValue = useMemo(
    () => ({
      navigateWithTransition,
      isTransitioning: transitionState.active,
    }),
    [navigateWithTransition, transitionState.active]
  );

  return (
    <RouteTransitionContext.Provider value={contextValue}>
      {children}
      <div ref={overlayRef} className="rt-overlay" aria-hidden="true">
        <div ref={panelRef} className="rt-panel">
          <span ref={labelRef} className="rt-label">
            {transitionState.label}
          </span>
        </div>
      </div>
    </RouteTransitionContext.Provider>
  );
};

export const useRouteTransition = () => useContext(RouteTransitionContext);
