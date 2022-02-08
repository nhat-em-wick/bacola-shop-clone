import React, {useState, useEffect, useRef } from "react";
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import Section, { SectionBody } from "../../components/section/Section";
import ProductCard from "../../components/product-card/ProductCard";
import Banner from "../../components/banner/Banner";
import Button, { ButtonCircle } from "../../components/button/Button";
import Checkbox from "../../components/checkbox/Checkbox";
import Input from "../../components/input/Input";
import Pagination from "../../components/pagination/Pagination";
import Loading from '../../components/loading/Loading'
import Skeleton, { SkeletonElement } from "../../components/skeleton/Skeleton";
import categories from "../../assets/fake-data/categories";
import shopApi from '../../api/shopApi'

import "./shop.scss";
import { Outlet } from "react-router-dom";


const {createSliderWithTooltip} = Slider
const Range = createSliderWithTooltip(Slider.Range)
const Shop = () => { 
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([300, 800])
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12
  })
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 30
  })
  
  useEffect(() => {
    let timerID
    const fetchProductList = async () => {
      setLoading(true)
      try{
        const params = filters
        const response = await shopApi.getProductList(params)
        timerID = setTimeout(() => {
          setProductList(response.data)
          setPagination(response.pagination)
          setLoading(false)
        }, 1000);
        
      }catch (e) {
        console.log(e)
      }
      return () => clearTimeout(timerID)
    }
    fetchProductList()
    return () => clearTimeout(timerID)
  },[filters])

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      _page: newPage
    })
  }
  return (
    <div className="shop">
      <Section>
        <SectionBody>
          <div className="row">
            <div className="col l-3">
              <div className="shop__filter">
                <div className="shop__filter__category">
                  <div className="shop__filter__title">Danh mục sản phẩm</div>
                  <div className="shop__filter__category__list">
                    {categories.map((item, index) => (
                      <div
                        key={index}
                        className="shop__filter__category__list__item"
                      >
                        <Checkbox label={item.name} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shop__filter__price">
                  <div className="shop__filter__title">Lọc theo giá</div>
                  <div className="shop__filter__price__range">
                    <>
                      <Range 
                      marks={
                        {
                          1: '1',
                          1000: '1000'
                        }
                      }
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipProps={{
                          placement: "top",
                          visible: true
                        }}
                        value={price}
                        onChange={price => setPrice(price)}
                      />
                    </>
                  </div>
                  <div className="shop__filter__price__action">
                    Lọc
                  </div>
                </div>
                <div className="shop__filter__clear">
                  <Button>Xóa bộ lọc</Button>
                </div>
              </div>
            </div>
            <div className="col l-9">
              <div className="row no-gutters">
                  {loading && 
                  [1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                    <div key={n} className="l-3 m-4 c-6">
                    <Skeleton >
                      <SkeletonElement type="img"/>
                      <SkeletonElement type="name"/>
                      <SkeletonElement type="span"/>
                      <SkeletonElement type="span"/>
                      <SkeletonElement type="price"/>
                    </Skeleton>
                    </div>
                  ))
                  }
                  {
                    !loading &&
                    productList.map((item, index) => (
                      <div key={index} className="l-3 m-4 c-6">
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
              <Pagination productsPerPage={pagination._limit} totalProducts={pagination._totalRows} onPageChange={handlePageChange}/>
            </div>
          </div>
        </SectionBody>
      </Section>
    </div>
  );
};

export default Shop;
