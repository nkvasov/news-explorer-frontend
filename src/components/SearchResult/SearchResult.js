import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SearchResult.css';

const SearchResult = ({
  newsCards,
  handleShowMoreCardsClick,
  cardsQuantity,
  handleNewsSave,
  loggedIn,
  handleNewsDelete,
  savedNews
}) => {

  const keyword = localStorage.getItem('keyword');
  
  newsCards = newsCards.map((newsCard) => {
    return ({
      keyword: keyword,
      title: newsCard.title,
      text: newsCard.description,
      date: newsCard.publishedAt,
      source: newsCard.source.name,
      link: newsCard.url,
      image: newsCard.urlToImage,
    })
  });

  const newsCardsToRender = newsCards.slice(0, cardsQuantity);

  return (
    <section className="search-result">
      <h2 className="search-result__title">Результаты поиска</h2>
      <NewsCardList
        newsCards={newsCardsToRender}
        handleNewsSave={handleNewsSave}
        loggedIn={loggedIn}
        savedNews={savedNews}
        handleNewsDelete={handleNewsDelete}
      />

      {(newsCards.length > cardsQuantity) &&
        <button
          type="button"
          className="btn search-result__btn"
          onClick={handleShowMoreCardsClick}
        >
          Показать ещё
      </button>
      }
    </section>
  );
};

export default SearchResult;
