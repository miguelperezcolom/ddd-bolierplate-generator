# Patrones HLA — modelos didácticos

Una tienda (`model-driven-store.yaml`) por patrón empresarial habitual, mínima
pero completa y comentada en español, pensada para **explorarse desde una
instancia de modux**: abre el modelo en el editor, mira cómo se conectan las
piezas y genera la aplicación para ver cómo aterriza el patrón en código.

| Carpeta | Patrón | Qué demuestra |
|---|---|---|
| `bff/` | Backend for Frontend | Una fachada sin lógica (`bffs:` + `exposedUseCaseIds`) que expone los casos de uso del núcleo a un cliente SPA, con `authRequired`. |
| `acl/` | Anti-Corruption Layer | Núcleo nuevo conviviendo con un PMS legacy: traducción de modelo (`acls:`), escritura vía gateway con auth y lectura por polling ETL de la tabla legacy a un read model. |
| `cqrs/` | CQRS | Dos servicios: la escritura (agregado + operaciones + eventos) nunca se consulta; la lectura se materializa por eventos (proyección → read model → query service). |
| `event-driven/` | Coreografía con flows | Tres arquetipos de flow sobre el mismo evento (TRIGGERS, MATERIALIZES, NOTIFIES) más una suscripción manual: las dos vías de consumo. |
| `saga/` | Saga orquestada | `CheckoutSaga` con compensación en orden inverso (`compensatingStepId`), persistencia, reintentos y DLQ. |
| `event-sourcing/` | Event Sourcing | Agregado `EVENT_SOURCED` con snapshots cada N, eventos con `schemaVersion` (upcaster) y precondiciones de negocio. |
| `proceso-humano/` | Proceso con tarea humana | Proceso con paso `HUMAN` (rol, plazo ISO-8601, escalado a otro rol, página de formulario) y worklist derivada. |
| `integraciones/` | Integraciones | Los cinco estilos de integración en un mapa: gateways REST con auth distinta (ApiKey, Basic) y resiliencia declarada, ETL desde tabla legacy, evento de integración saliente con DLQ, suscripción entrante idempotente, y MCP (servidor externo + agente interno). |

## Cómo explorarlos

- **Instalador**: `./install.sh` copia estas carpetas a `~/.modux/examples/` y
  registra cada patrón como repositorio LOCAL (`Patrón · …`) en
  `~/.modux/repositories.yaml`. Al abrir modux aparecen en el selector de
  repositorios. (Reinstalar sobrescribe los cambios hechos ahí; si quieres
  modificarlos, copia la carpeta a otro sitio.)
- **A mano**: crea un repositorio de tipo LOCAL apuntando a cualquiera de estas
  carpetas, o usa la CLI:

  ```sh
  modux --modux.model-file=sample/patterns/cqrs/model-driven-store.yaml --modux.check
  modux --modux.model-file=sample/patterns/cqrs/model-driven-store.yaml --modux.generate=cqrs --modux.output=/tmp/out-cqrs
  ```

Cada tienda pasa `--modux.check` (referencialmente limpia), `--modux.lint`
(sin errores) y genera un proyecto que compila (`mvn package`).
