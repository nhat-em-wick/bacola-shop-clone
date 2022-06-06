import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import io from 'socket.io-client'

import userApi from '../../api/userApi'
import './status-order.scss'
import { notifyError } from '../../components/toast/Toast'

const StatusOrder = () => {

  const params = useParams()
  
  const [order, setOrder] =  useState({})
  const lineRef = useRef()
  const stepRef = useRef()
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await userApi.getOrderUser(params.orderId)
        setOrder(res.order[0])
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message);
      }
    }
    fetchOrder()
  }, [])


  return (
    <div className='status-order'>
      <div className="status-order__header">ID: {order?._id}</div>
      <ul className="status-order__step">
        <li className={`status-order__step__item ${order?.status > 0 && 'step--finished'}`}>
          <div className="status-order__step__icon">
            <i className="bx bx-check"></i>
          </div>
          <div className="status-order__step__info">
            <h4>Đặt hàng thành công</h4>
            <span>
              {moment(order?.createdAt).format('M/D/YYYY, h:mm')}
            </span>
          </div>
        </li>
        <li className={`status-order__step__item ${order.status > 1 && 'step--finished'}`}>
          <div className="status-order__step__icon">
          <i className='bx bx-notepad' ></i>
          </div>
          <div className="status-order__step__info">
            <h4>Đã xác nhận</h4>
            <span>
              {order.status === 2 && moment(order.createdAt).format('M/D/YYYY, h:mm')}
            </span>
          </div>
        </li>
        <li className={`status-order__step__item ${order.status > 2 && 'step--finished'}`}>
          <div className="status-order__step__icon">
          <i className='bx bx-car'></i>
          </div>
          <div className="status-order__step__info">
            <h4>Đang vận chuyển</h4>
            <span>
              {order.status === 3 && moment(order.createdAt).format('M/D/YYYY, h:mm')}
            </span>
          </div>
        </li>
        <li className={`status-order__step__item ${order.status > 3 && 'step--finished'}`}>
          <div className="status-order__step__icon">
          <i className='bx bx-gift' ></i>
          </div>
          <div className="status-order__step__info">
            <h4>Giao hàng thành công</h4>
            <span>
              {order.status === 4 && moment(order.createdAt).format('M/D/YYYY, h:mm')}
            </span>
          </div>
        </li>
      </ul>

      <ul className="status-order__step-mobile">
        <li className={`status-order__step-mobile__item ${order.status > 0 && 'step-mobile--finished'}`}>
          <div className="status-order__step-mobile__dot">
          </div>
          <div className="status-order__step-mobile__info">
            <h4>Đặt hàng thành công</h4>
            <span>
              {moment(order.createdAt).format('M/D/YYYY, h:mm')}
            </span>
          </div>
        </li>
        <li className={`status-order__step-mobile__item ${order.status > 1 && 'step-mobile--finished'}`}>
          <div className="status-order__step-mobile__dot">
          
          </div>
          <div className="status-order__step-mobile__info">
            <h4>Đã xác nhận</h4>
            <span>
              {order.status === 2 && moment(order.createdAt).format('M/D/YYYY, h:mm')}
            </span>
          </div>
        </li>
        <li className={`status-order__step-mobile__item ${order.status > 2 && 'step-mobile--finished'}`}>
          <div className="status-order__step-mobile__dot">
          
          </div>
          <div className="status-order__step-mobile__info">
            <h4>Đang vận chuyển</h4>
            <span>
              {order.status === 3 && moment(order.createdAt).format('M/D/YYYY, h:mm')}
            </span>
          </div>
        </li>
        <li className={`status-order__step-mobile__item ${order.status > 3 && 'step-mobile--finished'}`}>
          <div className="status-order__step-mobile__dot">
         
          </div>
          <div className="status-order__step-mobile__info">
            <h4>Giao hàng thành công</h4>
            <span>
              {order.status === 4 && moment(order.createdAt).format('M/D/YYYY, h:mm')}
            </span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default StatusOrder