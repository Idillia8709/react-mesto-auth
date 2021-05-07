import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, onCardDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile profile_position">
        <div className="profile__overlay" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
        </div>
        <div className="profile__description">
          <div className="profile__edit">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button onClick={onEditProfile} type="button" className="profile__button-edit"></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__button-add"></button>
      </section>
      <section className="places places_position">
        <ul className="elements">
          {cards.map(card =>
            <Card
              key={card._id} {...card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteClick={onCardDeleteClick}
            />
          )}
        </ul>
      </section>
    </main>
  )
}

