# Experimento: UI estilo Archi sobre el motor de modux

_Fecha: 2026-08-23. Autor del análisis: sesión de exploración sobre el fuente de Archi
(`github.com/archimatetool/archi`, clonado y analizado por subsistemas)._

## Tesis del experimento

Nos gusta la **ergonomía y el lenguaje visual de Archi** (árbol de modelo + paleta por
capas + panel de propiedades + magic connector + notación ArchiMate), pero **no su motor**
(Eclipse RCP + SWT + GEF/Draw2D + EMF: viejo, pesado, difícil de extender). En RIU ya se
usa Archi, así que reproducir su UI **reduce la barrera de adopción** casi a cero.

**Objetivo:** la UI de Archi, el esquema y el motor de modux.

## Restricción de ingeniería (lo que NO haremos)

No se puede reutilizar el código de Archi. Es un stack de escritorio Java (SWT/GEF/EMF).
Embeberlo en el plugin de IntelliJ o en el webview sería arrastrar medio Eclipse. Archi se
usa **como referencia de diseño**, no como dependencia. Reproducimos su UX sobre el
substrato que modux **ya tiene**.

## Lo que modux ya tiene (substrato)

El editor `editor/` es un web component en Lit, y ya cubre buena parte del "chrome" de Archi:

| Pieza de Archi            | Equivalente actual en modux                          |
|---------------------------|------------------------------------------------------|
| Model Tree (árbol)        | `modux-explorer.ts` (~2.100 líneas)                  |
| Diagram canvas            | `modux-canvas.ts` (~2.100 líneas), glifos `SYMBOLS`  |
| Palette                   | `palette-defs.ts` (agrupada por Estratégico/Dominio/…)|
| Auto-layout               | `autolayout.ts` + `semantic-layout.ts` (ELK)         |
| Gestos de conexión        | `gestures.ts` (ya hay `archimateOptions`)            |
| Theming                   | `theme.ts` (`MODUX_THEME`)                            |
| Undo/redo                 | `undo.ts` + comandos                                 |
| Tier ArchiMate (draw.io)  | `src/drawio/*` — puente XML↔DSL, solo tier estratégico|

Conclusión: **no partimos de cero**. Partimos de un reskin + añadidos, no de una reescritura.

---

## Hallazgos por subsistema

### 1. Layout / paneles

Perspectiva por defecto (`MainPerspective.java:71-77`) — 4 zonas:

```
┌────────────┬─────────────────────────────┬──────────┐
│ Model Tree │      Diagram (canvas)       │ Palette  │
│  (23% izq) │      + flyout palette       │ (15% der)│
├────────────┤                             │          │
│ Outline /  │                             │          │
│ Navigator  ├─────────────────────────────┤          │
│ (abajo izq)│   Properties (30% abajo)    │          │
└────────────┴─────────────────────────────┴──────────┘
```

**Joya ergonómica:** sincronización bidireccional árbol ↔ lienzo ↔ propiedades
(`TreeSelectionSynchroniser.java:38-50`). Seleccionas en el árbol → resalta en el lienzo y
carga propiedades, y viceversa. Es lo que hace navegable un modelo grande.

Otras: outline/minimapa (`OverviewOutlinePage`), árbol organizado por carpetas/capas,
drag desde árbol al lienzo, menús contextuales, atajos de teclado para la paleta.

### 2. Magic connector (la interacción más valiosa)

Arrastras de un elemento a otro → aparece un menú **solo con las relaciones válidas** entre
esos dos tipos (`MagicConnectionCreationTool.java:173-227`). Si sueltas en vacío, cascada de
menús: capa → elemento → relación válida.

**Lo mejor:** la validez **no es código, es un dato**. Dos ficheros en
`com.archimatetool.model/model/`:

- `relationships-keys.xml` — 11 letras → tipo de relación
  (`a`=access, `c`=composition, `f`=flow, `g`=aggregation, `i`=assignment, `n`=influence,
  `o`=association, `r`=realization, `s`=specialization, `t`=triggering, `v`=serving).
- `relationships.xml` — la matriz ArchiMate 3.2 completa en notación compacta:
  ```xml
  <source concept="ApplicationCollaboration">
    <target concept="ApplicationComponent" relations="fgortv" />
    ...
  ```

Se convierte a JSON con un parser trivial: `{ [source]: { [target]: [relTypes] } }`, lookup O(1).
**Reutilizable tal cual** — solo hay que decidir el mapeo tipos-modux ↔ conceptos-ArchiMate.

### 3. Notación / figuras

Colores de relleno por capa (`AbstractArchimateElementUIProvider.java:28-34`):

| Capa                    | RGB               | Color        |
|-------------------------|-------------------|--------------|
| Business                | 255, 255, 181     | amarillo pálido |
| Application             | 181, 255, 255     | cian pálido  |
| Technology              | 201, 231, 183     | verde pálido |
| Motivation              | 204, 204, 255     | azul pálido  |
| Strategy                | 245, 222, 170     | tostado      |
| Implementation/Migration| 255, 224, 224     | rosa pálido  |

Anatomía: caja (rect / rect redondeado / caja 3D / elipse / cilindro / pentágono para evento)
+ icono/badge arriba-derecha + etiqueta. 47 figuras de elemento.

