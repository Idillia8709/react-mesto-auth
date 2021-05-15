import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister, onShowInfoTooltip }) {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  console.log(arguments);
  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function clearForm() {
    setRegisterData({
      email: '',
      password: '',
    });
    setMessage('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!registerData.email || !registerData.password) {
      onShowInfoTooltip();
      return;
    }
    onRegister(registerData)
    .catch(err => setMessage(err.message || 'Что-то пошло не так!'));
    onShowInfoTooltip(); 
    clearForm();
  }



  return (
    <div className="register">
      <form
        className="register__form"
        onSubmit={handleSubmit}
      >
        <h2 className="register__title">Регистрация</h2>
        <input
          className="register__input"
          type="text"
          required
          id="emain"
          name="email"
          value={registerData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="register__input"
          type="password"
          required
          id="password"
          name="password"
          value={registerData.password}
          placeholder="Пароль"
          onChange={handleChange}
        />
        <button
          className="register__button-submit"
          type="submit"
          onSubmit={handleSubmit}
        >
          Зарегистрироваться
          </button>
      </form>
      <p className="register__link">Уже зарегистрированы?
      <Link className="register__signup" to="/sign-up">Войти</Link>
      </p>
    </div>

  )
}