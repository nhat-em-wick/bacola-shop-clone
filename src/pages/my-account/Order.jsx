import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Dialog from "../../components/dialog/Dialog";
import { notifyError, notifySuccess } from "../../components/toast/Toast";
import Helmet from "../../components/helmet/Helmet";

import userApi from "../../api/userApi";
import formatMoneyVND from "../../utils/formatMoney";
import "./order.scss";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderItemCancel, setOrderItemCancel] = useState(null);
  const [statusChange, setStausChange] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await userApi.getAllOrdersUser();
        setOrders(res.orders);
      } catch (error) {
        console.log(error);
        notifyError(error.response.data.message)
      }
    };
    fetchOrders();
  }, [statusChange]);

  const [dialog, setDialog] = useState({
    type: "",
    title: "",
    body: "",
    text_confirm: "",
    text_cancel: "",
  });

  const handleCancelOrder = (item) => {
    setDialog({
      title: "Hủy đơn hàng",
      content: "Bạn muốn hủy đơn hàng?",
      text_cancel: "Hủy",
      text_confirm: "Xác nhận",
    });
    setOpenDialog(!openDialog);
    setOrderItemCancel(item);
  };

  const handleConfirm = () => {
    setOpenDialog(!openDialog);
    const fetchCancelOrder = async () => {
      try {
        const res = await userApi.updateStatusOrder(orderItemCancel._id);
        notifySuccess(res.message);
        setStausChange(!statusChange);
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message);
      }
    };
    fetchCancelOrder();
  };

  const handleCancel = () => {
    setOpenDialog(!openDialog);
    setOrderItemCancel(null);
  };

  return (
    <>
    <Helmet title="Đơn hàng">
      <Dialog
        active={openDialog}
        title={dialog.title}
        content={dialog.content}
        text_cancel={dialog.text_cancel}
        text_confirm={dialog.text_confirm}
        confirm={() => handleConfirm()}
        cancel={() => handleCancel()}
      />
      <div className="order">
        {orders.length < 1 ? (
          <div className="order__title">Chưa có đơn hàng nào</div>
        ) : (
          <>
            <div className="order__list">
              {orders.map((item, index) => {
                return (
                  <OrderItem
                    key={index}
                    item={item}
                    products={item.cartItems}
                    totalPrice={item.total_price}
                    id={item._id}
                    cancelOrder={() => handleCancelOrder(item)}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      </Helmet>
    </>
  );
};

const OrderItem = (props) => {
  return (
    <>
      <div className="order__list__item">
        <div className="order__list__item__header">
          {props.item.status !== 0 && (
            <>
              <div className="order__list__item__header__status">
                <span>Trạng thái: </span>
                <Link
                  to={`/my-account/order/${props.id}`}
                  className="order__list__item__header__status__link"
                >
                  <i className="bx bxs-truck"></i>
                  {props.item.status === 1 && (
                    <span className="status">Đặt hàng thành công</span>
                  )}
                  {props.item.status === 2 && (
                    <span className="status">Đã xác nhận</span>
                  )}
                  {props.item.status === 3 && (
                    <span className="status">Đang vận chuyển</span>
                  )}
                  {props.item.status === 4 && (
                    <span className="status">Giao hàng thành công</span>
                  )}
                </Link>
              </div>
            </>
          )}
          {props.item.status === 1 && (
            <div
              onClick={props.cancelOrder}
              className="order__list__item__header__action"
            >
              Hủy đơn hàng
            </div>
          )}
          {props.item.status === 0 && (
            <div className="order__list__item__header__action">Đã hủy</div>
          )}
        </div>

        <div className="order__list__item__product-list">
          {props.products.map((item, index) => (
            <div key={index} className="order__list__item__product">
              <div className="order__list__item__product__img">
                <img src={item.productId.gallery[0]} alt="" />
              </div>
              <div className="order__list__item__product__info">
                <div className="name">{item.productId.name}</div>
                <div className="quantity">x{item.quantity}</div>
              </div>
              <div className="order__list__item__product__price">
                {item.productId.old_price && (
                  <div className="old">
                    {formatMoneyVND(item.productId.old_price)}
                  </div>
                )}

                <div className="new">
                  {formatMoneyVND(item.productId.new_price)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order__list__item__total-price">
          <span className="text">Tổng số tiền: </span>
          <span className="total">{formatMoneyVND(props.totalPrice)}</span>
        </div>
      </div>
    </>
  );
};

export default Order;
