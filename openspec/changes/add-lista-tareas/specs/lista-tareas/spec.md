# Spec Delta

## Purpose

Permite al usuario gestionar una lista personal de tareas desde el navegador: agregarlas, marcarlas como hechas y borrarlas, sin perderlas al recargar la página.

## ADDED Requirements

### Requirement: Agregar tarea
El sistema SHALL permitir al usuario agregar una tarea escribiendo su texto y confirmando con el botón de agregar o con la tecla Enter. La nueva tarea MUST aparecer al final de la lista, sin marcar como hecha, y el campo de texto MUST quedar vacío. El texto MUST guardarse sin espacios al inicio ni al final.

#### Scenario: Agregar con el botón
- **WHEN** el usuario escribe "Comprar pan" y pulsa el botón de agregar
- **THEN** la lista muestra una nueva tarea "Comprar pan", no hecha, al final de la lista
- **AND** el campo de texto queda vacío

#### Scenario: Agregar con Enter
- **WHEN** el usuario escribe "Llamar a Ana" y pulsa Enter en el campo de texto
- **THEN** la lista muestra una nueva tarea "Llamar a Ana" al final de la lista

#### Scenario: Recortar espacios
- **WHEN** el usuario escribe "   Leer   " y la agrega
- **THEN** la tarea se muestra con el texto "Leer"

### Requirement: Rechazar tareas vacías
El sistema MUST ignorar el intento de agregar una tarea cuyo texto esté vacío o contenga solo espacios en blanco. La lista no MUST cambiar.

#### Scenario: Texto vacío
- **WHEN** el usuario pulsa el botón de agregar con el campo de texto vacío
- **THEN** no se agrega ninguna tarea y la lista queda igual

#### Scenario: Solo espacios
- **WHEN** el usuario escribe "    " y pulsa Enter
- **THEN** no se agrega ninguna tarea y la lista queda igual

### Requirement: Marcar tarea como hecha
El sistema SHALL permitir al usuario alternar el estado de una tarea entre hecha y no hecha. Las tareas hechas MUST distinguirse visualmente (por ejemplo, con el texto tachado).

#### Scenario: Marcar como hecha
- **WHEN** el usuario marca una tarea no hecha
- **THEN** la tarea pasa a estado hecha y se muestra tachada

#### Scenario: Desmarcar
- **WHEN** el usuario desmarca una tarea hecha
- **THEN** la tarea vuelve a estado no hecha y deja de mostrarse tachada

### Requirement: Borrar tarea
El sistema SHALL permitir al usuario borrar cualquier tarea de forma inmediata, sin pedir confirmación. Solo MUST eliminarse la tarea elegida.

#### Scenario: Borrar una tarea
- **WHEN** la lista contiene "A", "B" y "C" y el usuario borra "B"
- **THEN** la lista muestra solo "A" y "C", en ese orden

### Requirement: Persistencia local
El sistema MUST guardar la lista de tareas (texto, estado y orden) en el almacenamiento local del navegador cada vez que cambia, y MUST restaurarla al cargar la página.

#### Scenario: Sobrevive a recargar
- **WHEN** el usuario agrega "A", marca "A" como hecha y recarga la página
- **THEN** la lista muestra "A" marcada como hecha

#### Scenario: Borrado persistente
- **WHEN** el usuario borra una tarea y recarga la página
- **THEN** la tarea borrada no vuelve a aparecer

#### Scenario: Primera visita
- **WHEN** el usuario abre la página por primera vez, sin datos guardados
- **THEN** la lista se muestra vacía

#### Scenario: Datos guardados inválidos
- **WHEN** el almacenamiento local contiene datos de tareas que no se pueden interpretar
- **THEN** la página carga igualmente con la lista vacía, sin mostrar errores al usuario

### Requirement: Estado vacío
El sistema SHALL mostrar un mensaje indicando que no hay tareas cuando la lista está vacía.

#### Scenario: Lista vacía
- **WHEN** no hay ninguna tarea
- **THEN** se muestra un mensaje como "No hay tareas"

#### Scenario: Desaparece al agregar
- **WHEN** la lista está vacía y el usuario agrega una tarea
- **THEN** el mensaje de lista vacía deja de mostrarse
