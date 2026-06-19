/**
 * Experienced Version — Data & Animation Variants
 *
 * Static data (projects, labels, welcome words, dark-bg selectors) lives here.
 * Animation variants are defined in the animations/ folder and re-exported here
 * so all existing imports continue to work unchanged.
 */

import productionDeploymentImage from "../../../assets/images/project-production-deployment.webp";
import fitandfineImage from "../../../assets/images/project-fit-and-fine.png";

// ─── HOME PAGE LIMIT
// Change this number to control how many projects appear on the homepage
// ScrollStack. The Work page always shows all projects.
export const HOME_PROJECT_LIMIT = 2;

// ─── PROJECTS
export const projects = [
  {
    number: "01",
    title: "Production Backend Deployment",
    client: "Backend / DevOps",
    year: "2026",
    image: productionDeploymentImage,
    desc: "End-to-end production deployment pipeline: containerised Node.js services, Nginx reverse proxy, SSL, and automated CI/CD via GitHub Actions.",
    tech: ["Node.js", "Docker", "Nginx", "GitHub Actions", "AWS EC2"],
    github: "https://github.com/makwanagautam41",
    live: null,
  },
  {
    number: "02",
    title: "Fit & Fine eCommerce",
    client: "MERN Stack",
    year: "2025",
    image: fitandfineImage,
    desc: "Full-stack eCommerce platform for fitness products — cart, payments, order tracking, and an admin dashboard built with the MERN stack.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    github: "https://github.com/makwanagautam41",
    live: "https://fitandfine.online",
  },
  {
    number: "03",
    title: "SnapLink",
    client: "Social App",
    year: "2025",
    image: "https://res.cloudinary.com/ds8hkne4w/image/upload/v1765646713/majorProThird_upptsf.png",
    desc: "Social media platform with real-time feed, image upload, follow/unfollow, and notifications — backed by a scalable REST API.",
    tech: ["React", "Node.js", "Socket.io", "Cloudinary", "MongoDB"],
    github: "https://github.com/makwanagautam41",
    live: null,
  },
  {
    number: "04",
    title: "SMTP Lite",
    client: "Email Service",
    year: "2024",
    image: "https://res.cloudinary.com/ds8hkne4w/image/upload/v1765646710/majorProFourth_z9owkz.png",
    desc: "Lightweight transactional email microservice with SSE delivery-status streaming, API-key auth, and a clean dashboard.",
    tech: ["Node.js", "Nodemailer", "SSE", "Express", "Redis"],
    github: "https://github.com/makwanagautam41",
    live: null,
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
  ".scroll-stack-section",
];

// ─── ANIMATION VARIANTS
// Defined in animations/ and re-exported here for backward-compat.
// Any file can also import directly from the source:
//   import { pageVariants } from "../animations/pageVariants";
export { pageVariants } from "../animations/pageVariants";
export { curtainVariants, labelVariants } from "../animations/curtainVariants";
