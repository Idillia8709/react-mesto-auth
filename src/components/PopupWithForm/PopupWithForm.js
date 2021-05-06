import React from 'react';

export default function PopupWithForm({ name, title, isOpen, onClose, children, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form
        className={`popup__container popup__container_form_${name}`}
        onSubmit={onSubmit}
        name={`popup-${name}`}
        noValidate>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className={`popup__button-form popup__button-form_save_${name}`}>Сохранить</button>
        <button type="button" onClick={onClose} className="popup__button-exit"></button>
      </form>
    </div>
  )
}