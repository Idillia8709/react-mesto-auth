import React from 'react';

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={card.link} alt={card.name} />
        <h3 className="popup__paragraph">{card.name}</h3>
        <button type="button" onClick={onClose} className="popup__button-exit"></button>
      </div>
    </div>
  )
}