import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="url"
          ref={avatarRef}
          className=" popup__input popup__input_url-avatar"
          name="input-url-avatar"
          id="input-avatar"
          placeholder="Ссылка на аватар"
          required autoComplete="off" />
        <span id="input-avatar-error" className="popup__error popup__error_visible"></span>
      </label>
    </PopupWithForm>
  )

}