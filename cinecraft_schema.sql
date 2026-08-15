
CREATE DATABASE IF NOT EXISTS cinecraft;
USE cinecraft;

-- Usuarios (estándar y administrador). El admin se precarga con
-- rol = 'administrador' y estado_solicitud = 'aprobado'.
CREATE TABLE usuario (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    nombre            VARCHAR(100) NOT NULL,
    correo            VARCHAR(150) NOT NULL UNIQUE,
    password_hash     VARCHAR(255) NOT NULL,
    rol               ENUM('usuario', 'administrador') NOT NULL DEFAULT 'usuario',
    estado_solicitud  ENUM('pendiente', 'aprobado', 'rechazado') NOT NULL DEFAULT 'pendiente',
    motivo_rechazo    VARCHAR(255) NULL,
    fecha_solicitud   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion  DATETIME NULL
);

-- Catálogo de etiquetas/géneros, reutilizable entre resenas
CREATE TABLE etiqueta (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    nombre  VARCHAR(50) NOT NULL UNIQUE
);

-- Resenas de películas
CREATE TABLE resena (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id        INT NOT NULL,
    etiqueta_id       INT NOT NULL,
    titulo_pelicula   VARCHAR(200) NOT NULL,
    calificacion      TINYINT NOT NULL,
    comentario        TEXT,
    destacada         BOOLEAN NOT NULL DEFAULT FALSE,
    archivada         BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_creacion    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resena_usuario  FOREIGN KEY (usuario_id)  REFERENCES usuario(id),
    CONSTRAINT fk_resena_etiqueta FOREIGN KEY (etiqueta_id) REFERENCES etiqueta(id),
    CONSTRAINT chk_calificacion   CHECK (calificacion BETWEEN 1 AND 5)
);

-- Resenas compartidas entre usuarios (alimenta el dashboard
-- "Compartidos conmigo", la sección "Compartidas" y el reporte Top 5)
CREATE TABLE resena_compartida (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    resena_id           INT NOT NULL,
    usuario_origen_id   INT NOT NULL,
    usuario_destino_id  INT NOT NULL,
    fecha_compartido    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_compartida_resena  FOREIGN KEY (resena_id)          REFERENCES resena(id),
    CONSTRAINT fk_compartida_origen  FOREIGN KEY (usuario_origen_id)  REFERENCES usuario(id),
    CONSTRAINT fk_compartida_destino FOREIGN KEY (usuario_destino_id) REFERENCES usuario(id)
);

-- Pre-carga de usuario administrador
INSERT INTO usuario (nombre, correo, password_hash, rol, estado_solicitud)
VALUES ('Administrador', 'admin@cinecraft.com', '$2a$10$HbbIp5CX3KaKuLCTcPGz8unXP8T/M0HF1wW2w0EmLylTctiuDEWee', 'administrador', 'aprobado');

-- Reportes Top 5 (para el módulo administrador)
-- Top 5 usuarios con más reseñas:
--   SELECT u.nombre, COUNT(r.id) AS total_resenas
--   FROM usuario u JOIN resena r ON r.usuario_id = u.id
--   GROUP BY u.id ORDER BY total_resenas DESC LIMIT 5;
--
-- Top 5 usuarios con más reseñas compartidas:
--   SELECT u.nombre, COUNT(rc.id) AS total_compartidas
--   FROM usuario u JOIN resena_compartida rc ON rc.usuario_origen_id = u.id
--   GROUP BY u.id ORDER BY total_compartidas DESC LIMIT 5;
