# Cuerpo modelado de las operaciones (`steps` en toda operación)

> Estado: **RFC**; **Fase 1 (schema + migración) implementada** — ver §11. Cierra el 4º peldaño
> de la escalera de autoría ("operaciones como pipeline") aplicándolo de forma **uniforme** a todo
> portador de comportamiento, no solo al caso de uso. Ver `flows-intent-layer.md` y
> `sequence-scenarios.md` para las capas hermanas.

## 1. El problema

Modux tiene cuatro portadores de comportamiento, y solo uno tiene el cuerpo modelado:

| Portador | Cómo se modela su cuerpo hoy | Qué se genera |
|---|---|---|
| **Caso de uso** (= servicio de aplicación) | `steps: [UseCaseStep]` — pipeline tipado, ordenado, con referencias por id | código real (`usecase-steps.ftl`); solo los pasos `Custom` quedan como stub *developer-owned* |
| **Método de agregado** (`OperationEntity`) | `preconditions`, `sets`, `emits`, `intent` — **strings sueltos** | un stub que lanza `UnsupportedOperationException` (`aggregate-operation-default.ftl`); el cuerpo entero es artesanal o IA |
| **Operación de servicio de dominio** (`DomainService.operations`, mismo `OperationEntity`) | igual de limitado | igual: sin cuerpo modelado |
| **Servicio de aplicación** | no existe como tipo aparte: **es** el caso de uso | cubierto por `steps` |

La asimetría: el caso de uso puede decir "lee el agregado → llama a esta operación → publica
este evento → llama a este gateway", cada paso de primera clase, referenciando por **id** y
validado por el linter. El método de agregado y el de servicio de dominio solo pueden declarar,
en prosa, qué comprueban / qué campos tocan / qué evento lanzan. No hay secuencia, no hay
referencia por id, no hay generación de cuerpo — solo un stub que lanza excepción.

El resultado es que la intención de *lo que ocurre dentro de una operación de dominio* queda
fuera del modelo. Se pierde trazabilidad (¿qué operación publica el evento `X`? ¿qué método
llama a qué?), se pierde verificación (nada impide un `emits` a un evento inexistente porque es
texto libre) y se pierde generación (el cuerpo siempre es manual).

## 2. El concepto

**Un cuerpo modelado — `steps` — para toda operación, con un único vocabulario de pasos y un
subconjunto legal por portador.**

Se generaliza el `steps` del caso de uso a `OperationEntity`. Cada paso es de primera clase,
referencia por id y lo valida el linter, exactamente como en el caso de uso. Lo que cambia entre
portadores no es la forma del paso, sino **qué tipos de paso son legales** — y eso lo fija la
tesis del producto: el agregado es puro (solo invariantes y su propio estado), el servicio de
dominio coordina dominio sin I/O de infraestructura, y el I/O vive en la capa de aplicación (el
caso de uso).

```yaml
# Método de agregado: check → mutar → emitir. Puro, sin I/O.
operations:
  - name: confirmar
    intent: "Confirma la reserva si está pendiente y no ha caducado"
    steps:
      - { type: CheckPrecondition, name: estaPendiente }      # guarda
      - { type: SetField, name: marcarConfirmada }            # muta su propio estado
      - { type: PublishDomainEvent, name: emitirConfirmada, domainEventId: ev-reserva-confirmada }
```

```yaml
# Operación de servicio de dominio: coordina agregados, sin gateways.
operations:
  - name: reasignarHabitaciones
    steps:
      - { type: ReadAggregate, name: cargarPlano, aggregateId: agg-plano }
      - { type: CallAggregateOperation, name: liberar, aggregateId: agg-habitacion, operationId: op-liberar }
      - { type: SaveAggregate, name: guardar, aggregateId: agg-habitacion }
      - { type: PublishDomainEvent, name: emitir, domainEventId: ev-habitaciones-reasignadas }
```

El caso de uso no cambia: ya tiene `steps` con el vocabulario completo, incluido `CallGateway`.

### 2.1 Control de flujo: pasos que anidan pasos

Un pipeline **lineal** no basta: un cuerpo real tiene condicionales y bucles. El control de
flujo son **pasos de primera clase que contienen otros pasos** (anidamiento estructurado), no un
grafo de nodos y aristas. `If` lleva `then`/`else`; `ForEach` lleva `body`:

