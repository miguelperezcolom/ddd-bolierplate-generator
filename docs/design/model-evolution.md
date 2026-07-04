# RFC: Evolución del modelo (diff, migraciones y upcasters)

> Estado: **propuesta**. Este es el problema más estratégico de modux: todo enfoque
> model-driven muere o vive por cómo trata la **regeneración sobre un sistema en
> producción**. Resolverlo bien es un foso competitivo; nadie lo hace bien.

## 1. El problema

Hoy modux genera desde el modelo actual, como si fuera la primera vez. Pero un sistema
empresarial vive años y el modelo cambia: se añade un campo, se renombra un agregado, un
evento gana un campo obligatorio, una projection cambia de forma. En producción ya hay:

- **datos** en tablas cuya forma refleja el modelo N-1,
- **eventos históricos** serializados con el esquema N-1 (¡inmutables si hay event sourcing!),
- **read models** materializados con la forma antigua.

Sin una respuesta, el usuario regenera, el DDL no cuadra, los eventos viejos no deserializan,
y abandona el generador. La respuesta manual (escribir migraciones a mano) devuelve justo el
trabajo que modux prometía eliminar.

## 2. Principio de diseño

**El modelo es versionado; el diff entre versiones es un artefacto de primera clase.**

```
modelo N-1  ──diff──▶  ModelChangeSet  ──genera──▶  · migración Flyway/Liquibase
                                                    · upcasters de eventos
                                                    · plan de rebuild de projections
                                                    · informe de cambios breaking
```

modux guarda una **instantánea del último modelo generado** (`.modux/generated-model.yaml`,
committeada junto al código generado). En la siguiente generación computa el diff contra el
modelo actual y deriva los artefactos de transición **además** del código.

## 3. El diff (`ModelChangeSet`)

Comparación estructural por **id** (los ids estables son la clave — por eso todos los
elementos del store tienen id). Tipos de cambio, por elemento:

| Cambio | Ejemplo | Artefacto |
|---|---|---|
| ADD_FIELD | Reserva gana `canalVenta` | `ALTER TABLE ... ADD COLUMN` (nullable o con default) |
| DROP_FIELD | — | ALTER + aviso (⚠ pérdida de datos: requiere confirmación) |
| RENAME_FIELD | id igual, name distinto | `ALTER ... RENAME COLUMN` (el id estable detecta el rename — sin id sería drop+add) |
| CHANGE_TYPE | string → money | ALTER + cast, o tabla puente si no es castable |
| ADD_AGGREGATE | — | CREATE TABLE (caso actual) |
| RENAME_AGGREGATE | id igual, name distinto | RENAME TABLE + actualizar topics derivados (¡breaking para consumidores externos!) |
| EVENT_SCHEMA_CHANGE | evento v1 → v2 | **upcaster** v1→v2 + bump de `schemaVersion` |
| PROJECTION_CHANGE | handler o forma del read model | entrada en el **plan de rebuild** |

## 4. Upcasters de eventos

Para agregados event-sourced los eventos históricos son inmutables. Cada
`EVENT_SCHEMA_CHANGE` genera una clase upcaster:

```java
// generado
public class ReservaCreadaV1ToV2Upcaster implements EventUpcaster {
    // v2 añadió canalVenta (default: "DIRECTO")
    public ObjectNode upcast(ObjectNode v1) { ... }
}
```

- Cadena de upcasters v1→v2→…→vN aplicada en la deserialización del event store.
- Los defaults salen del modelo (el campo nuevo declara `default:`) o se piden en el diff
  interactivo si no hay default declarable.

## 5. Plan de rebuild de projections

El diff sabe qué projections leen eventos/campos que cambiaron. Genera un plan ordenado:

```yaml
rebuildPlan:
  - projection: ReservaFrontOfficeProjection   # rebuildStrategy: FROM_SCRATCH
    reason: "payload de ReservaCreada cambió (canalVenta añadido)"
    strategy: replay
```

El linter ya avisa (`projection-rebuild`) cuando una projection no declara estrategia —
ese aviso existe precisamente para que este plan sea ejecutable.

## 6. Cambios breaking y el informe

No todo es automatizable. El diff clasifica cada cambio como `SAFE` / `NEEDS_DEFAULT` /
`BREAKING` (p.ej. renombrar un topic consumido por un sistema externo declarado en
`externalSystems`, o borrar un campo con datos). Los BREAKING se listan en un informe y
**la generación se detiene** hasta que el usuario resuelva (política explícita en el modelo
o flag `--accept-breaking`).

## 7. Encaje con IA

El flujo IA→spec multiplica el valor de esto: la IA propone un modelo nuevo, modux hace el
diff contra el actual y **enseña las consecuencias** (qué migra, qué rompe, qué hay que
rellenar) antes de tocar nada. El diff es el "explain plan" del cambio de modelo.

## 8. Plan de implementación

1. **Fase 1 — snapshot + diff.** Guardar `generated-model.yaml`; computar `ModelChangeSet`
   (add/drop/rename por id) y mostrarlo como informe (sin generar artefactos todavía).
2. **Fase 2 — migraciones DDL.** Emitir Flyway incremental para ADD/RENAME/DROP de campos
   y agregados relacionales.
3. **Fase 3 — upcasters** para agregados event-sourced + bump de schemaVersion.
4. **Fase 4 — plan de rebuild** de projections + clasificación breaking + gate.
5. **Fase 5 — defaults interactivos** y políticas de resolución en el propio modelo.
