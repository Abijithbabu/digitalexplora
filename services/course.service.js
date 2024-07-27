import { fetchWrapper } from "../helpers";
import { BASE_URL } from "../config";

export const courseService = {
  getAll,
  listAll,
  getById,
  create,
  update,
  search,
  addModule,
  updateModule,
  addLesson,
  updateLesson,
  delete: _delete,
};

function getAll(skip, limit) {
  return fetchWrapper.get(`${BASE_URL}/course/list/${skip}/${limit}`);
}

function listAll() {
  return fetchWrapper.get(`${BASE_URL}/course/`);
}

function getById(id) {
  return fetchWrapper.get(`${BASE_URL}/course/${id}`);
}

function create(params) {
  return fetchWrapper.post(`${BASE_URL}/course/create`, params);
}

function update(id, params) {
  return fetchWrapper.put(`${BASE_URL}/course/${id}`, params);
}

function addModule(id, params) {
  return fetchWrapper.post(`${BASE_URL}/course/module/${id}`, params);
}

function addLesson(moduleId, courseId, params) {
  return fetchWrapper.post(
    `${BASE_URL}/course/module/${courseId}/${moduleId}`,
    params
  );
}

function updateLesson(courseId, moduleId, params) {
  return fetchWrapper.put(
    `${BASE_URL}/course/module/${courseId}/${moduleId}`,
    params
  );
}

function updateModule(id, params) {
  return fetchWrapper.put(`${BASE_URL}/course/module/${id}`, params);
}

function search(searchTerm) {
  return fetchWrapper.get(`${BASE_URL}/course/list/${searchTerm}`);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${BASE_URL}/${id}`);
}
