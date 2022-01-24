import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./layout.scss";
const Layout = () => {
  return (
    <>
      <div className="app">
        <Header />
        <div className="main">
          <div className="main__content">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
