import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <>
      <style>
        {`
          .title-container {
            display: inline-flex;
            gap: 8px;
            align-items: center;
            margin-bottom: 12px;
          }

          .title-text {
            color: #6b7280;
            position: relative;
            cursor: pointer;
            transition: color 0.3s ease-in-out;
          }

          .title-highlight {
            color: #374151;
            font-weight: 500;
            position: relative;
            cursor: pointer;
          }

          .title-highlight::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 100%;
            height: 2px;
            background-color: #374151;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease-in-out;
          }

          .title-text:hover,
          .title-highlight:hover {
            color: #111827;
          }

          .title-highlight:hover::after {
            transform: scaleX(1);
          }

          .title-line {
            width: 32px;
            height: 1px;
            background-color: #374151;
          }

          @media (min-width: 640px) {
            .title-line {
              width: 48px;
              height: 2px;
            }
          }
        `}
      </style>

      <div className="title-container">
        <p className="title-text">
          {text1} <span className="title-highlight">{text2}</span>
        </p>
        <p className="title-line"></p>
      </div>
    </>
  );
};

export default Title;
