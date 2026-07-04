# Extensiones del meta-modelo para sistemas de información empresariales

> Estado: **implementado** (meta-modelo + linter + diagrama; la explotación completa por los
> generadores de código se irá cableando por fases). Motivación: cubrir las dimensiones de un
> sistema empresarial que el meta-modelo aún no hacía explícitas — el tiempo (ciclos de vida,
> procesos), las personas (tareas, permisos por datos) y el cumplimiento (PII, auditoría,
> tenancy). Cada concepto sigue el patrón requisito → concepto → desazúcar.

## Conceptos añadidos

| Requisito | Concepto | Dónde | Estado |
|---|---|---|---|
| Los agregados son máquinas de estados | `lifecycle` (stateField, initialState, states, transitions con guard/operación) | `AggregateEntity.lifecycle` | meta-modelo + linter (`lifecycle-coherence`) |
| Procesos de negocio largos con personas | `Process` (steps HUMAN/AUTOMATED, deadlines, escalado, SLA, compensación) | top-level `processes` + CRUD en Patrones | meta-modelo + expander + linter |
| Trazabilidad quién/qué/cuándo | `audited` | `AggregateEntity.audited` | meta-modelo + linter (`audited-event-sourcing`) |
| Dónde invertir (DDD estratégico) | `subdomainType` CORE/SUPPORTING/GENERIC | `ModuleEntity.subdomainType` | meta-modelo + color en el context map + linter |
| Seguridad por datos (row-level) | `AccessPolicy` (appliesTo, expression subject/resource) | `ModuleEntity.accessPolicies` | meta-modelo + linter |
| Reporting operativo | `Kpi` (evento fuente, measure, valueField, dimensiones, grano) | `ModuleEntity.kpis` | meta-modelo + linter (`kpi-value-field`) |
| GDPR / privacidad | `piiClassification` + `anonymizationStrategy` (incl. CRYPTO_SHRED para ES) | `ModelFieldEntity` | meta-modelo + linter (`pii-*`) |
| Multi-tenancy | `tenancyStrategy` NONE/SHARED_SCHEMA/SCHEMA_PER_TENANT/DATABASE_PER_TENANT | `ProjectEntity.tenancyStrategy` | meta-modelo + linter |
| Integraciones como socios, no tuberías | `ExternalSystem` (protocolo, dirección, owner, gateway) | `ProjectEntity.externalSystems` | meta-modelo + nodo en el diagrama + linter |

Todo aparece automáticamente en el **JSON schema** del store (generado desde `AllData`), así
que la especificación completa es autorable/validable — incluida la autoría asistida por IA.

## Segunda tanda: trazabilidad, documento vivo y la escalera de intención

| Requisito | Concepto | Dónde |
|---|---|---|
| Trazabilidad diseño → spec (los ADR sobreviven a la serialización) | **`Decision`** first-class (decision, rationale, status, source) + `decisionIds` en Aggregate/Module/UseCase/Flow/Process/ContextMapRelation/ExternalSystem | top-level `decisions` + CRUD en Organización |
| El §1 y el §4 del HLA tienen dónde vivir | `Project.objective` + `Module.description` | entidades |
| El HLA como **informe del modelo** (entregable a desarrollo/arquitectura) | `HlaDocumentRenderer` + `GenerateHlaUseCase` — prosa + tabla ADR + mermaid derivado (flowchart estructural, secuencias por proceso, stateDiagram por lifecycle) + transversales + contratos + puntos abiertos (`PROPOSED`) | Organización › Design document; showcase `sample/hla-booking/HLA.generated.md` |
| El modelo como eje (roles multi-estación + mapeos) | **Model journeys** — por modelo, cada rol en cada estación + aristas de mapping | Modelo de dominio › Model journeys |
| La pantalla deriva los use cases | `PageUseCaseDerivation` — botones→stubs cableados, CRUD→create/update/delete, listado→query service `list` | UI › Derive use cases |
| La API expuesta deriva los use cases | `ImportOpenApiInboundUseCase` (gemelo inbound del import de gateways) | comando importopenapi |
| Consumo de funcionalidad (mismo u otro subdominio) | step `CallUseCase` / **`CallQueryService`**; el transporte se deriva de la **topología**: mismo servicio = interfaz in-process; servicios distintos = API → `ConsumptionApiDerivation` expone el proveedor como gRPC | botón Derive APIs |

Reglas de lint añadidas: `open-decisions` (PROPOSED = puntos abiertos), `model-orphan`,
`cross-context-data-access` (tocar el agregado ajeno → usa la API del dueño o materializa una
proyección) y `cross-service-consumption` (consumo que cruza servicio exige proveedor expuesto).

### El principio que ordena todo esto

El flujo de diseño soportado (el de Miguel): **subdominios → entidades/agregados → modelos como
eje → pantallas y APIs (que derivan los use cases) → consumo entre subdominios = API o proyección
→ eventos y procesos**. Tres puertas de entrada de intención (pantalla, OpenAPI, flow/process),
una lente central (journeys) y una red de coherencia (el linter) que tolera el orden libre,
guiado por obstáculos, del diseño real.

## El linter (`ModelLintService`)

La recompensa única de tener modelo: el sistema se valida **antes** de generar una línea.
Dos capas:

1. **Integridad referencial** (`CheckModelUseCase`, ya existente) — ids colgantes = ERROR.
2. **Catálogo de reglas semánticas** (`LintRules`) — coherencia de lifecycle, idempotencia de
   subscriptions, DLQ en integration events, estrategia de rebuild en projections,
   compensación en sagas, use cases huérfanos, PII cruzando contextos, roles en pasos
   humanos, expresiones en access policies, KPIs sin campo de valor, clasificación de
   subdominios, tenancy declarada, flows sin relación estratégica…

UI: **Model health** (menú raíz), agrupado por severidad. Es también el feedback loop del
flujo IA→spec: generar → lint → corregir → regenerar.

## Decisiones de implementación

- **Spec-first**: los conceptos nuevos viven en las entidades del store (y por tanto en el
  YAML y en el JSON schema). Donde el modelo de dominio de la UI aún no los edita, los
  repositorios hacen **carry-over** al guardar para que un save desde la UI nunca borre lo
  autorado en YAML (ver `AggregateFileRepository.save` y equivalentes).
- Los campos nuevos en records existentes añaden **constructores retro-compatibles**, así el
  código y los stores previos siguen funcionando sin tocar nada.
- La explotación por generadores (emitir el guard del lifecycle, el filtro row-level, el
  módulo de tasks, la dimensión tenant en el DDL…) se cablea por fases; el orden natural es
  lifecycle → tasks de procesos → tenancy → PII.
