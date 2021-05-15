class ApiAuth {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка со статус-кодом ${res.status}: ${res.statusText}`));
  }

  register(email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({email, password})
    })
      .then(res => this._parseResponse(res))
  }

  authorize(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({password, email})
    })
      .then(res => this._parseResponse(res))
  }

  checkToken(token) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._parseResponse(res))
  }
}

const config = {
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}

const apiAuth = new ApiAuth(config);
export default apiAuth;