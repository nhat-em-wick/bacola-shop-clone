import React from "react";
import "./overlay.scss";
const Overlay = (props) => {
  return (
    <div
      className={`overlay ${props.overlay ? "active" : ""}`}
      onClick={props.onClick ? props.onClick : null}
    >
      {props.children}
    </div>
  );
};

export default Overlay;
