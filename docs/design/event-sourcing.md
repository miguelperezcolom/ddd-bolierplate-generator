# Event sourcing para agregados

> Estado: **Fases 1 y 2 implementadas** — event store generado y **repositorio event-sourced** (eventos
> como fuente de verdad, con snapshot de estado para lecturas), con hook de dos zonas para lo
> no-derivable. Refinamientos (snapshots periódicos, read-side puro por proyección) son **propuesta**. Ver §4.
> Relacionado: [`two-zone-codegen.md`](./two-zone-codegen.md), [`system-evolution`](../../doc/src/content/docs/manual/system-evolution.md).

## 1. El hueco

El modelo permite marcar un agregado como `persistenceType: EVENT_SOURCED` (o `eventSourcingEnabled`),
y la UI lo muestra — pero **la generación lo ignoraba por completo**: ninguna plantilla miraba
`persistenceType`, así que un agregado event-sourced producía **exactamente el mismo código JPA** de
estado-actual que cualquier otro. Event sourcing estaba en el meta-modelo pero no en el generador.

Esto se descubrió con el cuarto dominio de ejemplo (`ledger-store.yaml`, agregado `Account`
event-sourced) — el patrón de "kilometraje": cada dominio nuevo destapa huecos que un solo dominio
esconde.

## 2. Por qué es un cambio grande

Un agregado event-sourced es un **modelo de persistencia distinto**, no una variante:

- El estado **no se guarda**; se **deriva** de un stream de eventos (event store append-only).
- Persistir = **añadir eventos**, no `save(estado)`.
- Cargar = **replay** de los eventos (+ snapshots) para reconstruir el agregado.

Esto choca con el modelo actual de modux: agregados POJO con `of`/`load`, estado en JPA, CRUD UI
autogenerada sobre ese estado, eventos publicados en la capa de use case (no por el agregado). Hacerlo
"puro" toca la generación del agregado, la persistencia, la UI y las migraciones a la vez. Por eso se
aborda **por fases**, empezando por la pieza con valor independiente y sin romper lo existente.

## 3. Fase 1 (implementada): el event store

Para cada agregado `EVENT_SOURCED`, **además** de su persistencia JPA de estado actual (que se mantiene
de momento, así nada se rompe), modux genera la infraestructura de event store:

| Fichero | Zona | Qué es |
|---|---|---|
| `{Aggregate}EventEntity` | generada | Entidad JPA del log append-only: `id`, `aggregateId`, `sequenceNumber`, `eventType`, `payload` (JSON), `occurredAt` |
| `{Aggregate}EventStore` | generada | Repositorio Spring Data: `findByAggregateIdOrderBySequenceNumberAsc` |
| `{Aggregate}EventAppender` | generada | Plumbing: `append(aggregateId, event)` (asigna secuencia, serializa, guarda) y `history(aggregateId)` |

La tabla `{aggregate}_event` (con su secuencia) entra en la **migración Flyway** y la valida Hibernate al
arrancar. El desarrollador llama a `append(...)` desde los hooks de operación del agregado para registrar
eventos de dominio, e `history(...)` para leer el stream.

Verificado por `LedgerGenerationTest`: el proyecto ledger con un agregado event-sourced
**genera → empaqueta → migra → valida → arranca**.

## 4. Fase 2 (implementada): eventos como fuente de verdad

Para un agregado `EVENT_SOURCED`, el adaptador JPA del puerto (`{Aggregate}DBRepository`) **se reemplaza**
por uno event-sourced (`{Aggregate}EventSourcedRepository`) — el puerto sigue con **una sola
implementación**, así que ni la CRUD UI ni nada más se entera:

- `save(domain)`: añade los eventos de dominio (vía el hook `eventsOf` + el `EventAppender`) **y** guarda
  un **snapshot de estado** (la entidad JPA), para que lecturas/queries/CRUD sigan funcionando.
- `findById(id)`: **pliega el stream de eventos** (la reconstitución canónica, vía el hook `replay`) y, si
  aún no está implementado, cae al snapshot. Los eventos son la fuente de verdad; el estado es derivado.

Lo no-derivable es un **hook de dos zonas** `{Aggregate}EventSourcing` (puerto generado en
`infra/out/persistence`, default write-once en el módulo custom):

| Método | Qué decide |
|---|---|
| `List<Object> eventsOf({Aggregate} aggregate)` | qué eventos de dominio produce el cambio actual |
| `{Aggregate} replay({Aggregate}Id id, List<{Aggregate}EventEntity> events)` | cómo se pliega el stream para reconstruir el estado |

Verificado por `LedgerGenerationTest`: se genera `{Aggregate}EventSourcedRepository` + el hook + su
default, **no** se genera el `DBRepository` JPA, y el proyecto arranca.

**Decisión:** se mantiene el snapshot de estado JPA como read-side (en vez de hacer "ES puro" sin tabla
de estado), porque la alternativa —quitar la entidad JPA— forzaría a hacer *gate* de la CRUD UI, el menú,
el query service y los tests, una cascada grande y frágil. El snapshot es un patrón ES legítimo (read
model embebido) y deja el sistema funcionando out-of-the-box.

## 5. Refinamientos (propuesta)

1. **Snapshots periódicos** cada `snapshotFrequency` eventos (el campo ya existe) para acelerar el replay.
2. **Read-side puro por proyección**: materializar el estado consultable con proyecciones (que ya
   existen) y retirar el snapshot embebido — CQRS de verdad.
3. **Serialización polimórfica**: el `replay` recibe `eventType` + `payload`; falta un helper estándar
   para deserializar al tipo correcto (hoy lo hace el hook a mano).
4. **Migrar un agregado JPA existente a event-sourced**: fuera de alcance inicial.

## 6. Resumen

El meta-modelo ya sabía de event sourcing; el generador no. Las Fases 1 y 2 lo cierran: un agregado
`EVENT_SOURCED` genera un event store con tabla migrada y un repositorio event-sourced que añade eventos
(la fuente de verdad) y los pliega al cargar, manteniendo un snapshot de estado para las lecturas y la
CRUD UI. Lo no-derivable —qué eventos produce una operación y cómo se pliegan— es un hook de dos zonas,
fiel a la tesis de todo el proyecto: lo estructural se genera, lo que el modelo no puede capturar lo
posees tú. Los refinamientos (snapshots, read-side puro) quedan documentados arriba.
