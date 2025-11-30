import React, { useState } from "react";
import Title from "../Title";
import emailjs from "emailjs-com";
import "./Contact.css";
import { FaSpinner } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);

    const API_URL = "https://smtp-service-server.vercel.app";
    const API_KEY = "lite9638Ol2i-_zmtdzoQ09kvZZxXyBPoPpdXYy";

    const htmlContent = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong> ${formData.description}</p>
    `;

    async function sendEmail() {
      const res = await fetch(`${API_URL}/api/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          to: "gautammakwana671@gmail.com",
          subject: "📩 New Contact Message From Portfolio",
          html: htmlContent,
        }),
      });

      const data = await res.json();
      return data.id;
    }

    async function listenForUpdates(emailId) {
      const response = await fetch(`${API_URL}/api/email/events/${emailId}`, {
        headers: { "x-api-key": API_KEY },
      });

      console.log(response);

      if (!response.ok) {
        toast.error("SSE connection failed");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        console.log(done, value);
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();

        for (const chunk of parts) {
          const line = chunk.split("\n").find((l) => l.startsWith("data:"));
          if (!line) continue;

          const json = line.replace("data:", "").trim();

          try {
            const event = JSON.parse(json);
            console.log(event);
            if (event.status === "sent") {
              toast.success("Email delivered successfully!");
              reader.cancel();
              return;
            }
            if (event.status === "failed") {
              toast.error("Email failed!");
              reader.cancel();
              return;
            }
          } catch {}
        }
      }
    }

    try {
      const id = await sendEmail();

      if (!id) {
        toast.error("Failed to send message.");
        setLoading(false);
        return;
      }

      setFormData({ name: "", email: "", description: "" });

      listenForUpdates(id);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="section_title">
        <Title text2="Get In Touch" />
      </h2>
      <span className="section_subtitle">Contact Me</span>

      <div className="contact_container container grid">
        {/* Contact Info Section */}
        <div className="contact_content">
          <h3 className="contact_title">Talk To Me</h3>
          <div className="contact_info">
            <div className="contact_card">
              <i className="fa-regular fa-envelope contact_card-icon"></i>
              <h3 className="contact_card-title">Email</h3>
              <span className="contact_card-data">
                gautammakwana671@gmail.com
              </span>
              <a
                href="mailto:gautammakwana671@gmail.com"
                className="contact_button"
              >
                Write me{" "}
                <i className="fa-solid fa-arrow-right contact_button-icon"></i>
              </a>
            </div>

            <div className="contact_card">
              <i className="fa-brands fa-whatsapp contact_card-icon"></i>
              <h3 className="contact_card-title">WhatsApp</h3>
              <span className="contact_card-data">8799170882</span>
              <a
                href="https://wa.me/918799170882"
                className="contact_button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Write me{" "}
                <i className="fa-solid fa-arrow-right contact_button-icon"></i>
              </a>
            </div>

            <div className="contact_card">
              <i className="fa-brands fa-telegram contact_card-icon"></i>
              <h3 className="contact_card-title">Telegram</h3>
              <span className="contact_card-data">@gautammakwana</span>
              <a
                href="https://t.me/gautammakwana41"
                target="_blank"
                rel="noopener noreferrer"
                className="contact_button"
              >
                Write me{" "}
                <i className="fa-solid fa-arrow-right contact_button-icon"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact_content">
          <h3 className="contact_title">Write me your message hear</h3>
          <form className="contact_form" onSubmit={handleSubmit}>
            <div className="contact_form-div">
              <label className="contact_form-tag">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="contact_form-input"
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div className="contact_form-div">
              <label className="contact_form-tag">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="contact_form-input"
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div className="contact_form-div contact_form-area">
              <label className="contact_form-tag">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="contact_form-input"
                placeholder="Enter Your Description"
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="button button--flex"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner
                    className="spinner-icon"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  &nbsp; Submitting...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Spinner CSS */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spinner-icon {
            font-size: 20px;
          }
        `}
      </style>

      <Toaster />
    </section>
  );
};

export default Contact;
