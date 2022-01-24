import React from 'react';
import {Link} from 'react-router-dom'
import './category.scss'

import categories from '../../assets/fake-data/categories';

const Category = () => {
  return (
    <>
      <div className="category">
          <div className="category__list">
          <div className="row no-gutters">
            {
              categories.map((item, index) => (
                <div key={index} className="l-2-4 m-4 c-6">
                  <CategoryItem item={item}/>
                </div>
              ))
            }
          </div>
          </div>
        </div>
    </>
  );
};

const CategoryItem = (props) => (
  <div className="category-item">
    <div className="category-item__img">
      <img src={props.item.img} alt="" />
    </div>
    <div className="category-item__info">
      <Link 
      to={props.item.path} 
      className="category-item__info-name">
        {props.item.name}
      </Link>
      <div className="category-item__info-total-product">
        {props.item.totalProduct} item
      </div>
    </div>
  </div>
)

export default Category;
