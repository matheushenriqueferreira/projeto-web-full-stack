import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Logo2 from '../../assets/logo2.svg';

import Navbar from '../../components/Navbar';
import { Link } from "react-router-dom";

import { login } from '../../redux/userSlice';

const Login = () => {
  const { token } = useSelector(state => state.user);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ message, setMessage ] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogin = () => {
    const content = {
      userEmail: email,
      userPassword: password
    }
    axios.post("http://localhost:3000/login", content)
    .then((resp) => {
      dispatch(login({ email: email, token: resp.data.token }));
      navigate('/');
    })
    .catch((error) => {
      setMessage(error.response.data.message);
    });
  }

  const fieldChecks = () => {
    if(email === '' || password === '') {
      setMessage('Preencha todos os campos!');
      return;
    }
    setMessage('');
    handlerLogin();
  }

  return(
    <>
      {
        token === '' ?
        <>
          <Navbar />
          <main>
            <div className="borderGrayStyle registerLoginSection">
              <div className="registerLoginContent1">
                <img src={Logo2} />
              </div>
              <div className="registerLoginContent2">
                <input className={'registerLoginInputStyle'} type={'text'} placeholder={'Insira seu email'} value={email} onChange={(e) =>  setEmail(e.target.value)} />
                <input className={'registerLoginInputStyle'} type={'password'} placeholder={'Insira sua senha'} value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className={'registerLoginInputBtnStyle'} type={'button'} value={"Entrar"} onClick={() => fieldChecks()} />
                <p className="registerLoginMessage">{message}</p>
              </div>
              <div className="registerLoginContent3">
                <p>Não possui uma conta?</p>
                <Link to={'/register'}>
                  <p className="registerLoginLinkStyle">Criar conta</p>
                </Link>
              </div>
            </div>
          </main>
        </>
        :
        <Navigate to={'/'}/>
      }
    </>
  );
}

export default Login;