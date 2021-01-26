import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const SignupPopup = ({
  isOpen,
  title,
  submitBtnText,
  alternativeLinkText,
  onAlternativeLinkClick,
  onClose,
  onEscPress,
  themeLight,
  handleRegistration,
  handleRegistrationSuccess
}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  let authError;
  // const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!password || !email) {
    //   // handleError();
    //   return;
    // }
    handleRegistration(password, email, name)
      .then((res) => {
        console.log(res);
        if (res) {
          onClose();
          handleRegistrationSuccess();
          // history.push('/sign-in');
          // handleSuccess();
        }
      })
      .catch((err) => {
        authError = err.message;
        console.log(err.message);
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
          // id="email"
          type="email"
          // name="email"
          placeholder="Введите почту"
          required
          minLength="3"
          maxLength="40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="popup__input-error popup__input-error_active">ошибка</span>
      </div>

      <div className="popup__field">
        <label className="popup__input-title">Пароль</label>
        <input className="popup__input"
          // id="password"
          type="password"
          // name="password"
          placeholder="Введите пароль"
          required
          minLength="5"
          maxLength="20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="popup__input-error popup__input-error_active">ошибка</span>
      </div>
      <div className="popup__field">
        <label className="popup__input-title">Имя</label>
        <input className="popup__input"
          // id="name"
          type="text"
          // name="name"
          placeholder="Введите своё имя"
          required
          minLength="2"
          maxLength="15"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__input-error popup__input-error_active">ошибка</span>
        <span className="popup__form-error popup__form-error_active">{authError}</span>
      </div>
    </PopupWithForm>
  );
};

export default SignupPopup;
