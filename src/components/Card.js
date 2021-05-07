import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ name, link, likes, owner, _id, onCardClick, onCardLike, onCardDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`element__button-delete ${isOwn ? 'element__button-delete_visible' : 'element__button-delete_hidden'}`);
  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__button-like ${isLiked ? 'element__button-like_active_black' : ''}`);

  function handleClick() {
    onCardClick({ name, link })
  }

  function handleCardLike() {
    onCardLike({ name, link, likes, owner, _id });
  }
  function handleDeleteCardClick() {
    onCardDeleteClick({ likes, _id, name, link, owner })
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
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}>
          </button>
          <span className="element__number-of-like">{likes.length}</span>
        </div>
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteCardClick}>
        </button>
      </div>
    </li>
  )
}