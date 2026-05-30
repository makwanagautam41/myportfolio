import { useEffect } from "react";

const useWorkSectionObserver = (setIsWorkSection, page) => {
  useEffect(() => {
    // We only want the header changes on the home page when scrolling to the work section.
    if (page !== "home") {
      setIsWorkSection(false);
      return;
    }

    // Otherwise, on the home page, check if the header is over the work section
    const headerH = 90;

    const checkWorkSection = () => {
      let isWork = false;
      const workSections = [".scroll-stack-section", ".exp-work-section", "#work"];
      workSections.forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // If the top of the section is above the bottom of the header
        // and the bottom of the section is below the top of the header
        if (rect.top <= headerH && rect.bottom > 10) {
          isWork = true;
        }
      });
      setIsWorkSection(isWork);
    };

    checkWorkSection();
    window.addEventListener("scroll", checkWorkSection, { passive: true });
    window.addEventListener("resize", checkWorkSection);

    return () => {
      window.removeEventListener("scroll", checkWorkSection);
      window.removeEventListener("resize", checkWorkSection);
    };
  }, [setIsWorkSection, page]);
};

export default useWorkSectionObserver;
