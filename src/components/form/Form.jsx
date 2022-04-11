import React from "react";

import "./form.scss";

const Form = (props) => {
  return (
    <form className="form" onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export const FormField = (props) => (
  <div className="form__field">{props.children}</div>
);

export const FormLabel = (props) => (
  <label htmlFor={props.for} className="form__label">
    {props.label}
  </label>
);

export const FormInput = (props) => (
  <>
    <input
      id={props.id}
      className="form__input"
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange ? props.onChange : null}
      placeholder=" "
      disabled={props.disabled}
    />
  </>
);

export const FormMessageError = (props) => (
  <span className="form__message-error">{props.message}</span>
);

export const  FormSelect = (props) => (
  <>
    <div className="form__select">
      <select
        defaultValue={props.defaultValue}
        name={props.name}
        onChange={props.onChange}
      >
        <option disabled>{props.label}</option>
        {props.options &&
          props.options.map((item, index) => (
            <option key={index} value={item._id} >
              {item.name}
            </option>
          ))}
      </select>
      <span className="form__select__arrow"></span>
    </div>
  </>
);



export const FormTextarea = (props) => (
  <>
    <div className="form__textarea">
      <textarea
        className="form__textarea__input"
        id={props.id}
        name={props.name}
        placeholder=" "
        onChange={props.onChange}
        value={props.value}
        rows="10"
      ></textarea>
      <label htmlFor={props.id} className="form__textarea__label">{props.label}</label>
    </div>
  </>
);

export default Form;
