import React from 'react';

export default function Card({ name, link, likes, onCardClick }) {
  function handleClick() {
    onCardClick({ name, link })
  }
  return (
    <li className="element">
      <button className="element__button-image" type="button" onClick={handleClick}>
        <img className="element__image"
          src={link}
          alt={name}
        />
      </button>
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-counter">
          <button type="button" className="element__button-like"></button>
          <span className="element__number-of-like">{likes.length}</span>
        </div>
        <button type="button" className="element__button-delete"></button>
      </div>
    </li>
  )
}