```yaml
operations:
  - name: liberarHabitacionesLibres
    steps:
      - type: ForEach
        name: porCadaHabitacion
        collection: "reserva.habitaciones"     # expresión sobre entrada/estado (§ expresiones)
        itemVar: habitacion
        body:
          - type: If
            name: siOcupada
            condition: "habitacion.ocupada"
            then:
              - { type: CallAggregateOperation, aggregateId: agg-habitacion, operationId: op-liberar, name: liberar }
            else:
              - { type: Custom, name: registrarYaLibre }
```

Genera Java estructurado directo (`for (var habitacion : …) { if (…) { … } else { … } }`), que es
**reducible por construcción**: no hay saltos arbitrarios ni grafos irreducibles. El editor
gráfico lo dibuja como bloques anidables (arrastras un paso *dentro* del `then` de un `If`), estilo
Blockly/Scratch/Unreal Blueprint — ver §8. Tipos de control de flujo: `If`, `ForEach` (y, más
adelante, `While` y `TryCompensate`). Son **legales en todo portador**: solo estructuran los pasos
de acción que ya sean legales para ese portador (§3).

Las **expresiones** de `condition`/`collection` reutilizan el mismo lenguaje que las condiciones de
invariante (`InvariantConditionEntity.expression`); la gramática exacta queda como pregunta abierta
(§12).

### 2.2 Por qué anidamiento y no un grafo de gateways

Los workflows usan un grafo (`Split EXCLUSIVE`/`PARALLEL` + `Join`) porque orquestan **entre
contextos**, donde importan el paralelismo real y los joins entre servicios. Dentro de **un método**
eso sobra y hace daño: un grafo con aristas arbitrarias puede ser irreducible (no traducible a
`if`/`for` estructurados sin `goto`), y un método no necesita paralelismo distribuido. El
anidamiento estructurado garantiza código limpio y determinista. Es la misma distinción de niveles
que `sequence-scenarios.md` §4 hace entre interacción y workflow: mismo aire visual, mecanismo
distinto por nivel.

## 3. Vocabulario legal por portador (decisión: opción A)

`CallGateway` —y todo I/O de infraestructura— vive **solo** en el caso de uso. El agregado y el
servicio de dominio se quedan puros. Esta es la decisión A de las tres barajadas (B: el servicio
de dominio también podría llamar gateways; C: cualquiera, incluido el agregado). Se elige A
porque preserva la tesis "agregado = solo invariantes" y mantiene la frontera hexagonal: el
puerto a infraestructura lo cruza la capa de aplicación.

| Tipo de paso | Método de agregado | Servicio de dominio | Caso de uso |
|---|:---:|:---:|:---:|
| `CheckPrecondition` | ✅ | ✅ | ✅ |
| `SetField` (muta estado propio) | ✅ | — | — |
| `PublishDomainEvent` | ✅ | ✅ | ✅ |
| `CallAggregateOperation` | ✅ (sobre sí mismo) | ✅ | ✅ |
| `ReadAggregate` | — | ✅ | ✅ |
| `SaveAggregate` | — | ✅ | ✅ |
| `ApplyModelMapping` | — | ✅ | ✅ |
| `CallDomainService` | — | ✅ | ✅ |
| `CallGateway` | — | — | ✅ |
| `CallExternalUseCase` | — | — | ✅ |
| `CallQueryService` | — | — | ✅ |
| `PublishApplicationEvent` | — | — | ✅ |
| `CallUseCase` | — | — | ✅ |
| `Custom` (escape hatch) | ✅ | ✅ | ✅ |
| `If` / `ForEach` (control de flujo, §2.1) | ✅ | ✅ | ✅ |

Notas:

- **`SetField`** solo en el agregado: es el único portador con estado propio que mutar. El
  servicio de dominio y el caso de uso mutan estado *a través de* operaciones de agregado
  (`CallAggregateOperation`) y `SaveAggregate`.
- **`CallDomainService`** es un tipo de paso nuevo (hoy no existe en `UseCaseStepType`): permite
  que un servicio de dominio invoque a otro, y que un caso de uso invoque a un servicio de
  dominio. Requiere un `domainServiceId` + `operationId` en el paso.
- **`Custom`** sigue siendo el escape hatch en todos: se genera como stub *developer-owned*
  (nunca se sobreescribe), igual que hoy en el caso de uso.

## 4. Encaje en el metamodelo

