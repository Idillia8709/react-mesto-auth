import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ImagePopup from '../ImagePopup/ImagePopup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsCardPopupOpen(false);
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}

        />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input type="text" className=" popup__input popup__input_title" name="input-title" id="input-title"
              placeholder="Имя" required minLength="2" maxLength="40" autoComplete="off" />
            <span id="input-title-error" className="popup__error popup__error_visible"></span>
          </label>
          <label className="popup__label">
            <input type="text" className="popup__input popup__input_subtitle" name="input-subtitle" id="input-subtitle"
              placeholder="О себе" required minLength="2" maxLength="200" autoComplete="off" />
            <span id="input-subtitle-error" className="popup__error popup__error_visible"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input type="text" className=" popup__input popup__input_name" name="input-name" id="input-name"
              placeholder="Название" required minLength="2" maxLength="30" autoComplete="off" />
            <span id="input-name-error" className="popup__error popup__error_visible"></span>
          </label>
          <label className="popup__label">
            <input type="url" className="popup__input popup__input_link" name="input-image-link" id="input-link"
              placeholder="Ссылка на картинку" required autoComplete="off" />
            <span id="input-link-error" className="popup__error popup__error_visible"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input type="url" className=" popup__input popup__input_url-avatar" name="input-url-avatar" id="input-avatar"
              placeholder="Ссылка на аватар" required autoComplete="off" />
            <span id="input-avatar-error" className="popup__error popup__error_visible"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="deleteCard"
          title="Вы уверены?"
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
