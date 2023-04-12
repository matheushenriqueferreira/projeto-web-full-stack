import React from "react";
import './index.css';
import Navbar from "../../components/Navbar";

const Home = () => {
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
            <button className="btnRegister">Cadastre-se Gratuitamente</button>
            <p className="linkLogin">Já tem uma conta? Entre</p>
          </section>
        </article>
      </main>
    </>
  );
}

export default Home;