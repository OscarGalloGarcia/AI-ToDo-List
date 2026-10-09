# Proposal

## Why

El proyecto no tiene ninguna funcionalidad todavía. Queremos una lista de tareas mínima, sin dependencias ni proceso de build, que sirva como ejemplo de punta a punta del flujo OpenSpec y que también se pueda usar de verdad: abrir `index.html` en el navegador y gestionar tareas que no se pierdan al recargar.

## What Changes

- Nueva página `index.html` con un campo de texto y un botón para agregar tareas.
- Nuevo script `app.js` en JavaScript puro (sin frameworks) que gestiona el estado de las tareas y vuelve a renderizar la lista.
- Cada tarea se puede marcar o desmarcar como hecha y se puede borrar.
- Las tareas se guardan en `localStorage` y se restauran al cargar la página.
- Se rechazan las tareas vacías o formadas solo por espacios.
- Hoja de estilos mínima `styles.css` para que la lista se lea bien (las tareas hechas aparecen tachadas).

Fuera de alcance: editar el texto de una tarea, filtros, ordenar, sincronizar entre dispositivos, confirmación al borrar.

## Capabilities

### New Capabilities
- `lista-tareas`: gestión de tareas en el navegador (agregar, marcar como hecha, borrar) con persistencia local en `localStorage`.

### Modified Capabilities

_Ninguna._

## Impact

- Archivos nuevos en la raíz del proyecto: `index.html`, `app.js`, `styles.css`.
- Sin dependencias externas, sin build y sin servidor: basta con abrir el archivo en un navegador moderno.
- Los datos viven solo en el `localStorage` del navegador y del origen donde se abra la página.
