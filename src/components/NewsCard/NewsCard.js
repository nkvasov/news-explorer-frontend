import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCard.css';

const NewsCard = ({
  newsCard,
  handleNewsSave,
  handleNewsDelete,
  loggedIn,
  savedNews
}) => {
  const location = useLocation();

  const [isSaved, setIsSaved] = useState(false);
  const [bookmarkButtonIsHovered, setBookmarkButtonIsHovered] = useState(false);
  const [trashButtonIsHovered, setTrashButtonIsHovered] = useState(false);

  function checkNewsIsSaved(someNews) {
    const res = savedNews.find((news) => news.link === someNews.link);
    if (res) {
      newsCard._id = res._id;
      setIsSaved(true);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      console.log('fire');
      checkNewsIsSaved(newsCard);
    }
  }, [loggedIn, savedNews]);

  const bookmarkClassName = `card__widget card__widget_content_icon card__widget_icon_bookmark ${(location.pathname !== '/saved-news') && 'card__widget_visible'} ${isSaved && 'card__widget_icon_bookmark-marked'}`;

  const trashClassName = `card__widget card__widget_content_icon card__widget_icon_trash ${(location.pathname === '/saved-news') && 'card__widget_visible'}`;

  const keyClassName = `card__widget card__widget_content_text card__widget_key-feature ${(location.pathname === '/saved-news') && 'card__widget_visible'}`;

  const bookmarkTooltipClassName = `card__widget card__widget_content_text ${!loggedIn && bookmarkButtonIsHovered && 'card__widget_visible'}`;
  const trashTooltipClassName = `card__widget card__widget_content_text ${trashButtonIsHovered && 'card__widget_visible'}`;

  const dateFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  const cardDate = new Date(Date.parse(newsCard.date)).toLocaleString('ru', dateFormatOptions);

  const onBookmarkClick = () => {
    if (isSaved) {
      handleNewsDelete(newsCard)
        .then(() => {
          setIsSaved(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      handleNewsSave(newsCard)
        .then(() => {
          newsCard._id = savedNews[0]._id;
          setIsSaved(true)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <li className="card">

      <div className="card__widgets-container">

        <div className={keyClassName}><span>{newsCard.keyword}</span></div>
        <div className="card__widgets-wrapper">
          <div
            className={trashClassName}
            onMouseEnter={() => setTrashButtonIsHovered(true)}
            onMouseLeave={() => setTrashButtonIsHovered(false)}
            onClick={() => handleNewsDelete(newsCard)}
          />
          <div
            className={bookmarkClassName}
            onClick={onBookmarkClick}
            onMouseEnter={() => setBookmarkButtonIsHovered(true)}
            onMouseLeave={() => setBookmarkButtonIsHovered(false)}
          />
          <div className={bookmarkTooltipClassName}><span>Войдите, чтобы сохранять статьи</span></div>
          <div className={trashTooltipClassName}><span>Убрать из сохранённых</span></div>
        </div>
      </div>

      <img
        className="card__image"
        src={newsCard.image}
        alt={`Изображение к новости "${newsCard.title}"`} />
      <a
        href={newsCard.link}
        className="card__bottom-container"
        target="_blank"
        rel="noreferrer"
      >
        <header className="card__header">{cardDate}</header>
        <article className="card__article">
          <h3 className="card__title">{newsCard.title}</h3>
          <p className="card__text">{newsCard.text}</p>
        </article>
        <footer className="card__footer">{newsCard.source}</footer>
      </a>
    </li>
  );
};
export default NewsCard;
