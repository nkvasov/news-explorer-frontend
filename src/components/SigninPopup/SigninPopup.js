import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const SigninPopup = ({
  isOpen,
  title,
  submitBtnText,
  alternativeLinkText,
  onAlternativeLinkClick,
  onClose,
  onEscPress,
  themeLight,
  handleLogin
}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const history = useHistory();

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !email) {
      // handleError();
      return;
    }
    handleLogin(password, email)
      .then(() => {
        setEmail('');
        setPassword('');
        onClose();
        // history.push('/');
      })
      .catch((err) => {
        // handleError(err);
      });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title={title}
      submitBtnText={submitBtnText}
      alternativeLinkText={alternativeLinkText}
      onAlternativeLinkClick={onAlternativeLinkClick}
      onClose={onClose}
      onEscPress={onEscPress}
      themeLight={themeLight}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <label className="popup__input-title">Email</label>
        <input className="popup__input"
          id="email"
          type="email"
          name="email"
          placeholder="Введите почту"
          required
          minLength="3"
          maxLength="40"
          value={email}
          onChange={handleEmailInputChange}
        />
        <span className="popup__input-error popup__input-error_active">ошибка</span>

      </div>
      <div className="popup__field">
        <label className="popup__input-title">Пароль</label>
        <input className="popup__input"
          id="password"
          type="password"
          name="password"
          placeholder="Введите пароль"
          required
          minLength="5"
          maxLength="20"
          value={password}
          onChange={handlePasswordInputChange}
        />
        <span className="popup__input-error popup__input-error_active">ошибка</span>
        <span className="popup__form-error popup__form-error_active">ошибка</span>
      </div>
    </PopupWithForm>
  );
};

export default SigninPopup;
