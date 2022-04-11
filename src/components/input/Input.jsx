import React from 'react';
import './input.scss'

const Input = (props, ref) => {

  return (
    <input
      ref={ref}
      className={props.className}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
      type={props.type}
      min={props.min ? props.min : null}
      max={props.max ? props.max : null}
      
    />
  )
};

const forwardInput = React.forwardRef(Input)

export default forwardInput;
