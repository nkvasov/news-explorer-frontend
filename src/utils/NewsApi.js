export const newsApi = (query) => {
  const date =  new Date();
  const to = date.toJSON().slice(0, 10);
  date.setDate(date.getDate() - 7);
  const from = date.toJSON().slice(0, 10);
  const apiKey = 'ff34e17681f84783beff0fa34fbf196c'
  const url = `https://newsapi.org/v2/everything?pageSize=100&apiKey=${apiKey}&from=${from}&to=${to}&q=${query}`;
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}
