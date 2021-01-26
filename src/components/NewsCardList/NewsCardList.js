import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const NewsCardList = ({
  newsCards,
  handleNewsSave,
  handleNewsDelete,
  loggedIn,
  savedNews
}) => {

  return (
    <ul className="card-list">
      {newsCards.map((newsCard) => (
        <NewsCard
          key={newsCard.link}
          newsCard={newsCard}
          handleNewsSave={handleNewsSave}
          handleNewsDelete={handleNewsDelete}
          loggedIn={loggedIn}
          savedNews={savedNews}
        // onCardClick={onCardClick}
        // onCardLike={onCardLike}
        // onCardDelete={onCardDelete}
        />
      ))}
    </ul>
  )
};

export default NewsCardList;
