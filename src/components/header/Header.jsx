import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Overlay from "../overlay/Overlay";
import Input from "../input/Input";
import "./header.scss";
import logo from "../../assets/images/bacola-logo.png";
import productImg from "../../assets/images/productjpg";
const menu = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Shop",
    path: "shop",
  },
  {
    display: "About",
    path: "about",
  },
  {
    display: "Contact",
    path: "contact",
  },
];

const menuMobile = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Shop",
    path: "shop",
  },
  {
    display: "About",
    path: "about",
  },
  {
    display: "Contact",
    path: "contact",
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
  const headerRef = useRef();
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
                <div className="navbar__right-search__btn">
                  <i className="bx bx-search"></i>
                </div>
                <div className="navbar__right-search--toggle">
                  <Input type="text" placeholder="Product..." />
                </div>
              </div>
              <div className="navbar__right-user">
                <i className="bx bx-user"></i>
              </div>
              <div className="navbar__right-cart">
                <div className="navbar__right-cart__btn">
                  <i className="bx bx-cart"></i>
                  <span>0</span>
                </div>
                <div className="navbar__right-cart--toggle">
                  <div className="navbar__right-cart__list">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                  </div>
                  <div className="navbar__right-cart__action">
                    <Link to="#" className="navbar__right-cart__action__view">
                      Xem giỏ hàng
                    </Link>
                    <Link
                      to="#"
                      className="navbar__right-cart__action__checkout"
                    >
                      Thanh toán
                    </Link>
                  </div>
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

const CartItem = () => (
  <div className="navbar__right-cart__list-item">
    <span className="navbar__right-cart__list-item--remove">
      <i className="bx bx-x"></i>
    </span>
    <Link to="#" className="navbar__right-cart__list-item__img">
      <img src={productImg} alt="" />
    </Link>
    <div className="navbar__right-cart__list-item__info">
      <Link to="#" className="navbar__right-cart__list-item__info__name">
        Angie's Boomchickapop Sweet & Salty Kettle Corn
      </Link>
      <div className="navbar__right-cart__list-item__info__price">
        <span className="quantity">1</span>
        <i className="bx bx-x"></i>
        <span className="price">$35</span>
      </div>
    </div>
  </div>
);

export default Header;
