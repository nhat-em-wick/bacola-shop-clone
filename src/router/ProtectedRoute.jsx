import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Cookies from "universal-cookie";

const ProtectedRoute = () => {
  const location = useLocation()
  const currentUser = useSelector(
    (state) => state.auth.login?.currentUser
  );
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  
  if(!currentUser || !accessToken || !refreshToken) {
    return <Navigate to='/login'/>
  }
  return <Outlet />
}

export const CheckLogin = () => {
  const currentUser = useSelector(
    (state) => state.auth.login?.currentUser
  );
 
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  if(currentUser && accessToken && refreshToken) {
    return <Navigate to='/'/>
  }
  return <Outlet />
}

export const CheckAdmin = () => {
  const currentUser = useSelector(
    (state) => state.auth.login?.currentUser
  );
    
  if(currentUser && currentUser.admin === false) {
    return <Navigate to='/'/>
  }
  return <Outlet />
}



export default ProtectedRoute