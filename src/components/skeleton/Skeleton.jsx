import React from 'react';

import './skeleton.scss'

const Skeleton = (props) => {
  return(
    <div className="skeleton-wrapper">
      {props.children}
    </div>
  );
};

export const SkeletonElement = props => (
  <div className={`skeleton__${props.type}`}></div>
)

export default Skeleton;
