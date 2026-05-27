import "./Highlights.css";
import Title from "../Title";

const latestWork = [
  "Airbnb-style full stack app",
  "MERN eCommerce platform",
  "Instagram clone app",
  "SMTP email service",
];

const specializations = [
  {
    icon: "fa-code",
    title: "Frontend Development",
    text: "Responsive React interfaces with clean layouts, reusable components, and smooth UI states.",
  },
  {
    icon: "fa-server",
    title: "Full Stack Projects",
    text: "Node, Express, MongoDB, API integrations, authentication flows, and deploy-ready app builds.",
  },
  {
    icon: "fa-wand-magic-sparkles",
    title: "UI Interaction",
    text: "Polished animations, hover states, micro-interactions, and user-friendly portfolio experiences.",
  },
];

const profiles = [
  {
    label: "GitHub",
    icon: "fa-brands fa-github",
    href: "https://github.com/makwanagautam41",
  },
  {
    label: "LinkedIn",
    icon: "fa-brands fa-linkedin",
    href: "https://www.linkedin.com/in/gautammakwana/",
  },
  {
    label: "Instagram",
    icon: "fa-brands fa-instagram",
    href: "https://www.instagram.com/_gautammakwana_",
  },
];

const stats = [
  { value: "5+", label: "Completed Projects" },
  { value: "3+", label: "Major Builds" },
  { value: "24/7", label: "Open To Work" },
];

const Highlights = () => {
  return (
    <section className="highlights section" id="services">
      <h2 className="section_title">
        <Title text2="What I Do" />
      </h2>
      <span className="section_subtitle">Services & Profiles</span>

      <div className="latest_strip" aria-label="Latest project work">
        <div className="latest_track">
          {[...latestWork, ...latestWork].map((item, index) => (
            <span className="latest_item" key={`${item}-${index}`}>
              Latest work in <strong>{item}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="highlights_grid container">
        <div className="highlight_panel services_panel">
          <span className="highlight_eyebrow">Specialization</span>
          <h3>Services Offering</h3>

          <div className="service_cards">
            {specializations.map((item) => (
              <article className="service_card" key={item.title}>
                <i className={`fa-solid ${item.icon}`}></i>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="highlight_panel profiles_panel">
          <span className="highlight_eyebrow">Stay With Me</span>
          <h3>Profiles</h3>

          <div className="profile_links">
            {profiles.map((profile) => (
              <a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="profile_link"
                key={profile.label}
                aria-label={profile.label}
              >
                <i className={profile.icon}></i>
                <span>{profile.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="highlight_panel stats_panel">
          {stats.map((stat) => (
            <div className="stat_item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <a className="highlight_cta" href="#contact">
          <span>Let's</span>
          <strong>work together</strong>
          <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </section>
  );
};

export default Highlights;
