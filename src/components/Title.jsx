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
          }

          .title-highlight {
            color: #374151;
            font-weight: 500;
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