Estilos de línea por relación (12 tipos): sólida/discontinua(6,3)/punteada(2) + cabezas
(triángulo relleno, triángulo hueco, rombo relleno/hueco, círculo, media flecha, cruz de
influencia). Todo reproducible en SVG. Esencial: colores por capa + formas + cabezas +
estilo de línea. Cosmético: gradientes, alpha, antialias.

### 4. Panel de propiedades

Despacho por **filtros de tipo**: cada sección declara un `Filter` con `instanceof`
(`ArchimateConceptSection.java:22-31`). Tabs: **Main** (nombre + documentación, campos por
tipo de relación), **Appearance** (relleno, línea, borde, icono, fuente), **Properties**
(clave-valor a medida), **Analysis** (usado en vistas / relaciones), Label, Figure.

Edición → comando → `CommandStack` (undo integrado) → EMF notifica → la sección se refresca.
En web: input on-blur/Enter → comando → store → re-render. modux ya tiene `undo.ts` + comandos.

---

## Tabla de decisión: copiar / ya lo tenemos / adaptar / descartar

| Elemento                              | Veredicto      | Nota |
|---------------------------------------|----------------|------|
| Matriz de validez de relaciones       | **COPIAR** (dato) | `relationships.xml` → JSON. Oro directo. |
| Magic connector (interacción)         | **COPIAR** (lógica)| Reimplementar el gesto sobre `gestures.ts`. |
| Sync bidireccional árbol↔lienzo↔props | **COPIAR**     | Falta cablearlo del todo; alto valor. |
| Colores por capa + notación           | **COPIAR** (valores)| RGBs y estilos de línea concretos. |
| Layout de 4 zonas                     | **COPIAR** (CSS grid)| Trivial en web. |
| Outline / minimapa                    | ADAPTAR        | Útil para modelos densos; prioridad media. |
| Árbol de modelo                       | **YA LO TENEMOS**| `modux-explorer.ts` — reordenar por capas. |
| Paleta por capas                      | **YA LO TENEMOS**| `palette-defs.ts` — reordenar al mapa Archi. |
| Auto-layout                           | **YA LO TENEMOS**| ELK. |
| Undo/redo + comandos                  | **YA LO TENEMOS**| `undo.ts`. |
| Panel de propiedades por tabs         | ADAPTAR        | Existe el modelo; falta la UI tabbed dirigida por selección. |
| Flyout palette (patrón Eclipse)       | DESCARTAR      | Panel fijo/colapsable web. |
| Navigator drill-down                  | DESCARTAR (de momento) | Nice-to-have. |
| Todo el runtime Eclipse/perspectivas  | DESCARTAR      | Composición Lit. |

---

## El nudo real: mapeo ArchiMate ↔ modux

Archi es ArchiMate de **bajo nivel** y genérico. modux es de **más alto nivel** (DDD +
intenciones: agregados, contextos, casos de uso, eventos, workflows). No queremos copiar la
semántica de Archi — queremos su **chrome** sobre nuestra semántica. Por tanto:

- La matriz de relaciones válidas hay que **traducirla** al vocabulario de modux (qué
  relaciones tienen sentido entre agregado↔evento, contexto↔contexto, caso-de-uso↔agregado…),
  no copiar la de ArchiMate literal. La de ArchiMate sirve como **plantilla y prueba** de que
  el enfoque data-driven funciona.
- Las "capas" de Archi (Business/Application/Technology/…) se sustituyen por los grupos de
  modux (Estratégico/Dominio/APIs/IA/Orquestación/UI…), que la paleta ya usa.
- Esto conecta con la tesis de autoría de Miguel: la relación como **intención** (top-down,
  sin código) encaja perfecto con el magic connector, que propone intenciones válidas.

---

## Plan por fases (según lo acordado: estética primero, interacción después)

### Fase 1 — Reskin "look & feel Archi" (bajo riesgo, no toca el modelo)
- Reorganizar `modux-editor` al layout de 4 zonas (CSS grid).
- Panel de propiedades tabbed dirigido por selección.
- Sincronización bidireccional árbol↔lienzo↔propiedades completa.
- Aplicar colores/notación por capa en el canvas.
- **Objetivo:** que un usuario de Archi de RIU diga "esto se ve y se siente como Archi".

### Fase 2 — Magic connector (el valor real: menos dibujo)
- Definir la matriz de validez **de modux** (JSON), usando `relationships.xml` como plantilla.
- Gesto arrastrar-para-conectar sobre `gestures.ts` que ofrece solo relaciones válidas.
- Cascada crear-elemento-y-conexión al soltar en vacío.

### Riesgos / preguntas abiertas
- ¿El reskin se hace sobre el `modux-editor` de producción o en un prototipo aislado primero?
- ¿La matriz de relaciones de modux ya existe en algún sitio del DSL/validación, o hay que
  derivarla desde las reglas de `modux:validate`?
- Sincronización tree↔canvas: ¿hasta dónde está ya cableada hoy?

## Artefactos capturados
- `relationships.xml` y `relationships-keys.xml` (matriz ArchiMate 3.2) — en el clon de Archi
  en scratchpad; conviene copiarlos a `doc/` o `editor/src/` si seguimos con la fase 2.
