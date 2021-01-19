import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const NewsCardList = (props) => {

  return (
    <ul className="card-list">
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </ul>
  )
};

export default NewsCardList;
