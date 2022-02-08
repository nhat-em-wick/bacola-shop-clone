import React, { useState, useEffect, useLayoutEffect } from 'react';
import {useParams} from 'react-router-dom'
import Section, { SectionTitle, SectionBody} from '../../components/section/Section';
import ProductView from '../../components/product-view/ProductView';
import ProductCard from '../../components/product-card/ProductCard';
import TabUI, {TabTitle, TabContent, TabPane} from '../../components/tab-ui/TabUI';

import shopApi from '../../api/shopApi'


import './product.scss'
const Product = () => {

  const [activeTab, setActiveTab] = useState(0)
  const [productList, setProductList] = useState([])
  const [product, setProduct] =  useState(undefined)
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 5
  })

  const params = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = params.productId
        const response = await shopApi.getProduct(productId)
        setProduct(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [params.productId])


  const hanldeActiveTab = (number) => {
    switch(number) {
      case 0: 
        return setActiveTab(0)
      case 1: 
        return setActiveTab(1)
      default: 
        return setActiveTab(0)
    }
  }

  useEffect(() => {
    let timerID
    const fetchProductList = async () => {
      try{
        const params = filters
        const response = await shopApi.getProductList(params)
        timerID = setTimeout(() => {
          setProductList(response.data)
        }, 1000);
        
      }catch (e) {
        console.log(e)
      }
      // 
    }
    fetchProductList()
    return () => clearTimeout(timerID)
  },[filters])

  return (
    <>
      <Section>
        <SectionBody>
          <>
            {product && <ProductView product={product} /> }
          </>
          
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <>
            { product && 
              <TabUI>
              <TabTitle>
                <div 
                className={`tab-title__item ${activeTab === 0 && 'active'}`}
                onClick={() => hanldeActiveTab(0)}
                >Mo ta</div>
                <div 
                  className={`tab-title__item ${activeTab === 1 && 'active'}`}
                  onClick={() => hanldeActiveTab(1)}
                >
                  Danh gia
                </div>
              </TabTitle>
              <TabContent>
                <TabPane active={activeTab === 0 && true}>
                  <div className="tab-pane__description">
                    {product && product.description}
                  </div>
                </TabPane>
                <TabPane active={activeTab === 1 && true}>
                  <div className="tab-pane__review">
                    <div className="tab-pane__review__list">
                      <div className="tab-pane__review__list__item">
                        <div className="avatar">
                          <div className="avatar__img">
                            <i className="bx bx-user"></i>
                          </div>
                        </div>
                        <div className="info">
                          <div className="info__user-name">boycuto102</div>
                          <div className="info__date">12-23-2021</div>
                          <div className="info__star-outer">
                            <div className="info__star-inner"></div>
                          </div>
                          <div className="info__comment">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, alias. Veritatis cumque quidem obcaecati eum, voluptates perferendis, sit libero qui saepe doloribus quibusdam voluptate eligendi recusandae maxime molestias quaerat iure!
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane__review__list__item">
                        <div className="avatar">
                          <div className="avatar__img">
                            <i className="bx bx-user"></i>
                          </div>
                        </div>
                        <div className="info">
                          <div className="info__user-name">boycuto102</div>
                          <div className="info__date">12-23-2021</div>
                          <div className="info__star-outer">
                            <div className="info__star-inner" style={{}}></div>
                          </div>
                          <div className="info__comment">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, alias. Veritatis cumque quidem obcaecati eum, voluptates perferendis, sit libero qui saepe doloribus quibusdam voluptate eligendi recusandae maxime molestias quaerat iure!
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane__review__write">
                      ban muon danh gia? Hay dang nhap
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </TabUI>
            }
          </>
        
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>San pham cung danh muc</SectionTitle>
        <SectionBody>
        <div className="products-relative">
            
            <div className="row no-gutters">
            {
              productList.map((item, index) => (
                <div key={index} className="l-2-4 m-4 c-6">
                  <ProductCard
                    item={item}
                    type="fadein"
                    btn={{
                      width: "100%",
                      size: "s",
                      bg: "primary",
                      color: "white",
                    }}
                  />
                </div>
              ))
            }
            </div>
          </div>
        </SectionBody>
      </Section>
    </>
  );
};

export default Product;
