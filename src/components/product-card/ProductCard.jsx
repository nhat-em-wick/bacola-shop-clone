import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button, { ButtonCircle } from "../button/Button";
import Badge from "../badge/Badge";
import { useDispatch } from "react-redux";
import { set } from "../../redux/modal-product/productModalSlice";
import "./product-card.scss";

const ProductCard = (props) => {

  const product = props.item

  const starYellow = props.item.rating ? Number(props.item.rating) : null;

  const type = props.type === "simple" ? "simple" : "fadein";

  const dispatch = useDispatch()

  return (
    <div className={`product-card product-card-${type}`}>
      <div className="product-card__badge">
        <Badge>{-1 * Math.round(100 - product.oldPrice/product.newPrice * 100)}%</Badge>
      </div>
      <div className="product-card__action">
        <div className="product-card__action__quick-view">
          <ButtonCircle onClick={() => dispatch(set(product.id))}>
            <i className="bx bx-expand"></i>
          </ButtonCircle>
        </div>
        <div className="product-card__action__heart">
          <ButtonCircle boxShadow={true}>
            <i className="bx bx-heart"></i>
          </ButtonCircle>
        </div>
      </div>
      <Link to={`/shop/${product.id}`}>
        <div className="product-card__img-wrapper">
          <div className="product-card__img">
            <img src={product.img1} alt={product.name} />
            <img src={product.img2} alt={product.name} />
          </div>
        </div>
      </Link>
      <div className="product-card__info">
        <Link to={`/shop/${product.id}`}>
          <div className="product-card__info__name">{product.name}</div>
        </Link>
        <div className="product-card__info__stock">
          {product.statusStock && "in stock"}
        </div>
        <div className="product-card__info__rating">
          <div className="product-card__info__star-outer">
            <div className="product-card__info__star-inner" 
              style={{ width: `${(starYellow / 5) * 100}%`}} 
            ></div>
          </div>
          <span className="number-rating">{product.rating}</span>
        </div>
        <div className="product-card__info__price">
          <span className="product-card__info__old-price">
            ${product.oldPrice}
          </span>
          <span className="product-card__info__new-price">
            ${product.newPrice}
          </span>
        </div>
        <div className="product-card__addtocart">
          <Button
            size={props.btn.size ? props.btn.size : "primary"}
            width={props.btn.width ? props.btn.width : "primary"}
            bg={props.btn.bg ? props.btn.bg : "primary"}
            color={props.btn.color ? props.btn.color : ""}
          >
            Thêm vào giỏ hàng
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





