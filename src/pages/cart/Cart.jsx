import React, { useEffect, useState } from "react";
import  {Link} from 'react-router-dom'
import Section, {
  SectionTitle,
  SectionBody,
} from "../../components/section/Section";
import { ButtonCircle } from "../../components/button/Button";
import CartItem from "../../components/cart-item/CartItem";

import { useSelector } from "react-redux";

import "./cart.scss";
import shopApi from "../../api/shopApi";
import cartEmpty from '../../assets/images/cart-empty.png'
const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value);

  const [cartProducts, setCartProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    const productIds = {
      id: [],
    };
    cartItems.forEach((item) => {
      productIds.id.push(item.id);
    });
    const fetchCartProduct = async () => {
      const res = [];
      if(cartItems.length > 0) {
        try {
          const products = await shopApi.getProductList(productIds);
          cartItems.forEach((item) => {
            let result = products.find((el) => el.id === item.id);
            res.push({
              ...item,
              product: result,
            });
          });
          setCartProducts(res);
          setTotalProduct(
            cartItems.reduce((total, item) => total + Number(item.quantity), 0)
          )
          setTotalPrice(
            cartItems.reduce((total, item) => total + (Number(item.quantity) * item.price), 0)
          )
        } catch (error) {
          console.log(error);
        }
      }else {
        setCartProducts([])
        setTotalPrice(0)
        setTotalProduct(0)
      }
    };
    fetchCartProduct();
  }, [cartItems]);



  return (
    <div className="cart">
      <Section>
        <SectionTitle>Giỏ hàng</SectionTitle>
          { cartProducts.length === 0 && <SectionBody>
            <div className="cart__empty">
              <div className="cart__empty__img">
                <img src={cartEmpty} alt="" />
              </div>
              <div className="cart__empty__text">
                Chưa có sản phẩm nào trong giỏ hàng 
              </div>
              <Link to="/shop" className="cart__empty__btn">
                Quay lại cửa hàng
              </Link>
            </div>
             </SectionBody>}
        { cartProducts.length > 0 &&  <SectionBody>
            <div className="row">
              <div className="col l-8 m-12 c-12">
                <span>Bạn đang có {totalProduct} sản phẩm trong giỏ hàng</span>
                <div className="cart__list">
                  {cartProducts.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))}
                </div>
              </div>
              <div className="col l-4 m-12 c-12">
                <div className="cart__checkout">
                  <div className="cart__checkout__provisional">
                    <span className="title">Tạm tính</span>
                    <span>{totalPrice}</span>
                  </div>
                  <div className="cart__checkout__discount">
                    <span className="title">Giảm giá</span>
                    <span>{0}</span>
                  </div>
                  <div className="cart__checkout__total-price">
                    <span className="title">Tổng cộng</span>
                    <span className="price">{totalPrice}</span>
                  </div>
                  <div className="cart__checkout__btn">
                    <Link to="/checkout" className="cart__checkout__btn__order">Đặt hàng</Link>
                    <Link to="/shop" className="cart__checkout__btn__back">
                      Tiếp tục mua hàng
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SectionBody>}
      </Section>
    </div>
  );
};

export default Cart;
