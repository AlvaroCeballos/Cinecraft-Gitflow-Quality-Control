const nodemailer = require('nodemailer');

// Configuración de transporte usando Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendStatusEmail = async (to, status, motivo = null) => {
  try {
    let subject = '';
    let htmlContent = '';

    if (status === 'aprobado') {
      subject = '¡Tu cuenta en CineCraft ha sido aprobada!';
      htmlContent = `
        <h2>¡Bienvenido a CineCraft!</h2>
        <p>Tu solicitud de registro ha sido revisada y <strong>aprobada</strong> por un administrador.</p>
        <p>Ya puedes iniciar sesión en la plataforma y comenzar a gestionar y compartir tus reseñas.</p>
      `;
    } else if (status === 'rechazado') {
      subject = 'Actualización sobre tu registro en CineCraft';
      htmlContent = `
        <h2>Actualización de tu solicitud</h2>
        <p>Lamentamos informarte que tu solicitud de registro ha sido <strong>rechazada</strong>.</p>
        ${motivo ? `<p><strong>Motivo:</strong> ${motivo}</p>` : ''}
      `;
    }

    await transporter.sendMail({
      from: '"CineCraft Admin" <admin@cinecraft.com>',
      to: to,
      subject: subject,
      html: htmlContent
    });

    console.log(`Correo enviado a ${to} - Estado: ${status}`);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = { sendStatusEmail };