import React from "react";
import "./footer.css";

const Footer = ({ onhandleModal, status }) => {
  return (
    <div className="nav">
      <div className="button">
        <div
          onClick={() => {
            onhandleModal(status);
          }}
          className="add-button"
        >
          +
        </div>
      </div>
    </div>
  );
};

export default Footer;
