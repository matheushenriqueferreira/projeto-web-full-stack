import React from "react";
import './index.css'

const Input = ({ type, placeholder, btnValue, value, setValue, btnClick }) => {
  return(
    type === 'button' ?
    <input className={type} type={type} value={btnValue} onClick={btnClick} />
    :
    <input className={type} type={type} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
  );
}

export default Input;