# RFC: Sistema y Soluciones (as-is / to-be)

> Estado: **propuesta**. El HLA de *sistema* describe lo que hay (as-is); el HLA de
> *solución* describe un to-be candidato, asociado a un proyecto. Un mismo sistema debe
> poder convivir con **varias soluciones** abiertas a la vez; cuando una se aprueba e
> implementa, se **mergea al sistema** y pasa a ser el nuevo as-is.

## 1. El problema

Hoy el store es un único modelo: no distingue "lo que existe" de "lo que proponemos".
En la práctica de arquitectura conviven:

- **Sistema (as-is)**: la referencia estable, lo desplegado.
- **Soluciones (to-be)**: propuestas en exploración — cada una con sus decisiones (ADRs),
  sus elementos nuevos/modificados/eliminados, y su HLA como entregable de revisión.
- **Aprobación**: una solución gana; sus cambios se incorporan al sistema. Las demás se
  descartan o se rebasan.

Cualquier diseño debe responder: identidad de los elementos entre versiones, diff
semántico, merge (incluidos conflictos entre soluciones), historia, y el entregable
(HLA de solución = *qué cambia y por qué*).

## 2. Decisión de diseño: git sobre el store granular + capa semántica modux

**No reinventamos versionado.** Git ya resuelve ramas, historia, merge, blame y
revisión (PRs). Lo que git no sabe es *semántica de modelo* — eso lo pone modux.

La clave que lo hace viable ya existe: el **formato granular**
(`GranularYamlStorageFormat`): un fichero por elemento, agrupado por tipo, con ids
estables. Consecuencias:

- **añadir/eliminar** elementos en ramas distintas mergea limpio (ficheros distintos);
- un **conflicto git = mismo elemento tocado en sistema y solución** — exactamente la
  granularidad a la que un arquitecto quiere resolver;
- `git log -- aggregates/reserva.yaml` es la historia de UN elemento.

```
Sistema (as-is)        =  rama main del repo del store (formato granular)
Solución «X» (to-be)   =  rama solution/x, nacida de main
Aprobar e implementar  =  lint verde + decisiones resueltas → merge a main
HLA de sistema         =  generador HLA sobre main
HLA de solución        =  generador HLA sobre la rama + sección «qué cambia»
```

### La capa semántica (lo que modux añade sobre git)

1. **`SolutionEntity`** (primera clase, vive en el store DE SU RAMA — se autodescribe,
   como `Project`): `id`, `name`, `description` (el objetivo del proyecto/to-be),
   `status` (EXPLORING → PROPOSED → APPROVED → MERGED | DISCARDED), `decisionIds`.
   La *lista* de soluciones se deriva de las ramas `solution/*` — sin registro duplicado.

2. **Selector en el editor**: «Sistema | Solución X | ＋ Nueva solución» (junto al de
   Vistas). Cambiar = checkout de la rama; el editor ya se recarga solo ante cambios
   externos (huella SSE), así que el switch es gratis. Crear = branch desde main +
   SolutionEntity.

3. **Diff semántico**: el `ModelChangeSet` del RFC *model-evolution* (comparación
   estructural por id) computado entre main y la rama — misma pieza, segundo uso.
   Se proyecta como:
   - **vista diff en el context map**: verde = añadido, ámbar = modificado,
     rojo tachado = eliminado (el layout de la solución manda);
   - **sección «Qué cambia respecto al sistema» en el HLA de solución**: tabla de
     cambios por elemento + decisiones que los justifican (`decisionIds` ya enlaza
     elemento → ADR → solución).

4. **Puerta de aprobación** (lint como feedback loop, como siempre):
   - lint verde en la rama;
   - regla nueva `solution-open-decisions`: no se aprueba con decisiones PROPOSED;
   - merge asistido: si git señala conflicto, modux lo presenta POR ELEMENTO
     (as-is / to-be lado a lado, elegir o editar), nunca como texto crudo.

5. **El premio final — conexión con *model-evolution***: el merge a main ES el
   `ModelChangeSet` que alimenta migraciones Flyway, upcasters y plan de rebuild.
   Aprobar una solución no solo actualiza el dibujo: deriva el plan de transición.

## 3. Por qué NO un overlay en el meta-modelo

La alternativa (una `Solution` que guarda deltas dentro del mismo store: copias
modificadas, tombstones…) se descartó:

- reimplenta historia, merge y blame — que git da gratis y mejor;
- copy-on-write transversal: cada repositorio/consulta tendría que resolver overlays
  (base + solución activa) — complejidad en TODO el código para siempre;
- dos soluciones tocando el mismo elemento requerirían un motor de conflictos propio.

Con worktrees de git incluso se pueden abrir dos soluciones a la vez (comparar dos
to-be) sin que el diseño cambie.

## 4. Mecánica concreta

- El store del proyecto vive en un repo git (el suyo propio, o un subdirectorio del
  repo del producto — decisión por proyecto). modux lo maneja con jgit o shelling out.
- **Requisito**: proyectos con soluciones usan el formato granular (el monolítico
  sigue valiendo para proyectos chicos sin to-be).
- El fichero de **layout/diagramas es por-rama** y en el merge gana el de main para lo
  existente + se incorporan posiciones de elementos nuevos (naive, mejorable).
- La **snapshot de generación** (`.modux/generated-model.yaml`, RFC model-evolution)
  vive en main: solo el sistema genera contra producción.

## 5. Fases

1. **F1 — Soluciones navegables** ✅ (2026-07-08): repo git del store gestionado por
   modux; crear / cambiar / descartar solución desde el editor; `SolutionEntity`;
   HLA de sistema (main) vs HLA de solución (rama).
2. **F2 — El diff visible** ✅ (2026-07-08): diff semántico main↔rama por worktree
   efímero; anillos verde/ámbar en el canvas; sección «Qué cambia» en el HLA.
3. **F3 — Aprobación** ✅ (2026-07-08): puerta (lint sin ERRORs + sin decisiones
   PROPOSED); estados desde la barra; **merge semántico three-way por elemento**
   (base = merge-base, conflicto = tocado en ambos lados, panel Sistema|Solución) con
   commit de merge real en main, registro de solución excluido del sistema, tag de
   archivo y borrado de rama; «Actualizar del sistema» = la misma maquinaria hacia la
   rama (el rebase práctico). La geometría sigue siempre a la solución (naive).
4. **F4 — Transición**: merge → migraciones/upcasters/rebuild (model-evolution F2).

## 6. Preguntas abiertas — RESUELTAS (Miguel, 2026-07-08)

- El store vive **en su propio repo** (modux lo inicializa si no existe).
- Las soluciones se comparan **siempre contra el sistema** (nunca entre sí).
- Cuando main avanza, las soluciones vivas se **rebasan** (la UX de conflictos por
  elemento del merge sirve igual para el rebase).
- Soluciones mergeadas/descartadas: **tag de archivo (`archive/solution-x`) + borrar
  la rama** — historia accesible, lista de ramas limpia.
