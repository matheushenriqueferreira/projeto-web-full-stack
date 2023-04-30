import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import './index.css';

import Navbar from "../../components/Navbar";
import Searchbar from "../../components/Searchbar";
import Card from "../../components/Card";
import { logout } from "../../redux/userSlice";

const Home = () => {
  const { token } = useSelector(state => state.user);

  const [ textNote, setTextNote ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ annotations, setAnnotations ] = useState([]);
  const [ tempList, setTempList ] = useState([]);
  const [ itemsQuantity, setItemsQuantity ] = useState(1);
  const [ search, setSearch ] = useState('');
  const [ listMessage, setListMessage ] = useState('');
  const [ count, setCount ] = useState(0);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchInput = (evt) => {
    if(evt === '') {
      setAnnotations(tempList);
      setItemsQuantity(tempList.length);
      tempList.length === 0 ? setListMessage(`Nenhuma anotação cadastrada`) : setListMessage('');
    }
  }

  const handleSearchButton = () => {
    if(search !== '') {
      axios.get(`http://localhost:3000/annotations/${search}`, {textNote: search})
      .then((resp) => {
        setAnnotations(resp.data.annotationExists);
        setItemsQuantity(resp.data.annotationExists.length);
        resp.data.annotationExists.length === 0 ? setListMessage(`Não foram encontradas anotações para o termo digitado: ${search}`) : setListMessage('');
      })
      .catch((error) => {
        setAnnotations([]);
        setItemsQuantity(0);
        setListMessage(`Erro ao realizar busca`);
      });
    }
  }

  const handleInsertAnnotations = () => {
    if(textNote) {      
      axios.post('http://localhost:3000/auth/insert/annotations', { textNote }, { headers: {'Authorization': `Bearer ${token}`}})
      .then((resp) => {
        setMessage('');
        setTextNote('');
        setCount(count + 1);
      })
      .catch((e) => {
        setMessage(e.response.data.message);
      })
    }
    else {
      setMessage('Campo vazio');
    }
  }

  useEffect(() => {
    if(token !== '') {
      axios.get('http://localhost:3000/auth/annotations', { headers: {'Authorization': `Bearer ${token}`}})
      .then((resp) => {
        setAnnotations(resp.data.annotationExists);
        setTempList(resp.data.annotationExists);
        setItemsQuantity((resp.data.annotationExists).length);
        resp.data.annotationExists.length === 0 ? setListMessage(`Nenhuma anotação cadastrada`) : setListMessage('');
      })
      .catch((error) => {
        switch(error.response.status) {
          case 401:
            setMessage('Token expirou')
            setTimeout(() => {
              setMessage('');
              dispatch(logout());
            },2000)
          break;
          case 500:
            setListMessage('Erro no servidor, não foi possível estabelecer uma conexão')
          break;
          default: setListMessage('Erro')
          break;
        }
      })
    }
  }, [count]);

  return(
    <>
      <Navbar />
      <main>
        {
          token === '' ?
            <article className="homeArticle paddingContent">
              <section className="homeSection1">
                <h1 className="homeTitle">Domine seu trabalho, organize sua vida</h1>
                <p className="homeDescription">Lembre-se de tudo e enfrente cada projeto com suas notas, tarefas e calendário, tudo no mesmo lugar.</p>
              </section>
              <section className="homeSection2">
                <button className='btnRegister' type={'button'} onClick={() => navigate('/register')}>Cadastre-se Gratuitamente</button>
                <p className="linkLogin" onClick={() => navigate("/login")}>Já tem uma conta? Entre</p>
              </section>
            </article>
          :
            <>
              <Searchbar searchInputValue={search} setSearchInputValue={setSearch} quantity={itemsQuantity} setQuantity={setItemsQuantity} max={annotations.length} clickButton={handleSearchButton} handleSearchInput={handleSearchInput} />
              <div className="insertDataContainer">
                <div className="textAreaContainer">
                  <textarea className="textAreaStyle" value={textNote} onChange={(evt) => setTextNote(evt.target.value)} maxLength="150" />
                  <button className="btnSaveAnnotation" type="button" onClick={() => handleInsertAnnotations()}>Salvar anotação</button>
                  <span className="messageContainer">{message}</span>
                </div>
              </div>
              <article className="homeArticle paddingContent">
                <section className="cardSection">
                  {
                    annotations.length > 0 ? annotations.slice(0, itemsQuantity).map((item, i) => <Card key={item._id} textNote={item.textNote} id={item._id} />)
                    :
                    <p>{listMessage}</p>
                  }
                </section>
              </article>
            </>
        }  
      </main>
    </>
  );
}

export default Home;