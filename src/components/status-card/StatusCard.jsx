import React from 'react'

import './status-card.scss'

const StatusCard = (props) => {
  return (
    <>
      <div className="card status-card">
        <div className="status-card__icon">
          <i className={props.icon}></i>
        </div>
        <div className="status-card__info">
          <h4>{props.count}</h4>
          <span>{props.title}</span>
        </div>
      </div>
    </>
  )
}

export default StatusCard