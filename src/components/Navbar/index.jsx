import React, { useState, useEffect } from "react";
import './index.css';

import logo from '../../assets/logo.svg';
import sandwichMenu from '../../assets/nav-open.svg';
import closeMenu from '../../assets/nav-close.svg';

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    window.matchMedia("(min-width: 1221px)").addEventListener("change", () => setMenu(false));
  }, []);

  return(
    <header>
      <nav className={`navbar ${ menu ? 'menuOpen' : '' }`}>
        <ul className="navbarList">
          <li className="navbarContainer1">
            <ul className="navbarContainerStyle">
              <li>
                <img src={logo} />
              </li>
              <li className="upperCaseBold borderBottom">Por que o evernote</li>
              <li className="upperCaseBold borderBottom">Recursos</li>
              <li className="upperCaseBold borderBottom">Para indivíduos</li>
              <li className="upperCaseBold borderBottom">Para equipes</li>
            </ul>
          </li>

          <li className="navbarContainer2">
            <ul className="navbarContainerStyle">
              <li className="displayHidden search">Pesquisar</li>
              <li className="displayHidden login">Entrar</li>
              <li>
                <img 
                  className="sandwichMenu" 
                  src={ menu ? closeMenu : sandwichMenu }
                  onClick={() => { menu ? setMenu(false) : setMenu(true) }}
                />
                <button type="button" className="btnDownload displayHidden">Baixar</button>
              </li>
            </ul>
          </li>
        </ul>
        {
          menu &&
          <div className="navbarOpen">
            <ul>
              <li className="upperCaseBold">Por que o evernote</li>
              <li className="upperCaseBold">Recursos</li>
              <li className="upperCaseBold">Para indivíduos</li>
              <li className="upperCaseBold">Para equipes</li>
              <li className="upperCaseBold">Pesquisar</li>
              <li className="upperCaseBold">Entrar</li>
            </ul>
            <div>
              <button className="btnDownload">Baixar</button>
            </div>
          </div>
        }
      </nav>
    </header>
  );
}

export default Navbar;