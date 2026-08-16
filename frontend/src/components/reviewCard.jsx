import React from 'react';

export default function ReviewCard({ review, onEdit, onDelete }) {
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
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition">
      {/* Encabezado */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-slate-100">{review.titulo_pelicula}</h3>
          {review.etiqueta_nombre && (
            <span className="inline-block bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded mt-2">
              {review.etiqueta_nombre}
            </span>
          )}
        </div>
      </div>

      {/* Calificación */}
      <div className="mb-3">
        {renderStars(review.calificacion)}
      </div>

      {/* Comentario */}
      {review.comentario && (
        <p className="text-slate-300 mb-4 text-sm leading-relaxed">
          {review.comentario}
        </p>
      )}

      {/* Fecha */}
      <p className="text-slate-500 text-xs mb-4">
        {new Date(review.fecha_creacion).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>

      {/* Botones */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(review)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(review.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-medium transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}