  /**
   * LkContactPage — Full-screen dark contact (reference design)
   * Email sending via custom API endpoint + SSE status listener
   * (mirrors experienced/pages/ContactPage.jsx implementation)
   */
  import { useState } from "react";
  import LkHoverText from "../components/LkHoverText";
  import "./LkContactPage.css";

  /* ─── Validation ─────────────────────────────────────────────── */
  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) e.name = "Name is required.";
    else if (data.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!data.email.trim()) e.email = "Email is required.";
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(data.email))
      e.email = "Enter a valid email address.";
    if (!data.message.trim()) e.message = "Message is required.";
    else if (data.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    return e;
  };

  /* ─── HTML email template (same premium layout as experienced version) ────── */
  const buildHtml = (formData, now) => `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Contact Message</title>
  </head>
  <body style="margin:0;padding:0;background:#f0f0f0;font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0f0;padding:32px 0;">
    <tr><td align="center" style="padding:0 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;">
        <tr><td style="background:#0a0a0a;padding:28px 32px;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.4);">Portfolio · Contact Form</p>
          <h1 style="margin:0;font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">New Message Received</h1>
        </td></tr>
        <tr><td style="padding:28px 32px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:16px 18px;background:#f6f6f6;border-radius:8px;border-left:3px solid #0a0a0a;">
              <p style="margin:0 0 3px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">From</p>
              <p style="margin:0 0 2px;font-size:16px;font-weight:700;color:#0a0a0a;">${formData.name}</p>
              <a href="mailto:${formData.email}" style="font-size:13px;color:#555;text-decoration:none;">${formData.email}</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px 0;">
          <p style="margin:0 0 8px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">Message</p>
          <div style="background:#f6f6f6;border-radius:8px;padding:18px;font-size:14px;line-height:1.75;color:#333;white-space:pre-wrap;">${formData.message}</div>
        </td></tr>
        <tr><td style="padding:24px 32px 28px;">
          <a href="mailto:${formData.email}?subject=Re: Your message to Gautam Makwana" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;font-size:13px;font-weight:500;padding:11px 24px;border-radius:6px;letter-spacing:0.02em;">Reply to ${formData.name} ↗</a>
        </td></tr>
        <tr><td style="padding:16px 32px;border-top:1px solid #ececec;background:#fafafa;">
          <p style="margin:0;font-size:11px;color:#bbb;letter-spacing:0.03em;">Received · ${now} IST &nbsp;·&nbsp; gautammakwana.dev</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body>
  </html>`;

  /* ─── SSE listener ───────────────────────────────────────────── */
  const listenForStatus = async (emailId, onSuccess, onError) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/email/events/${emailId}`,
        { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
      );
      if (!res.ok) { onError("SSE connection failed"); return; }
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const chunk of parts) {
          const line = chunk.split("\n").find(l => l.startsWith("data:"));
          if (!line) continue;
          try {
            const event = JSON.parse(line.replace("data:", "").trim());
            if (event.status === "sent") { onSuccess("Message delivered!"); reader.cancel(); return; }
            if (event.status === "failed") { onError("Email failed to deliver."); reader.cancel(); return; }
          } catch { /* ignore parse errors */ }
        }
      }
    } catch { onError("Something went wrong checking delivery status."); }
  };



  /* ─── Component ─────────────────────────────────────────────── */
  const LkContactPage = ({ onNavigate }) => {
    const INIT = { name: "", email: "", message: "" };
    const [formData, setFormData] = useState(INIT);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // "sent" | "error" | null
    const [statusMsg, setStatusMsg] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(p => ({ ...p, [name]: value }));
      if (touched[name]) {
        const errs = validate({ ...formData, [name]: value });
        setErrors(p => ({ ...p, [name]: errs[name] }));
      }
    };

    const handleBlur = (e) => {
      const { name } = e.target;
      setTouched(p => ({ ...p, [name]: true }));
      setErrors(p => ({ ...p, [name]: validate(formData)[name] }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (loading) return;
      setTouched({ name: true, email: true, message: true });
      const errs = validate(formData);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;

      setLoading(true);
      setStatus(null);
      setStatusMsg("");

      const now = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short",
      });

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/email/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            to: "gautammakwana671@gmail.com",
            subject: `📩 ${formData.name} — Portfolio Contact`,
            html: buildHtml(formData, now),
          }),
        });
        const data = await res.json();
        if (!data.id) { setStatus("error"); setStatusMsg("Failed to send. Please email directly."); return; }

        // Reset form immediately
        setFormData(INIT);
        setErrors({});
        setTouched({});
        setStatus("sending");
        setStatusMsg("Message sent — waiting for confirmation…");

        // Listen for delivery confirmation via SSE
        listenForStatus(
          data.id,
          (msg) => { setStatus("sent"); setStatusMsg(msg); },
          (msg) => { setStatus("error"); setStatusMsg(msg); }
        );
      } catch {
        setStatus("error");
        setStatusMsg("Something went wrong. Please email me directly.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="lk-contact">

        {/* BACK — top right */}
        <LkHoverText
          text="BACK"
          onClick={() => onNavigate("home")}
          className="lk-contact-back"
        />

        {/* Main two-column layout */}
        <div className="lk-contact-body">

          {/* LEFT — giant heading + info */}
          <div className="lk-contact-left">
            <h1 className="lk-contact-title">
              LET&apos;S<br />WORK<br />TOGETHER
            </h1>

            <div className="lk-contact-info">
              <a href="mailto:gautammakwana.dev@gmail.com@gmail.com" className="lk-contact-mail">
                gautammakwana.dev@gmail.com
              </a>

              <div className="lk-contact-socials">
                <a href="https://github.com/makwanagautam41" target="_blank" rel="noreferrer">GITHUB</a>
                <span className="lk-contact-sep" aria-hidden="true">|</span>
                <a href="https://www.linkedin.com/in/gautammakwana/" target="_blank" rel="noreferrer">LINKEDIN</a>
                <span className="lk-contact-sep" aria-hidden="true">|</span>
                <a href="https://www.instagram.com/_gautam.makwana" target="_blank" rel="noreferrer">INSTAGRAM</a>
              </div>

              <div className="lk-contact-location">
                <span className="lk-contact-location-label">BASED IN</span>
                <span className="lk-contact-location-val">Rajkot, India</span>
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="lk-contact-right">

            {/* Status banner */}
            {status && status !== "sending" && (
              <div className={`lk-contact-status lk-contact-status--${status}`}>
                {statusMsg}
              </div>
            )}

            {status === "sending" && (
              <p className="lk-contact-status lk-contact-status--sending">{statusMsg}</p>
            )}

            <form className="lk-contact-form" onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <div className="lk-form-row">
                <label htmlFor="lk-name" className="lk-form-label">NAME</label>
                <input
                  id="lk-name" name="name" type="text"
                  className={`lk-form-input${errors.name && touched.name ? " lk-form-input--error" : ""}`}
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                />
                {errors.name && touched.name && (
                  <span className="lk-form-field-error">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="lk-form-row">
                <label htmlFor="lk-email" className="lk-form-label">EMAIL</label>
                <input
                  id="lk-email" name="email" type="email"
                  className={`lk-form-input${errors.email && touched.email ? " lk-form-input--error" : ""}`}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
                {errors.email && touched.email && (
                  <span className="lk-form-field-error">{errors.email}</span>
                )}
              </div>

              {/* Message */}
              <div className="lk-form-row">
                <label htmlFor="lk-message" className="lk-form-label">MESSAGE</label>
                <textarea
                  id="lk-message" name="message"
                  className={`lk-form-input lk-form-textarea${errors.message && touched.message ? " lk-form-input--error" : ""}`}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                />
                {errors.message && touched.message && (
                  <span className="lk-form-field-error">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="lk-contact-submit"
                disabled={loading}
              >
                {loading ? "Sending…" : "SEND MESSAGE →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default LkContactPage;
