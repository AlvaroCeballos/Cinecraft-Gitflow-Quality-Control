import React, { useEffect, useState } from 'react';
import * as shareService from '../services/shareService';

export default function ShareModal({ isOpen, review, onClose, onSuccess }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadUsers();
      setSelectedUserId('');
      setError('');
    }
  }, [isOpen]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const response = await shareService.getUsersToShare();
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar la lista de usuarios');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      setError('Por favor selecciona un usuario');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await shareService.shareReview(review.id, selectedUserId);
      onSuccess('Reseña compartida exitosamente');
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al compartir la reseña');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 className="text-xl font-bold text-slate-100 mb-2">
          Compartir Reseña
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Selecciona a qué usuario deseas enviarle tu reseña sobre <strong className="text-slate-200">"{review.titulo_pelicula}"</strong>.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleShare}>
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Destinatario
            </label>
            {isLoading && users.length === 0 ? (
              <p className="text-slate-400 text-sm">Cargando usuarios registrados...</p>
            ) : users.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No hay otros usuarios activos disponibles.</p>
            ) : (
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option value="">-- Selecciona un usuario --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nombre} ({user.correo})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded text-sm font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !selectedUserId}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-medium transition"
            >
              {isLoading ? 'Compartiendo...' : 'Compartir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
