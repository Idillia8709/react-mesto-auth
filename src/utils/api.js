class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка со статус-кодом ${res.status}`));
  }

  getCardList() {
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._parseResponse(res))
  }

  createCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._parseResponse(res))

  }

  deleteCard(_id) {
    return fetch(`${this.url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._parseResponse(res))
  }

  addCardLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => this._parseResponse(res))
  }

  removeLikeCard(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._parseResponse(res))
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._parseResponse(res))
  }

  sendUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(res => this._parseResponse(res))
  }

  editUserAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(res => this._parseResponse(res))
  }
}

const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {

    authorization: 'a2d12257-48f2-4074-bd6c-08a7c9602f41',
    'Content-Type': 'application/json'
  }
}
const api = new Api(config);
export default api;
