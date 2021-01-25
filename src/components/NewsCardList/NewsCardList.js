import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const NewsCardList = ({ newsCards, handleNewsSave, handleNewsDelete }) => {

  // console.log(newsCards);
  return (
    <ul className="card-list">
      {newsCards.map((newsCard) => (
        <NewsCard
          key={newsCard.url}
          newsCard={newsCard}
          handleNewsSave={handleNewsSave}
          handleNewsDelete={handleNewsDelete}
        // onCardClick={onCardClick}
        // onCardLike={onCardLike}
        // onCardDelete={onCardDelete}
        />
      ))}
    </ul>
  )
};

export default NewsCardList;
