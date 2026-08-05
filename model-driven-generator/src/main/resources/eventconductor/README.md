# Los esquemas de EventConductor

Copias de los esquemas que **EventConductor** publica, traídas aquí sin modificar:

| Fichero | Origen |
|---|---|
| `workflow-definition-schema.json` | `modules/workflow-engine/src/main/resources/workflow-definition-schema.json` |
| `form-schema.json` | `modules/forms-engine/src/main/resources/form-schema.json` |

**Manda EventConductor.** Son la definición de lo que modux emite, no una interpretación de
ella: el enum de tipos de paso, los campos que un paso admite y cuáles son obligatorios salen de
aquí, y el modelo de modux se ajusta a lo que digan. Cuando estos ficheros y el modelo no
coincidan, el que está mal es el modelo.

**Por qué una copia y no una dependencia.** La generación es hermética: construir un proyecto no
puede exigir que EventConductor esté presente, checkouteado ni accesible. Es la misma división
que §4.7 hace con las referencias entre proyectos — el *snapshot* es lo que lee el build, y la
*coordenada* solo se consulta al refrescar.

**Y por eso hay que detectar la deriva.** `EventConductorSchemaDriftTest` compara estas copias
con el checkout hermano de EventConductor cuando está en disco, y se salta la comprobación
cuando no. Así una copia que se queda atrás se ve en la máquina de quien trabaja en los dos, que
es donde se puede arreglar, sin romper el build de quien no.

Para actualizarlas: copiarlas otra vez desde el checkout y correr los tests. Si algo se rompe,
es que EventConductor cambió y modux tiene que seguirle.
