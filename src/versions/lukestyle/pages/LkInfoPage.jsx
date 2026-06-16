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
    title: "Animation & 3D",
    items: ["GSAP", "Lenis", "Three.js", "WebGL / GLSL", "Blender"],
  },
  {
    title: "Backend",
    items: ["Node.js · Express", "Python", "Java · PHP", "MySQL · PostgreSQL", "MongoDB · Supabase"],
  },
  {
    title: "Security & Tools",
    items: ["Linux · Bash", "OWASP · Nmap", "Metasploit", "Docker · Git"],
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
      <button
        type="button"
        className="lk-info-back"
        onClick={() => onNavigate("home")}
        aria-label="Back to home"
      >
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

          {/* Email */}
          <a className="lk-info-email" href="mailto:makwanagautam41@gmail.com">
            makwanagautam41@gmail.com
          </a>
        </div>

        {/* Right — bio + skills */}
        <div className="lk-info-content">
          <p className="lk-info-section-label">About</p>
          <h2 className="lk-info-name">Gautam Makwana.</h2>

          <p className="lk-info-tagline">
            Backend developer &amp; computer science graduate, specialized in
            web development and cloud infrastructure.
          </p>

          <p className="lk-info-bio">
            I build tailor-made web experiences where technical precision meets
            performance. Passionate about automation, interaction and{" "}
            <em>detail,</em> I always seek the balance between robust
            architecture and elegant interfaces.
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
