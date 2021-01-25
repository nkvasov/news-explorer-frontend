import React, { useState, useEffect } from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/NewsExplorerAuth';
import * as mainApi from '../../utils/MainApi';


function App() {
  const [somePopupIsOpened, setSomePopupIsOpened] = useState(false);
  const [navigationIsExpanded, setNavigationIsExpanded] = useState(false);
  const [signinPopupIsOpened, setSigninPopupisOpened] = useState(false);
  const [signupPopupIsOpened, setSignupPopupisOpened] = useState(false);
  const [hamburgerBtnIsPressed, setHamburgerBtnIsPressed] = useState(false);
  const [themeLight, setThemeLight] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userNews, setUserNews] = useState([]);

  const location = useLocation();

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        return auth.getContent(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser(res);
              // history.push('/');
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
      mainApi.getUserNews(jwt)
        .then((articles) => {
          setUserNews(articles);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

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

  function signIn(password, email) {
    return auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          tokenCheck();
        }
      });
  }

  function signUp(password, email, name) {
    return auth.register(password, email);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setLoggedIn(false);
  }


  function handleNewsSave(newsCard) {
    const jwt = localStorage.getItem('jwt');
    mainApi.saveNews(jwt, newsCard);
  }

  function handleNewsDelete(newsCard) {
    const jwt = localStorage.getItem('jwt');
    mainApi.deleteNews(jwt, newsCard._id)
      .then((res) => {
        const deletedNewsIndex = userNews.findIndex((c) => c._id === res._id);
        const userNewsUpdated = userNews.slice();
        userNewsUpdated.splice(deletedNewsIndex, 1);
        setUserNews(userNewsUpdated);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // function handleAuthError(err = { message: 'Что-то пошло не так. Попробуйте еще раз.' }) {
  //   setTooltipText(err.message);
  //   setTooltipImage(failIcon);
  //   setIsInfoTooltipPopupOpen(true);
  // }

  // function handleAuthSuccess() {
  //   setTooltipText('Вы успешно зарегистрировались.');
  //   setTooltipImage(successIcon);
  //   setIsInfoTooltipPopupOpen(true);
  // }




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
          />
        </Header>
        <Switch>
          <Route exact path='/'>
            <Main handleNewsSave={handleNewsSave} handleNewsDelete={handleNewsDelete} />
          </Route>
          <ProtectedRoute
            exact path='/saved-news'
            loggedIn={loggedIn}
            component={SavedNews}
            newsCards={userNews}
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
        />



        {/* <Route path='/saved-news'>
          <SavedNews newsCards={userNews} />
        </Route> */}

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
