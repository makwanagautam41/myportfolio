/**
 * LkInfoPage — Portrait with corner crosshairs + bio + 4-column skills grid
 * Replicates lukebaffait.fr Info page layout.
 */
import portraitImage from "../../../assets/portrait.png";
import { skillGroups } from "../data/data";
import "./LkInfoPage.css";

// ─── Skills data re-structured for the 4-column grid (matching Luke's layout)
const infoSkillCols = [
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

const LkInfoPage = ({ onNavigate }) => {
  return (
    <div className="lk-info">
      {/* Fixed header */}
      <div className="lk-info-header">
        <h1 className="lk-info-title">Info</h1>
      </div>

      {/* Back button */}
      <button type="button" className="lk-info-back"
        onClick={() => onNavigate("home")} aria-label="Back to home">
        BACK
      </button>

      {/* Main layout */}
      <div className="lk-info-body">
        {/* Left — portrait + meta */}
        <div>
          <div className="lk-info-portrait-wrap">
            {/* Corner crosshairs */}
            <span className="lk-info-corner tl" aria-hidden="true" />
            <span className="lk-info-corner tr" aria-hidden="true" />
            <span className="lk-info-corner bl" aria-hidden="true" />
            <span className="lk-info-corner br" aria-hidden="true" />
            <img
              className="lk-info-portrait"
              src={portraitImage}
              alt="Gautam Makwana portrait"
            />
          </div>

          {/* Meta rows */}
          <div className="lk-info-meta">
            <div className="lk-info-meta-row">
              <span className="lk-info-meta-key">Based in</span>
              <span className="lk-info-meta-val">Rajkot, India</span>
            </div>
            <div className="lk-info-meta-row">
              <span className="lk-info-meta-key">Status</span>
              <span className="lk-info-meta-val">Open to opportunities</span>
            </div>
          </div>
        </div>

        {/* Right — bio + skills */}
        <div className="lk-info-content">
          <h2 className="lk-info-name">Gautam Makwana<span className="lk-fn-dot">.</span></h2>

          <p className="lk-info-tagline">
            Backend developer &amp; computer science graduate, specialized in
            web development and cloud infrastructure.
          </p>

          <p className="lk-info-bio">
            Backend-focused developer and systems engineer, experienced in building scalable
            server architectures, resilient APIs, and reliable data platforms. I prioritise
            performance, security and observability while collaborating closely with frontend
            teams to deliver cohesive products.
          </p>

          <p className="lk-info-bio">
            I craft end-to-end solutions where robust backend systems meet thoughtful frontend
            interfaces — focusing on clear API design, data modelling, CI/CD and automated
            deployments. I also care about UX: subtle interactions, performance and polish
            that make the experience feel complete.
          </p>

          {/* 4-column skills grid */}
          <div className="lk-info-skills-grid">
            {infoSkillCols.map((col) => (
              <div key={col.title} className="lk-info-skill-col">
                <p className="lk-info-skill-col-title">{col.title}</p>
                <ul>
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LkInfoPage;
