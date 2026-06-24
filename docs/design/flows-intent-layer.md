# Capa de intención: `flows`

> Estado: **implementado** (primera versión). Diseño original conservado abajo; ver
> §12 para el estado de implementación.

## 1. El problema

El metamodelo actual describe el **mecanismo** del sistema: cada pieza y cada cable.
Para expresar un único flujo conceptual —*"al grabar una reserva en Reservas, se
materializa localizador+titular en FrontOffice"*— hoy hay que declarar a mano **6 conceptos**
y mantener consistentes decenas de referencias cruzadas por ID:

- un **DomainEvent** (`ReservaCreada`) marcado para publicar
- un **IntegrationEvent** (`topicName`, `partitions`, `retentionMs`, `serializationFormat`,
  `compressionType`, `deadLetterQueue`, `schemaVersion`, `routingKeyField`…)
- un **Model** con la forma del payload
- un **ReadModel** en el contexto destino (`storageType`, `consistency`)
- una **Projection** (`handlers`, `rebuildStrategy`, `errorHandlingStrategy`, `snapshotFrequency`…)
- una **Subscription** (`eventName` + `sourceService` + `inputModelId` + `topicName` +
  `consumerGroup` + `idempotencyKeyField`…)

Esto tiene dos costes:

1. **Fragilidad** — la consistencia de los cross-refs por ID se mantiene a mano
   (mira las `subscriptions` del `model-driven-store.yaml`: cada una repite
   `eventName`/`sourceService`/`topicName`/`consumerGroup`/`modelMappingId`).
2. **La intención queda oculta** — leyendo el store ves 6 piezas sueltas, no
   "una reserva se materializa en frontoffice". Hay que reconstruirla mentalmente.

El nivel de detalle estructural **está bien y debe seguir existiendo**. Lo que falta es poder
declarar la **intención** a alto nivel y que el mecanismo se **infiera**.

## 2. Principio de diseño

**Capa de intención aditiva que se desazucara (desugar) en el modelo estructural.**

- `flows:` es lo que se edita: la **única fuente de verdad** del flujo.
- En generación, cada flow se expande a las piezas estructurales con **defaults por convención**.
- El nivel estructural **no desaparece**: es la forma "compilada" y el *escape hatch*.
  Un bloque `overrides:` permite tocar cualquier perilla sin renunciar a la inferencia.

Resultado: *progressive disclosure*. El 90% de los flujos se declaran en pocas líneas;
el 10% complejo baja al detalle solo donde hace falta.

### Precedente en el propio modelo

No partimos de cero. El store ya usa `publishAsIntegrationEvent: true` sobre domain events:
eso **ya es inferencia** (un evento marcado así implica su IntegrationEvent). `flows` extiende
esa misma idea al flujo completo.

## 3. Decisión de arquitectura: dónde ocurre el desugar

| Opción | Qué hace | Veredicto |
|---|---|---|
| **A. Expandir-y-persistir** | el flow crea las piezas en el store y luego se editan sueltas | ❌ produce **drift**: intención y piezas divergen |
| **B. Derivar en generación** | el flow es la fuente de verdad; las piezas se materializan al generar; `overrides:` para lo puntual | ✅ **una sola fuente, sin drift** |

**Recomendación: B.** Las piezas estructurales derivadas son visibles (p.ej. en una vista
"expandida" de solo lectura en la UI) pero no se editan directamente cuando provienen de un flow;
se ajustan vía `overrides`.

> Pieza pre-existente (declarada directamente, sin flow) sigue siendo válida y editable como hoy.
> `flows` es aditivo, no excluyente.

## 4. Vocabulario de arquetipos

Casi todos los flujos enterprise caen en cuatro arquetipos. Cada uno "sabe" qué piezas emitir.

| Arquetipo | Intención | Piezas que infiere |
|---|---|---|
| **`materializes`** | evento en A → read model en B | DomainEvent + IntegrationEvent + Model + ReadModel + Projection + Subscription |
| **`triggers`** | evento en A → use case en B (coreografía) | DomainEvent + IntegrationEvent + Subscription(action=CallUseCase) + ModelMapping |
| **`orchestrates`** | proceso multi-paso con compensación | Saga + Subscriptions/Gateways de cada paso |
| **`notifies`** | evento → sistema externo | DomainEvent + IntegrationEvent + Gateway/adapter de salida |

