import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// =========================
// GET collections by user
// =========================
export const getCollections = (user_id) => {
  return axios.get(`${BASE_URL}/api/collections/user/${user_id}`);
};

// =========================
// CREATE collection
// =========================
export const createCollection = (user_id, data) => {
  return axios.post(
    `${BASE_URL}/api/collections/?user_id=${user_id}`,
    data
  );
};

// =========================
// DELETE collection
// =========================
export const deleteCollection = (collection_id) => {
  return axios.delete(
    `${BASE_URL}/api/collections/${collection_id}`
  );
};

// =========================
// ADD movie
// =========================
export const addMovieToCollection = (collection_id, data) => {
  return axios.post(
    `${BASE_URL}/api/collections/${collection_id}/movies`,
    data
  );
};

// =========================
// REMOVE movie
// =========================
export const removeMovieFromCollection = (collection_id, movie_id) => {
  return axios.delete(
    `${BASE_URL}/api/collections/${collection_id}/movies/${movie_id}`
  );
};