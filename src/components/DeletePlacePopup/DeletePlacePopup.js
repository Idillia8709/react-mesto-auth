import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function DeletePlacePopup({ card, isOpen, onClose, onCardDelete }) {
  function handleSubmit(event) {
    event.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="deleteCard"
      title="Вы уверены?"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
}