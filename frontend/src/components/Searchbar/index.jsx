import React from "react";
import './index.css';

const Searchbar = ({ inputSearchValue, setInputSearchValue, quantity, setQuantity, max }) => {
  return(
    <div className="searchMenu">
      <input className={'searchInputTextStyle'} type={'text'} placeholder={'Buscar'} value={inputSearchValue} onChange={(evt) => setInputSearchValue(evt.target.value)} />
      <button className={'searchInputBtnStyle'} type={'button'}>Buscar</button>
      <div className="rangeContainer">
        <input className={'searchInputRangeStyle'} type={'range'} value={quantity} min={'1'} max={max} onChange={(e) => setQuantity(e.target.value)} />
        <p>{quantity}</p>
      </div>
    </div>
  );
}

export default Searchbar;