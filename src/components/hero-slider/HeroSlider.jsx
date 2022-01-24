import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./hero-slide.scss";

import Button from "../button/Button";

import dataSlider from "./dataSlider";

const ControlArrow = (props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <i className={props.icon}></i>
    </div>
  );
};

const ControlArrowPrev = (props) => {
  return (
    <div className="hero-slider__prev-arrow" onClick={props.onClick}>
      <i className="bx bx-chevron-left"></i>
    </div>
  );
};

const ControlArrowNext = (props) => {
  return (
    <div className="hero-slider__next-arrow" onClick={props.onClick}>
      <i className="bx bx-chevron-right"></i>
    </div>
  );
};

const HeroSlider = () => {
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="hero-slider">
      <Slider ref={sliderRef} {...settings}>
        {dataSlider.map((item, index) => (
          <SlideItem item={item} key={index} />
        ))}
      </Slider>
      <ControlArrowNext onClick={() => sliderRef?.current?.slickNext()} />
      <ControlArrowPrev onClick={() => sliderRef?.current?.slickPrev()} />
    </div>
  );
};

const SlideItem = (props) => (
  <div className="slide-item">
    <div className="slide-item__img">
      <img src={props.item.img} />
    </div>
    <div className="slide-item__info">
      <div className="slide-item__info-title">{props.item.title}</div>
      <div className="slide-item__info-description">
        {props.item.description}
      </div>
      <div className="slide-item__info-price">${props.item.price}</div>
      <Button bg="second">Shop now</Button>
    </div>
  </div>
);

export default HeroSlider;
