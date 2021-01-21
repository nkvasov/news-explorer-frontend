import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SearchResult from '../SearchResult/SearchResult';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import { newsApi } from '../../utils/NewsApi';
import './Main.css';

const Main = () => {
  const [newsCards, setNewsCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardsQuantity, setCardsQuantity] = useState(3);

  const handleShowMoreCardsClick = () => {
    setCardsQuantity(cardsQuantity + 3);
  };

  useEffect(() => {
    if (localStorage.getItem('searched-items')) {
      const storageData = JSON.parse(localStorage.getItem('searched-items'));
      setNewsCards(storageData);
    }
  }, []);

  const handleNewsSearch = (queryString) => {
    setIsLoading(true);
    setCardsQuantity(3);
    newsApi(queryString)
      .then((res) => {
        if (res.articles.length === 0) {
          localStorage.removeItem('searched-items');
          setNewsCards([]);
          // отрендерить Ничего не найдено
        } else {
          localStorage.setItem('searched-items', JSON.stringify(res.articles));
          const storageData = JSON.parse(localStorage.getItem('searched-items'));
          setNewsCards(storageData)
        }
      })
      .catch((err) => console.log(err))
      // отрендерить ошибку
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="content">
      <SearchForm handleNewsSearch={handleNewsSearch} />
      {isLoading && (<Preloader />)}
      <SearchResult
        newsCards={newsCards}
        cardsQuantity={cardsQuantity}
        handleShowMoreCardsClick={handleShowMoreCardsClick}
      />
      <About />
    </main>
  );
};

export default Main;
