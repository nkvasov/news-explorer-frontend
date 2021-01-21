import React from 'react';
import './SavedNewsHeader.css';

const SavedNewsHeader = (props) => {
  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Сохранённые статьи</h2>
      <p className="saved-news-header__text">Семён, у вас 5 сохранённых статей</p>
      <p className="saved-news-header__subtitle">По ключевым словам: <span className="saved-news-header__subtitle_key">Природа, Тайга</span> и 2-м другим</p>

    </section>
  );
};

export default SavedNewsHeader;
