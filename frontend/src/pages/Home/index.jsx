import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import './index.css';

import Navbar from "../../components/Navbar";
import Searchbar from "../../components/Searchbar";
import Card from "../../components/Card";

const Home = () => {
  const { token } = useSelector(state => state.user);

  const [ textNote, setTextNote ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ annotations, setAnnotations ] = useState([]);
  const [ itemsQuantity, setItemsQuantity ] = useState('1');

  const navigate = useNavigate();

  const handleInsertAnnotations = () => {
    if(textNote !== '') {      
      axios.post('http://localhost:3000/auth/insert/annotations', { textNote }, { headers: {'Authorization': `Bearer ${token}`}})
      .then((resp) => {
        setMessage(resp.data.message);
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
      axios.get('http://localhost:3000/annotations')
      .then((resp) => {
        setAnnotations(resp.data.annotationExists)
      })
    }
  }, []);

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
              <Searchbar quantity={itemsQuantity} setQuantity={setItemsQuantity} max={annotations.length} />
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
                    annotations.slice(0, itemsQuantity).map((item, i) => <Card key={item._id} textNote={item.textNote} id={item.id} />)
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