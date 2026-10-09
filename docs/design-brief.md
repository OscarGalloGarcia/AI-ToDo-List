# Brief de diseño: AI ToDo List

> Aprobado el 2026-10-09 (fase 0, `/impeccable shape`). La dirección visual también está registrada en `PRODUCT.md`, en Compromisos de marca. El sistema de diseño definitivo (`DESIGN.md`) se escribe al terminar la construcción, a partir de lo construido.

## 1. Para quién y para qué

Es una pantalla de trabajo (modo *Operate*): sirve para completar tareas, no para lucirse. La usa el autor en el escritorio, junto al editor y la terminal, con menos de 15 tareas a la vez. Tiene que poder capturar una tarea en una frase o una tecla y ver de un vistazo qué queda pendiente.

## 2. Cuándo funciona

- Agregar o completar una tarea se hace sin quitar las manos del teclado.
- Todo lo que hace el asistente se ve en la lista y se puede deshacer.
- Nada en pantalla deja de funcionar ni está de más.

## 3. Dirección

**El estándar de la categoría**, sin ironía ni rarezas escondidas, con un acabado al nivel de las dos referencias:

- **De Recordatorios de Apple:** título grande de la lista, casillas circulares, filas con aire, tipografía del sistema, barra lateral translúcida y un punto de color por lista.
- **De Linear:** uso con teclado primero, foco siempre visible, separadores finos de 1 px, precisión en la densidad y movimiento rápido (150–200 ms).

**Momento central:** al completar una tarea, el círculo se llena, la fila se desvanece tras una breve pausa hacia la sección "Completadas" y aparece un aviso de "Deshacer".

*Se descartaron:* libreta de bolsillo (era la dirección asignada), línea de Metro (era la favorita de impeccable) y tres retadores (tablero de salidas, mosaicos tipográficos y mapa de orientación).

## 4. Alcance

- Se diseña la pantalla completa: lista, asistente y repos.
- Cada fase construye solo lo que ya funciona:
  - **Fase 1:** la lista.
  - **Fase 3:** la barra lateral de repos.
  - **Fase 4:** la cápsula del micrófono y el panel del asistente.
- **Anti-objetivos:**
  - Controles que no funcionan o que sobran.
  - Una apariencia genérica sin acabado.
  - Exceso de efectos (vidrios, brillos, animaciones).
  - Que usarla con teclado cueste más pasos que en la v0.

## 5. Estados y volúmenes

- **Volumen:** entre 0 y unas 15 tareas pendientes; textos de una a tres líneas.
- **Lista:**
  - Primera vez o lista vacía.
  - Todo completado.
  - Sección "Completadas" plegada o desplegada.
  - Textos largos que ocupan varias líneas.
  - Error al guardar en el navegador.
- **Backend:** error de conexión.
- **Asistente (fase 4):** inactivo, escuchando (con transcripción en vivo), pensando, hablando, error y permiso de micrófono denegado.
- **Repos (fase 3):** cargando, sin token, error de la API y búsqueda sin resultados.

## 6. Interacción y distribución

- **Escritorio:**
  - **Barra lateral** (desde la fase 3): "Todas" y los repos, cada uno con su punto de color y un contador de pendientes.
  - **Zona principal:** título grande y número de pendientes. Debajo, filas con la casilla circular, el texto y, a la derecha, el chip del repo. Al final, una fila de captura "Nueva tarea" y la sección "Completadas" plegada.
- **Teclado:**
  - `N` lleva el foco a la captura y `Enter` agrega la tarea.
  - `↑` / `↓` mueven entre tareas y `Espacio` marca o desmarca.
  - `⌫` borra, con opción de deshacer.
  - `Esc` sale de la captura.
- **Móvil:** una sola columna. La barra lateral pasa a ser una pantalla anterior con navegación hacia atrás, como en Recordatorios.
- **Asistente (fase 4):** una cápsula flotante abajo al centro que se abre en un panel con la transcripción y las acciones. Nunca tapa la lista: la lista deja espacio abajo.
- **Color:**
  - Modo claro y oscuro automáticos.
  - Un solo acento para lo interactivo y el foco.
  - El color de cada repo hace una función real: identificar el repo.

## 7. Restricciones

- **Stack:** Svelte 5 + Vite, con backend en Node (`docs/PRD.md`, decisiones D5 y D7).
- **Idioma:** español de México (`es-MX`).
- **Accesibilidad:**
  - WCAG 2.2 AA en ambos modos.
  - Respeta `prefers-reduced-motion`.
  - Objetivos táctiles de al menos 44 px.
  - Todo lo que se hace por voz también se puede hacer con teclado.
- **Tipografía:** la del sistema (`-apple-system`, `system-ui` y alternativas). No se incluye SF Pro ni ningún recurso o marca de Apple.
- **Construcción:** el diseño se construye directamente en código, sin maqueta previa; no hay generación de imágenes disponible.

## Decisiones tomadas

- **Tareas completadas:** pasan a una sección "Completadas" plegada (opción a). Esto cambia el spec `lista-tareas` y se formaliza en el change `redesign-premium-ui`.
