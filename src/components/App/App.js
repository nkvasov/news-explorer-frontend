import React, { useState, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import HamburgerButton from '../HamburgerButton/HamburgerButton';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';


function App() {
  const [somePopupIsOpened, setSomePopupIsOpened] = useState(false);
  const [navigationIsExpanded, setNavigationIsExpanded] = useState(false);
  const [signinPopupIsOpened, setSigninPopupisOpened] = useState(false);
  const [signupPopupIsOpened, setSignupPopupisOpened] = useState(false);
  const [hamburgerBtnIsPressed, setHamburgerBtnIsPressed] = useState(false);
  const [themeLight, setThemeLight] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/saved-news') {
      setThemeLight(true);
    } else {
      setThemeLight(false);
    }
  }, [location.pathname]);

  

  const handleHamburgerClick = () => {
    setNavigationIsExpanded(!navigationIsExpanded);
    setHamburgerBtnIsPressed(!navigationIsExpanded)
  }

  const handleSigninClick = () => {
    setSigninPopupisOpened(true);
    setSomePopupIsOpened(true);
    if (navigationIsExpanded) {
      setNavigationIsExpanded(false);
      setHamburgerBtnIsPressed(false);
    }
  };

  const handleSignupClick = () => {
    setSignupPopupisOpened(true);
    setSomePopupIsOpened(true);
    if (navigationIsExpanded) {
      setNavigationIsExpanded(false);
      setHamburgerBtnIsPressed(false);
    }
  };

  const handleNavigationClick = () => {
    setNavigationIsExpanded(false);
    setSomePopupIsOpened(false);
    setHamburgerBtnIsPressed(false);
  }

  const closeAllPopups = () => {
    if (signinPopupIsOpened) {
      setSigninPopupisOpened(false);
    } else if (signupPopupIsOpened) {
      setSignupPopupisOpened(false);
    }

    setSomePopupIsOpened(false);
  };

  const handleEscPress = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  const pageClassName = `page ${(somePopupIsOpened || navigationIsExpanded) && 'page_fixed'}`;

  return (
    <div className={pageClassName}>
      <Header navigationIsExpanded={navigationIsExpanded} themeLight={themeLight}>
        <HamburgerButton
          onClick={handleHamburgerClick}
          isPressed={hamburgerBtnIsPressed}
          themeLight={themeLight}
          isHidden={somePopupIsOpened}
        />
        <Navigation
          expanded={navigationIsExpanded}
          onSigninBtnClick={handleSigninClick}
          onMenuClick={handleNavigationClick}
          themeLight={themeLight}
        />
      </Header>
      <Route exact path='/'>
        <Main />
      </Route>

      <SigninPopup
        isOpen={signinPopupIsOpened}
        title="Вход"
        submitBtnText="Войти"
        alternativeLinkText="Зарегистрироваться"
        onAlternativeLinkClick={handleSignupClick}
        onClose={closeAllPopups}
        onEscPress={handleEscPress}
        themeLight={themeLight}
      />

      <SignupPopup
        isOpen={signupPopupIsOpened}
        title="Регистрация"
        submitBtnText="Зарегистрироваться"
        onAlternativeLinkClick={handleSigninClick}
        alternativeLinkText="Войти"
        onClose={closeAllPopups}
        onEscPress={handleEscPress}
        themeLight={themeLight}
      />

      <Route path='/saved-news'>
        <SavedNews />
      </Route>

      <Footer />
    </div>
  );
}

export default App;