`materializes` y `triggers` cubren ya lo que hoy está cableado a mano en el store del hotel
(`projections`/`readModels` y `sub-frontoffice-reservaCreada → uc-crearEstancia`,
respectivamente). `orchestrates` y `notifies` se añaden después.

## 5. Sintaxis propuesta

**Gramática de `when`** (decisión §10.1): una línea `<Contexto>.<Agregado> <evento>`, con un
único token de evento. Se resuelve internamente a `{context, aggregate, event}`.

### 5.1 `materializes` (el ejemplo)

```yaml
flows:
  - name: ReservaVisibleEnFrontOffice
    when: Reservas.Booking recorded         # operación/evento que dispara
    materializes:                            # arquetipo
      in: FrontOffice                        # bounded context destino
      as: BookingSummary                     # nombre del read model
      fields: [locator, holder]              # subconjunto que cruza la frontera
```

### 5.2 `triggers`

```yaml
flows:
  - name: ReservaCreaEstancia
    when: Reservas.Booking recorded
    triggers:
      in: FrontOffice
      useCase: CrearEstancia
      with: { localizador: locator, titular: holder }   # mapping origen → input del UC
```

## 6. Reglas de inferencia y convenciones

A partir de `when: Reservas.Booking recorded` + el arquetipo, se deriva:

| Pieza | Convención por defecto |
|---|---|
| DomainEvent | nombre del verbo sobre el agregado (`BookingRecorded`); `publishAsIntegrationEvent` si cruza contexto |
| IntegrationEvent · topic | `<proyecto>.<servicio-origen>.<evento-kebab>` → `hotel.reservas.reserva-creada` |
| IntegrationEvent · formato | JSON, `schemaVersion: v1`, `replayable: true`, DLQ on |
| Model (payload) | exactamente los `fields` declarados |
| ReadModel | `storageType: table`, `consistency: eventual` |
| Projection | handler `<evento> → upsert <readModel>`, `rebuildStrategy: replay`, `errorHandling: retry` |
| Subscription | `sourceService` = contexto origen, `consumerGroup` = contexto destino, idempotencia on (key = id natural), DLQ on |

Todas las convenciones son **override-able** (ver §7).

## 7. Escape hatch: `overrides`

```yaml
flows:
  - name: ReservaVisibleEnFrontOffice
    when: Reservas.Booking recorded
    materializes:
      in: FrontOffice
      as: BookingSummary
      fields: [locator, holder]
    overrides:
      integrationEvent: { partitions: 6, retentionMs: 604800000 }
      readModel:        { storageType: document }
      subscription:     { idempotencyKeyField: bookingId, consumerGroup: frontoffice-reservas }
```

Solo se listan las perillas que se desvían de la convención.

## 8. Encaje en el metamodelo

- `Flow` es un concepto nuevo a nivel de **Service/Module** (un aggregate más en el generador,
  con su Id/Name/VOs, persistencia y UI, como el resto).
- En el pipeline de generación se inserta un paso de **expansión** previo a los generadores
  actuales: `Flow → {IntegrationEvent, ReadModel, Model, Projection, Subscription, …}` derivados.
- Los generadores de IntegrationEvent/ReadModel/Projection/Subscription **no cambian**:
  consumen las piezas, vengan declaradas directamente o derivadas de un flow.
- Trazabilidad: cada pieza derivada lleva referencia a su `flowId` de origen (para la vista
  expandida y para no duplicar si ya existe una pieza equivalente declarada a mano).

## 9. Validación del diseño

Criterio de éxito del prototipo: que un `flows:` con `materializes` **reproduzca**
exactamente las `projections` + `readModels` + `integrationEvents` + `subscriptions` que hoy
están cableadas a mano en `model-driven-store.yaml` para el caso del hotel. Si el output
generado coincide, la inferencia es correcta.

