import React, { useState } from "react";

import "./tab-ui.scss";

const TabUI = (props) => {

  return (
    <div className="tab-wrapper">
      {props.children}
    </div>
  );
};

export const TabTitle = props => (
  <div className="tab-title">
    {props.children}
  </div>
)

export const TabContent = props => (
  <div className="tab-content">
    {props.children}
  </div>
)

export const TabPane = props => (
  <div className={`tab-pane ${props.active && 'active'}`}>
    {props.children}
  </div>
)

export default TabUI;
