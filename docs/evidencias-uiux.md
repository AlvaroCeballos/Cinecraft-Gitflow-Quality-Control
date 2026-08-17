# Evidencias UI/UX de CineCraft

## Objetivo

Este documento organiza las capturas que demostrarán la aplicación de los seis principios de Jakob Nielsen seleccionados para CineCraft.

Las capturas deben obtenerse desde la aplicación en funcionamiento. No deben utilizarse imágenes simuladas, diseños externos ni pantallas con errores de conexión.

## Convención de archivos

Guardar las imágenes en:

```text
docs/img/uiux/
```

Utilizar nombres en minúsculas, sin espacios y con numeración correlativa.

## Matriz de evidencias

| N.º | Principio | Pantalla y acción que debe capturarse | Archivo esperado | Estado |
|---:|---|---|---|---|
| 1.1 | Visibilidad del estado del sistema | Inicio de sesión mientras el botón muestra `Iniciando...`. | `01-visibilidad-login.png` | Pendiente |
| 1.2 | Visibilidad del estado del sistema | Formulario de reseña mientras muestra `Guardando...` o mensaje de éxito. | `02-visibilidad-resena.png` | Pendiente |
| 2.1 | Prevención de errores | Formulario intentando guardar sin título o etiqueta y mostrando validación. | `03-prevencion-validacion.png` | Pendiente |
| 2.2 | Prevención de errores | Confirmación antes de eliminar una reseña. | `04-prevencion-eliminar.png` | Pendiente |
| 2.3 | Prevención de errores | Confirmación antes de archivar una reseña. | `05-prevencion-archivar.png` | Pendiente |
| 3.1 | Coincidencia con el mundo real | Tarjeta con estrellas de calificación, acción de eliminar y acción de archivar. | `06-mundo-real-iconos.png` | Pendiente |
| 4.1 | Control y libertad del usuario | Formulario de edición con el botón `Cancelar`. | `07-control-cancelar.png` | Pendiente |
| 4.2 | Control y libertad del usuario | Pestaña Archivadas mostrando la acción `Desarchivar`. | `08-control-desarchivar.png` | Pendiente |
| 5.1 | Consistencia y estándares | Dos pantallas mostrando el mismo uso de azul, rojo y gris en sus acciones. | `09-consistencia-colores.png` | Pendiente |
| 6.1 | Diseño estético y minimalista | Panel de reseñas con tarjetas, jerarquía visual y espacio en blanco. | `10-diseno-minimalista.png` | Pendiente |

## Criterios de aceptación

Cada captura debe cumplir lo siguiente:

- Mostrar claramente la acción o estado que se desea evidenciar.
- Evitar datos personales reales; utilizar cuentas y reseñas de prueba.
- No mostrar contraseñas, tokens, variables de entorno ni credenciales.
- Mantener un tamaño legible y sin recortes importantes.
- Ocultar elementos externos que no pertenezcan a CineCraft.
- Corresponder a una versión integrada en `develop`.
- Guardarse en formato PNG.

## Datos de prueba recomendados

Para que las pantallas sean comprensibles se recomienda preparar:

- Un administrador.
- Dos usuarios aprobados.
- Una solicitud pendiente.
- Una solicitud rechazada con motivo.
- Tres o más reseñas con distintas calificaciones y etiquetas.
- Una reseña destacada.
- Una reseña archivada.
- Una reseña compartida entre los usuarios de prueba.

No se deben reutilizar contraseñas personales en estas cuentas.
