export const fetchWrapper = {
  get,
  post,
  put,
  patch,
  delete: _delete,
};

function get(url) {
  const token = localStorage.getItem("token");

  if (token) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "Access-Control-Allow-Origin": "*",
      },
    };
    return fetch(url, requestOptions).then(handleResponse);
  } else {
    const requestOptions = {
      method: "GET",
    };
    return fetch(url, requestOptions).then(handleResponse);
  }
}

function post(url, body) {
  const token = localStorage.getItem("token");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const token = localStorage.getItem("token");

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function patch(url, body) {
  const token = localStorage.getItem("token");

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, body) {
  const token = localStorage.getItem("token");

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
  if (!response.ok) {
    return response;
  }
  return response;
}
