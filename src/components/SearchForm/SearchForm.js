import React, { useState } from "react";
import { newsApi } from '../../utils/NewsApi';
import './SearchForm.css';

const SearchForm = ({ handleNewsSearch }) => {

  const [query, setQuery] = useState('');

  const handleQueryInputChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewsSearch(query);
  }

  return (
    <section className="search">
      <div className="search__container">
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <form className="search__form" onSubmit={handleSubmit}>
          <input className="search__input"
            type="text"
            name="search-text"
            placeholder="Введите тему новости"
            required
            minLength="2"
            maxLength="100"
            value={query}
            onChange={handleQueryInputChange}
          />
          <button className="btn btn_type_submit search__btn"
            type="submit"
            aria-label="Искать новости по теме"
          >
            Искать
        </button>

        </form>
      </div>

    </section>
  )
};

export default SearchForm;
