import React from 'react';
import './SavedNewsHeader.css';

const SavedNewsHeader = ({ name, cardsQuantity, keywordsRaiting }) => {

  let firstKey, secondKey, thirdKey, fourthKey;
  
  if (keywordsRaiting) {
    firstKey = keywordsRaiting[0].keyword;
    secondKey = (keywordsRaiting.length > 1) ? `, ${keywordsRaiting[1].keyword}` : '';
    thirdKey = (keywordsRaiting.length === 3) ? ` и ${keywordsRaiting[2].keyword} ` : '';
    fourthKey = (keywordsRaiting.length > 3) ? ` и ${keywordsRaiting.length - 2} другим` : '';
  }


  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Сохранённые статьи</h2>
      <p className="saved-news-header__text">{`${name}, у вас ${cardsQuantity} сохранённых статей`}</p>

      {keywordsRaiting && (
        <p className="saved-news-header__subtitle">По ключевым словам: <span className="saved-news-header__subtitle_key">{firstKey}{secondKey}{thirdKey}</span>{fourthKey}</p>
      )}

    </section>
  );
};

export default SavedNewsHeader;
