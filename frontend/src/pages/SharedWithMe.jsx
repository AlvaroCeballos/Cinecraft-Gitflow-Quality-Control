import React, { useEffect, useState } from 'react';
import * as shareService from '../services/shareService';

export default function SharedWithMe() {
  const [sharedReviews, setSharedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSharedReviews();
  }, []);

  const loadSharedReviews = async () => {
    try {
      setIsLoading(true);
      const response = await shareService.getSharedWithMe();
      setSharedReviews(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al cargar reseñas compartidas contigo');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-400 text-lg' : 'text-slate-600 text-lg'}>
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
            📬 Compartidos Conmigo
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Reseñas de películas que otros usuarios de CineCraft han compartido directamente contigo.
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
          Cargando reseñas compartidas...
        </div>
      ) : sharedReviews.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <p className="text-slate-400 text-lg mb-2">No tienes reseñas compartidas aún.</p>
          <p className="text-slate-500 text-sm">
            Cuando otros usuarios compartan sus opiniones contigo, aparecerán automáticamente en esta sección.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sharedReviews.map((item) => (
            <div
              key={item.compartida_id}
              className="bg-slate-800 border border-indigo-500/40 rounded-lg p-5 shadow-lg relative flex flex-col justify-between hover:border-indigo-400 transition"
            >
              <div>
                {/* Indicador de Propietario / Reseña compartida */}
                <div className="bg-indigo-900/60 border border-indigo-700 text-indigo-200 text-xs px-3 py-1.5 rounded mb-4 flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1">
                    👥 Compartida por: {item.propietario_nombre}
                  </span>
                  <span className="text-indigo-300 text-[11px]">
                    {new Date(item.fecha_compartido).toLocaleDateString('es-ES', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Título de la película */}
                <h3 className="text-xl font-bold text-slate-100 mb-1">{item.titulo_pelicula}</h3>

                {/* Etiqueta / Género */}
                {item.etiqueta_nombre && (
                  <span className="inline-block bg-slate-700 text-slate-200 text-xs px-2 py-0.5 rounded mb-3">
                    {item.etiqueta_nombre}
                  </span>
                )}

                {/* Calificación */}
                <div className="mb-3">{renderStars(item.calificacion)}</div>

                {/* Comentario */}
                {item.comentario && (
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 bg-slate-900/40 p-3 rounded border border-slate-700/50">
                    "{item.comentario}"
                  </p>
                )}
              </div>

              {/* Pie de tarjeta con autoría */}
              <div className="border-t border-slate-700/60 pt-3 mt-2 flex justify-between items-center text-xs text-slate-400">
                <span>Autor: <strong className="text-slate-300">{item.propietario_nombre}</strong></span>
                <span className="text-slate-500">{item.propietario_correo}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
