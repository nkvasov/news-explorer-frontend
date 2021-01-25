import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCard.css';
// import testImage from '../../images/temp/news.jpg';

const NewsCard = ({
  newsCard,
  handleNewsSave,
  handleNewsDelete
}) => {
  const location = useLocation();

  const [bookmarkButtonIsClicked, setBookmarkButtonIsClicked] = useState(false);
  const [trashButtonIsHovered, setTrashButtonIsHovered] = useState(false);

  const bookmarkClassName = `card__widget card__widget_content_icon card__widget_icon_bookmark ${(location.pathname !== '/saved-news') && 'card__widget_visible'}`

  const trashClassName = `card__widget card__widget_content_icon card__widget_icon_trash ${(location.pathname === '/saved-news') && 'card__widget_visible'}`

  const keyClassName = `card__widget card__widget_content_text card__widget_key-feature ${(location.pathname === '/saved-news') && 'card__widget_visible'}`

  const bookmarkTooltipClassName = `card__widget card__widget_content_text ${bookmarkButtonIsClicked && 'card__widget_visible'}`
  const trashTooltipClassName = `card__widget card__widget_content_text ${trashButtonIsHovered && 'card__widget_visible'}`

  const dateFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  const cardDate = new Date(Date.parse(newsCard.date)).toLocaleString('ru', dateFormatOptions);


  return (
    <li className="card">

      <div className="card__widgets-container">

        <div className={keyClassName}><span>{newsCard.keyword}</span></div>
        <div className="card__widgets-wrapper">
          <div
            className={trashClassName}
            onMouseEnter={() => setTrashButtonIsHovered(true)}
            onMouseLeave={() => setTrashButtonIsHovered(false)}
            onClick={() => {
              handleNewsDelete(newsCard);
            }}
          />
          <div
            className={bookmarkClassName}
            onClick={() => {
              setBookmarkButtonIsClicked(!bookmarkButtonIsClicked);
              setTimeout(setBookmarkButtonIsClicked, 1200, false);
              handleNewsSave(newsCard);
            }}
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
        href={newsCard.url}
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
