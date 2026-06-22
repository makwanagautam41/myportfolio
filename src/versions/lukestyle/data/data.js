/**
 * Lukestyle Version — Data & Content
 */
import productionDeploymentImage from "../../../assets/images/project-production-deployment.webp";
import fitandfineImage from "../../../assets/images/project-fit-and-fine.png";
import portraitMainImage from "../../../assets/images/portrait-main.png";
import portraitAltImage from "../../../assets/images/portrait-alt.png";
import portraitTechImage from "../../../assets/images/portrait-tech.png";
import gautamResumePdf from "../../../assets/pdfs/gautam-makwana-resume.pdf";

export const ASSETS = {
  images: {
    productionDeployment: productionDeploymentImage,
    fitAndFine: fitandfineImage,
    portraitMain: portraitMainImage,
    portraitAlt: portraitAltImage,
    portraitTech: portraitTechImage,
  },
  pdfs: {
    resume: gautamResumePdf,
  }
};

// ─── PROJECTS
export const projects = [
  {
    number: "01",
    title: "Fit & Fine eCommerce",
    client: "Full-Stack Commerce Platform",
    year: "Jun 2026",
    image: ASSETS.images.fitAndFine,
    desc: "Production-ready MERN eCommerce platform built for modern fitness brands. Features secure authentication, advanced product management, cart & wishlist systems, coupon engine, order tracking, admin dashboard, and optimized performance for real-world scalability.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    github: null,
    live: "https://fitandfine.online",
  },

  {
    number: "02",
    title: "SMTP Lite",
    client: "SaaS Email Infrastructure",
    year: "Oct 2025",
    image: "https://res.cloudinary.com/ds8hkne4w/image/upload/v1765646710/majorProFourth_z9owkz.png",
    desc: "Developer-focused transactional email platform that enables businesses to send and track emails through secure APIs. Includes worker-based processing, delivery tracking, domain validation, API key management, analytics, and real-time status monitoring.",
    tech: ["Node.js", "Express", "Redis", "Nodemailer", "Docker"],
    github: "https://github.com/makwanagautam41/SMTP-service",
    live: "https://smtplite.vercel.app/",
  },

  {
    number: "03",
    title: "SnapLink",
    client: "Social Networking Platform",
    year: "May 2025",
    image: "https://res.cloudinary.com/ds8hkne4w/image/upload/v1765646713/majorProThird_upptsf.png",
    desc: "Instagram-inspired social media application featuring authentication, post sharing, image uploads, user profiles, follow/unfollow functionality, real-time interactions, notifications, and scalable REST APIs powered by the MERN stack.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Cloudinary"],
    github: "https://github.com/makwanagautam41/SnapLink",
    live: null,
  },

  {
    number: "04",
    title: "AI Resume Builder",
    client: "AI-Powered Career Tool",
    year: "Aug 2025",
    image: "https://res.cloudinary.com/ds8hkne4w/image/upload/v1765646710/majorProFourth_z9owkz.png",
    desc: "Intelligent resume-building platform that helps users create professional ATS-friendly resumes using AI assistance. Supports multiple templates, resume customization, export options, and streamlined user experience.",
    tech: ["React", "Node.js", "MongoDB", "OpenAI", "Express"],
    github: "https://github.com/makwanagautam41/AIResumeBuilder",
    live: null,
  },

  {
    number: "05",
    title: "Production Backend Deployment",
    client: "DevOps & Infrastructure",
    year: "Dec 2025",
    image: ASSETS.images.productionDeployment,
    desc: "Enterprise-grade deployment architecture demonstrating containerization, reverse proxy configuration, SSL security, automated CI/CD pipelines, process management, monitoring, and production server optimization.",
    tech: ["Docker", "Nginx", "GitHub Actions", "AWS EC2", "Linux"],
    github: "https://github.com/makwanagautam41/production-backend",
    live: null,
  },
];

// ─── SKILLS GROUPS (matches LkInfoPage 4-column layout)
export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML / CSS", "JavaScript", "TypeScript", "React · Next.js", "Tailwind"],
  },
  {
    title: "Backend",
    items: ["Node.js · Express", "NestJS · TypeScript", "Python · FastAPI", "Java · Spring"],
  },
  {
    title: "APIs & Architecture",
    items: ["REST · GraphQL", "gRPC · WebSockets", "Microservices · Serverless", "Event-driven Systems"],
  },
  {
    title: "Databases · DevOps",
    items: ["PostgreSQL", "SQL", "Redis · Caching", "MongoDB", "AWS", "Docker", "CI/CD"],
  },
];

// ─── PAGE LABELS (for transition panel)
export const pageLabels = {
  home: "Home",
  work: "Work",
  info: "Info",
  contact: "Contact",
};
