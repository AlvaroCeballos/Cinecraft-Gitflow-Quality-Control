import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await API.post('/auth/register', { nombre, correo, password });
      setMessage(response.data.message);
      setNombre('');
      setCorreo('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-400">Solicitud de Registro</h2>
        {message && <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-200 p-3 rounded mb-4 text-sm">{message}</div>}
        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}
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
        <div className="mb-4">
          <label className="block text-sm mb-1 text-slate-300">Correo Electrónico</label>
          <input 
            type="email" 
            required 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1 text-slate-300">Contraseña</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-2.5 rounded font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
        <p className="text-center text-sm text-slate-400 mt-4">
          ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-400 hover:underline">Inicia Sesión</Link>
        </p>
      </form>
    </div>
  );
}