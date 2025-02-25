import React, { useContext } from "react";
import "./Home.css";
import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";
import { ThemeContext } from "../../context/ThemeContext";
import profile from "..//../assets/profile.jpg";
import profileDark from "..//../assets/pro.jpg";

const Home = () => {
  const { theme } = useContext(ThemeContext); // Get current theme

  return (
    <section className="home" id="home">
      <div className="home_container container grid">
        <div className="home_content grid">
          <Social />
          <div
            className="home_img"
            style={{
              background: `url(${
                theme === "light" ? profile : profileDark
              }) no-repeat center/cover`,
            }}
          ></div>
          <Data />
        </div>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
