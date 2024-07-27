import { fetchWrapper } from "../helpers";
import { BASE_URL } from "../config";

export const productService = {
  getAll,
  getById,
  create,
  update,
  search,
  delete: _delete,
};

function getAll(skip, limit) {
  return fetchWrapper.get(`${BASE_URL}/product/list/${skip}/${limit}`);
}

function getById(id) {
  return fetchWrapper.get(`${BASE_URL}/product/${id}`);
}

function create(params) {
  return fetchWrapper.post(`http://localhost:5000/product/create`, params);
}

function update(id, params) {
  return fetchWrapper.put(`${BASE_URL}/product/${id}`, params);
}

function search(searchTerm) {
  return fetchWrapper.get(`${BASE_URL}/product/list/${searchTerm}`);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${BASE_URL}/${id}`);
}
