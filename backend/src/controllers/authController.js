const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const [userCheck] = await pool.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    if (userCheck.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      'INSERT INTO usuario (nombre, correo, password_hash, rol, estado_solicitud) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, hashedPassword, 'usuario', 'pendiente']
    );

    res.status(201).json({ 
      message: 'Solicitud de registro enviada con éxito. Espera la aprobación del administrador.' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ message: 'Correo y contraseña requeridos.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    if (user.estado_solicitud === 'pendiente') {
      return res.status(403).json({ message: 'Tu cuenta aún está pendiente de aprobación por el administrador.' });
    }

    if (user.estado_solicitud === 'rechazado') {
      return res.status(403).json({ 
        message: `Tu solicitud fue rechazada. Motivo: ${user.motivo_rechazo || 'No especificado'}` 
      });
    }

    const token = jwt.sign(
      { id: user.id, correo: user.correo, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET || 'cinecraft_secret_key_2026',
      { expiresIn: '8h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor.', error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, correo, rol, estado_solicitud FROM usuario WHERE id = ?', [req.user.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil.', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { nombre, password } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio.' });
  }

  try {
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await pool.query('UPDATE usuario SET nombre = ?, password_hash = ? WHERE id = ?', [nombre, hashedPassword, req.user.id]);
    } else {
      await pool.query('UPDATE usuario SET nombre = ? WHERE id = ?', [nombre, req.user.id]);
    }

    res.status(200).json({ message: 'Perfil actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil.', error: error.message });
  }
};