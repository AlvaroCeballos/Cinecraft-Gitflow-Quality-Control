const pool = require('../config/db');

exports.createReview = async (req, res) => {
  const { titulo_pelicula, calificacion, comentario, etiqueta_id, etiqueta_nombre } = req.body;
  const usuario_id = req.user.id;
 
  // Validaciones
  if (!titulo_pelicula || titulo_pelicula.trim() === '') {
    return res.status(400).json({ message: 'El título de la película es obligatorio.' });
  }
 
  if (!calificacion || calificacion < 1 || calificacion > 5) {
    return res.status(400).json({ message: 'La calificación debe estar entre 1 y 5.' });
  }
 
  try {
    let finalEtiquetaId = etiqueta_id;
 
    // Si viene etiqueta_nombre en lugar de etiqueta_id, crear o buscar la etiqueta
    if (!etiqueta_id && etiqueta_nombre) {
      const [existingTag] = await pool.query(
        'SELECT id FROM etiqueta WHERE nombre = ?',
        [etiqueta_nombre]
      );
 
      if (existingTag.length > 0) {
        finalEtiquetaId = existingTag[0].id;
      } else {
        const [insertResult] = await pool.query(
          'INSERT INTO etiqueta (nombre) VALUES (?)',
          [etiqueta_nombre]
        );
        finalEtiquetaId = insertResult.insertId;
      }
    }
 
    if (!finalEtiquetaId) {
      return res.status(400).json({ message: 'Debe proporcionar una etiqueta válida.' });
    }
 
    // Insertar reseña
    const [result] = await pool.query(
      'INSERT INTO resena (usuario_id, etiqueta_id, titulo_pelicula, calificacion, comentario, destacada, archivada) VALUES (?, ?, ?, ?, ?, FALSE, FALSE)',
      [usuario_id, finalEtiquetaId, titulo_pelicula, calificacion, comentario || null]
    );
 
    res.status(201).json({
      message: 'Reseña creada exitosamente.',
      review: {
        id: result.insertId,
        usuario_id,
        etiqueta_id: finalEtiquetaId,
        titulo_pelicula,
        calificacion,
        comentario,
        destacada: false,
        archivada: false,
        fecha_creacion: new Date()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reseña.', error: error.message });
  }
};

exports.getMyReviews = async (req, res) => {
  const usuario_id = req.user.id;

  try {
    const [reviews] = await pool.query(
      `SELECT 
        r.id, 
        r.usuario_id, 
        r.etiqueta_id, 
        r.titulo_pelicula, 
        r.calificacion, 
        r.comentario, 
        r.destacada, 
        r.archivada, 
        r.fecha_creacion,
        e.nombre AS etiqueta_nombre
      FROM resena r
      LEFT JOIN etiqueta e ON r.etiqueta_id = e.id
      WHERE r.usuario_id = ?
      ORDER BY r.fecha_creacion DESC`,
      [usuario_id]
    );

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reseñas.', error: error.message });
  }
};