## 10. Decisiones tomadas

> Decididas para poder avanzar. Si alguna resulta equivocada al implementar, se replantea.

1. **Gramática de `when` → cadena compacta con gramática estricta.**
   La forma autorada es una sola línea `<Contexto>.<Agregado> <evento>`, p.ej.
   `Reservas.Booking recorded`. La ambigüedad se elimina fijando la gramática: exactamente
   un contexto, un agregado y **un único token** de evento/verbo (sin espacios en el verbo;
   usar kebab/camel si hace falta). Es legible *y* parseable, y no añade verbosidad.
   Internamente se resuelve a `{context, aggregate, event}`. (Descartado: campos explícitos
   por verbosos; texto libre multi-palabra por ambiguo.)

2. **Resolución de nombres → el agregado debe existir; el evento puede inferirse.**
   `when` referencia un agregado ya declarado (error si no existe). El DomainEvent puede no
   existir aún: si falta, el flow lo crea por convención (§6); si existe, lo reutiliza.

3. **Convivencia con piezas a mano → reutilizar por match y avisar.**
   Si ya hay una pieza equivalente (match por nombre/topic), el flow la reutiliza en lugar de
   duplicar, y emite un aviso. Los valores de `overrides` del flow tienen prioridad sobre los
   defaults, pero **no** pisan una pieza declarada a mano sin aviso explícito (se reporta el
   conflicto).

4. **Multi-destino → flows separados.**
   Un `materializes`/`triggers` apunta a **un** contexto destino. Materializar en varios
   contextos = varios flows. Más legible y más fácil de trazar.

5. **`flows` es aditivo, no reemplaza la edición directa.**
   Las piezas declaradas a mano siguen siendo válidas y editables. `flows` convive con ellas;
   no hay migración forzada.

## 11. Plan de implementación (por fases)

1. **Fase 0 — este RFC.** Consensuar arquetipos, sintaxis y convenciones.
2. **Fase 1 — `materializes` end-to-end.** Concepto `Flow` + expansor + reproducir el caso
   del hotel (§9).
3. **Fase 2 — `triggers`.** Cubrir la coreografía `evento → use case`.
4. **Fase 3 — `notifies` y `orchestrates`.**
5. **Fase 4 — UI** de edición de flows + vista expandida (solo lectura) de las piezas derivadas.

## 12. Estado de implementación

Implementado en el módulo `model-driven-generator`:

- ✅ **Concepto `Flow`** cableado en todas las capas (dominio, persistencia, query, repositorio,
  casos de uso, CRUD UI en *Patrones › Flows*) y expuesto en el JSON schema del modelo.
- ✅ **Expansor** (`FlowExpander`) para los **cuatro arquetipos** `materializes` / `triggers` /
  `notifies` / `orchestrates`, con defaults por convención (§6) y cubierto por tests unitarios.
- ✅ **Resolver de contexto** (`FlowExpansionContextResolver`): deriva proyecto/servicio/agregado,
  módulo destino y tipos de campo desde el modelo.
- ✅ **Dedup** contra piezas declaradas a mano (`FlowExpansionService` / `FlowStoreMaterializer`,
  decisión §10.3): reutiliza por match y avisa.
- ✅ **Integración en generación** (`GenerateCodeUseCase`, decisión B §3): materializa las piezas
  derivadas en el store en memoria, genera, y restaura — los flows siguen siendo la única fuente de
  verdad en disco.
- ✅ **Documentación** publicada en el manual (`/manual/flows/`).

Refinamientos pendientes (no bloqueantes):

- Gramática compacta de `when` (§10.1): hoy el `when` se modela con campos
  (`triggerAggregateId` + `triggerEvent`); el azúcar de una línea aún no se parsea.
- `triggers`: el mapping del `with` (renombrados origen→destino) es hoy una identidad; los
  renombrados quedan como override.
- `notifies`: versión mínima (publica el evento de integración saliente); un adaptador de salida
  externo explícito queda para más adelante.
- Vista expandida de solo lectura de las piezas derivadas en la UI (Fase 4).
