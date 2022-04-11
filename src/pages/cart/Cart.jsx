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
      title: "Xóa sản phẩm khỏi giỏ hàng",
      content: "Bạn muốn xóa sản phẩm này?",
      text_cancel: "Hủy",
      text_confirm: "Xác nhận",
    });
    setOpenDialog(!openDialog);
    setItemRemove(item)
  }

  return (
    <>
    <Helmet title="Giỏ hàng">
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
        <SectionTitle>Giỏ hàng</SectionTitle>
        {cartProducts.length === 0 && (
          <SectionBody>
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
          </SectionBody>
        )}
        {cartProducts.length > 0 && (
          <SectionBody>
            <div className="row">
              <div className="col l-8 m-12 c-12">
                <span>Bạn đang có {totalProduct} sản phẩm trong giỏ hàng</span>
                <div className="cart__list">
                  {cartProducts.map((item, index) => (
                    <CartItem key={index} item={item} removeItem={() => removeCartItem(item)} />
                  ))}
                </div>
              </div>
              <div className="col l-4 m-12 c-12">
                <div className="cart__checkout">
                  <div className="cart__checkout__provisional">
                    <span className="title">Tạm tính</span>
                    <span>{formatMoneyVND(subTotal)}</span>
                  </div>
                  <div className="cart__checkout__discount">
                    <span className="title">Giảm giá</span>
                    <span>{0}</span>
                  </div>
                  <div className="cart__checkout__total-price">
                    <span className="title">Tổng cộng</span>
                    <span className="price">{formatMoneyVND(totalPrice)}</span>
                  </div>
                  <div className="cart__checkout__btn">
                    <Link to="/checkout" className="cart__checkout__btn__order">
                      Đặt hàng
                    </Link>
                    <Link to="/shop" className="cart__checkout__btn__back">
                      Tiếp tục mua hàng
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
