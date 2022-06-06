import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import Checkbox from "../../components/checkbox/Checkbox";
import Input from "../../components/input/Input";
import Pagination from "../../components/pagination/Pagination";
import Helmet from "../../components/helmet/Helmet";
import { OrderHead } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters, clearFilters } from "../../redux/filters/filtersSlice";
import adminApi from "../../api/adminApi";
import formatMoneyVND from "../../utils/formatMoney";
import moment from "moment";
import { useDebounce } from "../../hook";
import "./admin-order.scss";

const AdminOrder = (props) => {
  const [filters, setFilters] = useState({
    _page: 1, _limit: 12, q: ''
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [pagination, setPagination] = useState();
  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {
    const fetchAllOrder = async () => {
      try {
        const res = await adminApi.getAllOrder(filters);
        setOrderList(res.orders);
        setPagination(res.pagination);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrder();
  }, [filters]);


  const debounce = useDebounce(valueSearch, 500);

  useEffect(() => {
    if (debounce.trim()) {
      setFilters({ ...filters, q: encodeURIComponent(debounce.trim())});
    } else {
      setFilters({ ...filters, q: "" });
    }
  }, [debounce])
  
  const timerIdRef1 = useRef(null)
  

  const handleViewOrder = (id) => {
    navigate(`/admin/orders/view/${id}`);
  };
  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      _page: newPage
    })
  };

  return (
    <Helmet title="Quản lý đơn hàng">
      <div className="grid">
        <div className="card">
          <div className="admin-order">
            <div className="admin-order__header">
              <div className="card__header">
                <h3>Đơn hàng</h3>
              </div>
              <div className="admin-order__header__search">
                <Input
                  type="search"
                  placeholder="Tìm kiếm theo khách hàng, email"
                  onChange={e=>setValueSearch(e.target.value)}
                  value={valueSearch}
                />
              </div>
            </div>
            <div className="admin-order__body">
              <div className="card__body">
                {orderList.length <= 0 ? (
                  <span>Chưa có đơn hàng nào</span>
                ) : (
                  <Table
                    renderHead={
                      <>
                        {OrderHead.map((item, index) => (
                          <th key={index}>{item}</th>
                        ))}
                      </>
                    }
                    renderBody={orderList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.customerId.name}</td>
                        <td>{item.customerId.email}</td>
                        <td>{formatMoneyVND(item.total_price)}</td>
                        <td>
                          {item.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                        </td>
                        <td>{moment(item.createdAt).format("M/D/YYYY")}</td>
                        <td>
                          {item.status === 0 && "Đã hủy"}
                          {item.status === 1 && "Đặt hàng thành công"}
                          {item.status === 2 && "Đã xác nhận"}
                          {item.status === 3 && "Đang vận chuyển"}
                          {item.status === 4 && "Giao hàng thành công"}
                        </td>
                        <td>
                          <div
                            onClick={() => handleViewOrder(item._id)}
                            className="action"
                          >
                            <i className="bx bx-show"></i>
                            <span className="tooltip">Xem</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  />
                )}
                {pagination && (
                  <Pagination
                    Pagination={pagination}
                    onPageChange={handlePageChange}
                    current={filters._page}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default AdminOrder;
