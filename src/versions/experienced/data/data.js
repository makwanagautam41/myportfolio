/**
 * Experienced Version — Data & Animation Variants
 *
 * Static data (projects, labels, welcome words, dark-bg selectors) lives here.
 * Animation variants are defined in the animations/ folder and re-exported here
 * so all existing imports continue to work unchanged.
 */

import productionDeploymentImage from "../../../assets/production-deplyment.webp";
import fitandfineImage from "../../../assets/fitandfine.png";

// ─── PROJECTS
export const projects = [
  {
    number: "01",
    title: "Production Backend Deployment",
    client: "Backend / DevOps",
    year: "2026",
    image: productionDeploymentImage,
  },
  {
    number: "02",
    title: "Fit & Fine eCommerce",
    client: "MERN Stack",
    year: "2025",
    image: fitandfineImage,
  },
  {
    number: "03",
    title: "SnapLink",
    client: "Social App",
    year: "2025",
    image: "https://res.cloudinary.com/ds8hkne4w/image/upload/v1765646713/majorProThird_upptsf.png",
  },
  {
    number: "04",
    title: "SMTP Lite",
    client: "Email Service",
    year: "2024",
    image: "https://res.cloudinary.com/ds8hkne4w/image/upload/v1765646710/majorProFourth_z9owkz.png",
  },
];

// ─── PAGE LABELS
export const pageLabels = {
  home: "Home",
  work: "Work",
  about: "About",
  contact: "Contact",
};

// ─── WELCOME WORDS (landing intro)
export const welcomeWords = [
  "Welcome",
  "સ્વાગત",
  "नमस्कार",
  "வணக்கம்",
  "స్వాగతం",
];

// ─── DARK BG SELECTORS (header color observer)
export const DARK_BG_SELECTORS = [
  ".exp-hero",
  ".exp-footer",
  ".exp-mobile-menu",
  ".exp-landing-intro",
];

// ─── ANIMATION VARIANTS
// Defined in animations/ and re-exported here for backward-compat.
// Any file can also import directly from the source:
//   import { pageVariants } from "../animations/pageVariants";
export { pageVariants } from "../animations/pageVariants";
export { curtainVariants, labelVariants } from "../animations/curtainVariants";
