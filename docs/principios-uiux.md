# CineCraft — Selección de principios de usabilidad (Jakob Nielsen)

## Introducción

De los 10 principios heurísticos de Jakob Nielsen, el equipo seleccionó los siguientes 6 para aplicar en CineCraft. La elección prioriza los principios que se pueden implementar y evidenciar con detalles concretos de código (validaciones, confirmaciones, iconografía, espaciado), en lugar de los más abstractos.

## Principios seleccionados

### 1. Visibilidad del estado del sistema

**Justificación:** El usuario nunca debe quedarse esperando sin saber si su acción se está procesando. Es especialmente importante en operaciones que dependen de la base de datos (guardar reseña, iniciar sesión) o de un servicio externo (envío de correo al aceptar/rechazar solicitudes).

**Cómo se aplica:**
- Spinner o texto "Cargando..." al dar clic en "Iniciar sesión" o "Guardar reseña"
- Confirmación visual (toast o mensaje) tras destacar, archivar o compartir una reseña

**Evidencia de aplicación:** seguimiento y archivos requeridos en [`evidencias-uiux.md`](evidencias-uiux.md).

### 2. Prevención de errores

**Justificación:** El enunciado exige validar que el título de la película no esté vacío y confirmar antes de eliminar. Prevenir el error antes de que ocurra es mejor que solo mostrarlo después.

**Cómo se aplica:**
- Botón "Guardar" deshabilitado mientras `titulo_pelicula` esté vacío
- Modal de confirmación antes de eliminar una reseña
- Confirmación también antes de archivar (acción reversible, pero saca la reseña de la vista principal)

**Evidencia de aplicación:** seguimiento y archivos requeridos en [`evidencias-uiux.md`](evidencias-uiux.md).

### 3. Coincidencia entre el sistema y el mundo real

**Justificación:** CineCraft maneja conceptos cotidianos (calificar, archivar, eliminar) que ya tienen una representación visual reconocible fuera del software. Usarla reduce la curva de aprendizaje.

**Cómo se aplica:**
- Ícono de estrella para `calificacion` (1 a 5)
- Ícono de basurero para eliminar
- Ícono de archivador/caja para `archivada`

**Evidencia de aplicación:** seguimiento y archivos requeridos en [`evidencias-uiux.md`](evidencias-uiux.md).

### 4. Control y libertad del usuario

**Justificación:** Toda acción de escritura en CineCraft (crear, modificar, eliminar, archivar) necesita una salida clara para que el usuario no se sienta atrapado en un flujo, y las acciones no destructivas (destacar/archivar) deben poder revertirse sin fricción.

**Cómo se aplica:**
- Botón gris "Cancelar" junto a cada botón principal de acción en los formularios
- `destacada` y `archivada` se pueden desmarcar/desarchivar en cualquier momento, no son decisiones permanentes

**Evidencia de aplicación:** seguimiento y archivos requeridos en [`evidencias-uiux.md`](evidencias-uiux.md).

### 5. Consistencia y estándares

**Justificación:** Con 6 integrantes desarrollando pantallas distintas en paralelo (Fase 2 y Fase 5 del cronograma), una paleta y una iconografía fijas desde el inicio evitan que cada vista se vea como una app distinta.

**Paleta de colores propuesta (Tailwind):**

| Uso | Color | Clase Tailwind aproximada |
|---|---|---|
| Acciones primarias (Guardar, Compartir, Aceptar) | Azul | `bg-blue-600` |
| Acciones destructivas (Eliminar, Rechazar) | Rojo | `bg-red-600` |
| Acciones secundarias (Cancelar, Atrás) | Gris | `bg-gray-500` |

**Cómo se aplica:**
- Los 3 colores de la tabla se usan exactamente igual en todas las pantallas del sistema, sin variaciones
- Misma iconografía (principio 3) en todas las vistas donde aparezca la misma acción

**Evidencia de aplicación:** seguimiento y archivos requeridos en [`evidencias-uiux.md`](evidencias-uiux.md).

### 6. Diseño estético y minimalista

**Justificación:** El dashboard principal puede llegar a mostrar muchas reseñas a la vez (propias, destacadas, archivadas, compartidas). Sin espacio en blanco y jerarquía visual clara, se vuelve difícil de escanear.

**Cómo se aplica:**
- Espacio en blanco entre tarjetas de reseña en el dashboard
- Cada tarjeta muestra solo lo esencial (título, calificación, etiqueta); el comentario completo se ve al entrar al detalle
- Sin elementos decorativos que no aporten información

**Evidencia de aplicación:** seguimiento y archivos requeridos en [`evidencias-uiux.md`](evidencias-uiux.md).

