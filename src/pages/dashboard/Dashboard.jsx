import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import StatusCard from "../../components/status-card/StatusCard";
import Table from "../../components/table/Table";
import Helmet from "../../components/helmet/Helmet";
import formatMoneyVND from "../../utils/formatMoney";

import "./dashboard.scss";

import { chartOptions, orderHeadDashboard, userHeadDashboard } from "../../constant";
import adminApi from "../../api/adminApi";
import { notifyError, notifySuccess } from "../../components/toast/Toast";

const Dashboard = () => {

  const [dashboardAmin, setDashboardAmin] = useState({})

  useEffect(() => {
    const fetchStatusCard = async () => {
      try {
        const res = await adminApi.dashboard()
        setDashboardAmin(res.data)
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message)
      }
    }
    fetchStatusCard()
  }, [])


  return (
    <>
    <Helmet title="Dashboard">
      <div className="dashboard">
        <div className="row">
          <div className="col l-6 m-12 c-12">
            <div className="row">
                <div className="col l-6 m-6 c-12">
                  <StatusCard
                    icon={"bx bx-cart"}
                    title={"đơn hàng"}
                    count={dashboardAmin?.totalOrder}
                  />
                </div>
                <div className="col l-6 m-6 c-12">
                  <StatusCard
                    icon={"bx bx-package"}
                    title={"sản phẩm"}
                    count={dashboardAmin?.totalProduct}
                  />
                </div>
                <div className="col l-6 m-6 c-12">
                  <StatusCard
                    icon={"bx bx-user"}
                    title={"khách hàng"}
                    count={dashboardAmin?.totalCustomer}
                  />
                </div>
                <div className="col l-6 m-6 c-12">
                  <StatusCard
                    icon={"bx bx-dollar-circle"}
                    title={"doanh thu"}
                    count={ dashboardAmin?.revenue && formatMoneyVND(dashboardAmin.revenue)}
                  />
                </div>
            </div>
          </div>
          <div className="col l-6 m-12 c-12">
            {/* {chart} */}
            <div className="card chart-card">
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="line"
                height="100%"
              />
            </div>
          </div>
          <div className="col l-6 m-12 c-12">
            <div className="card">
              <div className="card__header">
                <h3>Đơn hàng mới</h3>
              </div>
              <div className="card__body">
                <Table
                  
                  renderHead={orderHeadDashboard.map((item, index) => renderOrderHead(item, index))}
                 
                  renderBody={dashboardAmin?.newOrders?.map((item, index) => renderOrderBody(item, index))}
                />
              </div>
              <div className="card__footer">
                <Link to="/admin/orders">xem tất cả</Link>
              </div>
            </div>
          </div>
          <div className="col l-6 m-12 c-12">
            <div className="card">
              <div className="card__header">
                  <h3>khách hàng mới</h3>
              </div>
              <div className="card__body">
                <Table
                  
                  renderHead={userHeadDashboard.map((item, index) => renderUserHead(item, index))}
                  
                  renderBody={dashboardAmin?.newCustomers?.map((item, index) => renderUserBody(item, index))}
                />
              </div>
              <div className="card__footer">
                <Link to="/admin/users">xem tất cả</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Helmet>
    </>
  );
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;
const renderUserHead = (item, index) => <th key={index}>{item}</th>;
const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.customerId.name}</td>
    <td>{formatMoneyVND(item.total_price)}</td>
    <td>
      {(item.shipping === 1 && "Miến phí") ||
        (item.shipping === 2 && "Giao hàng nhanh") ||
        (item.shipping === 3 && "Tại cửa hàng")}
    </td>
    <td>
      {(item.payment === 1 && "Tiền mặt") || (item.payment === 2 && "Online")}
    </td>
    <td>
      {(item.status === 0 && (
        <span className="status status--rejected">Đã hủy</span>
      )) ||
        (item.status === 1 && (
          <span className="status status--pending">Đang chờ</span>
        )) ||
        (item.status === 2 && (
          <span className="status status--confirmed">Đã xác nhận</span>
        )) ||
        (item.status === 3 && (
          <span className="status status--shipping">Đang vận chuyển</span>
        )) ||
        (item.status === 4 && (
          <span className="status status--success">Thành công</span>
        ))}
    </td>
  </tr>
);

const renderUserBody = (item, index) => (
  <tr key={index}>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.address}</td>
  </tr>
)

export default Dashboard;
