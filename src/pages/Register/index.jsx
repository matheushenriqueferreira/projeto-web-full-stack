import React, { useState } from "react";

import Logo2 from '../../assets/logo2.svg';

import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Register = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ message, setMessage ] = useState('');

  const handleRegister = () => {
    console.log('Registrar')
  }

  const fieldChecks = () => {
    if(email === '' || password === '' || confirmPassword === '') {
      setMessage('Preencha todos os campos!');
      return;
    }

    if(confirmPassword !== password) {
      setMessage('As senhas não são iguais. Tente novamente.');
      return;
    }
    setMessage('');
    handleRegister();
  }

  return(
    <>
      <Navbar />
      <main>
        <div className="borderGrayStyle registerLoginSection">
          <div className="registerLoginContent1">
            <img src={Logo2} />
          </div>
          <div className="registerLoginContent2">
            <input className={'registerLoginInputStyle'} type={'text'} placeholder={'Insira seu email'} value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={'registerLoginInputStyle'} type={'password'} placeholder={'Insira sua senha'} value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className={'registerLoginInputStyle'} type={'password'} placeholder={'Confirmar senha'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <input className={'registerLoginInputBtnStyle'} type={'button'} value={"Cadastrar"} onClick={() => fieldChecks()} />
            <p className="registerLoginMessage">{message}</p>
          </div>
          <div className="registerLoginContent3">
            <p>Já possui uma conta?</p>
            <Link to={'/login'}>
              <p className="registerLoginLinkStyle">Entrar</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;