import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/auth/authSlice";
import Form, {
  FormField,
  FormInput,
  FormMessageError,
  FormLabel,
  FormTextarea,
} from "../../components/form/Form";
import Section, {
  SectionBody,
  SectionTitle,
} from "../../components/section/Section";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import formatMoneyVND from "../../utils/formatMoney";
import Checkbox from "../../components/checkbox/Checkbox";
import userApi from "../../api/userApi";
import RadioLeft, {RadioRight} from "../../components/radio/Radio";
import { freeShip, fastShip, updateCart } from "../../redux/shopping-cart/cartItemsSlice";
import { payment, shipping } from "../../redux/shopping-cart/methodBuySlice";
import {notifyError, notifySuccess} from '../../components/toast/Toast'
import {payment_method, ship_method} from '../../constant/index'
import Helmet from "../../components/helmet/Helmet";
import "./checkout.scss";


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const cartItems = useSelector((state) => state.cartItems.values.items);
  
  const subTotal = useSelector(state => state.cartItems.values.subTotal)
  const totalProduct = useSelector(state => state.cartItems.values.totalProduct)
  const totalPrice = useSelector(state => state.cartItems.values.totalPrice)
  const ship = useSelector(state => state.method.shipping)
  const payment = useSelector(state => state.method.payment)
 
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      message: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không hợp lệ"
        ),
        name: Yup.string().required("Bắt buộc").matches(/[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{3,}$/, "Từ 3 ký tự trở lên và không chứa ký tự dặc biệt"),
      address: Yup.string().required("Bắt buộc"),
      phone: Yup.string()
        .required("Bắt buộc")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "SĐT không hợp lệ"),
      message: Yup.string(),
    }),
    onSubmit: (values) => {
      const newOrder = {
        name : values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        message: values.message,
        cart: cartItems,
        totalPrice: totalPrice,
        totalProduct: totalProduct,
        shipping: ship,
        payment: payment
      }
      const postOrder = async () => {
        try {
          const res = await userApi.postOrder(newOrder)
          dispatch(updateCart())
          notifySuccess(res.message)
          navigate('/my-account/order')
        } catch (error) {
          console.log(error);
          notifyError(error.response.data.message)
        }
      }
      postOrder()
    }
  });

  
  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await userApi.getInfoUser(currentUser.id);
        setUser(res.user);
      } catch (error) {
        notifyError(error.response.data.message)
        console.log(error);
      }
    };
    getInfoUser();
  }, []);

  const handleCheckShip = (id) => {
    if(id===1 || id===3) {
      dispatch(shipping(id))
      dispatch(freeShip())
    }else {
      dispatch(shipping(id))
      dispatch(fastShip(35000))
    }
  }

  const handleCheckPayment = (id) => {
    if(id === 2) {
      alert('Chức năng đang phát triển')
    }else {
      dispatch(payment(id))
    }
  }

  const handleSubmit = () => {
    formik.handleSubmit()
  }

  return (
    <>
    <Helmet title="Thanh toán">
      <div className="checkout">
        <Section>
          <SectionTitle>Thanh toán</SectionTitle>
          <SectionBody>
            <div className="row">
              <div className="col l-8 m-12 c-12">
                <div className="checkout__biling-detail">
                  <div className="checkout__biling-detail__title">
                    Thông tin người nhận
                  </div>
                  <Form>
                    <FormField>
                      <FormInput
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      <FormLabel label="Tên" />
                      <FormMessageError message={formik.errors.name} />
                    </FormField>
                    <FormField>
                      <FormInput
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        disabled={true}
                      />
                      <FormLabel label="Email" />
                      <FormMessageError message={formik.errors.email} />
                    </FormField>
                    <FormField>
                      <FormInput
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                      <FormLabel label="SĐT" />
                      <FormMessageError message={formik.errors.phone} />
                    </FormField>
                    <FormField>
                      <FormInput
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                      <FormLabel label="Địa chỉ" />
                      <FormMessageError message={formik.errors.address} />
                    </FormField>
                    <FormField>
                      <FormTextarea
                        name="message"
                        id="message"
                        label="Lưu ý khi giao hàng"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        placeholder="Lưu ý khi giao hàng..."
                      />
                      <FormMessageError message={formik.errors.message} />
                    </FormField>
                  </Form>
                </div>
              </div>
              <div className="col l-4 m-12 c-12">
                <div className="checkout__order">
                  <div className="checkout__order__title">Thông tin đơn hàng</div>
                  <div className="checkout__order__info">
                    <div className="checkout__order__info__cart-items">
                      <div className="checkout__order__info__cart-items__header">
                        <div className="title">Sản phẩm</div>
                        <div className="title">Đơn giá</div>
                      </div>
                      <div className="checkout__order__info__cart-items__list">
                        {cartItems.map((item, index) => (
                          <div
                            key={index}
                            className="checkout__order__info__cart-items__item"
                          >
                            <div>
                              <div className="name">{item.name}</div>
                              <span className="quantity">
                                <i className="bx bx-x"></i>
                                {item.quantity}
                              </span>
                            </div>
                            <div className="price">
                              {formatMoneyVND(item.price)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="checkout__order__info__cart-items__provisional">
                        <span className="title">Tạm tính</span>
                        <span className="price">{formatMoneyVND(subTotal)}</span>
                      </div>
                      <div className="checkout__order__info__cart-items__ship">
                        <span className="title">Giao hàng</span>
                        <ul className="ship">
                          {
                            ship_method.map((item, index) => (
                              <li key={index}><RadioRight onChange={() => handleCheckShip(item.id)} checked={ship === item.id}  des={item.name} /></li>
                            ))
                          }
                        </ul>
                      </div>
                      <div className="checkout__order__info__cart-items__total-price">
                        <span className="title">Tổng cộng</span>
                        <span className="price">{formatMoneyVND(totalPrice)}</span>
                      </div>
                    </div>
                    <div className="checkout__order__info__method">
                      <div className="title">Phương thức thanh toán</div>
                      <div className="method">
                        {
                          payment_method.map((item, index) => (
                            <RadioLeft key={index} des={item.name} onChange={() => handleCheckPayment(item.id)} checked={payment === item.id}  />
                          ))
                        }
                      </div>
                    </div>
                    <div onClick={() => handleSubmit()} className="checkout__order__info__btn">
                      Tiến hành đặt hàng
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionBody>
        </Section>
      </div>
      </Helmet>
    </>
  );
};

export default Checkout;
