import React, { useState } from "react";
import './index.css';

const Searchbar = ({ searchInputValue, setSearchInputValue, quantity, setQuantity, max, clickButton, handleSearchInput }) => {
  const [ message, setMessage ] = useState('');

  return(
    <div className="searchMenu">
      <input className={'searchInputTextStyle'} type={'text'} placeholder={'Buscar'} value={searchInputValue} onChange={(evt) => {setSearchInputValue(evt.target.value, handleSearchInput(evt.target.value))}} autoFocus/>
      <button className={'searchInputBtnStyle'} type={'button'} 
        onClick={() => {searchInputValue !== '' ? (clickButton(), setMessage('')) : setMessage('Preencha o campo de busca')}}
      >Buscar</button>
      <div className="rangeContainer">
        <input className={'searchInputRangeStyle'} type={'range'} value={quantity} min={'0'} max={max} onChange={(e) => setQuantity(e.target.value)} />
        <p>{quantity}</p>
      </div>
      <p className="searchbarErrorMessage">{message}</p>
    </div>
  );
}

export default Searchbar;