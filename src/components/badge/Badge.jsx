import React from 'react';

import './badge.scss'

const Badge = (props) => {
  const colorBadge = props.color ? props.color : 'white'
  const bgBadge = props.bg ? props.bg : 'second'
  return (
    <div className={`badge
                      badge-color-${colorBadge}
                      badge-bg-${bgBadge}
                      `}>
      {props.children}
    </div>
  );
};

export default Badge;
