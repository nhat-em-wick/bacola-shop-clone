import React, {useState, useEffect} from "react";
import { Outlet, useLocation} from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import Loading from "../loading/Loading";
import ProductViewModal from "../product-view-modal/ProductViewModal";
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
    </>
  );
};

export default Layout;
