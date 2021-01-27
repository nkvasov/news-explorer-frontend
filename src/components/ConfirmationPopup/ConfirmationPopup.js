import React, { useEffect } from 'react';

const ConfirmationPopup = ({
  title,
  onLinkClick,
  onEscPress,
  isOpen,
  onClose,
  themeLight,
}) => {
  const popupClassName = `popup ${isOpen && 'popup_opened'}`;
  const closeBtnClassName = `popup__close-btn ${themeLight && 'popup__close-btn_theme_light'}`;

  const linkClickHandler = () => {
    onClose();
    onLinkClick();
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onEscPress);
    }
    return (() => {
      if (isOpen) {
        document.removeEventListener('keydown', onEscPress);
      }
    });
  }, [isOpen, onEscPress]);

  return (
    <section className={popupClassName} onClick={onClose} >
      <div
        className="popup__container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="popup__title">{title}</h2>
        <button
          className={closeBtnClassName}
          type="reset"
          name="close"
          onClick={onClose}
          aria-label="Закрыть попап"
        />

        <p className="popup__link" onClick={linkClickHandler} >
          Войти
        </p>

      </div>
    </section>
  );
};
export default ConfirmationPopup;
