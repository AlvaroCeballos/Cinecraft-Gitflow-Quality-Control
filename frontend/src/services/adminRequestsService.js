import api from './api';

export const getPendingRequests = async () => {
  const response = await api.get('/admin/pending');
  return response.data;
};

export const getRequestHistory = async () => {
  const response = await api.get('/admin/history');
  return response.data;
};

export const acceptRequest = async (id) => {
  const response = await api.put(`/admin/accept/${id}`);
  return response.data;
};

export const rejectRequest = async (id, motivo) => {
  const response = await api.put(`/admin/reject/${id}`, { motivo });
  return response.data;
};
