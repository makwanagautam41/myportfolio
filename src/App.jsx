import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import FullScreenAnimation from "./components/loader/FullScreenAnimation";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Projects from "./components/projects/Projects";
import MouseFollower from "./components/MouseFollower";
import ResumeViewer from "./components/about/ResumeViewer";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

const App = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const scrollContainerRef = useRef(null);
  const location = useLocation();
  const isResumeRoute = location.pathname === "/resume";

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (isResumeRoute) {
      return undefined;
    }

    if (showAnimation || !scrollContainerRef.current) {
      return undefined;
    }

    const scrollContainer = scrollContainerRef.current;
    const locoScroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      lerp: 0.045,
      multiplier: 0.9,
      smartphone: {
        smooth: true,
        lerp: 0.06,
      },
      tablet: {
        smooth: true,
        lerp: 0.05,
      },
    });

    locoScroll.on("scroll", ScrollTrigger.update);
    locoScroll.scrollTo(0, { duration: 0, disableLerp: true });

    ScrollTrigger.defaults({ scroller: scrollContainer });

    ScrollTrigger.scrollerProxy(scrollContainer, {
      scrollTop(value) {
        if (arguments.length) {
          locoScroll.scrollTo(value, {
            duration: 0,
            disableLerp: true,
          });
        }
        return locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollContainer.style.transform ? "transform" : "fixed",
    });

    const handleDocumentClick = (event) => {
      const anchor = event.target.closest("a[href^='#']");

      if (!anchor) return;

      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();
      locoScroll.scrollTo(targetElement, {
        offset: -80,
        duration: 1400,
        easing: [0.25, 0.1, 0.25, 1],
        disableLerp: false,
      });
      window.history.pushState(null, "", targetId);
    };

    document.addEventListener("click", handleDocumentClick);

    const refreshScroll = () => {
      locoScroll.update();
    };

    ScrollTrigger.addEventListener("refresh", refreshScroll);
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      ScrollTrigger.removeEventListener("refresh", refreshScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      locoScroll.destroy();
    };
  }, [showAnimation, isResumeRoute]);

  return (
    <Routes>
      <Route path="/resume" element={<ResumeViewer />} />
      <Route
        path="*"
        element={
          <>
            {showAnimation && (
              <FullScreenAnimation onComplete={() => setShowAnimation(false)} />
            )}

            {!showAnimation && (
              <>
                <MouseFollower />
                <Header />
                <main
                  className="main"
                  ref={scrollContainerRef}
                  data-scroll-container
                >
                  <Home />
                  <About />
                  <Projects />
                  {/* <Services /> */}
                  <Contact />
                </main>
              </>
            )}
          </>
        }
      />
    </Routes>
  );
};

export default App;
