import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import './index.css';

import Searchbar from '../../components/Searchbar';

const Search = () => {
  const [ itemsQuantity, setItemsQuantity ] = useState('0');
  
  return(
    <>
      <Navbar />
      <main>
        <Searchbar quantity={itemsQuantity} setQuantity={setItemsQuantity} />
        <div className="searchContent paddingContent"></div>
      </main>
    </>
  );
}

export default Search;