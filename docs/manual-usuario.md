# Manual de Usuario de CineCraft

## 1. Introducción

CineCraft permite crear y organizar reseñas de películas, compartirlas con otros usuarios y consultar las reseñas recibidas. Las cuentas nuevas deben ser aprobadas por un administrador antes de iniciar sesión.

Existen dos tipos de usuario:

- **Usuario:** administra sus reseñas y las comparte.
- **Administrador:** gestiona solicitudes y consulta reportes de actividad.

## 2. Solicitar una cuenta

1. Abrir CineCraft y seleccionar **Registrarse**.
2. Completar **Nombre completo**, **Correo electrónico** y **Contraseña**.
3. Presionar **Enviar Solicitud**.
4. Esperar la revisión del administrador.

La aplicación mostrará un mensaje confirmando que la solicitud fue enviada. No será posible iniciar sesión mientras se encuentre pendiente.

El correo debe ser único. Si ya existe una cuenta con el mismo correo, la aplicación mostrará un mensaje de error.

## 3. Iniciar sesión

1. Seleccionar **Iniciar Sesión**.
2. Ingresar el correo y la contraseña registrados.
3. Presionar **Iniciar Sesión**.

Posibles resultados:

- **Cuenta aprobada:** se abre la aplicación.
- **Solicitud pendiente:** se informa que todavía debe ser revisada.
- **Solicitud rechazada:** se muestra el motivo registrado por el administrador.
- **Credenciales incorrectas:** se solicita verificar el correo y la contraseña.

## 4. Cerrar sesión

Presionar **Cerrar Sesión** en la barra superior. El token y los datos locales de la sesión serán eliminados y se mostrará nuevamente el inicio de sesión.

## 5. Administrar el perfil

1. Iniciar sesión.
2. Seleccionar **Mi Perfil** en la barra superior.
3. Modificar el nombre completo si es necesario.
4. Para cambiar la contraseña, escribir una nueva en el campo correspondiente. Si se deja vacío, se conserva la contraseña actual.
5. Presionar **Actualizar Perfil**.

El correo se muestra únicamente como referencia y no puede editarse desde esta pantalla.

## 6. Crear una reseña

1. Seleccionar **Mis Reseñas**.
2. Localizar el formulario **Nueva Reseña**.
3. Escribir el título de la película.
4. Elegir una calificación entre 1 y 5 estrellas.
5. Escribir un comentario, si se desea.
6. Seleccionar una etiqueta existente o presionar **+ Nueva** para escribir una etiqueta.
7. Presionar **Crear Reseña**.

El título y la etiqueta son obligatorios. Durante el guardado, el botón muestra el estado **Guardando...**.

## 7. Editar una reseña

1. Buscar la reseña en **Mis Reseñas**.
2. Presionar **Editar**.
3. Modificar el título, la calificación, el comentario o la etiqueta.
4. Presionar **Actualizar**.
5. Para salir sin guardar, presionar **Cancelar**.

Solo el propietario puede editar su reseña.

## 8. Eliminar una reseña

1. Presionar **Eliminar** en la tarjeta correspondiente.
2. Revisar el título mostrado en la confirmación.
3. Confirmar la eliminación.

La eliminación es permanente. Presionar **Cancelar** para conservar la reseña.

## 9. Destacar una reseña

Presionar la estrella ubicada en la tarjeta:

- `☆` marca la reseña como destacada.
- `★` quita la reseña de destacadas.

Las reseñas destacadas aparecen primero en la sección correspondiente del panel principal.

## 10. Archivar y restaurar una reseña

Para archivar:

1. Presionar **Archivar**.
2. Leer el mensaje de confirmación.
3. Confirmar la acción.

La reseña se mueve de la vista principal a la pestaña **Archivadas**. Para recuperarla, abrir esa pestaña y presionar **Desarchivar**.

## 11. Compartir una reseña

1. Buscar una reseña propia y presionar **Compartir**.
2. Esperar que se cargue la lista de usuarios activos.
3. Seleccionar un destinatario.
4. Presionar **Compartir** en la ventana de confirmación.

No es posible compartir una reseña con la misma cuenta ni enviarla más de una vez al mismo destinatario.

## 12. Consultar reseñas recibidas

Seleccionar **Compartidos Conmigo** en la barra superior. Cada tarjeta indica:

- Usuario que compartió la reseña.
- Fecha del envío.
- Título de la película.
- Calificación, etiqueta y comentario.

Si todavía no se ha recibido ninguna reseña, la aplicación mostrará un estado vacío.

## 13. Consultar reseñas enviadas

Seleccionar **Mis Compartidas**. La tabla muestra el historial de reseñas enviadas, el destinatario y la fecha en que se compartió cada una.

## 14. Funciones del administrador

Los accesos administrativos solamente aparecen cuando la sesión tiene el rol `administrador`.

### 14.1 Solicitudes pendientes

1. Seleccionar **Solicitudes pendientes**.
2. Revisar el nombre, correo y fecha de cada solicitud.
3. Elegir **Aceptar** o **Rechazar**.

Al aceptar se solicita una confirmación. Al rechazar se puede escribir un motivo y luego confirmar la acción. CineCraft intenta enviar al usuario una notificación por correo.

### 14.2 Historial de solicitudes

Seleccionar **Historial** para consultar las solicitudes resueltas. La tabla muestra:

- Nombre y correo del usuario.
- Fecha de solicitud.
- Fecha de resolución.
- Estado aprobado o rechazado.
- Motivo del rechazo, cuando corresponda.

### 14.3 Reportes Top 5

Seleccionar **Reportes Top 5**. Se muestran dos clasificaciones:

1. Los cinco usuarios aprobados con más reseñas creadas.
2. Los cinco usuarios aprobados que más reseñas han compartido.

Cada clasificación muestra la posición, el nombre, el correo y la cantidad acumulada. Si todavía no existe actividad, se presenta un mensaje informativo.

## 15. Mensajes y estados visuales

CineCraft comunica el resultado de las operaciones mediante:

- Textos de carga mientras se consulta o guarda información.
- Mensajes verdes para operaciones exitosas.
- Mensajes rojos cuando una operación falla.
- Confirmaciones antes de eliminar, archivar, aprobar o rechazar.
- Estados vacíos cuando una lista todavía no contiene información.

No se debe cerrar la página mientras un botón indique que una operación está en proceso.

## 16. Solución de problemas frecuentes

### No puedo iniciar sesión

- Confirmar que el correo y la contraseña sean correctos.
- Verificar que la solicitud haya sido aprobada.
- Si fue rechazada, revisar el motivo mostrado.

### No aparecen usuarios para compartir

Solo se muestran otros usuarios con solicitud aprobada. Debe existir al menos otra cuenta activa.

### Una operación muestra error de conexión

Comprobar que el backend esté activo y que el equipo tenga acceso a la base de datos configurada.

### No recibí el correo de aprobación o rechazo

Revisar la carpeta de correo no deseado. Si no aparece, informar al administrador para que verifique la configuración del servicio de correo.

### La sesión dejó de funcionar

El token de acceso tiene una duración limitada. Cerrar la sesión e ingresar nuevamente.

## 17. Recomendaciones de seguridad

- No compartir la contraseña ni el token de sesión.
- Cerrar sesión en computadoras compartidas.
- Utilizar una contraseña que no se use en otros servicios.
- No incluir datos sensibles en los comentarios de las reseñas.
