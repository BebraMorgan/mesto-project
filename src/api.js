const config = {
  baseUrl: "https://nomoreparties.co/v1/apf-cohort-202",
  headers: {
    authorization: "f85931ed-4d8b-4fdd-8ecc-fe50b44fd23e",
    "Content-Type": "application/json",
  },
};

const request = async (url, method = "GET", data = null) => {
  const options = {
    method,
    headers: config.headers,
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const res = await fetch(`${config.baseUrl}${url}`, options);
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
};

const get = (url) => request(url, "GET");

const post = (url, data) => request(url, "POST", data);

const put = (url, data) => request(url, "PUT", data);

const patch = (url, data) => request(url, "PATCH", data);

const del = (url) => request(url, "DELETE");

export const getCardsApi = () => get("/cards");

export const postCardApi = (data) => post("/cards", data);

export const delCardApi = (id) => del(`/cards/${id}`);

export const likeCardApi = (id) => put(`/cards/likes/${id}`);

export const unlikeCardApi = (id) => del(`/cards/likes/${id}`);

export const updateAvatarApi = (data) => patch("/users/me/avatar", data);

export const getMeApi = () => get("/users/me");

export const patchMeApi = (data) => patch("/users/me", data);
