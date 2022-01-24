import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom'

import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home'
import Shop from '../pages/Shop';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>}/>
          <Route path="shop" element={<Shop/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;
