import React from "react";

const Info = () => {
  return (
    <div className="about_info grid">
      <div className="about_box">
        <i class="fa-solid fa-award about_icon"></i>
        <h3 className="about_title">Experience</h3>
        <span className="about_subtitle">
          <strong>Fresher</strong>
        </span>
      </div>

      <div className="about_box">
        <i class="fa-solid fa-briefcase about_icon"></i>
        <h3 className="about_title">Completed</h3>
        <span className="about_subtitle">
          <strong>5+ projects</strong>
        </span>
      </div>

      <div className="about_box">
        <i class="fa-solid fa-headset about_icon"></i>
        <h3 className="about_title">Support</h3>
        <span className="about_subtitle">
          <strong>24/7</strong>
        </span>
      </div>
    </div>
  );
};

export default Info;
