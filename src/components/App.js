import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import apiAuth from '../utils/apiAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {

    tokenCheck();

    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log('Ошибка:', err.message));

    api.getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch(err => console.log('Ошибка:', err.message));
  }, []);
  
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return
    }
    apiAuth.checkToken(jwt)
      .then(({ email, password }) => {
        setUserData({ email, password });
        setLoggedIn(true);
      })
      .catch(() => { history.push('/sign-in') });
  }

  function handleLogin({email, password}) {
    return apiAuth
      .authorize(email, password)
      .then((res) => {
        setUserData({ email, password });
        setLoggedIn(true);
        history.push('/');
        localStorage.setItem('jwt', res.token);
      })
      .catch(err => console.log('Ошибка:', err.message));
  }


  function handleRegister({email, password}) {
    return apiAuth
    .register(email, password)
      .then(() => {
        setIsRegistered(true);
        history.push('/sing-in');
      })
      .catch(err => console.log('Ошибка:', err.message));
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData({
      email: '',
      password: '',
    });
    history.push('/sign-in');
  }


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log('Ошибка:', err.message));
  }

  function handleCardDelete(card) {
    const owner = card.owner._id === currentUser._id;
    if (owner) {
      api.deleteCard(card._id)
        .then(() => {
          const newCards = cards.filter(({ _id }) => _id !== card._id);
          setCards(newCards);
          closeAllPopups();
        })
        .catch(err => console.log('Ошибка:', err.message))
    }
  }

  function handleAddPlaceSubmit(card) {
    api.createCard(card)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка:', err.message));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeletePlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  }

  function handleUpdateUser(data) {
    api.sendUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка:', err.message));
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка:', err.message));
  }

  function handleShowInfoTooltip() {
    setIsInfoTooltip(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsCardPopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <div className="page__container">
          <Header
            loggedIn={loggedIn}
            userData={userData}
            onLogout={handleLogOut}
          />
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleDeleteCardClick}
              cards={cards}
            />
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
                onShowInfoTooltip={handleShowInfoTooltip}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen} s
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
          />
          <DeletePlacePopup
            card={selectedCard}
            isOpen={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isCardPopupOpen}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            isRegistered={isRegistered}
          />

        </div>
      </div>
    </CurrentUserContext.Provider >

  );
}
