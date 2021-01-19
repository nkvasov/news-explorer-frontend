import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

const SavedNews = (props) => {
  return (
    <main>
      <SavedNewsHeader />
      <section className="saved-news">
        <NewsCardList />
      </section>
    </main>
  );
};

export default SavedNews;
