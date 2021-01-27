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
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setInputValues({ email: '', password: '', name: '' });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleRegistration(inputValues.password, inputValues.email, inputValues.name)
      .then((res) => {
        console.log(res);
        if (res) {
          handleClose();
          handleRegistrationSuccess();
        }
      })
      .catch((err) => {
        setSubmitError(err);
      })
      .finally(() => setIsLoading(false));
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
          disabled={isLoading}
        />
        <span className="popup__input-error">{inputErrors.email}</span>
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
          disabled={isLoading}
        />
        <span className="popup__input-error">{inputErrors.password}</span>
      </div>
      <div className="popup__field">

        <label className="popup__input-title">Имя</label>
        <input className="popup__input"
          type="text"
          name="name"
          placeholder="Введите своё имя"
          required
          minLength="2"
          maxLength="15"
          value={inputValues.name}
          onChange={handleChange}
          disabled={isLoading}
        />
        <span className="popup__input-error">{inputErrors.name}</span>
      </div>
      <span className="popup__form-error">{submitError.message}</span>
    </PopupWithForm>
  );
};

export default SignupPopup;