- **`OperationEntity` gana `steps: [OperationStepEntity]`.** Se reutiliza la forma de
  `UseCaseStepEntity` (mismos campos de referencia: `aggregateId`, `operationId`, `domainEventId`,
  `gatewayId`, `gatewayOperationId`, `modelMappingId`, `queryServiceId`, `queryOperationId`,
  `customCodeId`, `applicationEventId`, `useCaseId`, `intent`, `name`) más el nuevo
  `domainServiceId`, y un `type` de un enum compartido.
- **Un solo enum de tipos de paso.** Se generaliza `UseCaseStepType` a `StepType` (o se deja
  `UseCaseStepType` y `OperationStepEntity` lo reutiliza) añadiendo `CheckPrecondition`, `SetField`
  y `CallDomainService`. `UseCaseStepType` ya tiene: `Custom`, `ReadAggregate`,
  `CallAggregateOperation`, `SaveAggregate`, `CallGateway`, `CallExternalUseCase`,
  `PublishDomainEvent`, `PublishApplicationEvent`, `CallUseCase`, `CallQueryService`,
  `ApplyModelMapping`.
- **`preconditions`/`sets`/`emits` no desaparecen de golpe.** Se mantienen como campos legados
  y se **desazucaran** a pasos en la carga/migración (§7). El campo `intent` sobrevive como la
  descripción en prosa de la intención global de la operación (sigue alimentando
  `mvn modux:ai-complete` para los pasos `Custom`).
- **Integridad referencial.** Cada `*Id` del paso se valida como el resto (regla 1 del skill):
  `domainEventId` colgante, `gatewayOperationId` colgante, etc. El linter ya cubre esto para el
  caso de uso; se extiende a los pasos de operación.

## 5. Generación

El patrón ya existe en el caso de uso (`usecase.ftl` itera los pasos con datos enriquecidos en
Java) y se replica en dos peldaños:

- **Fase 3 (hecho) — esquema-guía.** `aggregate-operation-default.ftl` renderiza los `steps`
  (explícitos o desazucarados) como un **esquema estructurado e indentado** que refleja el
  anidamiento de `If`/`ForEach` y cada paso, dentro del impl *write-once* developer-owned. Es
  100% comentarios `//` + `throw`, así que compila siempre y guía la implementación — el modelo ya
  alimenta el código en vez del `throw` a ciegas.
- **Fase 3b (hecho) — estructura ejecutable con hooks de dos zonas.** Cuando la operación tiene
  `steps` explícitos, `execute` genera la **estructura de control real** —`if (!pred(context)) throw
  …` para `CheckPrecondition`, `if (cond(context)) { … } else { … }`, `for (var it : coll(context)) {
  … }`— y delega **cada hoja** (predicado, colección, efecto, mutación) a un **hook tipado**
  `(context, variablesDeBucle…)` que el desarrollador implementa. Es el patrón de dos zonas de los
  pasos `Custom` del caso de uso, generalizado: **compila siempre** (la estructura es cerrada y los
  hooks están *stubbed* con un `throw`), y la estructura es ejecutable de verdad. Las variables de
  bucle se enhebran como parámetros del hook (`ocupada(context, h)`), así que el anidamiento
  funciona a cualquier profundidad. Cubierto por `AggregateOperationScaffoldTest`.
- **Por qué hooks y no inline de expresiones.** Inlinear `condition`/`collection`/valores como Java
  crudo no compila de forma fiable (imports de tipos, `SetField` sin valor, y el evento es un
  `record {Evento}Event(schemaVersion, aggregateId, …campos)` sin constructor vacío → sin mapeo de
  payload no hay `new …Event(…)` válido). El hook mueve esa incertidumbre a un método tipado que el
  desarrollador rellena, sin sacrificar la compilación. Emitir eventos/mutaciones **inline** (no como
  hook) queda para cuando se modele el payload y una gramática de expresiones (§12).
- **Dos zonas** (`two-zone-codegen.md`): el impl vive en la zona custom (write-once); la estructura
  generada + los stubs de hook se andamian una vez y el desarrollador los completa.

## 6. Validación (linter)

- **`operation-step-illegal-for-carrier` (ERROR):** ✅ un paso de tipo no permitido para su portador
  — p. ej. `CallGateway` dentro de un método de agregado, o `SetField` en un servicio de dominio.
  Es la regla que hace cumplir la tabla de §3; recorre también las ramas de control de flujo.
- **`operation-step-dangling-ref` (ERROR):** ✅ cubierto por la integridad referencial general (el
  walk recursivo de `CatalogReflection` alcanza los `*Id` de los pasos, anidados incluidos).
