/**
 * Experienced Version — Curtain & Label Transition Variants
 * Used by ExperiencedLayout for the full-screen page-transition curtain.
 */

// Full-screen dark panel that sweeps up then off-screen
export const curtainVariants = {
  initial: { y: "100%", scaleY: 1 },
  animate: {
    y: ["100%", "0%", "-100%"],
    transition: {
      duration: 1.1,
      times: [0, 0.42, 1],
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// Page-name label that fades in then out during the curtain sweep
export const labelVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [12, 0, 0, -12],
    transition: {
      duration: 1.1,
      times: [0, 0.25, 0.7, 1],
    },
  },
};
