# Event sourcing para agregados

> Estado: **Fase 1 implementada** (event store generado para agregados `EVENT_SOURCED`); la
> reconstitución completa (eventos como fuente de verdad) es **propuesta**. Ver §4.
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

## 4. Fase 2+ (propuesta): eventos como fuente de verdad

Para llegar a event sourcing real:

1. **El agregado produce eventos.** Las operaciones (`CUSTOM`) registran eventos de dominio en vez de
   mutar estado directamente; el estado se deriva aplicándolos. Encaja con los hooks de dos zonas: "qué
   evento produce esta operación" y "cómo aplico este evento al estado" no son derivables del modelo →
   son hooks `{Aggregate}EventSourcing` (`eventsOf` / `apply`).
2. **Repositorio event-sourced.** Una implementación del puerto `{Aggregate}Repository` que en `save`
   añade los eventos pendientes y en `findById` carga el stream y lo pliega (vía el hook). Sustituye al
   adaptador JPA de estado (el puerto sigue igual, así el resto no se entera).
3. **Quitar el estado JPA** (o dejarlo solo como snapshot). Implica **gate** de la entidad/repos JPA y de
   la **CRUD UI** para agregados event-sourced (que asumen estado actual) — o servir la UI desde una
   proyección.
4. **Snapshots** cada `snapshotFrequency` eventos (el campo ya existe en el modelo).
5. **Read side por proyección.** El estado consultable se materializa con proyecciones (que ya existen),
   no leyendo el agregado — CQRS de verdad.

### Riesgos / decisiones abiertas
- **Serialización polimórfica de eventos** (deserializar `payload` al tipo correcto en el replay): un
  registro de tipos de evento o un campo `eventType` + mapa. El `eventType` ya se persiste.
- **UI para agregados event-sourced**: ¿gate del CRUD, o UI sobre proyección? (Recomendado: proyección.)
- **Migración de un agregado JPA existente a event-sourced**: fuera de alcance inicial.

## 5. Resumen

El meta-modelo ya sabía de event sourcing; el generador no. La Fase 1 cierra la pieza con valor
independiente —un event store generado, con tabla migrada y un appender listo— sin romper nada. La
reconstitución completa (Fase 2+) es un cambio mayor que toca agregado, persistencia y UI, y se hace
cuando se decida, reutilizando los hooks de dos zonas para lo no-derivable.
