import React from "react";
import './index.css';

const Searchbar = ({ searchInputValue, setSearchInputValue, quantity, setQuantity, max, clickButton, handleSearchInput }) => {
  return(
    <div className="searchMenu">
      <input className={'searchInputTextStyle'} type={'text'} placeholder={'Buscar'} value={searchInputValue} onChange={(evt) => {setSearchInputValue(evt.target.value, handleSearchInput(evt.target.value))}} />
      <button className={'searchInputBtnStyle'} type={'button'} onClick={() => clickButton()}>Buscar</button>
      <div className="rangeContainer">
        <input className={'searchInputRangeStyle'} type={'range'} value={quantity} min={'0'} max={max} onChange={(e) => setQuantity(e.target.value)} />
        <p>{quantity}</p>
      </div>
    </div>
  );
}

export default Searchbar;