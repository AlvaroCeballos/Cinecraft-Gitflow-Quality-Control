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

## 9. Modelo de datos

### `usuario`

Almacena identidad, credenciales, rol y estado de cada solicitud. Los estados permitidos son `pendiente`, `aprobado` y `rechazado`. `fecha_solicitud` registra el alta y `fecha_resolucion` permite construir el historial administrativo.

### `etiqueta`

Catálogo reutilizable para clasificar las reseñas. El nombre de cada etiqueta es único.

### `resena`

Pertenece a un usuario y una etiqueta. Guarda título, calificación de 1 a 5, comentario, fecha de creación y los indicadores `destacada` y `archivada`.

### `resena_compartida`

Relaciona una reseña con el usuario que la envía y el usuario que la recibe. `fecha_compartido` permite ordenar el historial de intercambios.

```text
usuario 1 ─── N resena N ─── 1 etiqueta
   │              │
   └── N resena_compartida N ┘
```

El diagrama completo se encuentra en `docs/img/erd-cinecraft.png`.

## 10. API REST

La URL base predeterminada es `http://localhost:5000/api`.

### Autenticación y perfil

| Método | Ruta | Autenticación | Descripción |
|---|---|---|---|
| `POST` | `/auth/register` | No | Crea una solicitud de registro pendiente. |
| `POST` | `/auth/login` | No | Valida credenciales y devuelve un JWT. |
| `GET` | `/auth/profile` | JWT | Consulta el perfil autenticado. |
| `PUT` | `/auth/profile` | JWT | Actualiza nombre y, opcionalmente, contraseña. |

### Reseñas y etiquetas

| Método | Ruta | Autenticación | Descripción |
|---|---|---|---|
| `POST` | `/reviews` | JWT | Crea una reseña. |
| `GET` | `/reviews` | JWT | Lista las reseñas propias. |
| `GET` | `/reviews/:id` | JWT | Consulta una reseña propia. |
| `PUT` | `/reviews/:id` | JWT | Modifica una reseña propia. |
| `DELETE` | `/reviews/:id` | JWT | Elimina una reseña propia. |
| `PATCH` | `/reviews/:id/destacar` | JWT | Alterna el estado destacado. |
| `PATCH` | `/reviews/:id/archivar` | JWT | Alterna el estado archivado. |
| `GET` | `/reviews/tags/all` | JWT | Lista las etiquetas disponibles. |
| `POST` | `/reviews/tags/create` | JWT | Crea una etiqueta. |

### Reseñas compartidas

| Método | Ruta | Autenticación | Descripción |
|---|---|---|---|
| `GET` | `/share/users` | JWT | Lista usuarios disponibles para compartir. |
| `POST` | `/share` | JWT | Comparte una reseña propia. |
| `GET` | `/share/received` | JWT | Lista reseñas recibidas. |
| `GET` | `/share/sent` | JWT | Lista reseñas enviadas. |

### Administración

Todas estas rutas requieren JWT y rol `administrador`.

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/admin/pending` | Lista solicitudes pendientes. |
| `GET` | `/admin/history` | Lista solicitudes aprobadas y rechazadas. |
| `PUT` | `/admin/accept/:id` | Aprueba una solicitud y envía correo. |
| `PUT` | `/admin/reject/:id` | Rechaza una solicitud y envía correo. |
| `GET` | `/admin/reports/top-reviewers` | Devuelve los cinco usuarios con más reseñas. |
| `GET` | `/admin/reports/top-sharers` | Devuelve los cinco usuarios que más comparten. |

## 11. Autenticación y autorización

1. El usuario envía correo y contraseña a `/auth/login`.
2. El backend verifica el hash con `bcryptjs` y comprueba que la solicitud esté aprobada.
3. Se firma un JWT con identificador, correo, rol y nombre.
4. El frontend guarda el token y lo agrega como `Authorization: Bearer <token>` mediante un interceptor de Axios.
5. `authMiddleware.js` valida la firma y coloca los datos en `req.user`.
6. Para las rutas administrativas, `requireAdmin.js` comprueba que `req.user.rol` sea `administrador`.

En ambientes compartidos o de producción, `JWT_SECRET` debe configurarse obligatoriamente con un valor seguro y no debe dependerse del valor de respaldo incluido para desarrollo.

## 12. Rutas del frontend

| Ruta | Pantalla |
|---|---|
| `/login` | Inicio de sesión. |
| `/register` | Solicitud de registro. |
| `/profile` | Edición de perfil. |
| `/reviews` | Gestión de reseñas activas, destacadas y archivadas. |
| `/shared-with-me` | Reseñas recibidas. |
| `/shared-by-me` | Historial de reseñas enviadas. |
| `/admin/requests` | Solicitudes pendientes. |
| `/admin/requests/history` | Historial de solicitudes resueltas. |
| `/admin/reports` | Reportes Top 5. |

## 13. Verificación y mantenimiento

### Comprobar sintaxis del backend

```bash
node --check backend/src/controllers/adminController.js
node --check backend/src/routes/adminRoutes.js
```

### Revisar el frontend

```bash
cd frontend
npm run lint
npm run build
```

El proyecto todavía no define una suite automatizada de pruebas en sus archivos `package.json`. Antes de publicar una versión se recomienda agregar pruebas de controladores, autorización, consultas y componentes críticos.

### Verificación manual mínima

1. Registrar un usuario y confirmar que quede pendiente.
2. Ingresar como administrador y aprobar o rechazar la solicitud.
3. Iniciar sesión con un usuario aprobado.
4. Crear, editar, destacar, archivar y eliminar una reseña.
5. Compartir una reseña y comprobar las vistas de enviados y recibidos.
6. Consultar el historial administrativo.
7. Confirmar los dos reportes Top 5 contra los datos almacenados.

## 14. Gitflow del proyecto

- `main`: versiones estables etiquetadas.
- `develop`: integración de las próximas funcionalidades.
- `feature/<nombre>_<carnet>`: desarrollo de una funcionalidad.
- `hotfix/<nombre>_<carnet>`: correcciones urgentes creadas desde `main`.
- `release/<version>`: preparación de una publicación.

Cada feature debe crearse desde `develop` actualizado, contener commits pequeños con Conventional Commits e integrarse nuevamente mediante merge o pull request.
