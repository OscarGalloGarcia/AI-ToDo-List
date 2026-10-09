# PRD — AI ToDo List

> Lista de tareas personal con diseño premium y minimalista, controlable por voz mediante un asistente de IA (Azure AI Foundry) y conectada a GitHub.

| | |
|---|---|
| **Autor** | Oscar Alberto Gallo García |
| **Estado** | Borrador v0.1 |
| **Fecha** | 2026-10-09 |
| **Repositorio** | [OscarGalloGarcia/AI-ToDo-List](https://github.com/OscarGalloGarcia/AI-ToDo-List) |

---

## 1. Resumen

Hoy el proyecto es una lista de tareas en HTML y JS puro: agrega, marca y borra tareas, y las guarda en `localStorage` (capacidad `lista-tareas`, change `add-lista-tareas`). Este PRD la convierte en un producto personal con tres pilares:

1. **Diseño premium**: interfaz minimalista inspirada en la estética de Apple (claridad, deferencia al contenido, profundidad sutil), diseñada con la skill **impeccable**.
2. **Asistente de voz**: hablarle a la app para crear, borrar y conversar sobre tareas, con un pipeline **Speech-to-Text → LLM → Text-to-Speech** en Azure AI Foundry: Azure AI Speech para la voz y Azure OpenAI (`gpt-5.3`) para el LLM.
3. **Integración con GitHub**: ver los repositorios propios y ligar tareas a un repositorio.

Todo el trabajo se planifica y se ejecuta con **OpenSpec** (un change por fase), y el diseño se dirige y se valida con **impeccable**.

## 2. Problema y oportunidad

- Las tareas de desarrollo viven dispersas: en la cabeza, en notas sueltas, en issues. No hay un lugar ligero que las relacione con el repositorio al que pertenecen.
- Capturar una tarea cuesta fricción: hay que cambiar de contexto, abrir algo y escribir. La voz elimina esa fricción ("Oye, agrega revisar el PR de autenticación en el repo de pagos").
- La versión actual es funcional pero genérica. Si la herramienta es agradable de usar, se usa a diario.

## 3. Usuario objetivo

Uso **personal, de un solo usuario**: el propio autor, desarrollador que trabaja con varios repositorios en GitHub. No hay cuentas, equipos ni colaboración en esta versión.

## 4. Objetivos y no-objetivos

**Objetivos**
- O1. Una interfaz que se sienta de calidad nativa de Apple en escritorio y móvil, en modo claro y oscuro.
- O2. Gestionar tareas de principio a fin solo con la voz: crear, completar, borrar, consultar y ligar a un repo.
- O3. Ligar cualquier tarea a un repositorio de GitHub del usuario y navegar desde la tarea al repo.
- O4. Ninguna llave ni secreto llega nunca al navegador ni al repositorio git.

**No-objetivos (v1)**
- Multiusuario, login o sincronización entre dispositivos.
- Crear o editar issues o PRs en GitHub (solo lectura).
- App nativa iOS/macOS (es web; "estilo Apple" es una dirección de diseño).
- Modo offline para el asistente de voz.
- Usar marcas, logotipos o recursos propietarios de Apple.

## 5. Funcionalidades

### A) Diseño UX/UI premium y minimalista

**Dirección**: minimalismo de estilo Apple. Tipografía del sistema (`-apple-system` / SF Pro donde exista, con fallbacks), jerarquía clara, mucho aire, color usado con moderación (un solo color de acento), profundidad con materiales translúcidos y sombras suaves, y movimiento físico y discreto. La interfaz se aparta y la protagonista es la lista.

**Requisitos**
- A1. Sistema de diseño documentado en `DESIGN.md` (tokens de color, tipografía, espaciado, radios, sombras y movimiento), generado y mantenido con impeccable.
- A2. Modo claro y oscuro automáticos (`prefers-color-scheme`) con contraste AA como mínimo.
- A3. Microinteracciones: completar una tarea (check animado), agregar (entrada suave), borrar (salida con colapso), y estados del asistente de voz (ver B4).
- A4. Respeta `prefers-reduced-motion`.
- A5. Responsive: de 360 px a escritorio ancho, sin scroll horizontal. Objetivos táctiles de al menos 44 px.
- A6. Accesible por teclado: atajos para agregar (`N`), activar el micrófono (`Espacio` mantenido o `⌘/Ctrl + K`) y navegar la lista.
- A7. Estados vacío, de carga y de error diseñados (no texto plano).

**Modo impeccable**: *Operate* (app UI: escaneabilidad y consistencia por encima de la expresión; la marca vive en los detalles).

### B) Asistente de voz con IA (Azure AI Foundry)

**Pipeline**

```
 [Micrófono] --audio--> STT (Azure AI Speech) --texto-->
 LLM (Azure OpenAI gpt-5.3, con tool calling) --respuesta + acciones-->
 TTS (Azure AI Speech, voz neural) --audio--> [Altavoz]
                         |
                         +--> acciones sobre la lista (crear / completar / borrar / ligar)
```

**Requisitos**
- B1. **Pulsar para hablar**: un botón de micrófono prominente pero discreto, y un atajo de teclado. Sin escucha permanente ni palabra de activación en v1.
- B2. **Transcripción visible** en vivo (resultados parciales de STT) para que el usuario vea lo que entendió la app.
- B3. **Comandos por herramientas (tool calling)**: el LLM no edita texto libre, sino que llama a funciones definidas:
  - `crear_tarea(texto, repo?)`
  - `completar_tarea(id)` / `reabrir_tarea(id)`
  - `borrar_tarea(id)`
  - `listar_tareas(filtro?)`
  - `ligar_repo(id_tarea, repo)` / `desligar_repo(id_tarea)`
  - `listar_repos(busqueda?)`
- B4. **Estados visibles del asistente**: inactivo, escuchando, pensando, hablando y error. Cada uno con un tratamiento visual propio y sutil.
- B5. **Conversación sobre las tareas**: el usuario puede preguntar ("¿qué tengo pendiente en el repo de pagos?", "¿cuál debería hacer primero?"). El LLM recibe la lista actual (y los repos ligados) como contexto.
- B6. **Confirmación de acciones destructivas por voz**: borrar una o varias tareas por voz requiere confirmación (verbal o tocando en pantalla). Crear y completar no la requieren.
- B7. **Desambiguación**: si un comando coincide con varias tareas ("borra la del PR"), el asistente pregunta cuál.
- B8. **Interrupción**: tocar el micrófono mientras el asistente habla corta el TTS y empieza a escuchar.
- B9. Cada acción hecha por voz se refleja en la lista con la misma animación que si se hubiera hecho a mano, y se puede **deshacer** durante unos segundos.
- B10. Idioma: español de México (`es-MX`) para el reconocimiento y la síntesis de voz. La voz neural se puede configurar.
- B11. Un historial breve de la conversación (la sesión actual), que se puede plegar.

**Objetivos de latencia** (desde que el usuario termina de hablar):
- Inicio del audio de respuesta: menos de 2,5 s (p50).
- Acción reflejada en la lista: menos de 2 s (p50).

### C) Integración con GitHub

**Requisitos**
- C1. Listar los repositorios del usuario autenticado (propios y de sus organizaciones), con búsqueda.
- C2. Ver por repo: nombre, descripción, lenguaje principal, visibilidad, fecha del último push y número de issues abiertos.
- C3. Ligar una tarea a **un** repositorio (a mano o por voz). La tarea muestra un "chip" con el nombre del repo que abre el repo en GitHub.
- C4. Filtrar la lista de tareas por repositorio.
- C5. Solo lectura: no escribe nada en GitHub.
- C6. Caché de la lista de repos (por ejemplo, 10 min) para no agotar el límite de la API; se puede refrescar a mano.

## 6. Arquitectura propuesta

**Cambio clave**: la app deja de ser solo estática. Las llaves del `.env` **no pueden** estar en el navegador, así que se añade un **backend ligero** que guarda los secretos y hace de proxy.

```
+---------------------------- Navegador ----------------------------+
|  UI en Svelte 5 + Vite (sistema de diseño impeccable)              |
|  Estado de tareas en localStorage  <-- ejecuta acciones del LLM   |
|  Azure Speech SDK (STT/TTS) con token temporal                     |
+------------------+-------------------------------------------------+
                   |  HTTP (mismo origen)
+------------------v------------- Backend local --------------------+
|  GET  /api/speech/token   -> token de Speech de corta duración    |
|  POST /api/chat           -> Azure OpenAI gpt-5.3 (tool calls)     |
|  GET  /api/github/repos   -> GitHub REST API (con caché)           |
|  Lee secretos de .env; sirve los archivos estáticos               |
+--------------------------------------------------------------------+
```

**Decisiones (propuestas)**
- **D1. Las acciones del LLM se ejecutan en el cliente.** El backend devuelve los *tool calls*; el navegador los aplica sobre la lista en `localStorage` y devuelve el resultado al LLM. Así se mantiene la persistencia actual y el modelo de un solo usuario sin base de datos. *Alternativa*: mover las tareas al servidor (SQLite); se pospone hasta que haga falta sincronizar.
- **D2. Speech con token temporal.** El backend intercambia la llave de Speech por un token de unos 10 min; el navegador usa el Speech SDK con ese token (STT en streaming con resultados parciales y TTS con voz neural). La llave nunca sale del servidor.
- **D3. Pipeline STT → LLM → TTS separado**, tal como se pidió. *Alternativa considerada*: un modelo *realtime* de voz a voz, con menos latencia pero menos control sobre STT y TTS por separado y más costo. Se puede reevaluar si no se cumple la latencia.
- **D4. Streaming del LLM hacia TTS**: sintetizar por frases a medida que llega la respuesta, para cumplir el objetivo de latencia.
- **D5. Backend mínimo en Node**, en un solo proceso que también sirve el frontend compilado y escucha solo en `127.0.0.1`. En desarrollo, el servidor de Vite reenvía `/api/*` al backend. Se eligió Node para usar un solo lenguaje en todo el proyecto. *Alternativa descartada*: Python (FastAPI).
- **D7. Frontend en Svelte 5 + Vite.** Genera poco código y su runtime es pequeño. Además trae transiciones y animación de listas incluidas (`transition:`, `animate:flip`), que cubren las microinteracciones de A3 sin dependencias extra, y el estado reactivo (`$state`) modela con naturalidad los estados del asistente (B4). *Alternativa descartada*: React, que tiene más ecosistema y alcance como caso de estudio, pero necesita más código y una librería aparte para las animaciones.
- **D6. Modelo de datos de tarea**, que extiende el actual de forma retrocompatible:
  ```json
  { "id": "uuid", "texto": "…", "hecha": false, "creada": "ISO-8601",
    "repo": { "fullName": "owner/name", "url": "https://github.com/owner/name" } }
  ```
  `repo` es opcional; las tareas antiguas siguen siendo válidas.

## 7. Configuración y secretos

Variables del `.env`:

| Variable | Uso | Estado |
|---|---|---|
| `AZURE_OPENAI_API_KEY` | Llave del recurso de Azure OpenAI (LLM) | Existente |
| `AZURE_OPENAI_ENDPOINT` | Endpoint del recurso de Azure OpenAI | Existente |
| `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` | Deployment del modelo de chat: `gpt-5.3` | Existente |
| `AZURE_OPENAI_API_VERSION` | Versión de la API de Azure OpenAI | Existente, valor por definir |
| `AZURE_SPEECH_KEY` | Llave de Azure AI Speech (STT y TTS) | Existente |
| `AZURE_SPEECH_REGION` | Región del recurso de Speech | Existente |
| `AZURE_SPEECH_VOICE` | Voz neural de TTS. Opcional, con valor por defecto en el código (por ejemplo, `es-MX-DaliaNeural`) | Nueva, opcional |
| `GITHUB_TOKEN` | Token *fine-grained* de solo lectura (Metadata + Contents: read), para la fase 3 | Nueva |

**Reglas**
- `.env` está en `.gitignore` y nunca se sube. Se versiona un `.env.example` sin valores.
- Ningún endpoint del backend devuelve llaves; solo tokens temporales o resultados.
- El backend escucha solo en localhost.

## 8. Flujo de trabajo: OpenSpec + impeccable

Las dos herramientas se combinan así: **impeccable decide *cómo se ve y se siente*; OpenSpec decide *qué hace* y el orden en que se construye.**

```
 impeccable init      -> PRODUCT.md (contexto de producto, a partir de este PRD)
 impeccable shape     -> brief de diseño de la superficie principal
        |
        v
 /opsx:explore  ->  /opsx:propose <change>     (proposal, specs, design, tasks)
        |              design.md referencia DESIGN.md y el brief de impeccable
        v
 /opsx:apply                                   (implementación)
        |              cada tarea de UI aplica el craft floor de impeccable
        v
 impeccable critique / audit / polish          (tareas de verificación del change)
        |
        v
 impeccable document  -> DESIGN.md actualizado
 /opsx:archive        -> specs a openspec/specs/
```

**Convenciones**
- Cada fase del roadmap es **un change de OpenSpec**.
- Los requisitos de comportamiento van en los specs de OpenSpec; las decisiones visuales van en `DESIGN.md`. No se duplican.
- Las tareas de UI de cada change terminan con una verificación de impeccable (`critique` o `audit`) en escritorio y móvil.

## 9. Roadmap por fases

| Fase | Change de OpenSpec | Contenido | Depende de |
|---|---|---|---|
| 0 | — | `impeccable init` + `shape`: PRODUCT.md, brief y dirección visual | — |
| 1 | `redesign-premium-ui` | Migración de la v0 a Svelte 5 + Vite y rediseño completo con el nuevo sistema de diseño (A1–A7), conservando el comportamiento del spec `lista-tareas` | 0 |
| 2 | `add-backend-proxy` | Backend local, `.env`, `.env.example`, servir estáticos, endpoint de token de Speech | — |
| 3 | `add-github-repos` | Listado de repos, ligar tareas, chip y filtro por repo (C1–C6), modelo de datos D6 | 1, 2 |
| 4 | `add-voice-assistant` | STT → LLM → TTS, tool calling, estados, confirmación, deshacer (B1–B11) | 1, 2, 3 |

GitHub va antes que la voz para que el asistente pueda ligar tareas a repos desde el primer día.

## 10. Métricas de éxito

- El autor usa la app a diario durante 2 semanas seguidas.
- Al menos el 50 % de las tareas creadas se crean por voz.
- Al menos el 90 % de los comandos de voz ejecutan la acción correcta sin repetirlos (medido manualmente con un set de 30 frases de prueba).
- Latencia dentro de los objetivos de la sección B.
- `impeccable audit` sin hallazgos críticos; Lighthouse Accessibility de 95 o más.

## 11. Riesgos

| Riesgo | Mitigación |
|---|---|
| El LLM ejecuta una acción equivocada (borra la tarea incorrecta) | Tool calling estricto, confirmación para borrar (B6), deshacer (B9) y desambiguación (B7) |
| Latencia alta en la cadena de tres servicios | Streaming parcial de STT, streaming del LLM y TTS por frases (D4); reevaluar un modelo realtime (D3) |
| Fuga de llaves | Solo en el backend; `.env` ignorado; tokens temporales para Speech; backend solo en localhost |
| Costos de Azure | Pulsar para hablar (no escucha continua); límite de tokens de contexto; voz y modelo configurables |
| Permisos del micrófono y contexto seguro | Servir desde `http://localhost` (contexto seguro); estado de error diseñado si se niega el permiso |
| Límite de la API de GitHub | Caché (C6) y token autenticado (5000 req/h) |
| "Estilo Apple" acaba en una copia superficial | Dirección guiada por principios (claridad, deferencia, profundidad), no por imitar recursos; revisión con `impeccable critique` |

## 12. Preguntas abiertas

1. ~~Stack~~ **Resuelta**: frontend en Svelte 5 + Vite (D7) y backend en Node (D5). Falta decidir, al proponer `add-backend-proxy`, si el backend es un servidor Node aparte o rutas de servidor de SvelteKit, que también mantendrían los secretos fuera del navegador.
2. ~~Modelo del LLM~~ **Resuelta**: Azure OpenAI con el deployment `gpt-5.3`. Falta fijar `AZURE_OPENAI_API_VERSION` con una versión que admita tool calling y streaming para ese modelo.
3. **Autenticación con GitHub**: ¿token personal en `.env` (más simple, uso personal) o flujo OAuth? *Recomendación*: token *fine-grained* en `.env` para v1.
4. **Voz**: el locale ya está resuelto (`es-MX`). Falta elegir la voz neural concreta.
5. **"Revisar repositorios"**: ¿basta con la información de C2 o se quieren ver issues o commits recientes dentro de la app?
6. **¿Una tarea puede ligarse a varios repos?** v1 asume uno.
7. **Persistencia**: ¿se mantiene `localStorage` (D1) o se quiere acceder desde varios dispositivos (eso implicaría mover las tareas al servidor)?
