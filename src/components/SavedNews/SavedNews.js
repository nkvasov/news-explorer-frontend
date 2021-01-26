import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

const SavedNews = ({ newsCards, handleNewsDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  const keywordsRaiting = newsCards.reduce(function (newArr, card) {
    const index = newArr.findIndex((item) => item.keyword.toLowerCase() === card.keyword.toLowerCase());
    if (index === -1) {
      newArr.push({ keyword: card.keyword, quantity: 1 });
      console.log('push');
      return newArr;
    } else {
      newArr[index].quantity += 1;
      console.log(newArr);
      return newArr;
    }
  }, []);

  keywordsRaiting.sort((a, b) => - a.quantity + b.quantity);

  return (
    <main>
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
