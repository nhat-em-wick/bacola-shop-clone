import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button, { ButtonCircle } from '../button/Button';

import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/shopping-cart/cartItemsSlice';

import './product-view.scss'
import img from '../../assets/images/product-1.jpg'
const categories = [
  "đồ chơi", "xe máy", "điện thoại"
]
const ProductView = (props) => {
  const product = props.product

  const [previewImg, setPreviewImg] = useState(product.img1)

  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setQuantity(1)
  }, [product])

  const updateQuantity = (type) => {
    if(type === 'plus') {
      setQuantity(quantity + 1)
    }else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }
  }
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(addItem({
      id: product.id,
      quantity: quantity,
      price: product.newPrice
    }))
    
  }

  const goToCart = () => {
    dispatch(addItem({
      id: product.id,
      quantity: quantity,
      price: product.newPrice
    }))
    navigate('/cart')
  }

  return (
      <>
      
        <div className="product-view">
        <div className="row">
          <div className="col l-6 m-12">
          <div className="product-view__img-wrapper">
            <div className="row">
              <div className="col l-3 m-3 c-3">
                <div className="product-view__img__list">
                  <img src={product.img1} alt="" onClick={()=> setPreviewImg(product.img1)}/>
                  <img src={product.img2} alt="" onClick={()=> setPreviewImg(product.img2)}/>
                </div>
              </div>
              <div className="col l-9 m-9 c-9">
                <div className="product-view__img__main">
                  <img src={previewImg || product.img1} alt="" />
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="col l-6 m-12">
          <div className="product-view__info">
            <div className="product-view__info__name">
            {product.name}
            </div>
            <div className="product-view__info__price">
              <span className="old">
                ${product.oldPrice}
              </span>
              <span className="new">
                ${product.newPrice}
              </span>
            </div>
            <div className="product-view__info__description">
             Mô tả: {product.description}
            </div>
            <div className="product-view__info__quantity">
              <div className="decrease">
                <ButtonCircle 
                  onClick={() => updateQuantity('minus')}
                  
                >
                <i className='bx bx-minus'></i>
                </ButtonCircle>
              </div>
              <div className="quantity">{quantity}</div>
              <div className="increase">
                <ButtonCircle onClick={() => updateQuantity('plus')}>
                <i className='bx bx-plus'></i>
                </ButtonCircle>
              </div>
            </div>
            <div className="product-view__info__add-to-cart">
              <Button onClick={() => addToCart()}>Thêm vào giỏ hàng</Button>
             <Button onClick={() => goToCart()}>Mua ngay</Button>
            </div>
            <div className="product-view__info__category">
              <span className='product-view__info__category__title'>Danh mục: </span>
              <span className='product-view__info__category__list' >
              {
                categories.map((item, index) => (
                  <Link className='product-view__info__category__item' to="#" key={index}>{item},</Link> 
                ))
              }
              </span>
            </div>
            <div className="product-view__info__social">
                <ButtonCircle className="product-view__info__social__item facebook">
                  <i className='bx bxl-facebook'></i>
                </ButtonCircle>
              
                <ButtonCircle className="product-view__info__social__item instagram">
                <i className='bx bxl-instagram' ></i>
                </ButtonCircle>
              
                <ButtonCircle className="product-view__info__social__item twitter">
                <i className='bx bxl-twitter' ></i>
                </ButtonCircle>
            </div>
          </div>
          </div>
        </div>
      </div>
      
      
      </>
      
  );
};

export default ProductView;
