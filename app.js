// Lista de tareas: estado en memoria -> guardar() -> render().
// Nota: abriendo la página con file:// cada navegador puede tratar el origen
// de localStorage de forma distinta.

const CLAVE = 'lista-tareas';

const form = document.getElementById('form-tarea');
const input = document.getElementById('texto-tarea');
const lista = document.getElementById('lista-tareas');
const vacio = document.getElementById('vacio');

let contador = 0;

function nuevoId() {
  if (window.crypto && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch (e) {
      // randomUUID puede no estar permitido fuera de un contexto seguro
    }
  }
  contador += 1;
  return `${Date.now()}-${contador}`;
}

function cargar() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE));
    if (!Array.isArray(datos)) return [];
    return datos
      .filter((t) => t && typeof t.texto === 'string')
      .map((t) => ({
        id: typeof t.id === 'string' ? t.id : nuevoId(),
        texto: t.texto,
        hecha: t.hecha === true,
      }));
  } catch (e) {
    return [];
  }
}

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(tareas));
  } catch (e) {
    // Sin localStorage (modo privado, cuota llena): la app sigue en memoria
  }
}

let tareas = cargar();

function render() {
  lista.replaceChildren();

  for (const tarea of tareas) {
    const li = document.createElement('li');
    li.dataset.id = tarea.id;
    li.classList.toggle('hecha', tarea.hecha);

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = tarea.hecha;
    check.setAttribute('aria-label', 'Marcar como hecha');

    const texto = document.createElement('span');
    texto.textContent = tarea.texto;

    const borrar = document.createElement('button');
    borrar.type = 'button';
    borrar.className = 'borrar';
    borrar.textContent = 'Borrar';

    li.append(check, texto, borrar);
    lista.append(li);
  }

  vacio.hidden = tareas.length > 0;
}

function actualizar() {
  guardar();
  render();
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const texto = input.value.trim();
  if (texto === '') return;

  tareas.push({ id: nuevoId(), texto, hecha: false });
  input.value = '';
  actualizar();
});

lista.addEventListener('change', (evento) => {
  if (evento.target.type !== 'checkbox') return;
  const id = evento.target.closest('li').dataset.id;
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) return;

  tarea.hecha = evento.target.checked;
  actualizar();
});

lista.addEventListener('click', (evento) => {
  if (!evento.target.classList.contains('borrar')) return;
  const id = evento.target.closest('li').dataset.id;

  tareas = tareas.filter((t) => t.id !== id);
  actualizar();
});

render();
