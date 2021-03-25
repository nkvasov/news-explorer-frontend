import React, { useState, useEffect } from 'react';
import { Route, useLocation, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import HamburgerButton from '../HamburgerButton/HamburgerButton';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/NewsExplorerAuth';
import * as mainApi from '../../utils/MainApi';

function App() {
  const [somePopupIsOpened, setSomePopupIsOpened] = useState(false);
  const [navigationIsExpanded, setNavigationIsExpanded] = useState(false);
  const [signinPopupIsOpened, setSigninPopupisOpened] = useState(false);
  const [signupPopupIsOpened, setSignupPopupisOpened] = useState(false);
  const [confirmationPopupIsOpened, setConfirmationPopupIsOpened] = useState(false);
  const [hamburgerBtnIsPressed, setHamburgerBtnIsPressed] = useState(false);
  const [themeLight, setThemeLight] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedNews, setSavedNews] = useState([]);

  const location = useLocation();
  const history = useHistory();

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        return auth.getContent(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser(res);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt');
      mainApi.getSavedNews(jwt)
        .then((articles) => {
          setSavedNews(articles.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (location.pathname === '/news-explorer-frontend/saved-news') {
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
    if (somePopupIsOpened) {
      closeAllPopups();
    }
    setSigninPopupisOpened(true);
    setSomePopupIsOpened(true);
    if (navigationIsExpanded) {
      setNavigationIsExpanded(false);
      setHamburgerBtnIsPressed(false);
    }
  };

  const handleSignupClick = () => {
    if (somePopupIsOpened) {
      closeAllPopups();
    }
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

  const handleRegistrationSuccess = () => {
    if (somePopupIsOpened) {
      closeAllPopups();
    }
    setSomePopupIsOpened(true);
    setConfirmationPopupIsOpened(true);
  }

  const closeAllPopups = () => {
    if (signinPopupIsOpened) {
      setSigninPopupisOpened(false);
    } else if (signupPopupIsOpened) {
      setSignupPopupisOpened(false);
    } else if (confirmationPopupIsOpened) {
      setConfirmationPopupIsOpened(false);
    }

    setSomePopupIsOpened(false);
  };

  const handleEscPress = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
      return true;
    }
  };

  function signIn(password, email) {
    return auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          tokenCheck();
        }
      });
  }

  function signUp(password, email, name) {
    return auth.register(password, email, name);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setLoggedIn(false);
    history.push('/news-explorer-frontend');
  }

  function handleNewsSave(newsCard) {
    const jwt = localStorage.getItem('jwt');
    return mainApi.saveNews(jwt, newsCard)
      .then((res) => {
        const userNewsUpdated = savedNews.slice();
        userNewsUpdated.unshift(res);
        setSavedNews(userNewsUpdated);
      })
  }

  function handleNewsDelete(newsCard) {
    const jwt = localStorage.getItem('jwt');
    return mainApi.deleteNews(jwt, newsCard._id)
      .then((res) => {
        const deletedNewsIndex = savedNews.findIndex((c) => c._id === res._id);
        const userNewsUpdated = savedNews.slice();
        userNewsUpdated.splice(deletedNewsIndex, 1);
        setSavedNews(userNewsUpdated);
      });
  }

  function redirectToSignin() {
    tokenCheck();
    if (!loggedIn) {
      setSigninPopupisOpened(true);
    }
    return <Redirect to='/news-explorer-frontend' />;
  }

  const pageClassName = `page ${(somePopupIsOpened || navigationIsExpanded) && 'page_fixed'}`;

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            onExitClick={signOut}
          />
        </Header>
        <Switch>
          <Route exact path='/news-explorer-frontend'>
            <Main
              handleNewsSave={handleNewsSave}
              handleNewsDelete={handleNewsDelete}
              savedNews={savedNews}
              loggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute
            exact path='/news-explorer-frontend/saved-news'
            onRedirect={redirectToSignin}
            component={SavedNews}
            newsCards={savedNews}
            loggedIn={loggedIn}
            handleNewsDelete={handleNewsDelete}
          />
        </Switch>

        <SigninPopup
          isOpen={signinPopupIsOpened}
          title="Вход"
          submitBtnText="Войти"
          alternativeLinkText="Зарегистрироваться"
          onAlternativeLinkClick={handleSignupClick}
          onClose={closeAllPopups}
          onEscPress={handleEscPress}
          themeLight={themeLight}
          handleLogin={signIn}
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
          handleRegistration={signUp}
          handleRegistrationSuccess={handleRegistrationSuccess}
        />

        <ConfirmationPopup
          isOpen={confirmationPopupIsOpened}
          title='Пользователь успешно зарегистрирован!'
          onLinkClick={handleSigninClick}
          onEscPress={handleEscPress}
          onClose={closeAllPopups}
          themeLight={themeLight}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
