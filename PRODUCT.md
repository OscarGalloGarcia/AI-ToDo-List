# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Frontend en **Svelte 5 + Vite** y backend en **Node**. El backend guarda los secretos del `.env`, sirve el frontend compilado y hace de proxy hacia Azure y GitHub, escuchando solo en localhost.

- **Svelte frente a React**: se eligió Svelte por tener menos código, un runtime pequeño y transiciones y animación de listas incluidas. React se descartó.
- **Forma del backend**: por decidir, si un servidor Node aparte o rutas de servidor de SvelteKit.
- **Incumbente**: la v0 actual (`index.html`, `app.js`, `styles.css`) es HTML/CSS/JS puro sin build. Se migra al nuevo stack; su comportamiento está especificado en OpenSpec (`lista-tareas`).

## Users

Un solo usuario: el autor, un desarrollador que trabaja a diario con varios repositorios en GitHub. Usa la app en su escritorio mientras programa, para capturar, revisar y cerrar tareas de desarrollo sin salir de su flujo, muchas veces hablando en lugar de escribiendo.

Audiencia secundaria: otros desarrolladores que ven el repositorio público como caso de estudio de cómo se construyó (OpenSpec + impeccable + IA). Ven el código, la documentación y la app; no son usuarios de la app.

## Product Purpose

Una lista de tareas personal que se gestiona con la voz y que liga cada tarea al repositorio de GitHub al que pertenece. Tiene dos fines con el mismo peso:

1. **Herramienta real de uso diario**: capturar una tarea cuesta una frase, y las tareas quedan organizadas por repo.
2. **Caso de estudio público**: demuestra un flujo de desarrollo guiado por specs (OpenSpec) y por diseño (impeccable), con IA en el producto y en el proceso.

Habrá éxito cuando el autor la use a diario durante dos semanas seguidas y cree por voz al menos la mitad de sus tareas, y cuando el repositorio explique de forma legible cómo se llegó a ella. Las métricas detalladas están en `docs/PRD.md` §10.

## Positioning

Las tareas se conversan, no solo se teclean: un asistente de voz (STT → LLM → TTS) crea, completa, borra y comenta tareas mediante acciones explícitas y verificables, y cada tarea puede vivir ligada a un repositorio de GitHub del usuario. Además, todo el producto se construye en público con specs y decisiones de diseño versionadas.

## Operating Context

- Se usa en el navegador de escritorio, con la app servida en `localhost`, junto al editor y la terminal. También debe funcionar en el ancho de un móvil.
- Interacción mixta: teclado y ratón para lo rápido, voz (pulsar para hablar) para capturar y consultar.
- Flujo de construcción: cada fase es un change de OpenSpec (`openspec/changes/`). Las decisiones visuales viven en `DESIGN.md` (impeccable) y las de comportamiento, en los specs.
- Documentación de producto en `docs/` (el PRD está en `docs/PRD.md`).

## Capabilities and Constraints

**Existe hoy (v0)**: agregar, marcar como hecha y borrar tareas, con persistencia en `localStorage`. No permite tareas vacías y borra sin pedir confirmación.

**Planeado** (detalle en `docs/PRD.md`):
- Asistente de voz: Azure AI Speech (STT y TTS) con Azure OpenAI (deployment `gpt-5.3`) y tool calling. Pulsar para hablar, transcripción visible, confirmación antes de borrar por voz, deshacer y desambiguación.
- GitHub: listar los repos del usuario (solo lectura), ligar una tarea a un repo y filtrar por repo.

**Restricciones**
- Los secretos (`AZURE_OPENAI_*`, `AZURE_SPEECH_*`, `GITHUB_TOKEN`) viven solo en el `.env` del backend. Nunca llegan al navegador ni a git.
- Un solo usuario, sin cuentas ni sincronización entre dispositivos en v1.
- GitHub es de solo lectura.
- Idioma de la interfaz y de la voz: español de México (`es-MX`).

**Terminología**: "tarea", "hecha", "repo"/"repositorio", "ligar una tarea a un repo", "asistente".

**Por decidir**: forma del backend (servidor Node aparte o SvelteKit), `AZURE_OPENAI_API_VERSION`, voz neural concreta de `es-MX` y si la persistencia se mueve al servidor más adelante.

## Brand Commitments

- Nombre: **AI ToDo List** (repositorio `AI-ToDo-List`).
- Dirección indicada por el usuario: **diseño UX/UI premium y minimalista, al estilo de Apple**. Es una restricción vinculante. Sin usar marcas, logotipos ni recursos propietarios de Apple.
- Voz del producto: español de México, directo y breve.

## Evidence on Hand

- `docs/PRD.md`: requisitos, arquitectura y roadmap.
- `openspec/changes/add-lista-tareas/`: spec, diseño y tareas de la v0.
- La v0 funcionando (`index.html`, `app.js`, `styles.css`).
- No hay usuarios externos, testimonios, métricas reales, capturas de marketing ni logotipo. Nada de eso debe inventarse.

## Product Principles

1. **Capturar no cuesta nada.** Cualquier flujo que añada pasos entre la idea y la tarea guardada tiene que justificarse.
2. **La IA actúa, pero a la vista.** Toda acción del asistente se ve, se puede deshacer, y las destructivas se confirman.
3. **La tarea vive donde vive el código.** El repo es contexto de primera clase, no una etiqueta decorativa.
4. **Construido en público, con intención.** Cada decisión de producto y de diseño queda escrita y versionada, de modo que el repositorio se pueda leer como caso de estudio.
5. **Los secretos nunca salen del servidor.**

## Accessibility & Inclusion

- WCAG 2.2 AA como mínimo, en modo claro y en modo oscuro.
- Todo lo que se puede hacer por voz también se puede hacer con teclado y ratón; la voz nunca es la única vía.
- La transcripción y las respuestas del asistente aparecen como texto en pantalla, no solo como audio.
- Respeta `prefers-reduced-motion`.
