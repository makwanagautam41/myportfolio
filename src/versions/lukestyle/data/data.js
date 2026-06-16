/**
 * Lukestyle Version — Data & Content
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

// ─── SKILLS GROUPS
export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML / CSS", "JavaScript", "TypeScript", "React · Next.js", "Tailwind"],
  },
  {
    title: "Animation & 3D",
    items: ["GSAP", "Lenis", "Three.js", "WebGL / GLSL", "Framer Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js · Express", "Python", "REST APIs", "WebSockets", "Microservices"],
  },
  {
    title: "Databases",
    items: ["MySQL · PostgreSQL", "MongoDB · Mongoose", "Redis", "Supabase"],
  },
  {
    title: "DevOps & Security",
    items: ["Docker · Git", "Linux · Bash", "GitHub Actions", "AWS EC2 / Nginx", "OWASP · Nmap"],
  },
];

// ─── PAGE LABELS (for transition panel)
export const pageLabels = {
  home: "Home",
  work: "Work",
  info: "Info",
  contact: "Contact",
};
