import api from './api';

export const getUsersToShare = () => {
  return api.get('/share/users');
};

export const shareReview = (resena_id, usuario_destino_id) => {
  return api.post('/share', { resena_id, usuario_destino_id });
};

export const getSharedWithMe = () => {
  return api.get('/share/received');
};

export const getSharedByMe = () => {
  return api.get('/share/sent');
};
