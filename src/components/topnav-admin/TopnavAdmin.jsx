import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";

import { SidebarMobile } from "../sidebar-admin/SidebarAdmin";
import Overlay from "../overlay/Overlay";
import Dropdown from "../../components/dropdown/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/apiRequest";

import user_avatar from "../../assets/images/user.png";
import "./topnav-admin.scss";
const TopnavAdmin = (props) => {
  const handleOverlay = () => {
    props.openOverlay();
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector(
    (state) => state.auth.login?.currentUser
  );
  
  const handleLogout = () => {
    logoutUser(dispatch, navigate)
  }

  return (
    <>
      <div className="top-nav">
        <div className="top-nav__content">
          <div className="top-nav__left">
            <div onClick={() => handleOverlay()} className="top-nav__menu">
              <div className="top-nav__menu-hamburger"></div>
            </div>
          </div>
          <div className="top-nav__right">
            <div className="top-nav__right__item">
              <Dropdown icon="bx bx-bell" badge="12" />
            </div>
            <div className="top-nav__right__item">
              <Dropdown 
                customToggle={() => renderUserToggle(currentUser)}
                renderItem={renderUserMenu(handleLogout)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const renderUserToggle = (curr_user) => (
  <>
    <div className="top-nav__user">
      <div className="top-nav__user-img">
        <img src={user_avatar} alt="" />
      </div>
      <span>{curr_user.name}</span>
    </div>
  </>
);

const renderUserMenu  = (logout) => (
  <>
    <div className="top-nav__user-link">
      <div onClick={() => logout()} >Đăng xuất</div>
    </div>
  </>
)

export default TopnavAdmin;
