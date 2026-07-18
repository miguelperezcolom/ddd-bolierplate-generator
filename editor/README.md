# @modux/editor — editor gráfico del modelo

Web component Lit independiente (SVG + `d3-zoom`, sin más dependencias) con canvas
totalmente editable. Se embebe en la UI Mateu de modux o funciona standalone.

## Arquitectura (3 capas)

1. **`<modux-canvas>`** (`src/modux-canvas.ts`) — motor de diagrama genérico, sin semántica
   modux: recibe una `Scene` (nodos/aristas) y emite gestos (`node-moved`,
   `connect-requested`, `delete-requested`, `element-selected`, `element-activated`).
   Zoom/pan, drag, asas de conexión, Supr para borrar, auto-fit.
2. **Adaptadores de vista** (`src/views/*.ts`) — funciones puras `modelo → escena`:
   `context-map.ts` (espejo del ContextMapSvgRenderer server-side, coherencia de flows
   recalculada en vivo) y `aggregates.ts`. Pendientes: flows, procesos.
3. **`<modux-editor>`** (`src/modux-editor.ts`) — shell con toolbar y selector de vistas.
   Contrato con el host: propiedades `model` (proyección `ModuxModel`) y `layout`
   (`EditorLayout`, geometría FUERA del YAML); eventos `modux-command`, `layout-changed`,
   `modux-select`, `modux-activate`.

`<modux-editor-connected>` (`src/host/modux-editor-connected.ts`) es el wrapper que habla
REST con el servidor modux (`EditorApiController`, base `/modux/editor`): GET `model`,
POST `commands`, GET/PUT `layout`.

## Comandos

```bash
npm run dev    # demo standalone en http://localhost:5197 (modelo HLA booking en memoria)
npm run build  # type-check + bundle ESM en dist/modux-editor.js
npm run copy   # build + copia a ../model-driven-generator/src/main/resources/static/modux-editor/
```

## Embed en Mateu

`GraphicalEditorPage` (modux) devuelve un `Element` con el tag
`modux-editor-connected` y el atributo **`import`** apuntando al bundle
(`/modux-editor/modux-editor.js`). El `elementRenderer` de Mateu (mateuv3) hace un
import dinámico del módulo la primera vez que ve un tag no registrado con ese atributo.
Tras cambiar el editor: `npm run copy` + reiniciar el servidor modux. Tras cambiar el
frontend de Mateu: `yarn copy` en `apps/vaadin` + `mvn install` de `vaadin-lit` +
recompilar modux.

⚠️ El servidor persiste los comandos en el store YAML cargado: para probar, arranca
siempre contra una **copia** (`--modux.model-file=...`) — un save reescribe el YAML y
elimina los comentarios autorizados.
