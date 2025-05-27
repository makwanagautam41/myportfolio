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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // EmailJS Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // EmailJS Template ID
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // EmailJS Public Key
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", description: "" });
        },
        (error) => {
          console.error("Error sending message: ", error);
          toast.error("Failed to send message. Try again!");
        }
      )
      .finally(() => setLoading(false));
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
