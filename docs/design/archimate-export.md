# Exportar las specs a ArchiMate (idea, pendiente)

**Estado: anotado, NO empezar todavía.** Decisión de Miguel (2026-07-05): esperar a que
el editor gráfico y el meta-modelo estén bien atados antes de abordar el export.

## Qué es

Generar desde el modelo modux un fichero en el **ArchiMate Model Exchange File Format**
(XML estándar de The Open Group), importable en Archi y en las herramientas EA
habituales. El modelo modux ya contiene la semántica; esto es una proyección más,
como el HLA generado o el context map SVG.

## Esbozo de mapeo (a validar cuando se aborde)

| modux | ArchiMate |
|---|---|
| Module (bounded context) | Application Component (agrupado por Service) |
| Service | Node / Deployment (technology layer) o grouping |
| ExternalSystem | Application Component externo (o Business Actor según el caso) |
| Aggregate / Entity / Model | Data Object (Business Object si se quiere capa negocio) |
| ContextMapRelation | Serving / Association (según tipo DDD; ACL ≈ intermediario) |
| Flow (archetypes) | Flow relationship (+ Application Event para triggers) |
| Process + steps | Business Process encadenados (HUMAN → Business Actor/Role asignado) |
| DomainEvent / IntegrationEvent | Application Event |
| Decision (ADR) | Motivation layer: Assessment / Goal / Principle |
| View (CURATED) | ArchiMate Diagram (view del exchange format) + geometría del editor |

Notas:
- Las **Views del editor + su layout** (sección `diagrams` del store) permiten exportar
  también los diagramas con posiciones, no solo el modelo — el exchange format
  soporta vistas con geometría.
- Los símbolos del editor ya siguen la iconografía ArchiMate: el mapeo visual es directo.
- Punto de entrada natural: un `ArchimateRenderer` puro (como HlaDocumentRenderer /
  ContextMapSvgRenderer) + use case `ExportArchimateUseCase` + botón/página en la UI
  y comando MCP.

## Por qué esperar

El meta-modelo sigue creciendo (lifecycle, procesos, decisiones, vistas…) y cada
concepto nuevo obligaría a revisar el mapeo. Mejor congelar primero el alcance del
editor + intent layer y exportar una sola vez bien.
