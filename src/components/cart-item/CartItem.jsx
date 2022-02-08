import React,{ useEffect, useState } from "react";
import  {Link} from 'react-router-dom'
import { ButtonCircle } from "../button/Button";
import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "../../redux/shopping-cart/cartItemsSlice";
import "./cart-item.scss";
const CartItem = (props) => {
  
  const [item, setItem] = useState(props.item)

  const [quantity, setQuantity] = useState(props.item.quantity)

  const dispatch = useDispatch()

  const updateQuantity = (type) => {
    if(type === '+') {
      dispatch(updateItem({...item, quantity: quantity + 1}))
    }
    if(type === '-') {
      dispatch(updateItem({...item, quantity: quantity - 1 <= 1 ? 1 : quantity - 1}))
    }
  }

  useEffect(() => {
    setItem(props.item)
    setQuantity(props.item.quantity)
  }, [props.item])

  const removeCartItem = () => {
    dispatch(removeItem(item))
  }

  return (
    <div  className="cart__list__item">
      <div className="cart__list__item__img">
        <img src={item.product.img1} alt="" />
      </div>
      <div className="cart__list__item__info">
        <Link to={`/shop/${item.id}`} className="cart__list__item__info__name">{item.product.name}</Link>
        <div className="cart__list__item__info__price">
          {item.product.newPrice}
        </div>
        <div className="cart__list__item__info__quantity">
          <ButtonCircle onClick={() => updateQuantity('-')}>
            <i className="bx bx-minus"></i>
          </ButtonCircle>
          <div className="cart__list__item__info__quantity__input">
            {quantity}
          </div>
          <ButtonCircle onClick={() => updateQuantity('+')}>
            <i className="bx bx-plus"></i>
          </ButtonCircle>
        </div>
        <div className="cart__list__item__info__remove" onClick={() => removeCartItem()}>
          <i className="bx bx-trash"></i>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