- **`operation-body-vs-legacy-fields` (WARNING):** una operación con `steps` **y** con
  `emits`/`sets`/`preconditions` no vacíos tras la migración — señal de desazúcar incompleto.
- **`aggregate-step-purity` (WARNING → ERROR):** refuerza §3 para el agregado; separado de la
  regla general para dar un mensaje específico sobre la tesis de pureza.

## 7. Migración

`emits`/`sets`/`preconditions` son strings hoy. Al cargar un store antiguo:

- `preconditions` (una o varias, separadas) → pasos `CheckPrecondition` al inicio.
- `sets` → paso(s) `SetField`.
- `emits` → paso(s) `PublishDomainEvent`; si el nombre casa con un `domainEvent` existente se
  enlaza por id, si no, se deja el texto en `intent` del paso y se emite el warning
  `operation-step-dangling-ref` para que el autor lo resuelva.
- El `intent` de la operación se conserva intacto.

La migración es **aditiva y reversible en revisión**: produce los `steps`, deja los campos
legados vacíos, y el warning `operation-body-vs-legacy-fields` marca cualquier resto. Ids
preservados — nada que referencie la operación se rompe.

## 8. La superficie (UI): diseño de proceso por arrastrar y soltar

El cuerpo de una operación se **monta gráficamente**: cada paso es un nodo que se arrastra desde
una paleta, y el control de flujo (`If`/`ForEach`) son **nodos de primer nivel** que aceptan otros
pasos dentro (bloques anidables, estilo Blockly/Unreal Blueprint) — no un lienzo de nodos-y-cables
libre. Arrastrar un paso al `then` de un `If` lo mete en esa rama; reordenar arrastra dentro de la
lista; arrastrar un evento de dominio a un paso lo convierte en `PublishDomainEvent`.

- **Paleta filtrada por portador** (§3): al editar un método de agregado no se ofrece `CallGateway`;
  el lint `operation-step-illegal-for-carrier` es la red de seguridad si se edita el YAML a mano.
- **Un fichero-vista de un solo tipo.** El cuerpo se edita en una vista **de tipo único** —"diseño
  de proceso"— no en un documento multi-lente. En la capa de lienzo (`catalog-and-views.md` §12) es
  un `*.modux-view.yaml` con `kind: operation-flow` (referencia la operación por id), hermano de
  `context-map`/`ui`/`aggregates`. Un fichero = una lente; no se rota entre vistas dentro del mismo
  documento. Esto **generaliza** la dirección "cada fichero es de un tipo" que hoy conviven a medias
  las pestañas del editor gráfico (EventStorming/context-map/Workflows/Secuencias sobre un mismo
  modelo); su encaje pleno pertenece a `catalog-and-views.md` (§12), este RFC solo lo consume.
- CRUD por YAML sigue siendo la fuente de verdad; la UI es aditiva.

**Estado (Fase 5).** Base aterrizada en el editor: `editor/src/derive-operation-flow.ts` —función
**pura** que lee el cuerpo modelado (steps) como un **grafo de nodos de render** (categoría,
etiqueta, ramas de control de flujo `then`/`else`/`body`), hermana de `derive-interaction.ts`, con
tests vitest y type-check limpio. Es la capa "modelo → grafo" que cualquier renderer consume.
*Follow-up (feature frontend propia):* el web-component interactivo `modux-operation-flow`
(renderer de bloques anidables + gestos de arrastrar-soltar + paleta filtrada por portador + undo +
persistencia a los steps), el `kind: operation-flow` de la capa de lienzo, el wiring del plugin de
IDE y los tests Playwright — hermano de `modux-sequence`/`modux-page-designer`.

## 9. Decisiones tomadas

1. **Vocabulario legal → opción A (gateways solo en el caso de uso).** El agregado y el servicio
   de dominio se quedan puros. Confirma la tesis "agregado = solo invariantes" y la frontera
   hexagonal. (Descartadas: B, gateways también en servicio de dominio; C, en cualquiera.)
2. **Un solo vocabulario de pasos con subconjunto legal por portador**, no vocabularios
   separados. Menos conceptos, un solo renderer, un solo generador de pasos; la restricción vive
   en un lint, no en tipos duplicados.
3. **`preconditions`/`sets`/`emits` se desazucaran, no se borran de golpe.** Migración aditiva
   con warning que marca restos. El `intent` sobrevive como descripción global.
