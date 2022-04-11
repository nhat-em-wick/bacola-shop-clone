import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button, { ButtonCircle } from "../button/Button";
import Badge from "../badge/Badge";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/shopping-cart/cartItemsSlice";
import { set } from "../../redux/modal-product/productModalSlice";
import shopApi from "../../api/shopApi";
import formatMoneyVND from "../../utils/formatMoney";
import { notifyError, notifySuccess } from "../toast/Toast";

import "./product-card.scss";

const ProductCard = (props) => {
  const [quantity, setQuantity] = useState(1);

  const product = props.item;

  const starYellow = props.item.rating ? Number(props.item.rating) : null;

  const type = props.type === "simple" ? "simple" : "fadein";

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems.values.items);

  const addToCart = (item) => {
    const result =
      cartItems.length > 0 &&
      cartItems.filter((item1) => item1.productId === item._id);
    const tracking = async () => {
      const pamramsTracking = {
        slug: item.slug,
        quantity: result[0] ? result[0].quantity + 1 : 1,
      };

      try {
        const res = await shopApi.tracking(pamramsTracking);
        notifySuccess("Đã thêm vào giỏ hàng");
        dispatch(
          addItem({
            productId: item._id,
            quantity: quantity,
            price: item.new_price,
            img: item.gallery[0],
            name: item.name,
            slug: item.slug,
          })
        );
      } catch (error) {
        console.log(error);
        notifyError(error.response.data.message);
      }
    };
    tracking();
  };

  return (
    <div className={`product-card product-card-${type}`}>
      <div className="product-card__badge">
        {product.old_price && (
          <Badge>
            {Math.round(
              ((product.new_price - product.old_price) / product.old_price) *
                100
            )}
            %
          </Badge>
        )}
      </div>
      <div className="product-card__action">
        <div className="product-card__action__quick-view">
          <ButtonCircle onClick={() => dispatch(set(product.slug))}>
            <i className="bx bx-expand"></i>
          </ButtonCircle>
        </div>
        <div className="product-card__action__heart">
          <ButtonCircle boxShadow={true}>
            <i className="bx bx-heart"></i>
          </ButtonCircle>
        </div>
      </div>
      <Link to={`/shop/${product.slug}`}>
        <div className="product-card__img-wrapper">
          <div className="product-card__img">
            <img src={product.gallery[0]} alt={product.name} />
            {product.gallery[1] && (
              <img src={product.gallery[1]} alt={product.name} />
            )}
          </div>
        </div>
      </Link>
      <div className="product-card__info">
        <Link to={`/shop/${product.slug}`}>
          <div className="product-card__info__name">{product.name}</div>
        </Link>
        <div className="product-card__info__stock">
          Còn {product.stock} sản phẩm
        </div>
        <div className="product-card__info__rating">
          <div className="product-card__info__star-outer">
            <div
              className="product-card__info__star-inner"
              style={{ width: `${(starYellow / 5) * 100}%` }}
            ></div>
          </div>
          <span className="number-rating">{product.rating}</span>
        </div>
        <div className="product-card__info__price">
          {product.old_price && (
            <span className="product-card__info__old-price">
              {formatMoneyVND(product.old_price)}
            </span>
          )}

          <span className="product-card__info__new-price">
            {formatMoneyVND(product.new_price)}
          </span>
        </div>
        {product.stock <= 0 ? null : (
          <div className="product-card__addtocart">
            <Button
              size={props.btn.size ? props.btn.size : "primary"}
              width={props.btn.width ? props.btn.width : "primary"}
              bg={props.btn.bg ? props.btn.bg : "primary"}
              color={props.btn.color ? props.btn.color : ""}
              onClick={() => addToCart(product)}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        )}
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
