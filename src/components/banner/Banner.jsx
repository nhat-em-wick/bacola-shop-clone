import React from "react";
import Button from "../button/Button";
import "./banner.scss";
const Banner = (props) => {
  const height = props.height ? props.height : "250px";
  return (
    <div style={{ height: `${height}` }} className="banner">
      <div className="banner__img">
        <img src={props.img} alt="" />
      </div>
      <BannerContent content={props.content} />
    </div>
  );
};

const BannerContent = (props) => (
  <div className="banner__content">
    <h3 className="banner__content__title-top">{props.content.titleTop}</h3>
    <h2 className="banner__content__title-main">{props.content.titleMain}</h2>
    <p className="banner__content__description">{props.content.description}</p>
    <div className="banner__content__btn">
      <Button size="s" bg={props.content.bgBtn ? props.content.bgBtn : ""}>
        {props.content.contentBtn}
      </Button>
    </div>
  </div>
);

export default Banner;
