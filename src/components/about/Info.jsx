import React from "react";

const Info = () => {
  return (
    <div className="about_info grid">
      <div className="about_box">
        <i class="fa-solid fa-award about_icon"></i>
        <h3 className="about_title">Experience</h3>
        <span className="about_subtitle">8 years working</span>
      </div>

      <div className="about_box">
        <i class="fa-solid fa-briefcase about_icon"></i>
        <h3 className="about_title">Completed</h3>
        <span className="about_subtitle">48+ projects</span>
      </div>

      <div className="about_box">
        <i class="fa-solid fa-headset about_icon"></i>
        <h3 className="about_title">Support</h3>
        <span className="about_subtitle">24/7</span>
      </div>
    </div>
  );
};

export default Info;
