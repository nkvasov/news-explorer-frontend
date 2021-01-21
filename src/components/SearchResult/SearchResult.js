import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SearchResult.css';

const SearchResult = ({ newsCards, handleShowMoreCardsClick, cardsQuantity }) => {

  const newsCardsToRender = newsCards.slice(0, cardsQuantity);

  return (
    <section className="search-result">
      <h2 className="search-result__title">Результаты поиска</h2>
      <NewsCardList newsCards={newsCardsToRender} />

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
