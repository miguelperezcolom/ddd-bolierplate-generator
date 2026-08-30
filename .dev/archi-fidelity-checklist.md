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

**Notación en caja (como el Archi de RIU): TODO elemento es un rectángulo con el icono de tipo arriba-derecha.**

| Concepto modux | Figura ArchiMate | Silueta | Icono | Estado |
|---|---|---|---|---|
| Contexto / sistema | ApplicationComponent | rect + pestañas izq. | pestañas | ✅ |
| Agregado / Entidad | Business/Data Object | rect + línea de título | ▤ | ✅ |
| Evento | Application/Business Event | muesca cóncava izq. + semicírculo der. | evento | ✅ |
| Caso de uso | ApplicationFunction | chevron (punta arriba, muesca abajo) | función | ✅ |
| Actor | BusinessActor | monigote (figura grande) | — | ✅ |
| Servicio | App/Business Service | estadio (píldora) | píldora | ✅ |
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
| Influence | discontinua | — | flecha abierta + `±` | ✅ |
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
- ✅ Junction · ✅ Note · ✅ Group · ✅ Format painter (pincel) · ⬜ Legend (tenemos leyenda fija)
- ✅ Colocar nodo: click o arrastrar-para-dimensionar
- ✅ Tras dibujar vuelve a la flecha; ✅ Shift-click fija la herramienta

### Magic connector  (✅ núcleo)
- ✅ Click origen → click destino → menú de relaciones válidas
- ✅ Directas + inversas separadas en el menú
- ✅ Regla de validez (no deja trazar inválidas) — matriz real de Archi
- ✅ Crear-en-vacío: cascada única (elemento → sus relaciones válidas)
- ⬜ Ctrl/Cmd invierte el orden (elementos antes que conexiones)

### Conexiones
- ✅ **Router por defecto**: líneas rectas (Manual), como Archi. [decidido]
- ⬜ Selector de router por vista (Manual / Manhattan)
- ✅ Bendpoints estilo Archi: círculo hueco en el medio → arrastrar crea el punto (sólido) y aparecen 2 huecos nuevos; mover; borrar-al-estirar
- ✅ Snap de bendpoints a rejilla (Alt para liberar)

### Contenedores anidados + ARM
- 🟡 Resaltado azul del contenedor al arrastrar dentro
- ✅ Anidar: arrastrar un nodo dentro de un contenedor SOLO lo anida (sin diálogo de relación); "Sacar del contenedor" (menú contextual) lo desanida. Las relaciones contenedor↔hijo que se dibujen a mano quedan implícitas (ocultas por el anidamiento, visibles en Relaciones).
- ✅ Arrastrar hijo dentro/fuera del padre

### Edición (bucle básico — ¡era el gran hueco!)
- ✅ Mover nodos (persiste), mover en grupo, colapsar contenedores
- ✅ Redimensionar CUALQUIER elemento (asas de esquina funcionales, no solo contenedores)
- ✅ Renombrar in-place con F2 (Enter confirma, Esc cancela)
- ✅ Borrar con Supr/Backspace (nodo + sus aristas; contenedor + hijos)
- ✅ Deshacer/Rehacer (Ctrl+Z / Ctrl+Y o Ctrl+Shift+Z) con historial de 60 pasos
- ✅ Zoom (+/−/ajustar a ventana) y alineación (izq/centro/dcha, arriba/medio/abajo) sobre la selección primaria
- ✅ Copiar/Pegar (Ctrl+C / Ctrl+V) — duplica nodos + sus aristas internas, con nuevos ids

### Selección
- ✅ Asas de redimensión · ✅ marquee
- ✅ Selección primaria (asas oscuras) para alineación
- ✅ Ctrl-click para añadir/quitar de la selección

### Paneles
- ✅ Propiedades editables de NODO y ARISTA: Principal (nombre/relación, origen→destino, doc), Apariencia, Propiedades (clave-valor)
- ✅ Menú contextual (botón derecho): Renombrar (F2) / Borrar (Supr)
- ✅ Árbol de modelo + sync bidireccional con lienzo
- ✅ Árbol por carpetas de capa + carpeta Relaciones · ✅ búsqueda/filtro
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
