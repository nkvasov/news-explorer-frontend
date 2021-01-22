import React from 'react';

const SearchError = () => {

  return (
    <section className="search-result">
      <h2 className="search-result__title search-result__title_type_centred-small">Ошибка</h2>
      <p className="search-result__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
    </section>
  );
};

export default SearchError;
