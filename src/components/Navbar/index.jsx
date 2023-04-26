import React, { useState, useEffect } from "react";
import './index.css';

import logo from '../../assets/logo.svg';
import sandwichMenu from '../../assets/nav-open.svg';
import closeMenu from '../../assets/nav-close.svg';
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { token } = useSelector(state => state.user);
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
                <Link to={'/'}>
                  <img className="headerLogo" src={logo} alt="Logo do site" />
                </Link>
              </li>
              {
                token === '' &&
                <>
                  <li className="upperCaseBold borderBottom">Por que o evernote</li>
                  <li className="upperCaseBold borderBottom">Recursos</li>
                  <li className="upperCaseBold borderBottom">Para indivíduos</li>
                  <li className="upperCaseBold borderBottom">Para equipes</li>
                </>
              }
            </ul>
          </li>

          <li className="navbarContainer2">
            <ul className="navbarContainerStyle">
              {
                token === '' ?
                <>
                  <li className="displayHidden">
                    <NavLink 
                      to={'/search'}
                      className={({ isActive }) => isActive ? "navLinkActive" : "navLinkNormal"}
                    >Pesquisar</NavLink>
                  </li>
                  <li className="displayHidden">
                    <NavLink 
                      to={'/login'}
                      className={({ isActive }) => isActive ? "navLinkActive" : "navLinkNormal"}
                    >Entrar</NavLink>
                  </li>
                  <li>
                    <img 
                      className="sandwichMenu" 
                      src={ menu ? closeMenu : sandwichMenu }
                      onClick={() => { menu ? setMenu(false) : setMenu(true)}}
                    />
                    <button type="button" className="btnDownload displayHidden">Baixar</button>
                  </li>
                </>
                :
                <li className="upperCaseBold">
                  <span>sair</span>
                </li>
              }
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
              <li className="upperCaseBold">
                <NavLink 
                  to={'/search'}
                  className={({ isActive }) => isActive ? "navLinkActive" : "navLinkNormal"}
                >Pesquisar</NavLink>
              </li>
              <li className="upperCaseBold">
                <NavLink 
                  to={'/login'}
                  className={({ isActive }) => isActive ? "navLinkActive" : "navLinkNormal"}
                >Entrar</NavLink>
              </li>
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