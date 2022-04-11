import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {ButtonCircle} from '../button/Button'

import './gototop.scss'
const ScrollToTop = () => {

  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    
  }, [pathname])

  return null
}

export const ButtonGoToTop = () => {
  
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  const handleGoToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div onClick={() => handleGoToTop()} className={`go-to-top ${show && 'active'}`} >
        <ButtonCircle>
          <i className='bx bx-chevron-up'></i>
        </ButtonCircle>
      </div>
    </>
  )
}

export default ScrollToTop