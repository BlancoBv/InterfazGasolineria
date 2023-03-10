import React from "react";
import { useNavigate } from "react-router-dom";

const IconComponents = ({ url, text, icon, sizeIcon }) => {
  const navigate = useNavigate();
  return (
    <div
      className="rounded p-2 btn-select m-1 d-flex flex-column align-items-center mt-0 pt-0"
      onClick={() => navigate(url)}
      style={{ minWidth: "100px", maxWidth: "150px" }}
    >
      <i className={`fa-regular fa-${icon}`} style={{ fontSize: sizeIcon }}></i>
      <p className="p-0 m-0 text-nowrap">{text}</p>
    </div>
  );
};

IconComponents.defaultProps = {
  sizeIcon: "40px",
};

export default IconComponents;
