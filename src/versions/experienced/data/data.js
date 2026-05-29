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

// ─── SERVICE TAGS
export const serviceTags = [
  "Backend Development",
  "DevOps",
  "React",
  "Node.js",
  "Cloud Deployment",
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

// ─── FRAMER MOTION PAGE VARIANTS
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

// ─── CURTAIN TRANSITION VARIANTS
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

// ─── LABEL FADE VARIANTS
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
