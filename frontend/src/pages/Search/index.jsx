import React, { useEffect, useState } from "react";
import './index.css';
import axios from "axios";

import Navbar from "../../components/Navbar";
import Searchbar from '../../components/Searchbar';
import Card from "../../components/Card";

const Search = () => {
  const [ itemsQuantity, setItemsQuantity ] = useState('1');
  const [ message, setMessage ] = useState('');
  const [ annotations, setAnnotations ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/annotations')
    .then((resp) => {
      setAnnotations(resp.data.annotationExists)
    })
    .catch((error) => {
      setMessage(error);
    })
  }, [])
  
  return(
    <>
      <Navbar />
      <main>
        <Searchbar quantity={itemsQuantity} setQuantity={setItemsQuantity} max={annotations.length} />
        <div className="searchContent paddingContent">
          {
            annotations.slice(0, itemsQuantity).map((item) => <Card key={item._id} textNote={item.textNote} />)
          }
        </div>
      </main>
    </>
  );
}

export default Search;