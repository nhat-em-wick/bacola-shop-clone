import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Section, {
  SectionTitle,
  SectionBody,
} from "../../components/section/Section";
import { ButtonCircle } from "../../components/button/Button";
import CartItem from "../../components/cart-item/CartItem";
import { useSelector, useDispatch } from "react-redux";
import formatMoneyVND from "../../utils/formatMoney";
import Dialog from "../../components/dialog/Dialog";
import Loading from "../../components/loading/Loading";
import Helmet from "../../components/helmet/Helmet";
import { updateItem, removeItem } from "../../redux/shopping-cart/cartItemsSlice";


import "./cart.scss";
import shopApi from "../../api/shopApi";
import cartEmpty from "../../assets/images/cart-empty.png";
import { notifyError } from "../../components/toast/Toast";
const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.values.items);
  const totalProduct = useSelector(
    (state) => state.cartItems.values.totalProduct
  );
  const totalPrice = useSelector((state) => state.cartItems.values.totalPrice);
  const subTotal = useSelector((state) => state.cartItems.values.subTotal);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [dialog, setDialog] = useState({
    type: "",
    title: "",
    body: "",
    text_confirm: "",
    text_cancel: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const [itemRemove, setItemRemove] = useState(null)

  useEffect(() => {
    const productIds = {
      id: [],
    };

    cartItems.forEach((item) => {
      productIds.id.push(item.productId);
    });

    const fetchCartProduct = async () => {
      let res = [];
      if (cartItems.length > 0) {
        try {
          const products = await shopApi.getCart(productIds);
          
          cartItems.forEach((item) => {
            let result = products.cart.find((el) => el._id === item.productId);
            res.push({
              ...item,
              product: result,
            });
          });
          setCartProducts(res);
        } catch (error) {
          notifyError(error.response.data.message)
          console.log(error);
        }
      } else {
        setCartProducts([]);
      }
    };
    fetchCartProduct();
  }, [cartItems]);


  const handleConfirm = () => {
    dispatch(removeItem(itemRemove))
    setOpenDialog(!openDialog);
  };
  
  const handleCancel = () => {
    setOpenDialog(!openDialog);
    setItemRemove(null)
  };

  const removeCartItem = (item) => {
    setDialog({
      title: "X??a s???n ph???m kh???i gi??? h??ng",
      content: "B???n mu???n x??a s???n ph???m n??y?",
      text_cancel: "H???y",
      text_confirm: "X??c nh???n",
    });
    setOpenDialog(!openDialog);
    setItemRemove(item)
  }

  return (
    <>
    <Helmet title="Gi??? h??ng">
    { loading && <Loading />}
    <div className="cart">
      <Dialog
        active={openDialog}
        title={dialog.title}
        content={dialog.content}
        text_cancel={dialog.text_cancel}
        text_confirm={dialog.text_confirm}
        confirm={() => handleConfirm()}
        cancel={() => handleCancel()}
      />
      <Section>
        <SectionTitle>Gi??? h??ng</SectionTitle>
        {cartProducts.length === 0 && (
          <SectionBody>
            <div className="cart__empty">
              <div className="cart__empty__img">
                <img src={cartEmpty} alt="" />
              </div>
              <div className="cart__empty__text">
                Ch??a c?? s???n ph???m n??o trong gi??? h??ng
              </div>
              <Link to="/shop" className="cart__empty__btn">
                Quay l???i c???a h??ng
              </Link>
            </div>
          </SectionBody>
        )}
        {cartProducts.length > 0 && (
          <SectionBody>
            <div className="row">
              <div className="col l-8 m-12 c-12">
                <span>B???n ??ang c?? {totalProduct} s???n ph???m trong gi??? h??ng</span>
                <div className="cart__list">
                  {cartProducts.map((item, index) => (
                    <CartItem key={index} item={item} removeItem={() => removeCartItem(item)} />
                  ))}
                </div>
              </div>
              <div className="col l-4 m-12 c-12">
                <div className="cart__checkout">
                  <div className="cart__checkout__provisional">
                    <span className="title">T???m t??nh</span>
                    <span>{formatMoneyVND(subTotal)}</span>
                  </div>
                  <div className="cart__checkout__discount">
                    <span className="title">Gi???m gi??</span>
                    <span>{0}</span>
                  </div>
                  <div className="cart__checkout__total-price">
                    <span className="title">T???ng c???ng</span>
                    <span className="price">{formatMoneyVND(totalPrice)}</span>
                  </div>
                  <div className="cart__checkout__btn">
                    <Link to="/checkout" className="cart__checkout__btn__order">
                      ?????t h??ng
                    </Link>
                    <Link to="/shop" className="cart__checkout__btn__back">
                      Ti???p t???c mua h??ng
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SectionBody>
        )}
      </Section>
    </div>
    </Helmet>
    </>
  );
};



export default Cart;
