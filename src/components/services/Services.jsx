import React, { useState } from "react";
import "./Services.css";
import Title from "../Title";

const servicesData = [
  {
    id: 1,
    title: "Product Designer",
    description:
      "Services with more than 3 years of experience. Providing quality work to clients and companies.",
    tasks: [
      "Develop the user interface.",
      "Web Page development.",
      "I create UX element interactions.",
      "I position your company brand.",
      "Design and mockups of products for companies.",
    ],
    icon: "fa-cubes",
  },
  {
    id: 2,
    title: "UI & UX Designer",
    description:
      "Specialized in creating seamless user experiences with intuitive UI design.",
    tasks: [
      "User research and testing.",
      "Wireframing and prototyping.",
      "Interactive design development.",
      "Enhancing user engagement.",
      "Mobile-first UI strategies.",
    ],
    icon: "fa-code",
  },
  {
    id: 3,
    title: "Visual Designer",
    description:
      "Expert in crafting visually appealing and brand-consistent designs.",
    tasks: [
      "Typography and color theory.",
      "Graphic and web design.",
      "Brand identity creation.",
      "Motion graphics design.",
      "Print and digital media assets.",
    ],
    icon: "fa-pen-to-square",
  },
];

const Services = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section className="services" id="services">
      <h2 className="section_title">
        <Title text2={"Services"} />
      </h2>
      <span className="section_subtitle">What I Offer</span>

      <div className="services_container container grid">
        {servicesData.map((service) => (
          <div className="services_content" key={service.id}>
            <div>
              <i className={`fa-solid ${service.icon}`}></i>
              <h3 className="services_title">{service.title}</h3>
            </div>
            <span
              className="services_button"
              onClick={() => setActiveModal(service.id)}
            >
              View More
              <i className="fa-solid fa-arrow-right services_button-icon"></i>
            </span>

            {/* Modal */}
            {activeModal === service.id && (
              <div className="services_modal active-modal">
                <div className="services_modal-content">
                  <i
                    className="fa-solid fa-xmark services_modal-close"
                    onClick={() => setActiveModal(null)}
                  ></i>
                  <h3 className="services_modal-title">{service.title}</h3>
                  <p className="services_modal-description">
                    {service.description}
                  </p>
                  <br />
                  <ul className="services_modal-services">
                    {service.tasks.map((task, index) => (
                      <li className="services_modal-service" key={index}>
                        <i class="fa-regular fa-circle-check services_modal-icon"></i>
                        <p className="services_modal-info">{task}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
