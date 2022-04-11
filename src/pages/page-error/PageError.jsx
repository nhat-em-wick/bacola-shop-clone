import React from 'react'
import { Link } from 'react-router-dom'
import Section,{SectionBody} from '../../components/section/Section'
import Button from '../../components/button/Button'
import './page-error.scss'
const PageError = () => {
  return (
    <Section>
      <div className="page-error">
        <div className="page-error__gear">
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <h2 className="page-error__notify">
            Không tìm thấy trang mà bạn yêu cầu
        </h2>
        <Link to='/' className="page-error__btn">
            <Button>Quay về trang chủ</Button>
        </Link>
      </div>
    </Section>
  )
}

export default PageError