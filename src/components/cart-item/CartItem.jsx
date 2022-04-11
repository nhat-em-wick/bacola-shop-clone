import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonCircle } from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  updateItem,
  removeItem,
} from "../../redux/shopping-cart/cartItemsSlice";
import Dialog from "../../components/dialog/Dialog";
import { notifyError, notifySuccess } from "../toast/Toast";
import shopApi from "../../api/shopApi";
import formatMoneyVND from "../../utils/formatMoney";
import "./cart-item.scss";
const CartItem = (props) => {
  const [item, setItem] = useState(props.item);

  const [quantity, setQuantity] = useState(props.item.quantity);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.values.items);
 
  const updateQuantity = (type) => {
    if (type === "+") {
      const result =
        cartItems.length > 0 &&
        cartItems.filter((item1) => item1.productId === item.productId);

      const tracking = async () => {
        const pamramsTracking = {
          slug: item.product.slug,
          quantity: result[0].quantity + 1,
        };

        try {
          const res = await shopApi.tracking(pamramsTracking);
          dispatch(updateItem({ ...item, quantity: quantity + 1 }));
        } catch (error) {
          console.log(error);
          notifyError(error.response.data.message);
        }
      };
      tracking();
    }
    if (type === "-") {
      dispatch(
        updateItem({ ...item, quantity: quantity - 1 <= 1 ? 1 : quantity - 1 })
      );
    }
  };

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);

  return (
    <>
      <div className="cart__list__item">
        <div className="cart__list__item__img">
          <img src={item.product.gallery[0]} alt="" />
        </div>
        <div className="cart__list__item__info">
          <Link
            to={`/shop/${item.product.slug}`}
            className="cart__list__item__info__name"
          >
            {item.product.name}
          </Link>
          <div className="cart__list__item__info__price">
            {formatMoneyVND(item.product.new_price)}
          </div>
          <div className="cart__list__item__info__quantity">
            <ButtonCircle onClick={() => updateQuantity("-")}>
              <i className="bx bx-minus"></i>
            </ButtonCircle>
            <div className="cart__list__item__info__quantity__input">
              {quantity}
            </div>
            <ButtonCircle onClick={() => updateQuantity("+")}>
              <i className="bx bx-plus"></i>
            </ButtonCircle>
          </div>
          <div
            className="cart__list__item__info__remove"
            onClick={props.removeItem}
          >
            <i className="bx bx-trash"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
