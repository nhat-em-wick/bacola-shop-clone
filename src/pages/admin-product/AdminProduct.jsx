import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/Input";
import Table from "../../components/table/Table";
import Form, {
  FormField,
  FormInput,
  FormLabel,
  FormTextarea,
  FormMessageError,
  FormSelect,
} from "../../components/form/Form";
import { updateFilters, clearFilters } from "../../redux/filters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../hook";
import Pagination from "../../components/pagination/Pagination";
import Checkbox from "../../components/checkbox/Checkbox";
import Dropdown from "../../components/dropdown/Dropdown";
import Dialog from "../../components/dialog/Dialog";
import Helmet from "../../components/helmet/Helmet";
import "./admin-product.scss";
import { ProductHead } from "../../constant";
import formatMoneyVND from "../../utils/formatMoney";
import adminApi from "../../api/adminApi";
import shopApi from "../../api/shopApi";
import { notifySuccess, notifyError } from "../../components/toast/Toast";

const AdminProduct = () => {
  const [filters, setFilters] = useState({
    _page: 1, _limit: 12
  })
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState();
  const [checked, setChecked] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [productsDelete, setProductsDelete] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const [dialog, setDialog] = useState({
    type: "",
    title: "",
    text_confirm: "",
    text_cancel: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const debounce = useDebounce(valueSearch, 500);

 
  const dropdownActionRef = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await shopApi.getProductList(filters);
        setProductList(res.products);
        setPagination(res.pagination);
      } catch (error) {
        console.log(error);
        notifyError(error.response.data.message)
      }
    };
    fetchProduct();
  }, [filters, deleted]);

  useEffect(() => {
    setFilters({ ...filters, q: encodeURIComponent(debounce.trim())});
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
    if (checked.length > 0 && checked.length < productList.length) {
      setCheckAll(false);
    } else if (checked.length > 0 && checked.length === productList.length) {
      setCheckAll(true);
    } else if (checked.length === 0) {
      setCheckAll(false);
    }
  }, [checked]);

  const timerIdRef = useRef(null)



  const handleCheckedAll = (type) => {
    if (type) {
      const checkedAll = productList.map((item) => {
        return item._id;
      });
      setChecked(checkedAll);
      setCheckAll(!checkAll);
    } else {
      setChecked([]);
      setCheckAll(!checkAll);
    }
  };

  const handleDeleteProduct = (ids) => {
    setDialog({
      title: "Xoá sản phẩm đã chọn",
      content: "Bạn muốn xóa sản phẩm này?",
      text_cancel: "Hủy",
      text_confirm: "Xác nhận",
    });
    setOpenDialog(!openDialog);
    setProductsDelete((prev) => [...prev, ...ids]);
  };

  const handleConfirm = () => {
    setOpenDialog(!openDialog);
    const deleteItem = async () => {
      try {
        const ids = {
          ids: productsDelete,
        };
        const res = await adminApi.deleteProducts(ids);
        notifySuccess(res.message);
        setDeleted(!deleted);
        setChecked([]);
      } catch (error) {
        notifyError(error.response.data.message)
        console.log(error);
      }
    };
    deleteItem();
    setProductsDelete([]);
  };

  const handleCancel = () => {
    setOpenDialog(!openDialog);
    setProductsDelete([]);
  };

  return (
    <>
      <Helmet title="Quản lý sản phẩm">
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
          <div className="product">
            <div className="card">
              <div className="product__header">
                <div className="card__header">
                  <h3>Sản phẩm</h3>
                </div>
                <div className="product__header__right">
                  <div className="product__header__right__item">
                  <div
                    onClick={() =>
                      checked.length > 0 && handleDeleteProduct(checked)
                    }
                    className={`product__header__action action--delete ${
                      checked.length > 0 && "active"
                    }`}
                  >
                    <i className="bx bxs-trash-alt"></i>
                  </div>
                  <Link to="add" className="product__header__action action--add">
                    Thêm sản phẩm
                  </Link>
                  </div>
                  <div className="product__header__right__item">
                    <div className="product__header__search">
                      <Input
                        type="search"
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={(e) => setValueSearch(e.target.value)}
                        value={valueSearch}
                      />
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="card__body">
                {productList.length < 1 ? (
                  <span>Không tim thấy sản phẩm nào</span>
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

                          {ProductHead.map((item, index) => (
                            <th key={index}>{item}</th>
                          ))}
                        </>
                      }
                     
                      renderBody={productList.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Checkbox
                              checked={
                                checked ? checked.includes(item._id) : false
                              }
                              onChange={() => handleChecked(item._id)}
                            />
                          </td>
                          <td>
                            <div className="product__img">
                              <img src={item.gallery[0]} alt="" />
                            </div>
                          </td>
                          <td>
                            <div className="product__name">{item.name}</div>
                          </td>
                          <td>
                            {item.old_price && formatMoneyVND(item.old_price)}
                          </td>
                          <td>{formatMoneyVND(item.new_price)}</td>
                          <td>{item.stock}</td>
                          <td>{item.sold}</td>
                          <td>
                            <div className="product__category">
                              {item?.category?.name}
                            </div>
                          </td>
                          <td>
                            <div className="product__action">
                              <Link
                                to={`edit/${item.slug}`}
                                className="product__action__item action--edit"
                              >
                                <i className="bx bx-edit"></i>
                                <span className="tooltip">Sửa</span>
                              </Link>
                              <div
                                onClick={() => handleDeleteProduct([item._id])}
                                className="product__action__item action--delete"
                              >
                                <i className="bx bx-trash"></i>
                                <span className="tooltip">Xóa</span>
                              </div>
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
    </>
  );
};

const renderProductHead = (item, index) => <th key={index}>{item}</th>;

export default AdminProduct;
