import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductView from '../product-view/ProductView';
import { ButtonCircle } from '../button/Button';

import {useSelector, useDispatch} from 'react-redux'
import { remove } from '../../redux/modal-product/productModalSlice';

import './product-view-modal.scss'
import shopApi from '../../api/shopApi';
const ProductViewModal = () => {

  const [product, setProduct] = useState(undefined)
  const productSlug = useSelector(state => state.productModal.value)

  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchProduct = async () => {
      if(productSlug !== null) {
        try {
          const response = await shopApi.getProduct(productSlug)
          setProduct(response.product)
        } catch (error) {
          console.log(error)
        }
      }else {
        setProduct(undefined)
      }
    }
    fetchProduct()
  },[productSlug])

  const {pathname} = useLocation()

  useEffect(() => {
    setProduct(undefined)
  }, [pathname])
  

  return (
    <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
      <div className="product-view__modal__content">
          {product && <ProductView product={product} />}
          <div className="product-view__modal__content__close">
            <ButtonCircle onClick={() => dispatch(remove())}>
              <i className='bx bx-x'></i>
            </ButtonCircle>
          </div>
      </div>
    </div>
  );
};

export default ProductViewModal;





