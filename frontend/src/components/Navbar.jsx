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
      <div className="flex items-center gap-5 text-sm">
        {token ? (
          <>
            <Link to="/reviews" className="text-slate-300 hover:text-white transition-colors">
              Mis Reseñas
            </Link>
            <Link to="/shared-with-me" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1">
              📬 Compartidos Conmigo
            </Link>
            <Link to="/shared-by-me" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1">
              📤 Mis Compartidas
            </Link>
            {user.rol === 'administrador' && (
              <>
                <Link to="/admin/requests" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Solicitudes pendientes
                </Link>
                <Link to="/admin/requests/history" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Historial
                </Link>
                <Link to="/admin/reports" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Reportes Top 5
                </Link>
              </>
            )}
            <span className="text-slate-400">|</span>
            <Link to="/profile" className="text-slate-300 hover:text-white transition-colors">
              Mi Perfil ({user.nombre})
            </Link>
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
