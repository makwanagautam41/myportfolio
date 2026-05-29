import { useEffect } from "react";
import { DARK_BG_SELECTORS } from "../data/data";

const useHeaderColorObserver = (setOverDark) => {
  useEffect(() => {
    const headerH = 90;

    const checkHeader = () => {
      let isDark = false;
      DARK_BG_SELECTORS.forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerH && rect.bottom > 10) isDark = true;
      });
      setOverDark(isDark);
    };

    checkHeader();
    window.addEventListener("scroll", checkHeader, { passive: true });
    window.addEventListener("resize", checkHeader);

    return () => {
      window.removeEventListener("scroll", checkHeader);
      window.removeEventListener("resize", checkHeader);
    };
  }, [setOverDark]);
};

export default useHeaderColorObserver;
