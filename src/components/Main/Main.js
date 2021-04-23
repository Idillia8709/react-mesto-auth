import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Card from '../Card/Card';

export default
  function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch(err => console.log('Ошибка:', err.message));

    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(err => console.log('Ошибка:', err.message))
  }, []);

  return (
    <main className="main">
      <section className="profile profile_position">
        <div className="profile__overlay" onClick={onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt={userName} />
        </div>
        <div className="profile__description">
          <div className="profile__edit">
            <h1 className="profile__title">{userName}</h1>
            <button onClick={onEditProfile} type="button" className="profile__button-edit"></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__button-add"></button>
      </section>
      <section className="places places_position">
        <ul className="elements">
          {cards.map(card =>
            <Card
              key={card._id} {...card}
              onCardClick={onCardClick}
            />
          )}
        </ul>
      </section>
    </main>
  )
}