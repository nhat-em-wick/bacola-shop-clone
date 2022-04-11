import React from 'react'

import './radio.scss'
const RadioLeft = (props) => {
  return (
    <label className="radio ">
      <input type="radio" checked={props.checked} onChange={props.onChange} className='radio__input'/>
      <div className="radio__radio radio-left"></div>
      {props.des}
    </label>
  )
}

export const RadioRight = (props) => (
  <label className="radio">
      {props.des}
      <input type="radio" checked={props.checked} onChange={props.onChange} className='radio__input'/>
      <div className="radio__radio radio-right"></div>
    </label>
)


export default RadioLeft