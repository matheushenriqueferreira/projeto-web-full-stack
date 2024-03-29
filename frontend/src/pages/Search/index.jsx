import React, { useEffect, useState } from "react";
import './index.css';
import axios from "axios";

import Navbar from "../../components/Navbar";
import Searchbar from '../../components/Searchbar';
import Card from "../../components/Card";

const Search = () => {
  const [ itemsQuantity, setItemsQuantity ] = useState('1');
  const [ annotations, setAnnotations ] = useState([]);
  const [ tempList, setTempList ] = useState([]);
  const [ listMessage, setListMessage ] = useState('');
  const [ search, setSearch ] = useState('');

  const handleSearchInput = (evt) => {
    if(evt === '') {
      setAnnotations(tempList);
      setItemsQuantity(tempList.length);
      tempList.length === 0 ? setListMessage(`Nenhuma anotação cadastrada`) : setListMessage('');
    }
  }

  const handleSearchButton = () => {
    if(search !== '') {
      axios.get(`https://localhost:3000/annotations/${search}`, {textNote: search})
      .then((resp) => {
        setAnnotations(resp.data.annotationExists);
        setItemsQuantity(resp.data.annotationExists.length);
        setListMessage('');
      })
      .catch((error) => {
        setAnnotations([]);
        setItemsQuantity(0);
        setListMessage(error.response.data.message);
      });
    }
  }

  useEffect(() => {
    axios.get('https://localhost:3000/annotations')
    .then((resp) => {
      setAnnotations(resp.data.annotationExists);
      setTempList(resp.data.annotationExists);
      setItemsQuantity((resp.data.annotationExists).length);
      resp.data.annotationExists.length === 0 ? setListMessage(`Nenhuma anotação cadastrada`) : setListMessage('');
    })
    .catch((error) => {
      switch(error.response.status) {
        case 500:
          setListMessage('Erro no servidor, não foi possível estabelecer uma conexão')
        break;
        default: setListMessage('Erro')
        break;
      }
    })
  }, []);
  
  return(
    <>
      <Navbar />
      <main>
      <Searchbar searchInputValue={search} setSearchInputValue={setSearch} quantity={itemsQuantity} setQuantity={setItemsQuantity} max={annotations.length} clickButton={handleSearchButton} handleSearchInput={handleSearchInput} />
        <article className="searchArticle paddingContent">
          <section className="cardSection">
            {
              annotations.length > 0 ? annotations.slice(0, itemsQuantity).map((item, i) => <Card key={item._id} textNote={item.textNote} id={item._id} />)
              :
              <p>{listMessage}</p>
            }
          </section>
        </article>
      </main>
    </>
  );
}

export default Search;