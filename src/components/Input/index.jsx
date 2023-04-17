import React from "react";

const Input = ({ className, type, placeholder, btnValue, value, setValue, btnClick }) => {
  return(
    type === 'button' ?
    <input className={className} type={type} value={btnValue} onClick={btnClick} />
    :
    <input className={className} type={type} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
  );
}

export default Input;