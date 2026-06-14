import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";
import { pageVariants } from "../data/data";
import Footer from "../components/Footer";
import "./ContactPage.css";

const PROJECT_TYPES = ["Web App", "Mobile App", "Backend / API", "DevOps / Cloud", "Full Stack", "Other"];
const BUDGETS = ["< ₹10k", "₹10k – ₹50k", "₹50k – ₹2L", "₹2L+", "Let's talk"];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validateEmail(formData.email)) { toast.error("Please enter a valid email."); return; }
    setLoading(true);

    const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:'Segoe UI',Arial,sans-serif;-webkit-text-size-adjust:100%;">

<!-- Outer wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
  style="background:#f0f0f0;padding:32px 0;">
  <tr>
    <td align="center" style="padding:0 16px;">

      <!-- Card -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
        style="max-width:580px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#0a0a0a;padding:28px 32px;">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.4);">Portfolio · Contact Form</p>
            <h1 style="margin:0;font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">New Message Received</h1>
          </td>
        </tr>

        <!-- Sender block -->
        <tr>
          <td style="padding:28px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:16px 18px;background:#f6f6f6;border-radius:8px;border-left:3px solid #0a0a0a;">
                  <p style="margin:0 0 3px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">From</p>
                  <p style="margin:0 0 2px;font-size:16px;font-weight:700;color:#0a0a0a;">${formData.name}</p>
                  <a href="mailto:${formData.email}" style="font-size:13px;color:#555;text-decoration:none;">${formData.email}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${(formData.projectType || formData.budget || formData.timeline) ? `
        <!-- Project meta -->
        <tr>
          <td style="padding:20px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${formData.projectType ? `<td width="33%" style="padding:12px 14px;background:#f6f6f6;border-radius:8px;vertical-align:top;">
                  <p style="margin:0 0 3px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">Project</p>
                  <p style="margin:0;font-size:13px;font-weight:600;color:#0a0a0a;">${formData.projectType}</p>
                </td>` : ""}
                ${formData.budget ? `<td width="4%" style="padding:0;"></td>
                <td width="30%" style="padding:12px 14px;background:#f6f6f6;border-radius:8px;vertical-align:top;">
                  <p style="margin:0 0 3px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">Budget</p>
                  <p style="margin:0;font-size:13px;font-weight:600;color:#0a0a0a;">${formData.budget}</p>
                </td>` : ""}
                ${formData.timeline ? `<td width="4%" style="padding:0;"></td>
                <td style="padding:12px 14px;background:#f6f6f6;border-radius:8px;vertical-align:top;">
                  <p style="margin:0 0 3px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">Timeline</p>
                  <p style="margin:0;font-size:13px;font-weight:600;color:#0a0a0a;">${formData.timeline}</p>
                </td>` : ""}
              </tr>
            </table>
          </td>
        </tr>` : ""}

        <!-- Message -->
        <tr>
          <td style="padding:20px 32px 0;">
            <p style="margin:0 0 8px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">Message</p>
            <div style="background:#f6f6f6;border-radius:8px;padding:18px;font-size:14px;line-height:1.75;color:#333;white-space:pre-wrap;">${formData.description}</div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:24px 32px 28px;">
            <a href="mailto:${formData.email}?subject=Re: Your message to Gautam Makwana"
              style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;font-size:13px;font-weight:500;padding:11px 24px;border-radius:6px;letter-spacing:0.02em;">
              Reply to ${formData.name} ↗
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #ececec;background:#fafafa;">
            <p style="margin:0;font-size:11px;color:#bbb;letter-spacing:0.03em;">Received · ${now} IST &nbsp;·&nbsp; gautammakwana.dev</p>
          </td>
        </tr>

      </table>
      <!-- /Card -->

    </td>
  </tr>
</table>
<!-- /Outer wrapper -->

</body>
</html>`;

    const sendEmail = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_API_KEY },
        body: JSON.stringify({ to: "gautammakwana671@gmail.com", subject: `📩 ${formData.name} — ${formData.projectType || "General Inquiry"} · Portfolio Contact`, html: htmlContent }),
      });
      const data = await res.json();
      return data.id;
    };

    const listenForUpdates = async (emailId) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/email/events/${emailId}`, {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      });
      if (!response.ok) { toast.error("SSE connection failed"); return; }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const chunk of parts) {
          const line = chunk.split("\n").find((entry) => entry.startsWith("data:"));
          if (!line) continue;
          try {
            const event = JSON.parse(line.replace("data:", "").trim());
            if (event.status === "sent") { toast.success("Email delivered successfully!"); reader.cancel(); return; }
            if (event.status === "failed") { toast.error("Email failed!"); reader.cancel(); return; }
          } catch { /* ignore */ }
        }
      }
    };

    try {
      const id = await sendEmail();
      if (!id) { toast.error("Failed to send message."); return; }
      setFormData({ name: "", email: "", projectType: "", budget: "", timeline: "", description: "" });
      listenForUpdates(id);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <section className="exp-page-hero exp-contact-page">
        {/* <div className="exp-container"><h1>Contact</h1></div> */}
      </section>

      <section className="exp-section" style={{ paddingTop: "0" }}>
        <form className="exp-container exp-contact-form" onSubmit={handleSubmit}>

          {/* Row 1: Name + Email */}
          <div className="exp-form-row">
            <div className="exp-form-field">
              <label className="exp-form-label">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" aria-label="Name" required />
            </div>
            <div className="exp-form-field">
              <label className="exp-form-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" aria-label="Email" required />
            </div>
          </div>

          {/* Row 2: Project Type chips */}
          <div className="exp-form-field">
            <label className="exp-form-label">Project Type <span className="exp-form-optional">optional</span></label>
            <div className="exp-chip-group">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`exp-chip${formData.projectType === type ? " exp-chip--active" : ""}`}
                  onClick={() => setFormData((p) => ({ ...p, projectType: p.projectType === type ? "" : type }))}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Budget + Timeline */}
          <div className="exp-form-row">
            <div className="exp-form-field">
              <label className="exp-form-label">Budget <span className="exp-form-optional">optional</span></label>
              <div className="exp-chip-group">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`exp-chip${formData.budget === b ? " exp-chip--active" : ""}`}
                    onClick={() => setFormData((p) => ({ ...p, budget: p.budget === b ? "" : b }))}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div className="exp-form-field">
              <label className="exp-form-label">Timeline <span className="exp-form-optional">optional</span></label>
              <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} placeholder="e.g. ASAP, 1 month…" aria-label="Timeline" />
            </div>
          </div>

          {/* Message */}
          <div className="exp-form-field">
            <label className="exp-form-label">Message</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell me about your project…" aria-label="Message" rows="5" required />
          </div>

          <button type="submit" className={loading ? "is-loading" : ""} disabled={loading}>
            {loading ? (
              <><PiSpinner className="spinner-icon" style={{ animation: "spin 1s linear infinite", marginRight: "8px", verticalAlign: "middle" }} />Submitting...</>
            ) : "Send ->"}
          </button>

        </form>
      </section>
      <Footer />
    </motion.div>
  );
};

export default ContactPage;