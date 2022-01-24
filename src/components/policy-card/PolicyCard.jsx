import React from 'react';
import './policy-card.scss'
const PolicyCard = (props) => {
  return (
    <div className="policy-card">
      <div className="policy-card__icon">
        <i className={props.item.icon}></i>
      </div>
      <div className="policy-card__info">
        <div className="policy-card__info__name">
          {props.item.name}
        </div>
        <div className="policy-card__info__description">
          {props.item.description}
        </div>
      </div>
      </div>
  );
};

export default PolicyCard;
