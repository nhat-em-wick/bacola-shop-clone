import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Section, { SectionBody } from "../../components/section/Section";
import ProductCard from "../../components/product-card/ProductCard";

import Button, { ButtonCircle } from "../../components/button/Button";
import Checkbox from "../../components/checkbox/Checkbox";
import Input from "../../components/input/Input";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/loading/Loading";
import Skeleton, { SkeletonElement } from "../../components/skeleton/Skeleton";
import Helmet from "../../components/helmet/Helmet";
import { updateFilters, clearFilters } from "../../redux/filters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";

import shopApi from "../../api/shopApi";

import "./shop.scss";
import { notifyError } from "../../components/toast/Toast";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Shop = () => {
  const filtersStore = useSelector((state) => state.filters.values);
  const cateStore = useSelector((state) => state.filters.values.cate);

  const [reload, setReload] = useState(false);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nothing, setNothing] = useState(false);
  const [price, setPrice] = useState([50000, 300000]);
  const [categories, setCategories] = useState([]);
  const [cate, setCate] = useState(cateStore);

  const [pagination, setPagination] = useState();
  const dispatch = useDispatch();
  const location = useLocation();

  const timerIdRef = useRef(null)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await shopApi.getCategories();
        setCategories(res.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleCategory = (id) => {
    setCate((prev) => {
      const isChecked = cate.includes(id);
      if (isChecked) {
        return cate.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    const fetchProductList = async () => {
      setLoading(true);
      try {
        const params = filtersStore;
        const response = await shopApi.getProductList(params);
        timerIdRef.current = setTimeout(() => {
          if (response.products.length <= 0) {
            setNothing(true);
            setLoading(false);
          } else {
            setNothing(false);
            setProductList(response.products);
            setPagination(response.pagination);
            setLoading(false);
          }
        }, 1000);
      } catch (e) {
        setLoading(true);
        console.log(e);
        notifyError(e.response.data.message);
      }
    };
    fetchProductList();
    return () => clearTimeout(timerIdRef.current);
  }, [filtersStore]);

  const handleFilterPrice = () => {
    dispatch(
      updateFilters({
        price_gte: price[0],
        price_lte: price[1],
        cate
      })
    );
  };

  const removeFilters = () => {
    setPrice([50000, 300000]);
    dispatch(clearFilters({ _page: 1, _limit: 12, cate: [], q: '' }));
    setCate([]);
  };

  const handlePageChange = (newPage) => {
    dispatch(updateFilters({ _page: newPage }));
  };

  const filterTabletRef = useRef(null);
  const openFilter = () => {
    filterTabletRef.current.classList.add("active");
  };
  const closeFilter = () => {
    filterTabletRef.current.classList.remove("active");
  };

  return (
    <Helmet title="Cửa hàng">
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
                        <Checkbox
                          label={item.name}
                          checked={
                            cate ? cate.includes(item._id) : false
                          }
                          onChange={() => handleCategory(item._id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shop__filter__price">
                  <div className="shop__filter__title">Lọc theo giá</div>
                  <div className="shop__filter__price__range">
                    <>
                      <Range
                        marks={{
                          0: "0vnd",
                          500000: "500000vnd",
                        }}
                        min={0}
                        max={500000}
                        step={10000}
                        defaultValue={[50000, 300000]}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </>
                  </div>
                  <div
                    className="shop__filter__price__action"
                    onClick={() => handleFilterPrice()}
                  >
                    Lọc
                  </div>
                </div>
                <div className="shop__filter__clear">
                  <Button onClick={() => removeFilters()}>Xóa bộ lọc</Button>
                </div>
              </div>
              <div
                onClick={() => openFilter()}
                className="shop__filter__tablet__open"
              >
                Bộ lọc
              </div>
              <div ref={filterTabletRef} className="shop__filter__tablet">
                <div className="shop__filter__tablet__close">
                  <ButtonCircle onClick={() => closeFilter()}>
                    <i className="bx bx-x"></i>
                  </ButtonCircle>
                </div>
                <div className="shop__filter__category">
                  <div className="shop__filter__title">Danh mục sản phẩm</div>
                  <div className="shop__filter__category__list">
                    {categories.map((item, index) => (
                      <div
                        key={index}
                        className="shop__filter__category__list__item"
                      >
                        <Checkbox
                          label={item.name}
                          checked={
                            cate ? cate.includes(item._id) : false
                          }
                          onChange={() => handleCategory(item._id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shop__filter__price">
                  <div className="shop__filter__title">Lọc theo giá</div>
                  <div className="shop__filter__price__range">
                    <>
                      <Range
                        marks={{
                          0: "0vnd",
                          500000: "500000vnd",
                        }}
                        min={0}
                        max={500000}
                        step={10000}
                        defaultValue={[50000, 300000]}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </>
                  </div>
                  <div
                    className="shop__filter__price__action"
                    onClick={() => handleFilterPrice()}
                  >
                    Lọc
                  </div>
                </div>
                <div className="shop__filter__clear">
                  <Button onClick={() => removeFilters()}>Xóa bộ lọc</Button>
                </div>
              </div>
            </div>
            <div className="col l-9 m-12 c-12">
              {nothing === true && (
                <>
                  <span>Không tìm thấy sản phẩm</span>
                </>
              )}
              {nothing === false && (
                <>
                  <div className="row no-gutters">
                    {loading &&
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                        <div key={n} className="l-3 m-4 c-6">
                          <Skeleton>
                            <SkeletonElement type="img" />
                            <SkeletonElement type="name" />
                            <SkeletonElement type="span" />
                            <SkeletonElement type="span" />
                            <SkeletonElement type="price" />
                          </Skeleton>
                        </div>
                      ))}
                    {!loading &&
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
                      ))}
                  </div>
                  {pagination && (
                    <Pagination
                      Pagination={pagination}
                      onPageChange={handlePageChange}
                      current={filtersStore._page}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </SectionBody>
      </Section>
    </div>
    </Helmet>
  );
};

export default Shop;
