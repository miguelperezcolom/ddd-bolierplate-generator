# Escenarios de secuencia (`interactions`)

> Estado: **implementado** (fases 0–3). Sustituye a `journeys` (eliminado, ver §6) como
> respuesta a la pregunta «¿cómo fluye este caso, de principio a fin?».

## 1. El problema

Modux define el comportamiento **de abajo arriba**: cada caso de uso es una pipeline
ordenada de pasos, y entre elementos la interacción se declara como coreografía
(flows con trigger, procesos, workflows). El orden global de un escenario concreto
queda implícito — la vista EventStorming lo *deriva*, no se authoreda.

Falta lo que un diagrama de secuencia aporta: **un** escenario concreto con
participantes como líneas de vida, mensajes **ordenados de principio a fin** y la
distinción visual síncrono/asíncrono y petición/respuesta. Los `journeys` fueron un
primer intento: un camino con nombre sobre las dependencias. Pero son solo una capa de
lectura — sin semántica de mensajes, sin authoring, sin más verificación que «hay una
arista debajo» (`journey-leg-without-dependency`).

## 2. El concepto

**Un solo formato — la secuencia — con tres modos de uso.** Un `Interaction` es una
cadena ordenada de **mensajes entre participantes del catálogo**:

- **Participante** = referencia a un elemento existente: actor, app, página, operación
  de API, caso de uso, agregado, servicio de dominio, query service, read model,
  sistema externo, agente. No se declara aparte: se deriva de los mensajes.
- **Mensaje** = `{ from, to, kind, label, guard? }`, donde `kind` mapea 1:1 con los
  mecanismos que modux ya entiende:

| kind | se respalda en |
|---|---|
| `COMMAND` | step `CallUseCase`, operación de API cableada, acción de botón |
| `QUERY` | step `CallQueryService` / query service de un listing |
| `EVENT` (asíncrono) | `emits` + suscripción / flow `TRIGGERS` |
| `EXTERNAL` | step `CallExternalUseCase` / gateway |

```yaml
interactions:
  - id: checkin-online
    name: Check-in online
    trigger: { kind: ACTOR, ref: huesped }   # también: operación API | evento | schedule
    messages:
      - { from: huesped, to: pagina-checkin, kind: COMMAND, label: "confirma el check-in" }
      - { from: pagina-checkin, to: uc-realizar-checkin, kind: COMMAND, label: "RealizarCheckin(request)" }
      - { from: uc-realizar-checkin, to: reserva, kind: COMMAND, label: "checkin()" }
      - { from: reserva, to: uc-notificar-housekeeping, kind: EVENT, label: "CheckinRealizado" }
      - { from: uc-notificar-housekeeping, to: housekeeping, kind: EXTERNAL, label: "POST /limpieza" }
```

Naming: no `Scenario` — `BddScenario` (given/when/then) ya existe dentro de los bounded
contexts. `Interaction` es el término UML: un diagrama de secuencia *es* un diagrama de
interacción. Etiqueta en la UI: «Secuencias».

## 3. Los tres modos

### 3.1 Derivado (read-only)

Se elige un punto de entrada (operación de API, caso de uso, evento) y modux calcula
una interacción **efímera** recorriendo: los steps de cada pipeline en su orden
declarado; cada `emits` → suscripciones/flows → las pipelines de sus destinos,
recursivamente; queries y llamadas externas. Llamada síncrona = activación anidada;
evento = flecha asíncrona con forks paralelos (una por suscriptor); ciclos se cortan
con marca. Export a **mermaid** (`sequenceDiagram`) para el design doc, que ya renderiza
bloques mermaid.

### 3.2 Authoredo (persistido)

`interactions:` en el YAML. Un mensaje sin respaldo ofrece **materializar**: crea la
pieza que falta — el step `CallUseCase`, el `emits` + flow `TRIGGERS`, el cableado de
la operación publicada — reusando exactamente los comandos que hoy ejecutan los gestos
del lienzo. Definición top-down de verdad: dibujas la conversación y el modelo se
construye debajo.

### 3.3 Coherente (lint)

- `interaction-message-without-backing` (WARNING): el mensaje no tiene mecanismo que lo
  realice. Admite autofix vía materialización.
- `interaction-dangling-participant` (WARNING): participante referenciado que ya no
  existe.

Misma filosofía que `journey-leg-without-dependency`, pero con botón de arreglo.

## 4. Por qué no un `Workflow`

La intuición «una especie de workflow» acierta en la **estructura** (pasos ordenados
con ramas condicionadas, como los splits EXCLUSIVE con su expresión). Pero un workflow
se **genera como orquestador runtime**; una interacción **no genera ningún componente**
— es intención + documentación + verificación. Reutilizar el tipo `Workflow` produciría
orquestadores fantasma. Lo que se reutiliza es la maquinaria visual y de gestos.

## 5. La superficie

Renderer dedicado de **lifelines** — participantes en columnas, tiempo vertical, barras
de activación — hermano del page designer o el tilt: no es una `Scene` del lienzo
libre. Gestos: arrastrar un participante del catálogo a una columna, trazar un mensaje
entre columnas en un instante, doble click edita etiqueta/guarda, Supr borra el mensaje.
Vista «Secuencias» en el editor + página CRUD propia.

## 6. Eliminación de `journeys`

La interacción subsum al journey: el camino con nombre que journeys intentaba ser, ahora
con semántica de mensajes. Se elimina: la sección `journeys:` del YAML, el editor
(`journeys.ts`, overlay animado, selector y creación en la toolbar), el servidor
(`JourneyEntity`/`JourneyLegEntity`, `ModelJourneyPage`, `ModelJourneyRenderer`, lint
`journey-leg-*`, tools MCP), la documentación y los ejemplos. La animación del viajero
podrá reaparecer sobre la interacción en el futuro.

## 7. Fases

- **Fase 0** ✅: eliminar journeys.
- **Fase 1** ✅: interacción derivada (vista read-only + export mermaid — en la v1 el
  export es el botón «⧉ Mermaid» del editor, que copia el `sequenceDiagram`; incrustarlo
  en el design doc generado queda como trabajo futuro).
- **Fase 2** ✅: `Interaction` persistido + materialización desde mensajes.
- **Fase 3** ✅: lints de coherencia (`interaction-message-without-backing`,
  `interaction-dangling-participant`). Futuro: tests e2e esqueleto generados desde la
  interacción.

## 8. Alternativas consideradas

- **Solo vista derivada**: no permite diseñar antes de tener las piezas (no hay
  top-down).
- **Reutilizar `Workflow`**: mezcla runtime con documentación y genera orquestadores
  fantasma.
- **Mantener journeys junto a interactions**: dos conceptos solapados compitiendo por
  la misma pregunta.

## 9. Consecuencias

- Los stores con `journeys:` pierden esa sección (se ignora al cargar y desaparece al
  guardar). Es la única pérdida de datos deliberada; journeys era una capa de lectura,
  nunca topología.
- `Interaction` es un elemento más del catálogo (~35 tipos): entra por los mismos
  puertos de almacenamiento (`ModelStore`/`WorkspaceStore`) y aparece en el árbol, las
  vistas curadas y el JSON schema.
- El design doc gana un diagrama de secuencia mermaid por interacción derivada o
  authoreda.
