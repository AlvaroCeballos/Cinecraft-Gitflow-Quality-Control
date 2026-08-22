import { useState, useEffect } from 'react';

export default function ReviewForm({ initialData, tags, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    titulo_pelicula: '',
    calificacion: 5,
    comentario: '',
    etiqueta_id: '',
    etiqueta_nombre: ''
  });

  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');
  const [showNewTagInput, setShowNewTagInput] = useState(false);

  // Llenar formulario si es edición
  useEffect(() => {
    if (initialData) {
      setFormData({
        titulo_pelicula: initialData.titulo_pelicula || '',
        calificacion: initialData.calificacion || 5,
        comentario: initialData.comentario || '',
        etiqueta_id: initialData.etiqueta_id || '',
        etiqueta_nombre: initialData.etiqueta_nombre || ''
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo_pelicula.trim()) {
      newErrors.titulo_pelicula = 'El título de la película es obligatorio.';
    }

    if (!formData.etiqueta_id && !newTag.trim()) {
      newErrors.etiqueta = 'Debes seleccionar o crear una etiqueta.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Si selecciona etiqueta existente, limpia el nombre de nueva etiqueta
      ...(name === 'etiqueta_id' && { etiqueta_nombre: '' })
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      titulo_pelicula: formData.titulo_pelicula.trim(),
      calificacion: parseInt(formData.calificacion),
      comentario: formData.comentario.trim() || null
    };

    if (formData.etiqueta_id) {
      submitData.etiqueta_id = parseInt(formData.etiqueta_id);
    } else if (newTag.trim()) {
      submitData.etiqueta_nombre = newTag.trim();
    }

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-100 mb-4">
        {initialData ? 'Editar Reseña' : 'Nueva Reseña'}
      </h3>

      {/* Título de película */}
      <div className="mb-4">
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Título de la película *
        </label>
        <input
          type="text"
          name="titulo_pelicula"
          value={formData.titulo_pelicula}
          onChange={handleChange}
          placeholder="Ej: Inception"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
        />
        {errors.titulo_pelicula && (
          <p className="text-red-400 text-xs mt-1">{errors.titulo_pelicula}</p>
        )}
      </div>

      {/* Calificación */}
      <div className="mb-4">
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Calificación: {formData.calificacion} ⭐
        </label>
        <input
          type="range"
          name="calificacion"
          min="1"
          max="5"
          value={formData.calificacion}
          onChange={handleChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Pésima</span>
          <span>Excelente</span>
        </div>
      </div>

      {/* Comentario */}
      <div className="mb-4">
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Comentario/Opinión
        </label>
        <textarea
          name="comentario"
          value={formData.comentario}
          onChange={handleChange}
          placeholder="Comparte tu opinión sobre la película..."
          rows="4"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition resize-none"
        />
      </div>

      {/* Etiqueta */}
      <div className="mb-4">
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Etiqueta/Género *
        </label>

        {!showNewTagInput ? (
          <div className="flex gap-2">
            <select
              name="etiqueta_id"
              value={formData.etiqueta_id}
              onChange={handleChange}
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">Selecciona una etiqueta existente</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.nombre}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewTagInput(true)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium rounded transition border border-slate-600"
            >
              + Nueva
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Ej: Ciencia Ficción"
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="button"
              onClick={() => {
                setShowNewTagInput(false);
                setNewTag('');
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium rounded transition border border-slate-600"
            >
              Cancelar
            </button>
          </div>
        )}

        {errors.etiqueta && (
          <p className="text-red-400 text-xs mt-1">{errors.etiqueta}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Reseña'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-100 py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