4. **`SetField` solo en el agregado.** Es el único portador con estado propio; los demás mutan
   vía `CallAggregateOperation` + `SaveAggregate`.
5. **Control de flujo por anidamiento estructurado, no por grafo de gateways** (§2.1–2.2). `If`/
   `ForEach` contienen pasos hijos; garantiza código reducible y determinista. (Descartado: grafo
   nodos+aristas tipo workflow, apropiado para orquestación entre contextos, no para un método.)
6. **El cuerpo se authora en una vista de un solo tipo** ("diseño de proceso", `kind:
   operation-flow`), no en un documento multi-lente. Consume la capa de lienzo de
   `catalog-and-views.md` §12; el encaje pleno del "un fichero, un tipo" vive allí.

## 10. Alternativas consideradas

- **Vocabularios de paso separados por portador** (un enum para agregado, otro para caso de uso):
  duplica tipos, renderers y generadores para expresar la misma idea. La restricción por lint
  captura la diferencia sin duplicar.
- **Dejar el cuerpo del agregado como prosa + IA** (el estado actual): la intención de lo que
  ocurre dentro sigue fuera del modelo, sin trazabilidad ni verificación. Es justo el hueco que
  este RFC cierra.
- **Permitir `CallGateway` en el agregado** (opción C): máxima flexibilidad, pero rompe la pureza
  del agregado y difumina la frontera hexagonal — un agregado dejaría de ser testeable sin
  infraestructura.
- **Control de flujo como grafo de gateways** (reutilizar `Split`/`Join` de los workflows dentro de
  la operación): admite grafos irreducibles que no traducen a código estructurado sin `goto`, y
  arrastra al método un modelo pensado para orquestación distribuida. El anidamiento estructurado da
  el mismo poder expresivo (condición, bucle) con generación limpia.

## 11. Plan de implementación (por fases)

1. **Fase 0 — este RFC.** Consensuar vocabulario legal, forma del paso y control de flujo.
2. **Fase 1 — schema + migración.** ✅ *Implementada.* `OperationEntity.steps` +
   `OperationStepEntity` **recursivo** (`then`/`else`/`body` anidan pasos, `@JsonProperty("else")`
   por la palabra reservada). El vocabulario se **reutiliza** desde `UseCaseStepType` (decisión
   §9.2), ampliado con `CheckPrecondition`/`SetField`/`CallDomainService`/`If`/`ForEach`; `StepPhase`
   gana `GUARD` y `CONTROL`. El nombre `UseCaseStepType` se conserva (rename a `StepType` = deuda
   cosmética, sin cambio de diseño). Migración §7 como utilidad **pura y no destructiva**
   (`OperationBodyDesugar`: legado → steps), probada en aislamiento; **aplicarla en carga/generación
   se difiere a Fase 3**, cuando el generador consume los steps — así no se muta ningún store en
   disco antes de que sirva. Schema regenerado en los 9 samples; cubierto por `OperationBodyTest`.
3. **Fase 2 — linter.** ✅ *Implementada.* Regla `operation-step-illegal-for-carrier` (ERROR) que
   hace cumplir la tabla de §3, recorriendo también las ramas de control de flujo (`then`/`else`/
   `body`) — un `CallGateway` enterrado en el `else` de un `If` de agregado se detecta. La política
   de legalidad vive en un VO de dominio reutilizable, `OperationCarrier` (misma fuente para el lint
   y la paleta de UI de la Fase 5). La **integridad referencial de los pasos anidados sale gratis**:
   el walk por reflexión de `CatalogReflection` ya recorre listas de records y recursa en
   `OperationStepEntity` (incluidos `then`/`else`/`body` y el nuevo `domainServiceId`); fijado con
   test. Cubierto por `OperationStepLegalityTest`. (Las variantes WARNING de §6 —`aggregate-step-purity`,
   `operation-body-vs-legacy-fields`— quedan: la primera la subsume esta regla con mensaje
   específico; la segunda es un aviso de migración, propio de la Fase 3.)
