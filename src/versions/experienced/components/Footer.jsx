const Footer = () => {
  const title = "Let's work together";

  return (
    <footer className="exp-footer" id="contact">
      <div className="exp-container">
        <button className="exp-footer-title" type="button">
          {title.split("").map((char, index) => (
            <span className="exp-char-wrap" key={`${char}-${index}`}>
              <span className="exp-char">
                {char === " " ? "\u00a0" : char}
              </span>
            </span>
          ))}
        </button>

        <div className="exp-footer-main">
          <a href="mailto:gautammakwana.dev@gmail.com">
            gautammakwana.dev@gmail.com
          </a>
          <nav>
            <a href="https://www.instagram.com/_gautammakwana_" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/gautammakwana/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/makwanagautam41" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="/portfolio/starter">v1</a>
          </nav>
        </div>

        <div className="exp-footer-bottom">
          <span>&copy; Code by Gautam</span>
          <span>Backend Developer &amp; DevOps Engineer</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
