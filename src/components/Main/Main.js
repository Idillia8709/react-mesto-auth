import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Card from '../Card/Card';
export default
  function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState('./images/image.jpg');
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getCardList()
      .then((res) => {
        const data = res.map((item) => ({
          _id: item._id,
          name: item.name,
          link: item.link,
          likes: item.likes,
          alt: item.alt
        }));
        setCards(data);
      })
      .catch(err => console.log('Ошибка:', err.message));

    api.getUserInfo()
      .then((res) => {
        const data = {
          name: res.name,
          about: res.about,
          avatar: res.avatar
        };
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
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
            key={ card._id } {...card}
            onCardClick={ onCardClick }
            />
          )}
        </ul>
      </section>
    </main>
  )
}