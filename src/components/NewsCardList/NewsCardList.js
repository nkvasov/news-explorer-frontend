import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const NewsCardList = ({ newsCards }) => {

  // console.log(newsCards);
  return (
    <ul className="card-list">
      {newsCards.map((newsCard) => (
        <NewsCard
          newsCard={newsCard}
          // onCardClick={onCardClick}
          key={newsCard.url}
        // onCardLike={onCardLike}
        // onCardDelete={onCardDelete}
        />
      ))}

      {/* <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard /> */}
    </ul>
  )
};

export default NewsCardList;
