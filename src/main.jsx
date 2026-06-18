import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./lib/gsap";
import { SmoothScrollProvider } from "./providers/SmoothScrollProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </BrowserRouter>
);
