import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SearchResult.css';

const SearchResult = () => {
  return (
    <section className="search-result">
      <h2 className="search-result__title">Результаты поиска</h2>
      <NewsCardList />
      <button type="button" className="btn search-result__btn">Показать ещё</button>
    </section>
  );
};

export default SearchResult;
