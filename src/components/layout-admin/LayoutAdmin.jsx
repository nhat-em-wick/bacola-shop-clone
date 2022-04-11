import React, { useState } from 'react'

import { Outlet, useLocation } from 'react-router-dom'

import SidebarAdmin, {MenuBottom, SidebarMobile} from '../sidebar-admin/SidebarAdmin'
import TopnavAdmin from '../topnav-admin/TopnavAdmin'
import Overlay from '../overlay/Overlay'
import { ButtonGoToTop } from "../scroll-to-top/ScrollToTop";

import './layout-admin.scss'

const LayoutAdmin = () => {
  const [overlay, setOverlay] = useState(false)

  const location = useLocation()

  const handleOverlay = () => {
    setOverlay(!overlay)
  }
  
  return (
    <>
        <Overlay overlay={overlay} onClick={() => handleOverlay()} />
        <div className="grid">
          <div className="admin">
            <SidebarAdmin location={location}/>
            <MenuBottom location={location} active={overlay} openOverlay={handleOverlay}/>
            <TopnavAdmin  openOverlay={handleOverlay}/>
            <SidebarMobile location={location} active={overlay} openOverlay={handleOverlay}/>
            <div className="admin__main">
              
              <div className="admin__content">
                <Outlet/>
              </div>
            </div>
        </div>
      </div>
   
    </>
  )
}

export default LayoutAdmin