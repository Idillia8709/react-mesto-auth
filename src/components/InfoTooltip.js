import logoResolve from '../images/Resolve.svg';
import logoReject from '../images/Reject.svg';
import React from "react";

export default function InfoTooltip({ isOpen, onClose, isRegistered }) {
  const logo = isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.';
  const tooltip = isRegistered ? logoResolve : logoReject;
  const altText = isRegistered ? 'Успешная регистрация' : 'Что-то пошло не так';
  return (
    <div className={`popup popup_type_infotooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="infoTooltip">
        <img
          className="infoTooltip__logo"
          src={tooltip}
          alt={altText}
        />
        <h3 className="infoTooltip__title">
          {logo}
        </h3>
        <button type="button" onClick={onClose} className="infoTooltip__button-exit"></button>
      </div>
    </div>
  )
}