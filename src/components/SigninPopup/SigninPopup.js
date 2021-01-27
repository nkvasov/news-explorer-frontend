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

  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [inputErrors, setInputErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [submitError, setSubmitError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setInputValues({ email: '', password: '' });
    setInputErrors({});
    setFormIsValid(false);
    setSubmitError({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleEscPress = (e) => {
    if (onEscPress(e)) {
      resetForm();
    }

  };

  const handleChange = (e) => {
    setSubmitError({});
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValues({ ...inputValues, [name]: value });
    setInputErrors({ ...inputErrors, [name]: target.validationMessage });
    setFormIsValid(target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleLogin(inputValues.password, inputValues.email)
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        setSubmitError(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title={title}
      submitBtnText={submitBtnText}
      alternativeLinkText={alternativeLinkText}
      onAlternativeLinkClick={onAlternativeLinkClick}
      onClose={handleClose}
      onEscPress={handleEscPress}
      themeLight={themeLight}
      onSubmit={handleSubmit}
      formIsValid={formIsValid}
      isLoading={isLoading}
    >
      <div className="popup__field">
        <label className="popup__input-title">Email</label>
        <input className="popup__input"
          type="email"
          name="email"
          placeholder="Введите почту"
          required
          minLength="3"
          maxLength="40"
          value={inputValues.email}
          onChange={handleChange}
        />
        <span className="popup__input-error popup__input-error_active">{inputErrors.email}</span>

      </div>
      <div className="popup__field">
        <label className="popup__input-title">Пароль</label>
        <input className="popup__input"
          type="password"
          name="password"
          placeholder="Введите пароль"
          required
          minLength="5"
          maxLength="20"
          value={inputValues.password}
          onChange={handleChange}
        />
        <span className="popup__input-error popup__input-error_active">{inputErrors.password}</span>
      </div>
      <span className="popup__form-error popup__form-error_active">{submitError.message}</span>
    </PopupWithForm>
  );
};

export default SigninPopup;
