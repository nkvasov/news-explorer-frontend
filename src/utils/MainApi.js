export const BASE_URL = 'https://api.nkvasov.students.nomoreparties.space';

const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserNews = (token) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleOriginalResponse);
};

export const saveNews = (token, newsCard) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newsCard),
  })
    .then(handleOriginalResponse);
};

export const deleteNews = (token, newsId) => {
  return fetch(`${BASE_URL}/articles/${newsId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleOriginalResponse);
};

//   setUserInfo(inputValues) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify(inputValues),
//     })
//       .then(this._handleOriginalResponse);
//   }

//   setAvatar(inputValues) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify(inputValues),
//     })
//       .then(this._handleOriginalResponse);
//   }

//   postCard(inputValues) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify(inputValues),
//     })
//       .then(this._handleOriginalResponse);
//   }

//   deleteCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}`, {
//       method: 'DELETE',
//       headers: this._headers,
//     })
//       .then(this._handleOriginalResponse);
//   }

//   likeCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: 'PUT',
//       headers: this._headers,
//     })
//       .then(this._handleOriginalResponse);
//   }

//   unlikeCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: 'DELETE',
//       headers: this._headers,
//     })
//       .then(this._handleOriginalResponse);
//   }

//   changeLikeCardStatus(cardId, isLiked) {
//     if (isLiked) {
//       return this.unlikeCard(cardId);
//     }
//     return this.likeCard(cardId);
//   }
// }
