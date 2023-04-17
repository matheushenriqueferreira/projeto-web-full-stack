import React from "react";
import './index.css';
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

import Input from '../../components/Input';

const Home = () => {
  const navigate = useNavigate();

  return(
    <>
      <Navbar />
      <main>
        <article className="homeArticle">
          <section className="homeSection1">
            <h1 className="homeTitle">Domine seu trabalho, organize sua vida</h1>
            <p className="homeDescription">Lembre-se de tudo e enfrente cada projeto com suas notas, tarefas e calendário, tudo no mesmo lugar.</p>
          </section>
          <section className="homeSection2">
            <Input className={'btnRegister'} type={'button'} btnValue={'Cadastre-se Gratuitamente'} btnClick={() => navigate('/register')} />
            <p className="linkLogin" onClick={() => navigate("/login")}>Já tem uma conta? Entre</p>
          </section>
        </article>
      </main>
    </>
  );
}

export default Home;