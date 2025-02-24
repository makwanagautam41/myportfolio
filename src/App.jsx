import React, { useState } from "react";
import "./App.css";
import FullScreenAnimation from "./components/loader/FullScreenAnimation";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import ScrollUp from "./components/scrollup/ScrollUp";
import Projects from "./components/projects/Projects";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  return (
    <>
      {showAnimation && (
        <FullScreenAnimation onComplete={() => setShowAnimation(false)} />
      )}

      {!showAnimation && (
        <>
          <ThemeProvider>
            <Header />
            <main className="main">
              <Home />
              <About />
              <Skills />
              <Projects />
              {/* <Services /> */}
              <Contact />
              <Footer />
            </main>
            <ScrollUp />
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default App;
