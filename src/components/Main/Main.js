import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SearchResult from '../SearchResult/SearchResult';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NoSearchResult from '../NoSearchResult/NoSearchResult';
import SearchError from '../SearchError/SearchError';
import { newsApi } from '../../utils/NewsApi';
import './Main.css';

const Main = ({ handleNewsSave }) => {
  const [newsCards, setNewsCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardsQuantity, setCardsQuantity] = useState(3);
  const [isSearchError, setIsSearchError] = useState(false);
  // const [keyword, setKeyword] = useState('');


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
    if (isSearchError) {
      setIsSearchError(false);
    };
    setIsLoading(true);
    newsApi(queryString)
      .then((res) => {
        if (res.articles.length === 0) {
          localStorage.removeItem('searched-items');
          setNewsCards([]);
        } else {
          localStorage.setItem('searched-items', JSON.stringify(res.articles));
          localStorage.setItem('keyword', queryString);
          const storageData = JSON.parse(localStorage.getItem('searched-items'));
          setNewsCards(storageData);
          setCardsQuantity(3);
        }
      })
      .catch((err) => setIsSearchError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="content">
      <SearchForm handleNewsSearch={handleNewsSearch} />
      {isLoading && (<Preloader />)}
      {isSearchError && (<SearchError />)}
      {(newsCards.length === 0) && (!isSearchError) && (<NoSearchResult />)}
      {(newsCards.length > 0) && (
        <SearchResult
          newsCards={newsCards}
          cardsQuantity={cardsQuantity}
          handleShowMoreCardsClick={handleShowMoreCardsClick}
          handleNewsSave={handleNewsSave}
          // keyword={keyword}
        />
      )}
      <About />
    </main>
  );
};

export default Main;
