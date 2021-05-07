import React, { useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChacge(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="popup__label">
        <input
          type="text"
          value={name || ''}
          onChange={handleNameChange}
          className=" popup__input popup__input_title"
          name="input-title"
          id="input-title"
          placeholder="Имя"
          required minLength="2"
          maxLength="40"
          autoComplete="off"
        />
        <span id="input-title-error" className="popup__error popup__error_visible"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          value={description || ''}
          onChange={handleDescriptionChacge}
          className="popup__input popup__input_subtitle"
          name="input-subtitle"
          id="input-subtitle"
          placeholder="О себе"
          required minLength="2"
          maxLength="200"
          autoComplete="off"
        />
        <span id="input-subtitle-error" className="popup__error popup__error_visible"></span>
      </label>
    </PopupWithForm>
  )
}