import { useEffect, useState } from 'react';
import * as shareService from '../services/shareService';

export default function SharedByMe() {
  const [sharedList, setSharedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSharedByMe();
  }, []);

  const loadSharedByMe = async () => {
    try {
      setIsLoading(true);
      const response = await shareService.getSharedByMe();
      setSharedList(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al cargar tus reseñas compartidas');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-400 text-base' : 'text-slate-600 text-base'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
            📤 Mis Reseñas Compartidas
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Historial de reseñas que has compartido con otros usuarios registrados.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900 border border-red-700 text-red-200 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center text-slate-400">
          Cargando historial de envíos...
        </div>
      ) : sharedList.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <p className="text-slate-400 text-lg mb-2">Aún no has compartido ninguna reseña.</p>
          <p className="text-slate-500 text-sm">
            Ve a la sección "Mis Reseñas" y presiona el botón "Compartir" en cualquier reseña para enviarla a un amigo.
          </p>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-xl">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Película</th>
                <th className="py-3 px-4">Etiqueta</th>
                <th className="py-3 px-4">Calificación</th>
                <th className="py-3 px-4">Compartido con</th>
                <th className="py-3 px-4">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {sharedList.map((item) => (
                <tr key={item.compartida_id} className="hover:bg-slate-750 transition">
                  <td className="py-4 px-4 font-semibold text-slate-100">
                    {item.titulo_pelicula}
                  </td>
                  <td className="py-4 px-4">
                    {item.etiqueta_nombre ? (
                      <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded">
                        {item.etiqueta_nombre}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">{renderStars(item.calificacion)}</td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-200">{item.destinatario_nombre}</div>
                    <div className="text-xs text-slate-400">{item.destinatario_correo}</div>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-400">
                    {new Date(item.fecha_compartido).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
