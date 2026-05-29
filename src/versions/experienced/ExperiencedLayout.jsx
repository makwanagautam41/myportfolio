/**
 * Experienced Version — Root Layout
 * All components, pages, hooks, and data are modularised into separate files.
 *
 * Structure:
 *   data/        — constants, variants, project data, terminal scripts
 *   hooks/       — useExperiencedAnimations, useHeaderColorObserver
 *   components/  — Cursor, Header, Marquee, Footer, LandingIntro, WorkList,
 *                  DevTerminal, BackendPillars, SystemArchitecture, LiveMetrics
 *   pages/       — HomePage, AboutPage, WorkPage, ContactPage
 */

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster } from "react-hot-toast";

import "./ExperiencedLayout.css";

// ─── Hooks
import useExperiencedAnimations from "./hooks/useExperiencedAnimations";

// ─── Data / Variants
import { pageLabels, curtainVariants, labelVariants } from "./data/data";

// ─── Shared Components
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import LandingIntro from "./components/LandingIntro";

// ─── Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

// ─── ROOT
const ExperiencedLayout = () => {
  const [page, setPage] = useState("home");
  const [transitionKey, setTransitionKey] = useState(null);
  const [transitionLabel, setTransitionLabel] = useState("Home");
  const [showLandingIntro, setShowLandingIntro] = useState(true);

  useExperiencedAnimations(page);

  const CurrentPage = useMemo(() => {
    const pages = {
      home: HomePage,
      about: AboutPage,
      work: WorkPage,
      contact: ContactPage,
    };
    return pages[page] || HomePage;
  }, [page]);

  const navigate = (target) => {
    if (target === page) return;
    setTransitionLabel(pageLabels[target] || "Home");
    setTransitionKey((k) => (k === null ? 1 : k + 1));
    setPage(target);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div className="experienced-shell" id="top">
      <Toaster
        position="top-center"
        containerStyle={{ zIndex: 999999, top: "1rem" }}
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "999px",
            padding: "0.85rem 1rem",
            boxShadow: "0 12px 30px rgba(0,0,0,0.24)",
          },
        }}
      />

      <Cursor />
      <Header page={page} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        <CurrentPage key={page} onNavigate={navigate} />
      </AnimatePresence>

      {/* ─── PAGE TRANSITION CURTAIN */}
      <AnimatePresence>
        {transitionKey !== null && (
          <motion.div
            className="exp-transition-panel"
            key={transitionKey}
            variants={curtainVariants}
            initial="initial"
            animate="animate"
            aria-hidden="true"
          >
            <motion.div
              className="exp-transition-label"
              variants={labelVariants}
              initial="initial"
              animate="animate"
            >
              <span className="exp-transition-dot" />
              <span>{transitionLabel}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── LANDING INTRO */}
      <AnimatePresence>
        {showLandingIntro && (
          <LandingIntro onComplete={() => setShowLandingIntro(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperiencedLayout;