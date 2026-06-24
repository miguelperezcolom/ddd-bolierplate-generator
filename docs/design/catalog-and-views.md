# Catálogo y vistas: trabajar con modelos gigantescos

> Estado: **propuesta** (RFC). Fase **A1 implementada** (integridad referencial + `--modux.check`); el
> resto, sin implementar. Diseño para discusión. Ver §8.
> Relacionado: [`flows-intent-layer.md`](./flows-intent-layer.md), [`two-zone-codegen.md`](./two-zone-codegen.md).

## 1. El problema

Un sistema de información empresarial real tiene **miles** de elementos: agregados, use cases,
eventos, modelos, gateways, sagas, proyecciones… El store del ejemplo (un hotel) ya son ~1.550
líneas y ~207 elementos para **un** dominio. A escala real esto rompe por tres sitios:

1. **Almacenamiento / merge.** Un único fichero YAML cargado entero. Dos personas editando = conflicto
   de merge garantizado; el diff de un cambio de un campo toca un fichero de 50.000 líneas.
2. **Comprensión / navegación.** Nadie tiene 10.000 elementos en la cabeza. La UI de edición sobre una
   lista plana gigante es inmanejable. Falta una forma de decir "enséñame solo *esta* parte".
3. **Carga.** Leer y deserializar el modelo entero para cualquier operación no escala.

La idea de partida —tomada de [Archi](https://www.archimatetool.com/) / ArchiMate— es **catálogo +
vistas**: el elemento se define una vez en un catálogo; las vistas son cortes curados que lo
referencian. modux ya es medio Archi (ver §3); este RFC propone completar la otra mitad **sin perder
la garantía de una sola fuente de verdad** que es el alma del proyecto.

## 2. Objetivos y no-objetivos

**Objetivos**
- Que el modelo escale en **almacenamiento** (carga, diff, merge) sin reescribir la lógica de generación.
- Dar **cortes navegables** (vistas) para comprender y editar un subconjunto sin cargar/entender todo.
- Permitir **generación por slice** de forma segura (cerrada en dependencias).
- Mantener **integridad referencial** explícita cuando el modelo se reparte en muchos ficheros.

**No-objetivos**
- No es un editor gráfico de diagramas tipo Archi. Las vistas pueden *alimentar* diagramas/docs, pero
  el entregable es el corte semántico, no el lienzo.
- No se cambia el meta-modelo de elementos ni la generación. Catálogo y vistas son **infra + UX**.
- No se promete carga perezosa para la **generación completa** (ver §5.4): full-project sigue
  necesitando el grafo entero.

## 3. Principio rector y estado actual

> **Una vista es una proyección pura: referencia elementos, nunca los posee ni los copia.**
> Si una vista define o bifurca estructura, deja de haber una sola fuente de verdad y se rompe el
> determinismo de modux. Esto es innegociable.

modux **ya es un catálogo**, aunque no se decidió como tal:

- En disco: `AllData` = listas top-level de elementos tipados (`aggregates`, `useCases`, `models`…),
  cada uno con `id`, todo referenciado por id (`modelId`, `aggregateId`, …). Eso es el repositorio de
  Archi: definir-una-vez, referenciar-N-veces.
- En memoria (`CommonFileRepository.init()`): todo se aplana a **un `Map` keyed por (id, tipo)**.
  `findById` / `findAllOfType` / `save` / `putTransient` operan sobre ese mapa.

**Consecuencia clave de diseño:** el catálogo en memoria ya existe y es estable. Por eso el Track A
(almacenamiento granular) toca *solo* el on-disk + carga/guardado, **sin tocar el store en memoria ni
la generación**. Y el Track B (vistas) se apoya en el expander de *flows* que ya hace cierre de
dependencias.

## 4. Dos tracks complementarios (y distinguir el problema)

"Modelo gigantesco" mezcla dos problemas que se resuelven de forma **independiente**:

| Problema | Lo resuelve | Track |
|---|---|---|
| Almacenamiento, carga, diff, merge a escala | **Granularidad de ficheros** (no las vistas) | A |
| Comprensión, navegación, scope de edición, gen parcial | **Vistas** (proyecciones) | B |

Archi resuelve B de maravilla pero **no** A (Archi también carga el modelo entero y su fichero único
sufre igual). No confundirlos: las vistas no hacen que el modelo "quepa"; eso lo hace la granularidad.

## 5. Track A — Almacenamiento granular

### 5.1 Formato en disco

Sustituir el `model-driven-store.yaml` único por un **árbol de ficheros** bajo una raíz de modelo:

```
model/
├── index.yaml                      # manifest: lista de ficheros + checksum + versión de formato
├── projects/{id}.yaml
├── services/{id}.yaml
├── modules/{id}.yaml
├── aggregates/{id}.yaml            # un fichero por elemento
├── usecases/{id}.yaml
├── models/{id}.yaml
├── events/{id}.yaml
└── …                               # un subdirectorio por tipo
```

- **Granularidad por elemento** (un fichero por id) maximiza el diff/merge limpio y la edición
  concurrente. Alternativa más conservadora: **por contenedor** (un fichero por módulo con sus
  agregados/use cases dentro) — menos ficheros, peor para edición concurrente. Recomendado: por
  elemento para los tipos voluminosos (agregados, use cases, models, events), por contenedor para los
  pequeños/raros. (Pregunta abierta P1.)
- IDs **estables** (ya los hay) → renombrar el `name` no mueve el fichero.
- `index.yaml` permite descubrir el conjunto sin leer todos los ficheros y detectar ficheros huérfanos.

### 5.2 Carga y guardado

Aislar tras una interfaz `ModelStore` (o ampliar `CommonFileRepository`):

- **Lectura monolítica de hoy** y **lectura granular nueva** son dos implementaciones de la misma
  carga a `AllData` / al `Map` en memoria. El resto del sistema (generación, UI) no se entera.
- Guardado: `save(element)` escribe **solo** el fichero de ese elemento + actualiza `index.yaml`. Hoy
  `persist()` reescribe el store entero; granular reescribe un fichero.
- **Migración**: un comando `modux model split` convierte el YAML monolítico al árbol (y `merge` a la
  inversa), para no forzar la transición de golpe.

### 5.3 Integridad referencial

Repartir en ficheros hace visible un problema que **ya existe** hoy (oculto en el fichero único): los
`id` colgantes. Añadir una pasada `validateReferences()`:

- Recorre cada referencia (`modelId`, `aggregateId`, `gatewayId`, `useCaseId`, …) y comprueba que el id
  destino existe en el catálogo.
- Se ejecuta al cargar (warning) y como `modux model check` (error en CI).
- Reutilizable por las vistas (una vista con un miembro colgante es el mismo fallo).

### 5.4 Carga perezosa: alcance y límite honesto

La granularidad **habilita** lazy loading (cargar solo los ficheros de una vista/módulo), pero:

- La **generación full-project** resuelve el grafo entero (flows cross-module, FKs entre módulos,
  cierre de use cases) → probablemente seguirá cargando todo. Lazy loading optimiza **edición, UI y
  generación parcial**, no la generación completa. Hay que comunicarlo así para no vender de más.

## 6. Track B — Vistas

### 6.1 El elemento `View`

Un nuevo tipo de catálogo (es un elemento más, con su id), **puramente proyectivo**:

```yaml
- id: "view-checkin-journey"
  name: "Journey de check-in"
  description: "Todo lo que toca el check-in, de reservas a housekeeping"
  kind: "CURATED"          # o COMPUTED
  members:                 # solo para CURATED: ids de elementos
    - "reserva"
    - "uc-crearEstancia"
    - "ev-estanciaCreada"
  groups:                  # opcional: agrupar/anotar para navegación/docs
    - { name: "Reservas", members: ["reserva"] }
  # para COMPUTED, en vez de members:
  # query: { seed: "mod-frontoffice", expand: "DEPENDENCY_CLOSURE" }
```

Dos sabores:

- **Curada (`CURATED`)**: lista de ids elegida a mano. Buena para journeys/narrativas. Riesgo: se queda
  obsoleta cuando el modelo cambia → la pasada de integridad (§5.3) la mantiene honesta.
- **Computada (`COMPUTED`)**: una *query guardada* (semilla + regla de expansión). Se recalcula sola, no
  envejece. Para un generador es la más potente: p. ej. "bounded context = un módulo + su cierre".

### 6.2 Cierre de dependencias para generación

Las vistas son **para humanos**. Generar desde una vista cruda es peligroso: un use case arrastra sus
agregados, modelos, eventos, gateways… Una vista sin cerrar genera código roto.

Regla: **para generar, se expande la vista a su cierre de dependencias primero.** Ya existe la
maquinaria — `FlowExpander` / `FlowExpansionService` hacen exactamente este tipo de expansión derivada,
con `putTransient` para no persistir lo derivado. Un `ViewClosure` reutiliza ese patrón:
`seed members → resolver todas las referencias transitiva → conjunto cerrado → generar ese subconjunto`.

### 6.3 Usos

- **Navegación / edición con scope** en la UI: abrir una vista carga (lazy) solo su cierre.
- **Generación parcial**: `modux generate --view view-reservas` genera el cierre de la vista.
- **Documentación / diagramas por slice**: una vista alimenta un diagrama o una página de docs de ese
  corte (encaja con la línea de los SVG generados).
- **Revisión**: "los elementos que toca este PR" como vista efímera.

## 7. Relación con la jerarquía existente

modux ya tiene contención: `project → service → module → aggregate`. **No se sustituye.** Es un árbol
de *propiedad/ubicación*: dónde vive un elemento y quién lo posee. Las vistas son **cortes
transversales** que se superponen (una saga que cruza 3 módulos; un journey que cruza bounded contexts).
Jerarquía = folders; vistas = consultas guardadas sobre el catálogo.

## 8. Plan por fases

1. **A1 — Integridad referencial.** ✅ *Implementado.* `CheckModelUseCase.check()` recorre el catálogo
   por reflexión recursiva (incluye refs en records anidados: steps, operations…), construye el set de
   ids —top-level y anidados— y reporta toda referencia `*Id`/`*Ids` colgante. Expuesto como
   `--modux.check` (sale con código 1 si hay refs rotas, apto para CI). Tests: el store de ejemplo está
   limpio y una ref inyectada se detecta.
   *Nota:* la "interfaz `ModelStore`" del plan original se **pospone a A2**: extraer una interfaz con una
   sola implementación es indirección sin retorno (YAGNI); se hará cuando exista la implementación
   granular que la justifique.
2. **A2 — Almacenamiento granular + migración.** Implementación granular de `ModelStore`, `index.yaml`,
   y comandos `model split` / `model merge`. El monolítico sigue soportado.
3. **B1 — `View` curada.** El tipo `View` en el catálogo, edición en la UI, navegación con scope.
4. **B2 — `ViewClosure` + `generate --view`.** Cierre reutilizando el expander; generación por slice.
5. **B3 — Vistas computadas.** Queries guardadas (semilla + expansión), p. ej. bounded-context view.
6. **C — Lazy loading.** Cargar solo el cierre de la vista activa en UI/edición/gen parcial.

Cada fase es entregable y verificable de forma aislada (tests de carga/guardado, de integridad, de
cierre, e2e de `generate --view`).

## 9. Riesgos y mitigaciones

- **Vistas que bifurcan estructura** → prohibido por diseño: una vista solo guarda referencias (+ notas
  de presentación). Validado en el modelo.
- **Refs colgantes** al repartir ficheros → `validateReferences()` en carga y CI.
- **Generar desde una vista incompleta** → siempre vía `ViewClosure`; nunca desde `members` crudos.
- **Sobrevender el lazy loading** → documentar que la generación completa carga el grafo entero.
- **Coste de migración** → el formato monolítico se mantiene soportado; `split`/`merge` opt-in.
- **Merge entre ficheros** (mover un elemento de módulo) → IDs estables + index; el fichero se mueve de
  carpeta, el id no cambia, las referencias siguen válidas.

## 10. Preguntas abiertas

- **P1 — Granularidad:** ¿un fichero por elemento siempre, o por contenedor para tipos pequeños? (Recomendado: híbrido.)
- **P2 — ¿Las vistas viven en el catálogo o en un store aparte?** (Recomendado: en el catálogo, son
  elementos; pero ojo a no crear ciclos vista→vista.)
- **P3 — Composición de vistas:** ¿una vista puede incluir otra? (Probablemente sí, como unión; sin ciclos.)
- **P4 — ¿Identidad de fichero = id, o slug legible?** (Recomendado: `{id}.yaml`; el id ya es estable.)
- **P5 — Concurrencia/locking** en edición multiusuario (fuera de alcance de este RFC, pero la
  granularidad lo facilita).

## 11. Resumen

modux ya es un catálogo (en memoria, un `Map` por id). Faltan dos piezas **independientes**:
*almacenamiento granular* (el lever de escala real) y *vistas como proyecciones cerradas en
dependencias* (comprensión, edición y generación parcial). La regla sagrada —la vista nunca posee
elementos— es la misma tesis de todo el proyecto: una sola fuente de verdad, lo derivable se computa.
