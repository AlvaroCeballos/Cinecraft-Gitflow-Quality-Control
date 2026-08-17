const pool = require('../config/db');

// Obtener usuarios disponibles para compartir (excluye al usuario actual)
exports.getUsersToShare = async (req, res) => {
  const currentUserId = req.user.id;

  try {
    const [users] = await pool.query(
      'SELECT id, nombre, correo FROM usuario WHERE id != ? AND estado_solicitud = "aprobado" AND rol = "usuario" ORDER BY nombre ASC',
      [currentUserId]
    );

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios para compartir.', error: error.message });
  }
};

// Compartir una reseña propia con otro usuario
exports.shareReview = async (req, res) => {
  const { resena_id, usuario_destino_id } = req.body;
  const usuario_origen_id = req.user.id;

  if (!resena_id || !usuario_destino_id) {
    return res.status(400).json({ message: 'Debe especificar la reseña y el usuario destinatario.' });
  }

  if (parseInt(usuario_destino_id) === parseInt(usuario_origen_id)) {
    return res.status(400).json({ message: 'No puedes compartir una reseña contigo mismo.' });
  }

  try {
    // 1. Verificar que la reseña pertenezca al usuario origen
    const [reviewCheck] = await pool.query(
      'SELECT id FROM resena WHERE id = ? AND usuario_id = ?',
      [resena_id, usuario_origen_id]
    );

    if (reviewCheck.length === 0) {
      return res.status(404).json({ message: 'Reseña no encontrada o no tienes permiso para compartirla.' });
    }

    // 2. Verificar que el usuario destino exista y esté aprobado
    const [userCheck] = await pool.query(
      'SELECT id FROM usuario WHERE id = ? AND estado_solicitud = "aprobado"',
      [usuario_destino_id]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ message: 'El usuario destinatario no existe o no está activo.' });
    }

    // 3. Verificar si ya fue compartida previamente con este mismo usuario
    const [alreadyShared] = await pool.query(
      'SELECT id FROM resena_compartida WHERE resena_id = ? AND usuario_destino_id = ?',
      [resena_id, usuario_destino_id]
    );

    if (alreadyShared.length > 0) {
      return res.status(400).json({ message: 'Esta reseña ya fue compartida previamente con este usuario.' });
    }

    // 4. Registrar la reseña compartida
    await pool.query(
      'INSERT INTO resena_compartida (resena_id, usuario_origen_id, usuario_destino_id) VALUES (?, ?, ?)',
      [resena_id, usuario_origen_id, usuario_destino_id]
    );

    res.status(201).json({ message: 'Reseña compartida exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al compartir la reseña.', error: error.message });
  }
};

// Obtener reseñas compartidas conmigo (Dashboard de Notificaciones)
exports.getSharedWithMe = async (req, res) => {
  const usuario_destino_id = req.user.id;

  try {
    const [sharedReviews] = await pool.query(
      `SELECT 
        rc.id AS compartida_id,
        rc.fecha_compartido,
        r.id AS resena_id,
        r.titulo_pelicula,
        r.calificacion,
        r.comentario,
        r.fecha_creacion,
        e.nombre AS etiqueta_nombre,
        u.nombre AS propietario_nombre,
        u.correo AS propietario_correo
      FROM resena_compartida rc
      JOIN resena r ON rc.resena_id = r.id
      JOIN usuario u ON rc.usuario_origen_id = u.id
      LEFT JOIN etiqueta e ON r.etiqueta_id = e.id
      WHERE rc.usuario_destino_id = ?
      ORDER BY rc.fecha_compartido DESC`,
      [usuario_destino_id]
    );

    res.status(200).json(sharedReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reseñas compartidas contigo.', error: error.message });
  }
};

// Obtener reseñas que yo he compartido con otros usuarios (Sección "Compartidas")
exports.getSharedByMe = async (req, res) => {
  const usuario_origen_id = req.user.id;

  try {
    const [sharedReviews] = await pool.query(
      `SELECT 
        rc.id AS compartida_id,
        rc.fecha_compartido,
        r.id AS resena_id,
        r.titulo_pelicula,
        r.calificacion,
        r.comentario,
        e.nombre AS etiqueta_nombre,
        u.nombre AS destinatario_nombre,
        u.correo AS destinatario_correo
      FROM resena_compartida rc
      JOIN resena r ON rc.resena_id = r.id
      JOIN usuario u ON rc.usuario_destino_id = u.id
      LEFT JOIN etiqueta e ON r.etiqueta_id = e.id
      WHERE rc.usuario_origen_id = ?
      ORDER BY rc.fecha_compartido DESC`,
      [usuario_origen_id]
    );

    res.status(200).json(sharedReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reseñas compartidas por ti.', error: error.message });
  }
};
