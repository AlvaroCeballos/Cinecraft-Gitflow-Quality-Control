import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-400 flex items-center gap-2">
        🎬 CineCraft
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {token ? (
          <>
            <span className="text-slate-300">Hola, <strong className="text-white">{user.nombre}</strong></span>
            <Link to="/profile" className="text-slate-300 hover:text-white transition-colors">Mi Perfil</Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition-colors"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Iniciar Sesión</Link>
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded transition-colors">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}