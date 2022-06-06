import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { OrderStatus } from "../../constant";
import Helmet from "../../components/helmet/Helmet";
import { notifyError, notifySuccess } from "../../components/toast/Toast";

import { ButtonCircle } from "../../components/button/Button";
import adminApi from "../../api/adminApi";
import moment from 'moment'

import "./admin-order.scss";
import Table from "../../components/table/Table";
import formatMoneyVND from "../../utils/formatMoney";
const AdminViewOrder = () => {
  const params = useParams();
  const [order, setOrder] = useState();
  const [status, setStatus] = useState(1);
  const [paid, setPaid] = useState(false)
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await adminApi.getOrder(params.id);
        console.log(res)
        setOrder(res.order);
        setStatus(res.order.status);
        setPaid(res.order.paid)
      } catch (error) {
        console.log(error);
        notifyError(error.response.data.message)
      }
    };
    fetchOrder();
  }, []);

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleChangePaid = (e) => {
    setPaid(e.target.value)
  }

  const handleSubmit = () => {
    const updateOrder = async () => {
      try {
        const res = await adminApi.putOrder(params.id, {status, paid})
        notifySuccess(res.message)
      } catch (error) {
        notifyError(error.response.data.message)
        console.log(error)
      }
    }
    updateOrder()
  }

  
  console.log(order)
  

  return (
    <Helmet title="Xem đơn hàng">
      <div className="grid">
        <div className="card">
          <div className="admin-view-order">
            <div className="admin-view-order__header">
              <div className="admin-view-order__header__left">
                <div className="admin-view-order__header__left__time">
                  <span className="icon">
                    <i className="bx bx-calendar"></i>
                  </span>
                  <span className="time">{moment(order?.createdAt).format('M/D/YYYY, h:mm a')}</span>
                </div>
                <div className="admin-view-order__header__left__id">
                  <span>ID: {order?._id}</span>
                </div>
              </div>
              <div className="admin-view-order__header__right">
                <span>Trạng thái: </span>
                <span>
                  <select
                    value={status}
                    name="status"
                    id="status"
                    onChange={(e) => handleChangeStatus(e)}
                  >
                    {OrderStatus.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <span className="select__arrow"></span>
                </span>
              </div>
            </div>
            <div className="admin-view-order__body">
              <div className="admin-view-order__body__info">
                <div className="admin-view-order__body__info__item">
                  <div className="admin-view-order__body__info__icon">
                    <i className="bx bxs-user"></i>
                  </div>
                  <div className="admin-view-order__body__info__text">
                    <h3 className="title">Khách hàng</h3>
                    <div>{order?.customerId?.name}</div>
                    <div>{order?.customerId?.email}</div>
                  </div>
                </div>
                <div className="admin-view-order__body__info__item">
                  <div className="admin-view-order__body__info__icon">
                    <i className="bx bxs-truck"></i>
                  </div>
                  <div className="admin-view-order__body__info__text">
                    <h3 className="title">Thông tin đơn hàng</h3>
                    <div>Giao hàng: {order?.shipping === 1 && 'Miễn phí'}
                      {order?.shipping === 2 && 'Giao hàng nhanh'}
                      {order?.shipping === 3 && 'Tại cửa hàng'}
                    </div>
                    <div>
                      Thanh toán: {order?.payment === 2 && 'Online'}
                      {order?.payment === 1 && 'Tiền mặt'}
                    </div>
                  </div>
                </div>
                <div className="admin-view-order__body__info__item">
                  <div className="admin-view-order__body__info__icon">
                    <i className="bx bxs-map"></i>
                  </div>
                  <div className="admin-view-order__body__info__text">
                    <h3 className="title">Địa chỉ</h3>
                    <div>{order?.customerId?.address}</div>
                  </div>
                </div>
              </div>
              <div className="admin-view-order__body__table">
                <Table
                  renderHead={
                    <>
                      <th>
                         Ảnh
                      </th>
                      <th>
                         tên sản phẩm
                      </th>
                      <th>
                         số lượng
                      </th>
                      <th>
                         đơn giá
                      </th>
                    </>
                  }
                  renderBody={
                    order?.cartItems?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="product-img">
                            <img src={item.productId.gallery[0]} alt="" />
                          </div>
                        </td>
                        <td>
                          <div className="product-name">
                            {item.productId.name}
                          </div>
                          
                        </td>
                        <td>
                          {item.quantity}
                        </td>
                        <td>
                          { formatMoneyVND(item.productId.new_price) }
                        </td>
                      </tr>
                    ))
                  }
                />
              </div>
              <div className="admin-view-order__body__checkout">
                  <div>
                  <div className="admin-view-order__body__checkout__item">
                    <span>Phí giao hàng:</span>
                    <span>{(order?.shipping === 1 ||  order?.shipping === 3) ? 'Miễn phí' : formatMoneyVND(35000)}</span>
                  </div>
                  <div className="admin-view-order__body__checkout__item">
                    <span>Tổng cộng:</span>
                    <span>{order?.total_price && formatMoneyVND(order?.total_price)}</span>
                  </div>
                  <div className="admin-view-order__body__checkout__item">
                    <span>Trạng thái thanh toán: </span>
                    <span>
                      <select value={paid} name="paid" onChange={(e) => handleChangePaid(e)}>
                        <option value={false}>Chưa thanh toán</option>
                        <option value={true}>Đã thanh toán</option>
                      </select>
                      <span className="select__arrow"></span>
                    </span>
                  </div>
                  <div onClick={() => handleSubmit() } className="admin-view-order__body__checkout__btn">
                    Cập nhật đơn hàng
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default AdminViewOrder;
