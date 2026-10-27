# CineCraft — Sistema Web de Gestión con Control de Calidad GitFlow y Auditoría
> **Portafolio de Validación Funcional, Gestión de Versiones (GitFlow), Solución de Incidencias (Hotfix) y Consultas SQL**  
> Aplicación Full-Stack desarrollada bajo un flujo estricto de control de calidad en **GitFlow**, integrando validación de operaciones CRUD, auditoría administrativa de cuentas, reportería analítica en SQL y evaluación heurística de usabilidad (Jakob Nielsen).

[![GitFlow Workflow](https://img.shields.io/badge/Workflow-GitFlow%20Strict-F05032?logo=git)](https://github.com/AlvaroCeballos/Cinecraft-Gitflow-Quality-Control)
[![Releases](https://img.shields.io/badge/Releases-v1.0.0%20%7C%20v2.0.0%20%7C%20v2.0.1-brightgreen?logo=github)](https://github.com/AlvaroCeballos/Cinecraft-Gitflow-Quality-Control/tags)
[![Commits](https://img.shields.io/badge/Commits-Conventional%20Commits-blue)](https://www.conventionalcommits.org/)
[![Database](https://img.shields.io/badge/Database-Relational%20SQL-orange?logo=mysql)](cinecraft_schema.sql)
[![UI/UX](https://img.shields.io/badge/UI%2FUX-Jakob%20Nielsen%20Heuristics-purple)](docs/)

---

## Rol en el Proyecto — Álvaro Ceballos

* **Rol Desempeñado:** Líder de Proyecto, Administrador de Versiones (Release Manager) & Responsable de Validación Funcional.
* **Control de Calidad en Integración (Filtro Técnico):** Coordinación del flujo colaborativo bajo GitFlow, actuando como el filtro principal de calidad responsable de revisar, probar e integrar las ramas `feature` desarrolladas por el equipo de 6 ingenieros, garantizando la ausencia de errores lógicos y cero conflictos de merge a lo largo de 75 commits y 18 ramas.
* **Gestión de Incidencias Críticas en Producción (Hotfix):** Aislamiento y resolución de fallos en el entorno productivo (`main`), realizando pruebas de verificación (*re-testing*) tras la corrección y gestionando el etiquetado de versiones estables (`v2.0.1`) con sincronización hacia `develop`.
* **Diseño de Base de Datos y Reportería SQL:** Estructuración de las tablas relacionales, control de integridad referencial, scripts de precarga de cuentas y elaboración de consultas complejas para reportes analíticos.

---

## 1. Mapa de Competencias y Evidencias en el Repositorio

| Área de Competencia | Evidencia Técnica Aplicada | Ubicación en el Repositorio |
| :--- | :--- | :--- |
| **Estrategia GitFlow & Releases** | Manejo de ramas `main`, `develop`, `feature/nombre_#carnet`, `release` y `hotfix` con tags semánticos. | Historial de Ramas / Tags y [`docs/`](docs/) |
| **Base de Datos y Scripts SQL** | Esquema relacional normalizado, precarga de credenciales de administrador y persistencia transaccional. | [`cinecraft_schema.sql`](cinecraft_schema.sql) |
| **Validación de API & Reportes SQL** | Endpoints REST para operaciones CRUD, flujos de compartición y consultas agregadas para el **Top 5**. | [`backend/`](backend/) |
| **Validación Funcional Frontend** | Interfaz con validaciones en tiempo real, prevención de errores, confirmaciones modales y control de sesión. | [`frontend/`](frontend/) |
| **Documentación Técnica y ERD** | Manual Técnico con Diagrama Entidad-Relación (ERD), Manual de Usuario paso a paso y matriz de Jakob Nielsen. | [`docs/`](docs/) |

---

## 2. Alcance Funcional y Reglas de Negocio Validadas

El sistema implementa y verifica reglas de negocio estructuradas en dos roles (**Usuario Estándar** y **Administrador**):

### 2.1. Módulo de Usuario y Colaboración
* **Autenticación y Seguridad de Sesión:** Registro con validación de formato de correo electrónico, control de duplicidad, confirmación de contraseña y protección de rutas contra accesos no autorizados.
* **Validación de Operaciones CRUD de Reseñas:** Creación, lectura, edición y eliminación de reseñas (título obligatorio, calificación de 1 a 5 estrellas, comentario y creación/selección dinámica de etiquetas por género), incluyendo diálogo modal de confirmación previo a eliminaciones destructivas.
* **Gestión de Estados Avanzados:** Validación de persistencia en base de datos al marcar/desmarcar reseñas como **Destacadas** (visibles en el panel superior) y **Archivadas** (ocultas del flujo principal con opción de desarchivar).
* **Flujo de Compartición entre Usuarios:** Búsqueda de destinatarios registrados, envío de reseñas con conservación de autoría original, indicador visual en el panel de *"Compartidos Conmigo"* del receptor y trazabilidad en la sección *"Compartidas"* del propietario.

### 2.2. Módulo Administrador, Auditoría y Reportería SQL
* **Flujo de Aprobación y Rechazo de Cuentas:** Revisión de solicitudes de registro pendientes con activación o bloqueo de acceso en base de datos y disparo automático de notificaciones por correo electrónico.
* **Historial de Auditoría:** Registro persistente de todas las solicitudes procesadas (aceptadas y rechazadas con motivo) para trazabilidad y control administrativo.
* **Consultas Analíticas SQL (Reportes Top 5):** Elaboración y validación de consultas agregadas en base de datos para generar en tiempo real:
  1. **Top 5 de usuarios con mayor cantidad de reseñas registradas.**
  2. **Top 5 de usuarios con mayor cantidad de reseñas compartidas.**

---

## 3. Ciclo de Vida de Calidad, Gestión de Incidencias y Usabilidad

### 3.1. Control de Versiones y Pruebas de Verificación (Hotfix)
* **Conventional Commits:** Estandarización del historial mediante prefijos semánticos (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`) para trazabilidad de cambios.
* **Flujo de Releases (`v1.0.0` y `v2.0.0`):** Congelamiento de funcionalidades en ramas `release`, ejecución de pruebas funcionales integrales y fusión controlada hacia `main` y `develop`.
* **Resolución de Incidencias en Producción (`Hotfix`):** Ante la detección de un fallo en la rama principal, se bifurcó una rama `hotfix` directamente desde `main`, se aplicó la corrección, se ejecutaron pruebas de verificación (*re-testing*) para confirmar la ausencia de regresiones y se liberó el tag `v2.0.1` sincronizando tanto `main` como `develop`.

### 3.2. Prevención y Diagnóstico de Errores (Heurísticas de Jakob Nielsen)
Se evaluó y documentó la interfaz bajo los principios de usabilidad de Jakob Nielsen, destacando:
1. **Prevención de errores:** Validaciones de campos obligatorios en tiempo real y modales de confirmación antes de acciones críticas.
2. **Visibilidad del estado del sistema:** Alertas claras de carga, confirmación de éxito en operaciones CRUD y estado de sesión activa.
3. **Ayuda para reconocer, diagnosticar y recuperarse de errores:** Mensajes de error específicos en login, registro y formularios sin exponer trazas técnicas al usuario final.

---

## 4. Despliegue y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/AlvaroCeballos/Cinecraft-Gitflow-Quality-Control.git](https://github.com/AlvaroCeballos/Cinecraft-Gitflow-Quality-Control.git)
   cd Cinecraft-Gitflow-Quality-Control
   ```
2. **Inicializar la Base de Datos SQL:**
   Ejecutar el script [`cinecraft_schema.sql`](cinecraft_schema.sql) en su gestor de base de datos relacional para crear las tablas, relaciones y precargar la cuenta de Administrador.
3. **Iniciar el Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
4. **Iniciar el Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```