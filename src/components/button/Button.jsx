import React from "react";

import "./button.scss";

const Button = (props) => {
  const size = props.size ? props.size : "";
  const bg = props.bg ? props.bg : "primary";
  const color = props.color ? props.color : "white";
  const width = props.width ? props.width : "";
  const boxShadow = props.boxShadow ? props.boxShadow : false;
  const className = props.className ? props.className : "";
  return (
    <button
      className={`btn btn--size-${size} btn--bg-${bg} btn--color-${color} ${
        width ? `btn--width` : ""
      } ${boxShadow && "btn--box-shadow"} ${className}`}
      onClick={props.onClick ? props.onClick : null}
    >
      {props.children}
    </button>
  );
};

export const ButtonCircle = (props) => {
  const size = props.size ? props.size : "default";
  const color = props.color ? props.color : "black";
  const bg = props.bg ? props.bg : "white";
  const boxShadow = props.boxShadow ? true : false;
  const className = props.className ? props.className : "";
  return (
    <div
      className={`btn-circle btn-circle--size-${size} btn-circle--color-${color}  btn-circle--bg-${bg} ${
        boxShadow && "btn-circle--box-shadow"
      } ${className}`}
      onClick={props.onClick ? props.onClick : null}
    >
      {props.children}
    </div>
  );
};

export default Button;
