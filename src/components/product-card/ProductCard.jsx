import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button, { ButtonCircle } from "../button/Button";
import Badge from "../badge/Badge";
import "./product-card.scss";

const ProductCard = (props) => {
  const refStar = useRef();

  const starYellow = props.item.rating ? Number(props.item.rating) : null;

  const starTotal = 5;
  useEffect(() => {
    function ratingStar() {
      const starPercentage = (starYellow / starTotal) * 100;
      const starPercentageRounded = Math.round(starPercentage / 10) * 10;
      refStar.current.style.width = starPercentageRounded + "%";
    }
    ratingStar();
  }, [props.item.id]);

  const type = props.type === "simple" ? "simple" : "fadein";
  return (
    <div className={`product-card product-card-${type}`}>
      <div className="product-card__badge">
        <Badge>-50%</Badge>
      </div>
      <div className="product-card__action">
        <div className="product-card__action__quick-view">
          <ButtonCircle>
            <i className="bx bx-expand"></i>
          </ButtonCircle>
        </div>
        <div className="product-card__action__heart">
          <ButtonCircle boxShadow={true}>
            <i className="bx bx-heart"></i>
          </ButtonCircle>
        </div>
      </div>
      <Link to="#">
        <div className="product-card__img-wrapper">
          <div className="product-card__img">
            <img src={props.item.img1} alt={props.item.name} />
            <img src={props.item.img2} alt={props.item.name} />
          </div>
        </div>
      </Link>
      <div className="product-card__info">
        <Link to="#">
          <div className="product-card__info__name">{props.item.name}</div>
        </Link>
        <div className="product-card__info__stock">
          {props.item.statusStock}
        </div>
        <div className="product-card__info__rating">
          <div className="product-card__info__star-outer">
            <div ref={refStar} className="product-card__info__star-inner"></div>
          </div>
          <span className="number-rating">{props.item.rating}</span>
        </div>
        <div className="product-card__info__price">
          <span className="product-card__info__old-price">
            ${props.item.oldPrice}
          </span>
          <span className="product-card__info__new-price">
            ${props.item.newPrice}
          </span>
        </div>
        <div className="product-card__addtocart">
          <Button
            size={props.btn.size ? props.btn.size : "primary"}
            width={props.btn.width ? props.btn.width : "primary"}
            bg={props.btn.bg ? props.btn.bg : "primary"}
            color={props.btn.color ? props.btn.color : ""}
          >
            Mua hàng
          </Button>
        </div>
      </div>
      {type === "fadein" ? (
        <div className="product-card__animate-fadein"></div>
      ) : (
        ""
      )}
    </div>
  );
};

const CartType1 = () => (
  <div className="product-card__addtocart">
    <Button width="100%">Add to cart</Button>
    <div className="product-card__addtocart__fadein"></div>
  </div>
);

const CartType2 = () => (
  <div className="product-card__addtocart">
    <Button width="100%">Add to cart</Button>
  </div>
);

export default ProductCard;
