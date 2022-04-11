import React, {useState, useRef} from 'react'
import { useLocation, Link } from 'react-router-dom'
import { menuAdmin } from '../../constant'
import logo from '../../assets/images/bacola-logo.png'
import './sidebar-admin.scss'

const SidebarAdmin = (props) => {

  const activeItem = menuAdmin.findIndex(item => item.path === props.location.pathname.split('/')[2])

  return (
    <div className="sidebar">
      <Link to='/' className="sidebar__logo">
        <img src={logo} alt="" />
      </Link>
      {
        menuAdmin.map((item, index) => (
          <Link to={item.path} key={index}>
            <SidebarItem key={index} item={item} active={index===activeItem} />
          
          </Link>
        ))
      }
    </div>
  )
}

const SidebarItem = (props) => {
  const active = props.active ? 'active' : ''
  return (
    <div className={`sidebar__item`}>
      <div className={`sidebar__item-inner ${active}`} onClick={props.onClick}>
        <i className={`${props.item.icon}`}></i>
        <span>{props.item.display}</span>
      </div>
    </div>
  )
}

export const MenuBottom = (props) => {
  const activeItem = menuAdmin.findIndex(item => item.path === props.location.pathname.split('/')[2])
  
  const handleOverlay = () => {
    props.openOverlay()
  }

  return (
    <>
      <div className="menu-bottom">
        <div className="menu-bottom--toggle" onClick={() => handleOverlay()}>
          <i className='bx bxs-grid'></i>
        </div>
        <div className={`menu-bottom__list ${props.active && 'active'}`}>
          {
            menuAdmin.map((item, index) => (
            <Link to={item.path} key={index}>
              <MenuBottomItem key={index} item={item} active={index===activeItem} onClick={() => handleOverlay()}/>
            </Link>
          ))
        }
        </div>
      </div>
    </>
  )
}

const MenuBottomItem = (props) => {
  const active = props.active ? 'active' : ''
  return (
    <div className="menu-bottom__item">
      <div className={`menu-bottom__item-inner ${active}`} onClick={props.onClick}>
        <i className={`${props.item.icon}`}></i>
        <span>{props.item.display}</span>
      </div>
    </div>
  )
}

export const SidebarMobile = (props) => {
  const active = props.active ? 'active' : ''
  const activeItem = menuAdmin.findIndex(item => item.path === props.location.pathname.split('/')[2])

  const handleOverlay = () => {
    props.openOverlay()
  }
  return (
    <>
      <div className={`sidebar-mobile ${active && 'active'}`}>
        
        <Link to='/' className="sidebar-mobile__logo">
          <img src={logo} alt="" />
        </Link>
        <div className="sidebar-mobile__list">
        {
            menuAdmin.map((item, index) => (
            <Link to={item.path} key={index}>
              <SidebarItem key={index} item={item} active={index===activeItem} onClick={() => handleOverlay()}/>
            </Link>
          ))
        }
        </div>
      </div>
    </>
  )
}

export default SidebarAdmin