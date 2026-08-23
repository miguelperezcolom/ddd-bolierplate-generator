# Checklist de fidelidad Archi/ArchiMate

Hoja de ruta para clavar la UI/UX de Archi en el editor de modux. Fuentes: fuente de Archi
(`scratchpad/archi`), manual de usuario de Archi (`com.archimatetool.help`), notación ArchiMate 3.2.

Estado: ✅ hecho · 🟡 parcial · ⬜ pendiente · ❔ decisión de diseño

---

## A. Chrome del lienzo  (✅ casi completo)

| Detalle | Valor exacto (Archi) | Estado |
|---|---|---|
| Fondo | blanco (rejilla oculta por defecto, `GRID_VISIBLE=false`) | ✅ |
| Rejilla / snap | 12px, snap ON | ✅ |
| Borde de figura | gris `#5C5C5C` | ✅ |
| Relleno por capa | Business `#FFFFB5` · App `#B5FFFF` · Tech `#C9E7B7` · Motiv `#CCCCFF` · Strat `#F5DEAA` · Impl `#FFE0E0` | ✅ |
| Resaltado / selección | azul puro `#0000FF` | ✅ |
| Asas de selección | cuadradas, relleno blanco + borde oscuro, 4 esquinas + 4 medios | ✅ |
| Etiqueta | posición TOP, centrada, fuente del sistema, negro | ✅ |
| Fuente | por defecto del SO (Segoe/San Francisco) | 🟡 usamos sans del sistema (aceptable) |

## B. Notación de elementos

modux mapea sus conceptos a figuras ArchiMate. Silueta + icono arriba-derecha.

| Concepto modux | Figura ArchiMate | Silueta | Icono | Estado |
|---|---|---|---|---|
| Contexto / sistema | ApplicationComponent | rect + pestañas izq. | pestañas | 🟡 icono ✅, silueta como contenedor (rect) |
| Agregado / Entidad | Business/Data Object | rect + línea de título | ▤ | ✅ |
| Evento | Application/Business Event | muesca cóncava izq. + semicírculo der. | evento | ✅ |
| Caso de uso | ApplicationFunction | chevron (punta arriba, muesca abajo) | función | ✅ |
| Actor | BusinessActor | monigote (figura) | monigote | 🟡 icono ✅; Archi lo dibuja como figura grande |
| Servicio | App/Business Service | estadio (píldora) | píldora | 🟡 `rx=h/2` soportado, sin ejemplo |
| Value object / Read model / API / … | (sin mapeo ArchiMate directo) | — | glifo modux | ⬜ decidir figura |

## C. Notación de relaciones  (✅ casi completa)

Transcrito del fuente de Archi. `markerStart`/`markerEnd` en `SceneEdge`.

| Relación | Línea | Origen | Destino | Estado |
|---|---|---|---|---|
| Composition | sólida | rombo relleno | — | ✅ |
| Aggregation | sólida | rombo hueco | — | ✅ |
| Assignment | sólida | bola | flecha rellena | ✅ |
| Realization | punteada | — | triángulo hueco | ✅ |
| Serving | sólida | — | flecha abierta | ✅ |
| Access | punteada | — | flecha abierta | ✅ |
| Influence | discontinua | — | flecha abierta + `+/-` | 🟡 falta signo `+/-` |
| Triggering | sólida | — | flecha rellena | ✅ |
| Flow | discontinua | — | flecha rellena | ✅ |
| Specialization | sólida | — | triángulo hueco | ✅ |
| Association | sólida | — | (opcional flecha) | ✅ |
| Junction (and/or) | nodo pequeño | — | — | ✅ (render + paleta; conexión same-type ⬜) |

## D. Gestos / UX  (del manual de Archi)

### Paleta
- ✅ Magic connector primero, luego relaciones, luego elementos por grupo
- ✅ Herramienta de selección
- 🟡 Marquee (rubber-band existe; falta el modo que selecciona también conexiones)
- ⬜ Junction · ⬜ Note/Group/Legend · ⬜ Format painter
- ✅ Colocar nodo: click; ⬜ arrastrar-para-dimensionar
- ✅ Tras dibujar vuelve a la flecha; ⬜ Shift/doble-click para fijar la herramienta

### Magic connector  (✅ núcleo)
- ✅ Click origen → click destino → menú de relaciones válidas
- ✅ Directas + inversas separadas en el menú
- ✅ Regla de validez (no deja trazar inválidas) — matriz real de Archi
- 🟡 Crear-en-vacío: hacemos elemento→relación en dos menús; Archi usa **cascada** única
- ⬜ Ctrl/Cmd invierte el orden (elementos antes que conexiones)

### Conexiones
- ✅ **Router por defecto**: líneas rectas (Manual), como Archi. [decidido]
- ⬜ Selector de router por vista (Manual / Manhattan)
- ✅ Bendpoints: añadir/mover/borrar; 🟡 asa "círculo hueco en el medio" (estilo exacto)
- ✅ Snap de bendpoints a rejilla (Alt para liberar)

### Contenedores anidados + ARM
- 🟡 Resaltado azul del contenedor al arrastrar dentro
- ⬜ **ARM**: diálogo de relación válida al anidar (fwd + "(reverse)"), y ocultar la conexión al anidar
- ✅ Arrastrar hijo dentro/fuera del padre

### Selección
- ✅ Asas de redimensión · ✅ marquee
- ⬜ Selección primaria (asas oscuras) para alineación
- 🟡 Ctrl-click para añadir/quitar de la selección

### Paneles
- 🟡 Propiedades: tabs Principal/Apariencia/Propiedades (visual; falta edición real completa)
- ✅ Árbol de modelo + sync bidireccional con lienzo
- 🟡 Árbol por carpetas de capa · ⬜ búsqueda/filtro en árbol
- ✅ Outline / minimapa

---

## Divergencias a decidir (❔)

1. **Router de conexiones**: recto (fiel a Archi) vs ortogonal-esquiva-nodos (lo nuestro, mejor).
2. **Actor / Componente**: figura grande (Archi) vs icono-badge (lo nuestro).
3. **ARM** (relaciones por anidamiento): ¿lo implementamos? Es un sistema entero.
4. **Elementos sin mapeo ArchiMate** (value object, read model, API, IA…): ¿qué figura usan?

## Orden sugerido de trabajo
1. Relaciones al 100% (junction + signo `+/-` de influence). _pequeño_
2. Router: decidir y, si "recto", opción por vista. _medio_
3. Actor/servicio como figura grande. _medio_
4. Crear-en-vacío en cascada única + Shift-fija-herramienta. _pequeño_
5. Propiedades editables de verdad. _medio_
6. ARM (si se decide). _grande_