4. **Fase 3 — generación del agregado.** ✅ *Implementada (scaffold).* `aggregate-operation-default.ftl`
   deja de emitir un `throw` a ciegas: renderiza el **cuerpo modelado** —los `steps` explícitos o el
   desazúcar de los campos legados (`OperationBodyDesugar`, cableado en `GenerateCodeUseCase`)— como
   un **esquema estructurado e indentado** que refleja el anidamiento de `If`/`ForEach` y cada paso
   de acción, dentro del impl *write-once* developer-owned. Todo son comentarios `//` + el `throw`,
   así que **compila siempre** hasta que el desarrollador lo completa. Cubierto por
   `AggregateOperationScaffoldTest`; los e2e de generación siguen verdes.
   *Bloqueo descubierto para el cuerpo 100% generado y compilable (→ Fase 3b):* el
   `{Aggregate}OperationContext` no expone un sumidero de eventos (no hay dónde emitir un
   `PublishDomainEvent`), `SetField` no lleva expresión de valor, y `condition`/`collection` son
   texto libre sin gramática. Generar Java real exige enriquecer contexto + schema (ver §12).
5. **Fase 3b — estructura ejecutable (agregado).** ✅ *Implementada.* Para operaciones con `steps`
   explícitos, `execute` genera control de flujo real (`if`/`for`/guardas) con **hooks de dos zonas
   tipados** por hoja (predicado→`boolean`, colección→`Iterable<Object>`, efecto→`void`), variables
   de bucle enhebradas como parámetros. Compila siempre; el legado sigue con el esquema-guía de la
   Fase 3. `AggregateOperationScaffoldTest`. (Emisión de eventos/mutaciones *inline* —no vía hook—
   queda para 3c: requiere modelar el payload del evento y una gramática de expresiones, §12.)
6. **Fase 4 — generación del servicio de dominio.** ✅ *Implementada (primer corte).* Antes no
   generaban **nada**; ahora sí. Propiedad resuelta sin cambiar el modelo: un servicio de dominio
   pertenece al bounded context que lo lista en `domainServiceIds` (back-reference ya existente), así
   que se genera en su contexto —interfaz coordinadora `{Servicio}` en `…domain.services` + impl
   developer-owned `Default{Servicio}` en la zona custom, con el **esquema-guía** de cada operación
   (`domain-service.ftl` + `domain-service-operation-default.ftl`). Cubierto por
   `DomainServiceScaffoldTest`; los e2e de generación (samples con servicios de dominio) siguen
   verdes. *Follow-up:* la estructura ejecutable con hooks (como el agregado en 3b) para servicios de
   dominio requiere nombrar hooks por operación para evitar colisiones en una clase con varios
   métodos; el primer corte usa esquema-guía uniforme.
7. **Fase 5 — UI.** ◐ *Base implementada.* `editor/src/derive-operation-flow.ts`: derivación
   **pura** cuerpo→grafo de nodos (categoría + etiqueta + ramas de control de flujo), con tests
   vitest y type-check limpio — la capa "modelo → grafo" que consume el renderer. *Pendiente (feature
   frontend propia):* el web-component `modux-operation-flow` (bloques anidables, gestos
   arrastrar-soltar, paleta por portador, undo, persistencia), el `kind: operation-flow`, el wiring
   del plugin y Playwright — hermano de `modux-sequence`/`modux-page-designer` (§8).

## 12. Preguntas abiertas

Se llevan a la [comunidad de Discord](../../README.md) según se implementen:

- ¿`CallDomainService` desde un servicio de dominio necesita guardas contra ciclos (A llama a B
  llama a A), o basta el DAG que ya se exige a workflows/sagas?
- ¿El desazúcar de `emits` con varios eventos separados por coma es suficiente, o hace falta una
  gramática explícita como la de `when` en flows (§10.1 de `flows-intent-layer.md`)?
- **Fase 3b/3c — todo son hooks (el inline se revirtió).** La estructura ejecutable se genera con
  hooks de dos zonas tipados, que compilan siempre; **toda hoja** (guarda, mutación, evento, call,
  custom) es un hook. Se intentó inline de `SetField` (`context.campo(valor)`, 3c), pero el
  **dogfooding lo tumbó**: el tipo del setter del contexto no casa con un valor de texto libre (p.
  ej. un campo `status` se modela como `String`, no acepta `Status.CONFIRMED`) y además faltan
  imports. El `value` se conserva en el modelo y se muestra en el esquema-guía, pero **no se
  inlinea**. Inline compilable requeriría resolver el tipo Java del campo y sus imports (un
  *value-hook* tipado) + modelar el payload del evento + una gramática de expresiones (§12): queda
  como mejora futura opt-in, con los hooks como camino por defecto.
- **Cosmético:** la estructura generada no está indentada (Java lo ignora; el IDE reformatea). Un
  pretty-print del cuerpo generado es mejora menor.
