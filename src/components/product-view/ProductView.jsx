import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button, { ButtonCircle } from "../button/Button";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/shopping-cart/cartItemsSlice";

import formatMoneyVND from "../../utils/formatMoney";
import { notifyError, notifySuccess } from "../toast/Toast";

import "./product-view.scss";
import img from "../../assets/images/product-1.jpg";
import shopApi from "../../api/shopApi";

const ProductView = (props) => {
  const product = props.product;

  const [previewImg, setPreviewImg] = useState(product.gallery[0]);

  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cartItems.values.items);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  const trackingRef = useRef();

  trackingRef.current = (item) => {
    let flag = true
    const result =
      cartItems.length > 0 &&
      cartItems.filter((item1) => item1.productId === item._id);
    const tracking = async () => {
      const pamramsTracking = {
        slug: item.slug,
        quantity: result[0] ? result[0].quantity + 1 : quantity,
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
            slug: item.slug
          })
        );
        flag = true
      } catch (error) {
        console.log(error);
        notifyError(error.response.data.message);
        flag = false
      }
    };
    tracking();
    return flag
  };

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addToCart = () => {
    trackingRef.current(product);
  };

  const goToCheckout = () => {
    const tracking =  trackingRef.current(product);
    if(tracking) {
      navigate("/checkout");
    }else {
      return
    }
  };

  return (
    <>
      <div className="product-view">
        <div className="row">
          <div className="col l-6 m-12">
            <div className="product-view__img-wrapper">
              <div className="row">
                <div className="col l-3 m-3 c-3">
                  <div className="product-view__img__list">
                    <img
                      src={product.gallery[0]}
                      alt=""
                      onClick={() => setPreviewImg(product.gallery[0])}
                    />
                    {product.gallery[1] && (
                      <img
                        src={product.gallery[1]}
                        alt=""
                        onClick={() => setPreviewImg(product.gallery[1])}
                      />
                    )}
                  </div>
                </div>
                <div className="col l-9 m-9 c-9">
                  <div className="product-view__img__main">
                    <img src={previewImg || product.gallery[0]} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col l-6 m-12">
            <div className="product-view__info">
              <div className="product-view__info__name">{product.name}</div>
              <div className="product-view__info__price">
                <span className="old">
                  {product.old_price && formatMoneyVND(product.old_price)}
                </span>
                <span className="new">{formatMoneyVND(product.new_price)}</span>
              </div>
              <div className="product-view__info__description">
                Mô tả:{" "}
                {product.short_description || "Chưa có mô tả cho sản phẩm này"}
              </div>
              <div className="product-view__info__quantity">
                <div className="decrease">
                  <ButtonCircle onClick={() => updateQuantity("minus")}>
                    <i className="bx bx-minus"></i>
                  </ButtonCircle>
                </div>
                <div className="quantity">{quantity}</div>
                <div className="increase">
                  <ButtonCircle onClick={() => updateQuantity("plus")}>
                    <i className="bx bx-plus"></i>
                  </ButtonCircle>
                </div>
              </div>
              <div className="product-view__info__add-to-cart">
                <Button onClick={() => addToCart()}>Thêm vào giỏ hàng</Button>
                <Button onClick={() => goToCheckout()}>Mua ngay</Button>
              </div>
              <div className="product-view__info__category">
                <span className="product-view__info__category__title">
                  Danh mục:{" "}
                </span>
                <span className="product-view__info__category__list">
                  {product.category.name}
                </span>
              </div>
              <div className="product-view__info__social">
                <ButtonCircle className="product-view__info__social__item facebook">
                  <i className="bx bxl-facebook"></i>
                </ButtonCircle>

                <ButtonCircle className="product-view__info__social__item instagram">
                  <i className="bx bxl-instagram"></i>
                </ButtonCircle>

                <ButtonCircle className="product-view__info__social__item twitter">
                  <i className="bx bxl-twitter"></i>
                </ButtonCircle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
