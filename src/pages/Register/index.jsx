import React, { useState } from "react";

import Logo2 from '../../assets/logo2.svg'

import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
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
        <section className="borderGrayStyle registerLoginSection">
          <div className="registerLoginContent1">
            <img src={Logo2} />
          </div>
          <div className="registerLoginContent2">
            <Input className={'registerLoginInputStyle'} type={'text'} placeholder={'Insira seu email'} value={email} setValue={setEmail} />
            <Input className={'registerLoginInputStyle'} type={'password'} placeholder={'Insira sua senha'} value={password} setValue={setPassword} />
            <Input className={'registerLoginInputStyle'} type={'password'} placeholder={'Confirmar senha'} value={confirmPassword} setValue={setConfirmPassword} />
            <Input className={'registerLoginInputBtnStyle'} type={'button'} btnValue={"Cadastrar"} btnClick={fieldChecks} />
            <p className="registerLoginMessage">{message}</p>
          </div>
          <div className="registerLoginContent3">
            <p>Já possui uma conta?</p>
            <Link to={'/login'}>Entrar</Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;