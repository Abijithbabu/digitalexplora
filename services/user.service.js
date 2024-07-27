import { fetchWrapper } from "../helpers";
import { BASE_URL } from "../config";

export const userService = {
  getAll,
  getUsers,
  getById,
  getKycData,
  getKycStatus,
  getUserProducts,
  create,
  update,
  suspendUser,
  search,
};

async function suspendUser(userId) {
  return fetchWrapper.patch(`${BASE_URL}/user/suspend/${userId}`);
}

function getKycData(userId) {
  return fetchWrapper.get(`${BASE_URL}/user/kyc/${userId}`);
}

function getKycStatus(userId) {
  return fetchWrapper.get(`${BASE_URL}/user/kyc-status/${userId}`);
}

function getAll(skip, limit) {
  return fetchWrapper.get(`${BASE_URL}/user/list/${skip}/${limit}`);
}

function getUsers() {
  return fetchWrapper.get(`${BASE_URL}/user/`);
}

function getUserProducts(userId) {
  return fetchWrapper.get(`${BASE_URL}/user/${userId}/products`);
}

function getById(id) {
  return fetchWrapper.get(`${BASE_URL}/user/${id}`);
}

function search(searchTerm, body) {
  return fetchWrapper.post(`${BASE_URL}/user/find/${searchTerm}`, body);
}

function create(params) {
  return fetchWrapper.post(BASE_URL, params);
}

function update(id, params) {
  return fetchWrapper.put(`${BASE_URL}/user/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
// function _delete(id) {
//   return fetchWrapper.delete(`${baseUrl}/${id}`);
// }
