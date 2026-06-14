import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ResumeViewer from "./versions/starter/components/about/ResumeViewer";
import StarterLayout from "./versions/starter/StarterLayout";
import ExperiencedLayout from "./versions/experienced/ExperiencedLayout";
import { activeVersion, versions } from "./versions/config";
import { Toaster } from "react-hot-toast";

/**
 * Portfolio version layouts mapping
 * Add new versions here as you create them
 */
const versionLayouts = {
  starter: StarterLayout,
  experienced: ExperiencedLayout,
};

const App = () => {
  const location = useLocation();
  const isResumeRoute = location.pathname === "/resume";

  // Get which version to display based on route
  const getVersionLayout = (versionKey) => {
    const Layout = versionLayouts[versionKey];
    if (!Layout) {
      return versionLayouts[activeVersion] || StarterLayout;
    }
    return Layout;
  };

  return (
    <>
      {/* Toaster for notifications */}
      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 999999,
          top: "1rem",
        }}
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "999px",
            padding: "0.85rem 1rem",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.24)",
          },
        }}
      />

      {/* Routes */}
      <Routes>
        {/* Resume Route */}
        <Route path="/resume" element={<ResumeViewer />} />

        {/* Main portfolio - shows active version by default */}
        <Route
          path="/"
          element={
            React.createElement(
              getVersionLayout(activeVersion),
              null
            )
          }
        />

        {/* Version-specific routes - view old versions */}
        {Object.keys(versions).map((versionKey) => (
          <Route
            key={versionKey}
            path={`/portfolio/${versionKey}`}
            element={React.createElement(getVersionLayout(versionKey), null)}
          />
        ))}

        {/* Fallback to active version */}
        <Route
          path="*"
          element={React.createElement(getVersionLayout(activeVersion), null)}
        />
      </Routes>
    </>
  );
};

export default App;
