import React, {useState, useEffect} from "react";
import { Outlet, useLocation} from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import ProductViewModal from "../product-view-modal/ProductViewModal";
import Dialog from "../dialog/Dialog";
import { ButtonGoToTop } from "../scroll-to-top/ScrollToTop";
import "./layout.scss";
const Layout = () => {

  const [loadingPage, setLoadingPage] = useState(false)
  const {pathname} = useLocation()

 
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
          <ProductViewModal />
          
      </div>
        <ButtonGoToTop/>
    </>
  );
};

export default Layout;
