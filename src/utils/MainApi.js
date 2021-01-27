import { NKVASOV_API_BASE_URL } from './Configs';

const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getSavedNews = (token) => {
  return fetch(`${NKVASOV_API_BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleOriginalResponse);
};

export const saveNews = (token, newsCard) => {
  return fetch(`${NKVASOV_API_BASE_URL}/articles`, {
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
  return fetch(`${NKVASOV_API_BASE_URL}/articles/${newsId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleOriginalResponse);
};
