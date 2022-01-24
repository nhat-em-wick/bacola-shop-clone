import React from 'react';
import './input.scss'

const Input = (props) => {
  return (
    <input
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
      type={props.type}
    />
  )
};

export default Input;
