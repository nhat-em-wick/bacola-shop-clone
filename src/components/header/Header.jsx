import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Overlay from "../overlay/Overlay";
import Input from "../input/Input";
import Button, { ButtonCircle } from "../button/Button";

import { useSelector } from "react-redux";

import "./header.scss";
import logo from "../../assets/images/bacola-logo.png";
import productImg from "../../assets/images/productjpg";
import cartEmpty from "../../assets/images/cart-empty.png";
import shopApi from "../../api/shopApi";
const menu = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Cửa hàng",
    path: "shop",
  },
];

const menuMobile = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Cửa hàng",
    path: "shop",
  },

  {
    display: "Login",
    path: "login",
  },
  {
    display: "Register",
    path: "register",
  },
];

const Header = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(0);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const headerRef = useRef(null);
  const inputSearchRef = useRef(null);

  useEffect(() => {
    const currPath = window.location.pathname.split("/")[1];
    const activeItem = menu.findIndex((e) => e.path === currPath);
    setActiveLink(currPath.length === 0 ? 0 : activeItem);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const handleOpenSearch = () => {
    inputSearchRef.current.focus();
    setOpenSearch(!openSearch);
  };

  const cartItems = useSelector((state) => state.cartItems.value);
  const [totalProduct, setTotalProduct] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    const productIds = {
      id: [],
    };
    cartItems.forEach((item) => {
      productIds.id.push(item.id);
    });
    const fetchCartProduct = async () => {
      const res = [];
      if (cartItems.length > 0) {
        try {
          const products = await shopApi.getProductList(productIds);
          cartItems.forEach((item) => {
            let result = products.find((el) => el.id === item.id);
            res.push({
              ...item,
              product: result,
            });
          });
          setCartProducts(res);
          setTotalProduct(
            cartItems.reduce((total, item) => total + Number(item.quantity), 0)
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        setCartProducts([]);
        setTotalProduct(0);
      }
    };
    fetchCartProduct();
  }, [cartItems]);


  return (
    <>
      <header ref={headerRef} className="header">
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
                  <Input type="text" placeholder="Tìm kiếm sản phẩm..." />
                </div>
                <ul className="navbar__mobile-toggle__list">
                  {menuMobile.map((item, index) => (
                    <li
                      key={index}
                      className={`navbar__mobile-toggle__list-item 
                                      ${activeLink === index ? "active" : ""}`}
                    >
                      <Link to={item.path}>{item.display}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="navbar__logo">
              <img src={logo} alt="" />
            </div>
            <div className="navbar__menu">
              <div className="navbar__menu-list">
                {menu.map((item, index) => (
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
                  />
                </div>
              </div>
              <ButtonCircle>
                <i className="bx bx-user"></i>
              </ButtonCircle>
              <div className="navbar__right-cart">
                <Link to="/cart" className="navbar__right-cart__btn">
                  <i className="bx bx-cart"></i>
                  <span>{totalProduct}</span>
                </Link>

                <div className="navbar__right-cart--toggle">
                  {cartProducts.length === 0 && <div className="navbar__right-cart__empty">
                    <div className="navbar__right-cart__empty__img">
                      <img src={cartEmpty} alt="" />
                    </div>
                    <div className="navbar__right-cart__empty__text">
                      Chưa có sản phẩm nào!
                    </div>
                  </div>}
                  {cartProducts.length > 0 && (
                    <>
                      <div className="navbar__right-cart__list">
                        {cartProducts.map((item, index) => (
                          <CartItem key={index} item={item} />
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
                          to="#"
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

const CartItem = ({ item }) => (
  <div className="navbar__right-cart__list-item">
    <span className="navbar__right-cart__list-item--remove">
      <i className="bx bx-x"></i>
    </span>
    <Link to="#" className="navbar__right-cart__list-item__img">
      <img src={item.product.img1} alt="" />
    </Link>
    <div className="navbar__right-cart__list-item__info">
      <Link
        to={`/shop/${item.id}`}
        className="navbar__right-cart__list-item__info__name"
      >
        {item.product.name}
      </Link>
      <div className="navbar__right-cart__list-item__info__price">
        <span className="quantity">{item.quantity}</span>
        <i className="bx bx-x"></i>
        <span className="price">{item.price}</span>
      </div>
    </div>
  </div>
);

export default Header;
