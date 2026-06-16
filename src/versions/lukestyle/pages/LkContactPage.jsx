/**
 * LkContactPage — Two-column layout:
 *   LEFT:  "LET'S WORK TOGETHER" heading + email + socials (white-on-dark text)
 *   RIGHT: Contact form (scroll-triggered blob expands behind everything)
 *
 * The expanding blob fills the screen from bottom, inverting text colors.
 * Form uses EmailJS (matches your existing setup).
 */
import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./LkContactPage.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

const LkContactPage = ({ onNavigate }) => {
  const [inverted, setInverted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Scroll-driven blob expansion
  useEffect(() => {
    const handleScroll = () => {
      const el = document.querySelector(".lk-contact");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (total || 1)));

      if (progress > 0.08) {
        setExpanded(true);
        setInverted(progress > 0.4);
      } else {
        setExpanded(false);
        setInverted(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: "Gautam",
          },
          PUBLIC_KEY
        );
      }
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="lk-contact">
      {/* Back button */}
      <button
        type="button"
        className="lk-contact-back"
        onClick={() => onNavigate("home")}
      >
        BACK
      </button>

      {/* Sticky viewport */}
      <div className="lk-contact-pin">
        {/* Expanding blob (background inversion) */}
        <div className="lk-contact-blob-wrap" aria-hidden="true">
          <div className={`lk-contact-blob${expanded ? " expanded" : ""}`} />
        </div>

        {/* Two-column layout */}
        <div className={`lk-contact-layout${inverted ? " inverted" : ""}`}>

          {/* LEFT — heading + info */}
          <div className="lk-contact-left">
            <h1 className="lk-contact-title">
              LET'S<br />WORK<br />TOGETHER
            </h1>

            <div className="lk-contact-info">
              <a href="mailto:makwanagautam41@gmail.com" className="lk-contact-mail">
                makwanagautam41@gmail.com
              </a>
              <div className="lk-contact-socials">
                <a href="https://github.com/makwanagautam41" target="_blank" rel="noreferrer" className="lk-contact-social-link">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/gautammakwana/" target="_blank" rel="noreferrer" className="lk-contact-social-link">
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/_gautam.makwana" target="_blank" rel="noreferrer" className="lk-contact-social-link">
                  Instagram
                </a>
              </div>
            </div>

            <div className="lk-contact-location">
              <span className="lk-contact-location-label">Based in</span>
              <span>Rajkot, India</span>
            </div>
          </div>

          {/* RIGHT — contact form */}
          <div className="lk-contact-right">
            {sent ? (
              <div className="lk-contact-success">
                <h3>Message sent ✓</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  type="button"
                  className="lk-contact-submit"
                  onClick={() => setSent(false)}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="lk-contact-form" onSubmit={handleSubmit} noValidate>
                <div className="lk-form-row">
                  <label htmlFor="lk-name" className="lk-form-label">Name</label>
                  <input
                    id="lk-name"
                    name="name"
                    type="text"
                    className="lk-form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="lk-form-row">
                  <label htmlFor="lk-email" className="lk-form-label">Email</label>
                  <input
                    id="lk-email"
                    name="email"
                    type="email"
                    className="lk-form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="lk-form-row">
                  <label htmlFor="lk-message" className="lk-form-label">Message</label>
                  <textarea
                    id="lk-message"
                    name="message"
                    className="lk-form-input lk-form-textarea"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                {error && <p className="lk-form-error">{error}</p>}

                <button
                  type="submit"
                  className="lk-contact-submit"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send message →"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Scroll hint */}
        <p className="lk-contact-scroll-hint" aria-hidden="true">Scroll ↓</p>
      </div>
    </div>
  );
};

export default LkContactPage;
