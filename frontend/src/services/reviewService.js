import API from './api';


export const createReview = async (reviewData) => {
  return API.post('/reviews', reviewData);
};

export const getMyReviews = async () => {
  return API.get('/reviews');
};

export const getReviewById = async (id) => {
  return API.get(`/reviews/${id}`);
};

export const updateReview = async (id, reviewData) => {
  return API.put(`/reviews/${id}`, reviewData);
};

export const deleteReview = async (id) => {
  return API.delete(`/reviews/${id}`);
};

export const toggleFeatured = async (id) => {
  return API.patch(`/reviews/${id}/destacar`);
};

// ETIQUETAS 

export const getAllTags = async () => {
  return API.get('/reviews/tags/all');
};

export const createTag = async (tagName) => {
  return API.post('/reviews/tags/create', { nombre: tagName });
};