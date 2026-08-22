import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Profile() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('/auth/profile');
        setNombre(response.data.nombre);
        setCorreo(response.data.correo);
      } catch {
        setError('Error al cargar datos del perfil.');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await API.put('/auth/profile', { nombre, password });
      setMessage('Perfil actualizado exitosamente.');
      setPassword('');

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.nombre = nombre;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800">
      <h2 className="text-2xl font-bold text-indigo-400 mb-6">Mi Perfil</h2>
      {message && <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-200 p-3 rounded mb-4 text-sm">{message}</div>}
      {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-sm mb-1 text-slate-300">Correo Electrónico (No editable)</label>
          <input 
            type="email" 
            disabled 
            value={correo} 
            className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-500 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1 text-slate-300">Nombre Completo</label>
          <input 
            type="text" 
            required 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1 text-slate-300">Nueva Contraseña (Opcional)</label>
          <input 
            type="password" 
            placeholder="Dejar en blanco para conservar la actual"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded font-semibold text-sm transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Actualizar Perfil'}
        </button>
      </form>
    </div>
  );
}
