import React from "react";
import './index.css';

const Searchbar = ({ quantity, setQuantity }) => {
  return(
    <div className="searchMenu">
      <input className={'searchInputTextStyle'} type={'text'} placeholder={'Buscar'} />
      <input className={'searchInputBtnStyle'} type={'button'} value={'Buscar'} />
      <div className="rangeContainer">
        <input className={'searchInputRangeStyle'} type={'range'} value={quantity} min={'0'} max={'100'} onChange={(e) => setQuantity(e.target.value)} />
        <p>{quantity}</p>
      </div>
    </div>
  );
}

export default Searchbar;