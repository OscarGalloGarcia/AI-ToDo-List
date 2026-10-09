# Tasks

## 1. Estructura de la página

- [x] 1.1 Crear `index.html` con un `<form>` (input de texto + botón "Agregar"), un `<ul>` vacío para la lista, un elemento para el mensaje "No hay tareas", enlace a `styles.css` y `<script src="app.js" defer>`; verificar que al abrirlo en el navegador se ve el formulario sin errores en la consola
- [x] 1.2 Crear `styles.css` mínimo (layout centrado, tarea hecha con `text-decoration: line-through`); verificar que la página se ve legible en escritorio y en ancho de móvil

## 2. Estado, render y agregar

- [x] 2.1 En `app.js`, definir el array `tareas`, la generación de `id` (con `crypto.randomUUID()` y un fallback) y `render()`, que reconstruye el `<ul>` usando `textContent` y muestra u oculta el mensaje de vacío; verificar con `tareas` precargado a mano desde la consola que se pinta correctamente
- [x] 2.2 Manejar el `submit` del formulario: recortar espacios, ignorar el texto vacío o hecho solo de espacios, agregar la tarea al final, vaciar el input y renderizar; verificar los escenarios "Agregar con el botón", "Agregar con Enter", "Recortar espacios", "Texto vacío", "Solo espacios" y "Desaparece al agregar" del spec

## 3. Marcar y borrar

- [x] 3.1 Añadir en cada `<li>` (con `data-id`) un checkbox y un botón "Borrar", con un único listener delegado en el `<ul>`; verificar que el listener no se duplica tras varios renders (una sola acción por clic)
- [x] 3.2 Alternar `hecha` al cambiar el checkbox; verificar los escenarios "Marcar como hecha" y "Desmarcar"
- [x] 3.3 Borrar la tarea por `id` al pulsar "Borrar", sin confirmación; verificar el escenario "Borrar una tarea" (A, B, C → borrar B → A, C)

## 4. Persistencia

- [x] 4.1 Implementar `guardar()`, que escribe `JSON.stringify(tareas)` en `localStorage["lista-tareas"]` dentro de `try/catch`, y llamarla tras cada cambio; verificar en DevTools > Application que la clave se actualiza al agregar, marcar y borrar
- [x] 4.2 Implementar `cargar()` al iniciar: leer, parsear y validar (que sea un array y que `texto` sea string), con `[]` como valor por defecto ante cualquier error; verificar los escenarios "Sobrevive a recargar", "Borrado persistente", "Primera visita" y "Datos guardados inválidos" (escribir `"{basura"` en la clave a mano y recargar)

## 5. Verificación integral

- [x] 5.1 Recorrer de principio a fin todos los escenarios de `specs/lista-tareas/spec.md` en un navegador limpio y comprobar que no hay errores en la consola
