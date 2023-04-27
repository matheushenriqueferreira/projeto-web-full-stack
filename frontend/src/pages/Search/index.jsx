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
  const [ search, setSearch ] = useState('');

  const filteredList = annotations.length > 0 ?
    annotations.filter(annotation => annotation.textNote.includes(search))
    : [];

  useEffect(() => {
    axios.get('http://localhost:3000/annotations')
    .then((resp) => {
      setAnnotations(resp.data.annotationExists)
    })
    .catch((error) => {
      setMessage(error);
    })
  }, []);
  
  return(
    <>
      <Navbar />
      <main>
        <Searchbar inputSearchValue={search} setInputSearchValue={setSearch} quantity={itemsQuantity} setQuantity={setItemsQuantity} max={annotations.length} />
        <article className="searchArticle paddingContent">
          <section className="cardSection">
            {
              filteredList.slice(0, itemsQuantity).map((item, i) => <Card key={item._id} textNote={item.textNote} id={item.id} />)
            }
          </section>
        </article>
      </main>
    </>
  );
}

export default Search;