import React from 'react';
import notFound from '../../images/not-found_v1.svg';

const NoSearchResult = () => {

  return (
    <section className="search-result">
      <img className="search-result__image" src={notFound} alt="Иконка Ничего не найдено"/>
      <h2 className="search-result__title search-result__title_type_centred-small">Ничего не найдено</h2>
      <p className="search-result__text">К сожалению по вашему запросу ничего не найдено.</p>

    </section>
  );
};

export default NoSearchResult;
