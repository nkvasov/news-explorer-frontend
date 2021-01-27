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
  onSubmit,
  themeLight,
  formIsValid,
  children,
}) => {
  const popupClassName = `popup ${isOpen && 'popup_opened'}`;
  const closeBtnClassName = `popup__close-btn ${themeLight && 'popup__close-btn_theme_light'}`;
  const submitBtnClass = `btn btn_type_submit popup__submit-btn ${!formIsValid && 'popup__submit-btn_disabled'}`

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
        onSubmit={onSubmit}
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

        <button className={submitBtnClass} type="submit">
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
