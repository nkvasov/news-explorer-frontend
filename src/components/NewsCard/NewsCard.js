import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCard.css';
import testImage from '../../images/temp/news.jpg';

const NewsCard = (props) => {
  const location = useLocation();

  const [bookmarkButtonIsClicked, setBookmarkButtonIsClicked] = useState(false);
  const [trashButtonIsHovered, setTrashButtonIsHovered] = useState(false);

  const bookmarkClassName = `card__widget card__widget_content_icon card__widget_icon_bookmark ${(location.pathname !== '/saved-news') && 'card__widget_visible'}`

  const trashClassName = `card__widget card__widget_content_icon card__widget_icon_trash ${(location.pathname === '/saved-news') && 'card__widget_visible'}`

  const keyClassName = `card__widget card__widget_content_text card__widget_key-feature ${(location.pathname === '/saved-news') && 'card__widget_visible'}`

  const bookmarkTooltipClassName = `card__widget card__widget_content_text ${bookmarkButtonIsClicked && 'card__widget_visible'}`
  const trashTooltipClassName = `card__widget card__widget_content_text ${trashButtonIsHovered && 'card__widget_visible'}`

  return (
    <li className="card">

      <div className="card__widgets-container">

        <div className={keyClassName}><span>ключевое слово</span></div>
        <div className="card__widgets-wrapper">
          <div
            className={trashClassName}
            onMouseEnter={() => setTrashButtonIsHovered(true)}
            onMouseLeave={() => setTrashButtonIsHovered(false)}
          />
          <div
            className={bookmarkClassName}
            onClick={() => {
              setBookmarkButtonIsClicked(!bookmarkButtonIsClicked);
              setTimeout(setBookmarkButtonIsClicked, 1200, false);
            }}
          />
          <div className={bookmarkTooltipClassName}><span>Войдите, чтобы сохранять статьи</span></div>
          <div className={trashTooltipClassName}><span>Убрать из сохранённых</span></div>
        </div>
      </div>

      <img
        className="card__image"
        src={testImage}
        alt="картинка новости" />
      <a href="/" className="card__bottom-container">
        <header className="card__header">2 августа, 2019</header>
        <article className="card__article">
          <h3 className="card__title">«Первозданная тайга»: новый фотопроект Игоря Шпиленка</h3>
          <p className="card__text">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>
        </article>
        <footer className="card__footer">Медуза</footer>
      </a>
    </li>
  );
};
export default NewsCard;
