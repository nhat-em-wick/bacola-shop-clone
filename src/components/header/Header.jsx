import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Overlay from "../overlay/Overlay";
import Input from "../input/Input";
import Button, { ButtonCircle } from "../button/Button";
import { useDebounce } from "../../hook";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCart,
  removeItem,
} from "../../redux/shopping-cart/cartItemsSlice";

import { updateFilters } from "../../redux/filters/filtersSlice";

import "./header.scss";
import logo from "../../assets/images/bacola-logo.png";
import productImg from "../../assets/images/productjpg";
import cartEmpty from "../../assets/images/cart-empty.png";

import { logoutUser } from "../../redux/auth/apiRequest";
import { menuBacola, menuMobileBacola } from "../../constant/index";
import shopApi from "../../api/shopApi";

const Header = () => {
  const location = useLocation();
  const [shrink, setShrink] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
  });
  const navigate = useNavigate();

  const inputSearchRef = useRef(null);
  const inputSearchMobile = useRef("");
  const typingTimoutRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const currPath = window.location.pathname.split("/")[1];
    const activeItem = menuBacola.findIndex((e) => e.path === currPath);
    setActiveLink(currPath.length === 0 ? 0 : activeItem);
  }, [location]);

  useEffect(() => {
    const headerShirk = () => {
      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener("scroll", headerShirk);
    return () => {
      window.removeEventListener("scroll", headerShirk);
    };
  }, []);

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const handleOpenSearch = () => {
    inputSearchRef.current.focus();
    setOpenSearch(!openSearch);
  };

  const cartItems = useSelector((state) => state.cartItems.values.items);

  const totalProduct = useSelector(
    (state) => state.cartItems.values.totalProduct
  );

  const [cartProducts, setCartProducts] = useState(cartItems);

  useEffect(() => {
    setCartProducts(cartItems);
  }, [cartItems]);

  const removeCartItem = (item) => {
    dispatch(removeItem(item));
  };

  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const handleLogout = () => {
    logoutUser(dispatch, navigate);
  };

  return (
    <>
      <header className={`header ${shrink && "shrink"}`}>
        <div className="grid wide">
          <div className="navbar">
            <div className="navbar__mobile-btn" onClick={handleOpenMenuMobile}>
              <div className="hamburger"></div>
            </div>
            <div className={`navbar__mobile ${openMenuMobile ? "open" : ""}`}>
              <div className="navbar__mobile-toggle">
                <div
                  className="navbar__mobile-toggle__close"
                  onClick={handleOpenMenuMobile}
                >
                  <i className="bx bx-x"></i>
                </div>
                <div className="navbar__mobile-toggle__search">
                  <input
                    ref={inputSearchMobile}
                    value={valueSearch}
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    onChange={(e) => setValueSearch(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        navigate(`/search?q=${encodeURIComponent(valueSearch)}`);
                      }
                    }}
                  />
                </div>
                <ul className="navbar__mobile-toggle__list">
                  {menuMobileBacola.map((item, index) => (
                    <li
                      key={index}
                      className={`navbar__mobile-toggle__list-item 
                                      ${activeLink === index ? "active" : ""}`}
                    >
                      <Link to={item.path}>{item.display}</Link>
                    </li>
                  ))}
                  {currentUser ? (
                    <>
                      <li className={`navbar__mobile-toggle__list-item`}>
                        <Link to="my-account">Tài khoản</Link>
                      </li>
                      <li className={`navbar__mobile-toggle__list-item`}>
                        <div onClick={() => handleLogout()}>Đăng xuất</div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={`navbar__mobile-toggle__list-item`}>
                        <Link to="login">Đăng nhập</Link>
                      </li>
                      <li className={`navbar__mobile-toggle__list-item`}>
                        <Link to="register">Đăng kí</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <Link to="/" className="navbar__logo">
              <img src={logo} alt="" />
            </Link>
            <div className="navbar__menu">
              <div className="navbar__menu-list">
                {menuBacola.map((item, index) => (
                  <Link
                    key={index}
                    className={`navbar__menu-list__item ${
                      activeLink === index ? "active" : ""
                    }`}
                    to={item.path}
                  >
                    {item.display}
                  </Link>
                ))}
              </div>
            </div>
            <div className="navbar__right">
              <div className="navbar__right-search">
                <ButtonCircle onClick={handleOpenSearch}>
                  <i className="bx bx-search"></i>
                </ButtonCircle>
                <div
                  className={`navbar__right-search__dropdown ${
                    openSearch ? "active" : ""
                  }`}
                >
                  <div className="navbar__right-search__input">
                    <input
                      ref={inputSearchRef}
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      onChange={(e) => setValueSearch(e.target.value)}
                      value={valueSearch}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          navigate("/search?q=" + encodeURIComponent(valueSearch));
                        }
                      }}
                    />
                  </div>
                </div>
                {/*
                <div
                  className={`navbar__right-search__overlay 
                    ${openSearch ? "active" : ""}
                `}
                >
                  <div className="navbar__right-search__overlay--close">
                    <ButtonCircle size="lg" onClick={handleOpenSearch}>
                      <i className="bx bx-x"></i>
                    </ButtonCircle>
                  </div>
                  <Input
                    ref={inputSearchRef}
                    type="search"
                    placeholder="Tìm kiếm sản phẩm..."
                    onChange={handleValueSearch}
                    value={valueSearch}
                  />
                </div> */}
              </div>
              <div className="navbar__right-user">
                <ButtonCircle>
                  <i className="bx bx-user"></i>
                </ButtonCircle>
                {
                  <div className="navbar__right-user__dropdown">
                    {currentUser ? (
                      <>
                        <Link
                          to="/my-account"
                          className="navbar__right-user__dropdown__item"
                        >
                          Hi, {currentUser.name}
                        </Link>
                        {currentUser.admin === true && (
                          <Link
                            to="/admin/dashboard"
                            className="navbar__right-user__dropdown__item"
                          >
                            Dashboard
                          </Link>
                        )}
                        <div
                          onClick={() => handleLogout()}
                          className="navbar__right-user__dropdown__item"
                        >
                          Đăng xuất
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="navbar__right-user__dropdown__item"
                        >
                          Đăng nhập
                        </Link>
                        <Link
                          to="/register"
                          className="navbar__right-user__dropdown__item"
                        >
                          Đăng kí
                        </Link>
                      </>
                    )}
                  </div>
                }
              </div>
              <div className="navbar__right-cart">
                <Link to="/cart" className="navbar__right-cart__btn">
                  <i className="bx bx-cart"></i>
                  <span>{totalProduct}</span>
                </Link>

                <div className="navbar__right-cart__dropdown">
                  {cartProducts.length === 0 && (
                    <div className="navbar__right-cart__empty">
                      <div className="navbar__right-cart__empty__img">
                        <img src={cartEmpty} alt="" />
                      </div>
                      <div className="navbar__right-cart__empty__text">
                        Chưa có sản phẩm nào!
                      </div>
                    </div>
                  )}
                  {cartProducts.length > 0 && (
                    <>
                      <div className="navbar__right-cart__list">
                        {cartProducts.map((item, index) => (
                          <CartItem
                            key={index}
                            item={item}
                            onClick={() => removeCartItem(item)}
                          />
                        ))}
                      </div>
                      <div className="navbar__right-cart__action">
                        <Link
                          to="/cart"
                          className="navbar__right-cart__action__view"
                        >
                          Xem giỏ hàng
                        </Link>
                        <Link
                          to="/checkout"
                          className="navbar__right-cart__action__checkout"
                        >
                          Thanh toán
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Overlay overlay={openMenuMobile} onClick={handleOpenMenuMobile} />
    </>
  );
};

const CartItem = (props) => {
  const item = props.item;
  return (
    <div className="navbar__right-cart__list-item">
      <span
        className="navbar__right-cart__list-item--remove"
        onClick={props.onClick ? props.onClick : null}
      >
        <i className="bx bx-x"></i>
      </span>
      <div className="navbar__right-cart__list-item__img">
        <img src={item.img} alt="" />
      </div>
      <div className="navbar__right-cart__list-item__info">
        <Link
          to={`/shop/${item.slug}`}
          className="navbar__right-cart__list-item__info__name"
        >
          {item.name}
        </Link>
        <div className="navbar__right-cart__list-item__info__price">
          <span className="quantity">{item.quantity}</span>
          <i className="bx bx-x"></i>
          <span className="price">{item.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
