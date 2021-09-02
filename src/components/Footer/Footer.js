import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';
import gitLogo from '../../images/social/github.svg';
import fbLogo from "../../images/social/fb.svg";

const Footer = () => {

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
      <nav className="footer__nav">
        <ul className="footer__text-links">
          <li className="footer__text-link-container">
            <Link to="/" className="footer__text-link">
              Главная
          </Link>
          </li>
          <li className="footer__text-link-container">
            <a href="https://praktikum.yandex.ru/"
              className="footer__text-link"
              target="_blank"
              rel="noreferrer">
              Яндекс.Практикум
          </a>
          </li>
        </ul>
        <ul className="footer__icon-links">
          <li className="footer__icon-link-container">
            <a href="https://github.com/nkvasov"
              className="footer__icon-link"
              target="_blank"
              rel="noreferrer">
              <img src={gitLogo} alt="Логотип GitHub" />
            </a>
          </li>
          <li className="footer__icon-link-container">
            <a href="https://www.facebook.com/nickolay.kvasov/"
              className="footer__icon-link"
              target="_blank"
              rel="noreferrer">
              <img src={fbLogo} alt="Логотип Facebook" />
            </a>
          </li>
        </ul>
      </nav>

    </footer>
  )
};

export default Footer;
