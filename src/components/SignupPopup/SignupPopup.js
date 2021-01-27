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

  const [inputValues, setInputValues] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [submitError, setSubmitError] = useState({});

  let authError;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(inputValues.password, inputValues.email, inputValues.name)
      .then((res) => {
        if (res) {
          onClose();
          handleRegistrationSuccess();
        }
      })
      .catch((err) => {
        setSubmitError(err);
      });
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValues({...inputValues, [name]: value});
    setInputErrors({...inputErrors, [name]: target.validationMessage });
    setFormIsValid(target.closest("form").checkValidity());
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
      formIsValid={formIsValid}
    >
      <div className="popup__field">

        <label className="popup__input-title">Email</label>
        <input className="popup__input"
          // id="email"
          type="email"
          name="email"
          placeholder="Введите почту"
          required
          minLength="3"
          maxLength="40"
          value={inputValues.email}
          onChange={handleChange}
        />
        <span className="popup__input-error">{inputErrors.email}</span>
      </div>
      <div className="popup__field">

        <label className="popup__input-title">Пароль</label>
        <input className="popup__input"
          // id="password"
          type="password"
          name="password"
          placeholder="Введите пароль"
          required
          minLength="5"
          maxLength="20"
          value={inputValues.password}
          onChange={handleChange}
        />
        <span className="popup__input-error">{inputErrors.password}</span>
      </div>
      <div className="popup__field">
        
        <label className="popup__input-title">Имя</label>
        <input className="popup__input"
          // id="name"
          type="text"
          name="name"
          placeholder="Введите своё имя"
          required
          minLength="2"
          maxLength="15"
          value={inputValues.name}
          onChange={handleChange}
        />
        <span className="popup__input-error">{inputErrors.name}</span>
      </div>
        <span className="popup__form-error">{submitError.message}</span>
    </PopupWithForm>
  );
};

export default SignupPopup;
