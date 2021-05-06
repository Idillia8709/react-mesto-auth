import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [namePlace, setNamePlace] = useState('');
  const [linkPlace, setLinkPlace] = useState('');

  function handleNamePlaceChange(event) {
    setNamePlace(event.target.value);
  }

  function handleLinkPlaceChange(event) {
    setLinkPlace(event.target.value);
  }

  function handleClear() {
    setNamePlace('');
    setLinkPlace('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: namePlace,
      link: linkPlace
    });
    handleClear();
    

  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          value={namePlace ||  ''}
          onChange={handleNamePlaceChange}
          className=" popup__input popup__input_name"
          name="input-name"
          id="input-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          autoComplete="off" />
        <span id="input-name-error" className="popup__error popup__error_visible"></span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          value={linkPlace || ''}
          onChange={handleLinkPlaceChange}
          className="popup__input popup__input_link"
          name="input-image-link"
          id="input-link"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off" />
        <span id="input-link-error" className="popup__error popup__error_visible"></span>
      </label>
    </PopupWithForm>
  )
}