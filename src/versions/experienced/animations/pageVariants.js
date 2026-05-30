/**
 * Experienced Version — Page Transition Variants
 * Used by every page component as framer-motion variants.
 */

export const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.28, ease: [0.64, 0, 0.78, 0] },
  },
};
