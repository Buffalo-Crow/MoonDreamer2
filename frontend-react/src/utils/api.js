const API_URL = import.meta.env.VITE_API_URL;
import {getToken} from "./token";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function editProfile({ name, avatar }) {
  return fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then((res) => checkResponse(res));
}



export{ checkResponse, editProfile };