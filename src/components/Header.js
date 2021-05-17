import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onLogout, userData, loggedIn }) {
  const location = useLocation();

  return (
    <header className="header header_position">
      <img
        className="logo logo_position"
        src={logo}
        alt='Логотип mesto Russia'
      />

      <ul className="header__nav">
        {location.pathname === "/sign-up" && <li className="header__nav-links">
          <Link to="/sign-in" className="header__nav-link">Войти</Link>
        </li>}
        {location.pathname === "/sign-in" && <li className="header__nav-links">
          <Link to="/sign-up" className="header__nav-link">Регистрация</Link>
        </li>}
        {loggedIn && <li className="header__nav-links">
          <span>{userData}</span>
          <Link to="/sign-in" className="header__nav-link" onClick={onLogout} >Выйти</Link>
        </li>}
      </ul>
    </header>
  )
}