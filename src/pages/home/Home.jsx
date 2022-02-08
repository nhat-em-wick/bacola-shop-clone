import React, { useRef, useEffect, useState } from "react";

import HeroSlider from "../../components/hero-slider/HeroSlider";
import Section, {
  SectionBody,
  SectionTitle,
} from "../../components/section/Section";
import Category from "../../components/category/Category";
import ProductCard from "../../components/product-card/ProductCard";
import Banner from "../../components/banner/Banner";
import { ButtonCircle } from "../../components/button/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import banner1 from "../../assets/silder/slider1.jpg";
import banner2 from "../../assets/silder/slider-image-7.jpg";

import "./home.scss";

import shopApi from '../../api/shopApi'

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const sliderRef = useRef(null);

  const [productList, setProductList] = useState([])

  useEffect(() => {
    const fetchProductList = async () => {
      try{
        const params = { 
          _page: 1,
          _limit: 10
         }
        const response = await shopApi.getProductList(params)
        setProductList(response.data)
      }catch (e) {
        console.log(e)
      }
    }
    fetchProductList()
  },[])

  return (
     
    
    <>
      <HeroSlider />
      <Section>
        <SectionTitle>sản phẩm bán chạy</SectionTitle>
        <SectionBody>
          <div className="row no-gutters">
            {productList.map((item, index) => (
              <div key={index} className="l-2-4 m-4 c-6">
                <ProductCard
                  item={item}
                  type="fadein"
                  btn={{
                    width: "100%",
                    size: "s",
                    bg: "primary",
                    color: "white",
                  }}
                />
              </div>
            ))}
          </div>
        </SectionBody>
      </Section>
      <Section>
        <div className="row">
          <div className="col l-6">
            <Banner
              img={banner1}
              content={{
                titleTop: "weekend discount 40%",
                titleMain: "Cookie and Ice Cream",
                description: "bacola weekend discount",
                contentBtn: "Shop Now",
              }}
            />
          </div>
          <div className=" col l-6">
            <Banner
              img={banner2}
              content={{
                titleTop: "weekend discount 40%",
                titleMain: "Cookie and Ice Cream",
                description: "bacola weekend discount",
                contentBtn: "Shop Now",
                bgBtn: "red",
              }}
            />
          </div>
        </div>
      </Section>
      <Section>
        <SectionBody>
          <div className="product-slider">
            <Slider ref={sliderRef} {...settings}>
              {productList.map((item, index) => (
                <div key={index}>
                  <ProductCard
                    item={item}
                    type="simple"
                    btn={{
                      width: "100%",
                      size: "s",
                      bg: "yellow",
                      color: "black",
                    }}
                  />
                </div>
              ))}
            </Slider>
            <ControlNext onClick={() => sliderRef?.current?.slickNext()} />
            <ControlPrev onClick={() => sliderRef?.current?.slickPrev()} />
          </div>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Sản phẩm mới</SectionTitle>
        <SectionBody>
          <div className="row no-gutters">
            {productList.map((item, index) => (
              <div key={index} className="l-2-4 m-4 c-6">
                <ProductCard
                  item={item}
                  type="fadein"
                  btn={{
                    width: "100%",
                    size: "s",
                    bg: "primary",
                    color: "white",
                  }}
                />
              </div>
            ))}
          </div>
        </SectionBody>
      </Section>
    </>
  
  );
};

const ControlPrev = (props) => (
  <div className="product-slider__control--prev" onClick={props.onClick}>
    <ButtonCircle boxShadow={true}>
      <i className="bx bx-left-arrow-alt"></i>
    </ButtonCircle>
  </div>
);

const ControlNext = (props) => (
  <div className="product-slider__control--next" onClick={props.onClick}>
    <ButtonCircle boxShadow={true}>
      <i className="bx bx-right-arrow-alt"></i>
    </ButtonCircle>
  </div>
);

export default Home;
