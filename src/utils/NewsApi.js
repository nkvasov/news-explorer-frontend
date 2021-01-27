import { API_KEY, NEWS_API_BASE_URL, PAGE_SIZE } from './Configs';

export const newsApi = (query) => {
  const date = new Date();
  const to = date.toJSON().slice(0, 10);
  date.setDate(date.getDate() - 7);
  const from = date.toJSON().slice(0, 10);
  const url = `${NEWS_API_BASE_URL}pageSize=${PAGE_SIZE}&apiKey=${API_KEY}&from=${from}&to=${to}&q=${query}`;

  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}
