import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom'

import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home'
import Shop from '../pages/shop/Shop';
import Product from '../pages/product/Product';
import ScrollToTop from '../components/scroll-to-top/ScrollToTop';
import Cart from '../pages/cart/Cart';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>}/>
          <Route path="shop" element={<Shop/>}/>
          <Route path="/shop/:productId" element={<Product/>}/>
          <Route path="cart" element={<Cart/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;
