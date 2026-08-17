const db = require('../config/db'); // Ajusta la ruta si es necesario
const { sendStatusEmail } = require('../utils/mailer');

// 1. Obtener todos los usuarios con estado "pendiente"
const getPendingRequests = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nombre, correo, fecha_solicitud FROM usuario WHERE estado_solicitud = "pendiente"'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener solicitudes pendientes' });
  }
};

// Obtener el historial de solicitudes que ya fueron resueltas
const getRequestHistory = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
        id,
        nombre,
        correo,
        estado_solicitud,
        motivo_rechazo,
        fecha_solicitud,
        fecha_resolucion
      FROM usuario
      WHERE rol = "usuario"
        AND estado_solicitud IN ("aprobado", "rechazado")
      ORDER BY fecha_resolucion DESC, fecha_solicitud DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el historial de solicitudes' });
  }
};

// 2. Aceptar usuario
const acceptRequest = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar correo del usuario para enviarle la notificación
    const [users] = await db.query('SELECT correo FROM usuario WHERE id = ?', [id]);
    if (users.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Actualizar estado
    await db.query(
      'UPDATE usuario SET estado_solicitud = "aprobado", fecha_resolucion = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );

    // Enviar correo
    await sendStatusEmail(users[0].correo, 'aprobado');

    res.json({ message: 'Usuario aprobado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al aprobar usuario' });
  }
};

// 3. Rechazar usuario
const rejectRequest = async (req, res) => {
  const { id } = req.params;
  const { motivo } = req.body;
  try {
    // Buscar correo del usuario
    const [users] = await db.query('SELECT correo FROM usuario WHERE id = ?', [id]);
    if (users.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Actualizar estado y motivo
    await db.query(
      'UPDATE usuario SET estado_solicitud = "rechazado", motivo_rechazo = ?, fecha_resolucion = CURRENT_TIMESTAMP WHERE id = ?',
      [motivo, id]
    );

    // Enviar correo
    await sendStatusEmail(users[0].correo, 'rechazado', motivo);

    res.json({ message: 'Usuario rechazado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al rechazar usuario' });
  }
};

module.exports = {
  getPendingRequests,
  getRequestHistory,
  acceptRequest,
  rejectRequest
};
