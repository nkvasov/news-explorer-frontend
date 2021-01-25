import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

const SavedNews = ({ newsCards, handleNewsDelete }) => {
  return (
    <main>
      <SavedNewsHeader />
      <section className="saved-news">
        <NewsCardList
          newsCards={newsCards}
          handleNewsDelete={handleNewsDelete}
        />
      </section>
    </main>
  );
};

export default SavedNews;
