import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";
import { pageVariants } from "../data/data";
import Footer from "../components/Footer";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
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

    const htmlContent = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong> ${formData.description}</p>
    `;

    const sendEmail = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_API_KEY },
        body: JSON.stringify({ to: "gautammakwana671@gmail.com", subject: "📩 New Contact Message From Portfolio", html: htmlContent }),
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
      setFormData({ name: "", email: "", description: "" });
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
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" aria-label="Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" aria-label="Email" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Message" aria-label="Message" rows="5" required />
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
