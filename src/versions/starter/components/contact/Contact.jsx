import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Title from "../Title";
import "./Contact.css";
import { PiSpinner } from "react-icons/pi";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (loading) {
      const buttonPulse = gsap.to(submitButtonRef.current, {
        scale: 1.015,
        boxShadow: "0 0 0 6px rgba(0, 0, 0, 0.08)",
        duration: 0.8,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });




      return () => {
        buttonPulse.kill();
      };
    }

    gsap.killTweensOf(submitButtonRef.current);
    return undefined;
  }, [loading]);

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

    if (loading) {
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

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
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          to: "gautammakwana671@gmail.com",
          subject: "📩 New Contact Message From Portfolio",
          html: htmlContent,
        }),
      });

      const data = await res.json();
      return data.id;
    };

    const listenForUpdates = async (emailId) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/email/events/${emailId}`,
        {
          headers: { "x-api-key": import.meta.env.VITE_API_KEY },
        }
      );

      if (!response.ok) {
        toast.error("SSE connection failed");
        return;
      }

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

          const json = line.replace("data:", "").trim();

          try {
            const event = JSON.parse(json);

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
          } catch {
            // Ignore malformed event payloads.
          }
        }
      }
    };

    try {
      const id = await sendEmail();

      if (!id) {
        toast.error("Failed to send message.");
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

      <div className="contact_container container grid">
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
              />
            </div>

            <button
              type="submit"
              className={`button button--flex contact_submit-button ${loading ? "is-loading" : ""}`}
              ref={submitButtonRef}
            >
              {loading ? (
                <>
                  <PiSpinner className="spinner-icon" style={{ animation: "spin 1s linear infinite" }} />
                  &nbsp;Submitting...
                </>
              ) : (
                "Send Message"
              )}
            </button>

          </form>
        </div>
      </div>

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

    </section>
  );
};

export default Contact;
