import React, { useState } from "react";
import "./App.css";
import FullScreenAnimation from "./components/loader/FullScreenAnimation";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Projects from "./components/projects/Projects";
import Footer from "./components/footer/Footer";
import MouseFollower from "./components/MouseFollower";

const App = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  return (
    <>
      {showAnimation && (
        <FullScreenAnimation onComplete={() => setShowAnimation(false)} />
      )}

      {!showAnimation && (
        <>
          <MouseFollower />
          <Header />
          <main className="main">
            <Home />
            <About />
            <Projects />
            {/* <Services /> */}
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default App;
