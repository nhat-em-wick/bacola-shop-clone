import React from "react";
import "./section.scss";
const Section = (props) => {
  return (
    <div className="section">
      <div className="grid wide">{props.children}</div>
    </div>
  );
};

export const SectionTitle = (props) => {
  return <div className="section__title">{props.children}</div>;
};

export const SectionBody = (props) => {
  return <div className="section__body">{props.children}</div>;
};

export default Section;
