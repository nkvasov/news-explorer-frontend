import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/NewsExplorerLogo-white.svg';
import logoBlack from '../../images/NewsExplorerLogo-black.svg';

const Header = ({ navigationIsExpanded, children, themeLight }) => {

  const className = `header ${navigationIsExpanded && 'header_nav-expanded'} ${themeLight && 'header_theme_light'}`;

  const logoPath = (themeLight) ? logoBlack : logo;

  return (
    <header className={className}>
      <Link to="/news-explorer-frontend" className="header__logo-container">
        <img src={logoPath} className="header__logo" alt="Логотип News Explorer" />
      </Link>

      {children}
    </header>
  )
};

export default Header;
