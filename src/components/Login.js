import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function clearForm() {
    setLoginData({
      email: '',
      password: '',
    });
    setMessage('');
  }

  function handleSubmit(event) {
    setMessage('');
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }
    onLogin(loginData)
      .catch(err => setMessage(err.message || 'Что-то пошло не так!'));
    clearForm();

  }


  return (
    <div className="login">
      <form
        className="login__form"
        onSubmit={handleSubmit}
      >
        <h2 className="login__title">Вход</h2>
        <input
          className="login__input"
          type="email"
          required
          id="email"
          name="email"
          value={loginData.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="login__input"
          type="password"
          required
          id="password"
          name="password"
          value={loginData.password}
          placeholder="Пароль"
          onChange={handleChange}
        />
        <button
          className="login__button-submit"
          type="submit"
          onSubmit={handleSubmit}
        >
          Войти
          </button>
      </form>
    </div>

  )
}