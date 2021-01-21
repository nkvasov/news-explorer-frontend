import React, { useEffect } from 'react';
import './PopupWithForm.css';

const PopupWithForm = ({
  name,
  title,
  submitBtnText,
  alternativeLinkText,
  onAlternativeLinkClick,
  onEscPress,
  isOpen,
  onClose,
  themeLight,
  children,
}) => {
  const popupClassName = `popup ${isOpen && 'popup_opened'}`;
  const closeBtnClassName = `popup__close-btn ${themeLight && 'popup__close-btn_theme_light'}`;

  const alternativeLinkClickHandler = () => {
    onClose();
    onAlternativeLinkClick();
  }

  useEffect(() => {
    isOpen && document.addEventListener('keydown', onEscPress);
    return (() => {
      isOpen && document.removeEventListener('keydown', onEscPress);
    });
  }, [isOpen, onEscPress]);

  return (
    <section className={popupClassName} onClick={onClose} >
      <form
        className="popup__container"
        name={name}
        onClick={(e) => e.stopPropagation()}
        noValidate
      >
        <h2 className="popup__title">{title}</h2>
        <button
          className={closeBtnClassName}
          type="reset"
          name="close"
          onClick={onClose}
          aria-label="Закрыть попап"
        />

        {children}

        <button className="btn btn_type_submit popup__submit-btn" type="submit">
          {submitBtnText}
        </button>

        <p className="popup__alt-submit-text">или <span
          className="popup__alt-submit-link"
          onClick={alternativeLinkClickHandler}
        >{alternativeLinkText}</span></p>

      </form>
    </section>
  );
};
export default PopupWithForm;
