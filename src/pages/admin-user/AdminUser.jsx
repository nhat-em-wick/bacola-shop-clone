import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../components/dropdown/Dropdown";
import Input from "../../components/input/Input";
import Table from "../../components/table/Table";
import Pagination from "../../components/pagination/Pagination";
import Checkbox from "../../components/checkbox/Checkbox";
import Dialog from "../../components/dialog/Dialog";
import Helmet from "../../components/helmet/Helmet";
import { UserHead } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters, clearFilters } from "../../redux/filters/filtersSlice";
import { notifySuccess, notifyError } from "../../components/toast/Toast";
import { useDebounce } from "../../hook";
import adminApi from "../../api/adminApi";

import "./admin-user.scss";

const AdminUser = () => {

  const adminUser = useSelector(state => state.auth.login.currentUser);

  const [filters, setFilters] = useState({
    _page: 1, _limit: 12
  })

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState();
  const dropdownActionRef = useRef();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [usersDelete, setUsersDelete] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const timerIdRef = useRef(null)
  const [dialog, setDialog] = useState({
    type: "",
    title: "",
    text_confirm: "",
    text_cancel: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminApi.getAllUser(filters);
        setUsers(res.users);
        setPagination(res.pagination);
      } catch (error) {
        notifyError(error.response.data.message)
        console.log(error);
      }
    };
    fetchUsers();
  }, [filters, deleted]);

  const debounce = useDebounce(valueSearch, 500);

  useEffect(() => {
    if (debounce.trim()) {
      setFilters({ ...filters, q: encodeURIComponent(debounce.trim())});
    } else {
      setFilters({ ...filters, q: "" });
    }
  }, [debounce])

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      _page: newPage
    })
  };

  

 

  const handleChecked = (id) => {
    setChecked((prev) => {
      const isChecked = checked.includes(id);
      if (isChecked) {
        return checked.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
    setCheckAll(true);
  };

  useEffect(() => {
    if (checked.length > 0 && checked.length < users.length) {
      setCheckAll(false);
    } else if (checked.length > 0 && checked.length === users.length) {
      setCheckAll(true);
    } else if (checked.length === 0) {
      setCheckAll(false);
    }
  }, [checked]);

  const handleCheckedAll = (type) => {
    if (type) {
      const checkedAll = users.map((item) => {
        return item._id;
      });
      setChecked(checkedAll);
      setCheckAll(!checkAll);
    } else {
      setChecked([]);
      setCheckAll(!checkAll);
    }
  };

  const handleDeleteUsers = (ids) => {
    setDialog({
      title: "Xoá người dùng đã chọn",
      content: "Mọi dữ liệu liên quan đến người dùng này sẽ bị xóa sạch !!!",
      text_cancel: "Hủy",
      text_confirm: "Xác nhận",
    });
    setOpenDialog(!openDialog);
    setUsersDelete((prev) => [...prev, ...ids]);
  };

  const handleConfirm = () => {
    setOpenDialog(!openDialog);
    const deleteItem = async () => {
      try {
        const ids = {
          ids: usersDelete,
        };
        const res = await adminApi.deleteUsers(ids);
        notifySuccess(res.message);
        setDeleted(!deleted);
        setChecked([]);
      } catch (error) {
        notifyError(error.response.data.message)
        console.log(error);
      }
    };
    deleteItem();
    setUsersDelete([]);
  };

  const handleCancel = () => {
    setOpenDialog(!openDialog);
    setUsersDelete([]);
  };

  return (
    <Helmet title="Quản lý người dùng">
      <Dialog
        active={openDialog}
        title={dialog.title}
        content={dialog.content}
        text_cancel={dialog.text_cancel}
        text_confirm={dialog.text_confirm}
        confirm={() => handleConfirm()}
        cancel={() => handleCancel()}
      />
      <div className="grid">
        <div className="card">
          <div className="user">
            <div className="user__header">
              <div className="card__header">
                <h3>người dùng</h3>
              </div>
              <div className="user__header__right">
                <div className="user__header__right__item">
                  <div
                    onClick={() =>
                      checked.length > 0 && handleDeleteUsers(checked)
                    }
                    className={`user__header__action action--delete ${
                      checked.length > 0 && "active"
                    }`}
                  >
                    <i className="bx bxs-trash-alt"></i>
                  </div>
                  <Link to="add" className="user__header__action action--add">
                    Thêm người dùng
                  </Link>
                </div>
                <div className="user__header__right__item">
                  <div className="user__header__search">
                    <Input
                      type="search"
                      placeholder="Tìm kiếm theo tên, email, sđt"
                      onChange={e=>setValueSearch(e.target.value)}
                      value = {valueSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="user__body">
              {users.length < 1 ? (
                <span>Không tìm thấy người dùng nào</span>
              ) : (
                <>
                  <Table
                    
                    renderHead={
                      <>
                        <th>
                          <Checkbox
                            checked={checkAll}
                            onChange={() => handleCheckedAll(!checkAll)}
                          />
                        </th>

                        {UserHead.map((item, index) => (
                          <th key={index}>{item}</th>
                        ))}
                      </>
                    }
                    
                    renderBody={users.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Checkbox
                            checked={
                              checked ? checked.includes(item._id) : false
                            }
                            onChange={() => handleChecked(item._id)}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <div className="user__address">{item.address}</div>
                        </td>
                        
                        <td>{item.admin ? "Admin" : "Người dùng"}</td>
                        <td>
                          <div className="user__action">
                            <Link
                              to={`edit/${item._id}`}
                              className="user__action__item action--edit"
                            >
                              <i className="bx bx-edit"></i>
                              <span className="tooltip">Sửa</span>
                            </Link>
                            {
                              adminUser.id === item._id ? null : (
                            <div
                              onClick={() => handleDeleteUsers([item._id])}
                              className="user__action__item action--delete"
                            >
                              <i className="bx bx-trash"></i>
                              <span className="tooltip">Xóa</span>
                            </div>
                              )
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  />
                  {pagination && (
                    <Pagination
                      Pagination={pagination}
                      onPageChange={handlePageChange}
                      current={filters._page}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

const renderUserHead = (item, index) => <th key={index}>{item}</th>;

export default AdminUser;
