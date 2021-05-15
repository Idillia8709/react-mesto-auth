import logo from '../images/logo.svg';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onLogout, userData, loggedIn }) {
  const location = useLocation();
  const [nav, setNav] = useState({ routePath: "/sign-in", routeName: 'Войти' })

  useEffect(() => {
    (location.pathname === "/sign-up") ? setNav({ routePath: "/sign-in", routeName: 'Войти' }) : setNav({ routePath: "/sign-up", routeName: 'Регистрация' })
  }, [location]);

  return (
    <header className="header header_position">
      <img
        className="logo logo_position"
        src={logo}
        alt='Логотип mesto Russia'
      />
      <ul className="header__nav">
        {userData.email === '' && <li className="header__nav-links">
          <Link to={nav.routePath} className="header__nav-link">{nav.routeName}</Link>
        </li>}
        {loggedIn && <li className="header__nav-links">
          <Link to="/" className="header__nav-link">{userData.email}</Link>
        </li>}
        {loggedIn && <li className="header__nav-links">
          <Link to="/sign-in" className="header__nav-link" onClick={onLogout} >Выйти</Link>
        </li>}
      </ul>

    </header>
  )
}