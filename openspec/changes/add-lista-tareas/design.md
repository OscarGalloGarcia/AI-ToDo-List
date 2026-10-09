# Design

## Context

Es un proyecto nuevo: no hay código existente, ni herramientas de build, ni dependencias. La página tiene que funcionar abriendo `index.html` directamente en el navegador (protocolo `file://`), sin servidor. La motivación está en proposal.md y el comportamiento en `specs/lista-tareas/spec.md`.

## Goals / Non-Goals

**Goals:**
- Código pequeño y legible que sirva de ejemplo: tres archivos y ningún paso previo.
- Un único flujo de datos fácil de seguir: evento, cambio de estado, guardado y render.

**Non-Goals:**
- Pruebas automatizadas o un runner de tests: la validación es manual, siguiendo los escenarios del spec.
- Compatibilidad con navegadores antiguos (se asume ES2017 o posterior).
- Accesibilidad más allá de usar los elementos nativos (`<form>`, `<input type="checkbox">`, `<button>`).

## Decisions

### 1. Estado en memoria y render completo
`app.js` guarda un array `tareas = [{ id, texto, hecha }]`. Cada acción modifica el array, llama a `guardar()` y después a `render()`, que reconstruye el `<ul>` entero.
- *Alternativa:* modificar el DOM de forma incremental. Se descarta porque mantener el DOM sincronizado a mano produce más errores, y con decenas de tareas reconstruir la lista no tiene coste apreciable.

### 2. Un `<form>` para agregar
El campo y el botón van dentro de un `<form>` y se escucha el evento `submit` con `preventDefault()`. Así el botón y Enter funcionan igual sin código extra.

### 3. Delegación de eventos en la lista
Hay un solo listener en el `<ul>` que identifica la tarea por un `data-id` en el `<li>` y distingue entre el checkbox (`change`) y el botón de borrar (`click`). Esto evita tener que volver a enganchar listeners en cada render.

### 4. Identificador de tarea
Se usa `id` creado con `crypto.randomUUID()`, con `Date.now()` + contador como alternativa si no está disponible (en algunos navegadores `randomUUID` exige un contexto seguro, y `file://` puede no serlo). No se usa el índice como identificador porque cambia al borrar.

### 5. Persistencia
Se guarda una única clave `localStorage["lista-tareas"]` con el JSON del array, y se escribe completa en cada cambio. Al cargar, se lee dentro de `try/catch`. Si el `JSON.parse` falla, el resultado no es un array o el acceso a `localStorage` lanza un error, se empieza con `[]`. Los elementos sin `texto` de tipo string se descartan.
- *Alternativa:* IndexedDB. Es excesivo para este volumen de datos y su API es asíncrona.

### 6. Seguridad del texto
El texto de cada tarea se asigna con `textContent` y nunca con `innerHTML`, para evitar inyectar HTML.

## Risks / Trade-offs

- [`localStorage` no disponible o lleno (modo privado, cuota)] → Las escrituras van envueltas en `try/catch`: la app sigue funcionando en memoria aunque no persista.
- [Los datos dependen del origen: en `file://`, cada navegador puede tratarlo distinto] → Se documenta en un comentario. Está aceptado para un ejemplo.
- [Render completo con miles de tareas] → No es un caso realista aquí y no se optimiza.
