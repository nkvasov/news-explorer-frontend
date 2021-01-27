import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

const SavedNews = ({ newsCards, handleNewsDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  function getKeywordsRaiting() {
    return newsCards.reduce(function (newArr, card) {
      const index = newArr.findIndex((item) => item.keyword.toLowerCase() === card.keyword.toLowerCase());
      if (index === -1) {
        newArr.push({ keyword: card.keyword, quantity: 1 });
        return newArr;
      } else {
        newArr[index].quantity += 1;
        return newArr;
      }
    }, []);
  }
  let keywordsRaiting;

  if (newsCards.length === 0) {
    keywordsRaiting = null;
  } else {
    keywordsRaiting = getKeywordsRaiting();
    keywordsRaiting.sort((a, b) => - a.quantity + b.quantity);
  }


  return (
    <main className="saved-content">
      <SavedNewsHeader
        name={currentUser.name}
        cardsQuantity={newsCards.length}
        keywordsRaiting={keywordsRaiting}
      />
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
