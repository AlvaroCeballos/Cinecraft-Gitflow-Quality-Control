# Manual Técnico de CineCraft

## 1. Información general

**CineCraft** es una aplicación web para registrar, organizar y compartir reseñas de películas. Incluye autenticación mediante JWT, aprobación administrativa de usuarios, CRUD de reseñas, etiquetas, funciones de destacar y archivar, intercambio de reseñas y reportes administrativos.

La solución utiliza una arquitectura cliente-servidor:

- **Frontend:** React, React Router, Axios, Vite y Tailwind CSS.
- **Backend:** Node.js, Express y CommonJS.
- **Base de datos:** MySQL mediante `mysql2/promise`.
- **Autenticación:** JSON Web Tokens y contraseñas protegidas con `bcryptjs`.
- **Correo:** Nodemailer para notificar la aprobación o el rechazo de solicitudes.

## 2. Estructura del proyecto

```text
.
├── backend/
│   ├── package.json
│   └── src/
│       ├── config/          # Conexión con MySQL
│       ├── controllers/     # Reglas de negocio y consultas
│       ├── middlewares/     # Validación JWT y rol administrador
│       ├── routes/          # Endpoints de la API REST
│       ├── utils/           # Servicio de correo
│       └── server.js        # Entrada del servidor Express
├── docs/                    # Diagramas, principios y manuales
├── frontend/
│   ├── package.json
│   └── src/
│       ├── components/      # Componentes reutilizables
│       ├── pages/           # Pantallas de la aplicación
│       ├── services/        # Clientes HTTP con Axios
│       ├── App.jsx          # Enrutamiento principal
│       └── main.jsx         # Entrada de React
└── cinecraft_schema.sql     # Creación y precarga de la base
```

## 3. Requisitos de ejecución

Antes de iniciar el proyecto se necesita:

- Git.
- Node.js y npm compatibles con los archivos `package-lock.json`.
- MySQL 8 o una versión compatible.
- Una cuenta o servidor SMTP para las notificaciones de correo.
- Puertos locales disponibles: `5000` para la API y el asignado por Vite para el frontend.

## 4. Instalación

### 4.1 Obtener el código

```bash
git clone https://github.com/YACG-05/-AYD1-Practica2S2026_A_G4.git
cd -AYD1-Practica2S2026_A_G4
```

Para trabajar con la versión de integración:

```bash
git switch develop
git pull --ff-only origin develop
```

### 4.2 Instalar dependencias

```bash
cd backend
npm ci

cd ../frontend
npm ci
```

`npm ci` utiliza las versiones registradas en cada `package-lock.json` y permite instalaciones reproducibles.

## 5. Configuración de la base de datos

Ejecutar el archivo `cinecraft_schema.sql` en una instancia MySQL. El script realiza estas acciones:

1. Crea la base `cinecraft`.
2. Crea las tablas `usuario`, `etiqueta`, `resena` y `resena_compartida`.
3. Define llaves foráneas y restricciones.
4. Precarga el usuario administrador.

Ejemplo con el cliente de MySQL:

```bash
mysql -u root -p < cinecraft_schema.sql
```

## 6. Variables de entorno

Crear `backend/.env`. Este archivo es local, contiene información sensible y no debe incluirse en Git.

```dotenv
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=usuario_mysql
DB_PASSWORD=contrasena_mysql
DB_NAME=cinecraft

JWT_SECRET=secreto_largo_y_aleatorio

MAILTRAP_HOST=servidor_smtp_de_mailtrap
MAILTRAP_PORT=2525
MAILTRAP_USER=usuario_de_mailtrap
MAILTRAP_PASS=contrasena_de_mailtrap
```

Estas variables son consumidas por `backend/src/utils/mailer.js`.

## 7. Ejecución local

### Backend

```bash
cd backend
npm run dev
```

La API queda disponible por defecto en `http://localhost:5000/api`.

### Frontend

En otra terminal:

```bash
cd frontend
npm run dev
```

Abrir en el navegador la dirección que muestre Vite.

## 8. Compilación del frontend

```bash
cd frontend
npm run build
```

Los archivos de producción se generan en `frontend/dist/`.
