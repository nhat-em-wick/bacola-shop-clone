import React from 'react';
import { BrowserRouter ,Routes, Route, Navigate } from 'react-router-dom'

import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home'
import Shop from '../pages/shop/Shop';
import Product from '../pages/product/Product';
import ScrollToTop from '../components/scroll-to-top/ScrollToTop';
import Cart from '../pages/cart/Cart';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Checkout from '../pages/checkout/Checkout';
import PageError from '../pages/page-error/PageError';
import MyAccount from '../pages/my-account/MyAccount';
import Profile from '../pages/my-account/Profile';
import Order from '../pages/my-account/Order';
import Contact from '../pages/contact/Contact';
import Forgot from '../pages/recovery-password/Forgot';
import RecoveryPass from '../pages/recovery-password/RecoveryPass';
import StatusOrder from '../pages/status-order/StatusOrder';
import ProtectedRoute, {CheckLogin, CheckAdmin} from './ProtectedRoute';

import LayoutAdmin from '../components/layout-admin/LayoutAdmin';
import Dashboard from '../pages/dashboard/Dashboard';
import AdminProduct from '../pages/admin-product/AdminProduct';
import AddProduct from '../pages/admin-product/AddProduct';
import EditProduct from '../pages/admin-product/EditProduct';
import AdminUser from '../pages/admin-user/AdminUser';
import AddUser from '../pages/admin-user/AddUser';
import EditUser from '../pages/admin-user/EditUser';
import AdminOrder from '../pages/admin-order/AdminOrder';
import AdminViewOrder from '../pages/admin-order/AdminViewOrder';
const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>}/>
          <Route path="shop" element={<Shop/>}/>
          <Route path="/shop/:slug" element={<Product/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route element={<CheckLogin/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="forgot" element={<Forgot/>}/>
            <Route path="recovery" element={<RecoveryPass/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="checkout" element={<Checkout/>}/>
            <Route path="/my-account" element={<Navigate replace to='/my-account/profile'/>}>
            </Route>
            <Route path="my-account" element={<MyAccount/>}>
              <Route path="profile" element={<Profile/>}/>
              <Route path="order" element={<Order/>}/>
              <Route path="order/:orderId" element={<StatusOrder/>} />
            </Route>
          </Route>
          <Route path="contact" element={<Contact/>} />
          <Route path="*" element={<PageError/>} />
        </Route>
        
        <Route element={<ProtectedRoute/>}>
          <Route element={<CheckAdmin/>}>
            <Route path="/admin" element={<Navigate replace to='/admin/dashboard'/>}></Route>
            <Route path='/admin' element={<LayoutAdmin/>}>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="products" element={<AdminProduct/>}>
               
              </Route>
              <Route path="products/add" element={<AddProduct/>}/>
              <Route path='products/edit/:slug' element={<EditProduct/>}/>
              <Route path='users' element={<AdminUser/>}/>
              <Route path='users/add' element={<AddUser/>} />
              <Route path='users/edit/:id' element={<EditUser/>} />
              <Route path='orders' element={<AdminOrder/>}/>
              <Route path='orders/view/:id' element={<AdminViewOrder/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;
