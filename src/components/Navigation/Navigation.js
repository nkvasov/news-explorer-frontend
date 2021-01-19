import React from "react";
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logoutBlack from '../../images/icons/logout-black.svg';
import logoutWhite from '../../images/icons/logout-white.svg';


const Navigation = ({ onSigninBtnClick, expanded, onMenuClick, themeLight }) => {


  const navClassName = `nav ${expanded && 'nav_expanded'}`;

  const linkClassName = `nav__link ${themeLight && 'nav__link_theme_light'}`;

  const authBtnClassname = `nav__btn ${themeLight && 'nav__btn_theme_light'}`;

  // Кнопка выхода пока скрыта незаконно)))
  const exitBtnClassname = `nav__btn ${true && 'nav__btn_hidden'} ${themeLight && 'nav__btn_theme_light'}` 
  
  const logoutImagePath = (themeLight) ? logoutBlack : logoutWhite;

  return (
    <nav className={navClassName}>
      <div className={`nav__container ${themeLight && 'nav__container_theme_light'}`}>
        <ul className="nav__links">
          <li className="nav__link-container">
            <NavLink
              exact to="/"
              className={linkClassName}
              activeClassName="nav__link_active"
              onClick={onMenuClick}
            >
              Главная
          </NavLink>
          </li>
          <li className="nav__link-container">
            <NavLink
              to="/saved-news"
              className={linkClassName}
              activeClassName="nav__link_active"
              onClick={onMenuClick}
            >
              Сохраненные статьи
          </NavLink>
          </li>
        </ul>
        <button
          className={authBtnClassname}
          onClick={onSigninBtnClick}
        >
          Авторизоваться
        </button>

        <button
          className={exitBtnClassname}
          // onClick={onSigninBtnClick}
        >
          Семён
          <img className="nav__btn-image" src={logoutImagePath} alt="Выйти"/>
        </button>

      </div>
    </nav>

  )
};

export default Navigation;
