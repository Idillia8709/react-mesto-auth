import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister}) {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!registerData.email || !registerData.password) {
      return;
    }
    onRegister(registerData);
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
      <Link className="register__signup" to="/sign-in">Войти</Link>
      </p>
    </div>

  )
}