# RFC: Modux como plugin de IDE — sin servidor

> Estado: **propuesta** (2026-08-04). Nada implementado. Recoge tres decisiones de
> planteamiento tomadas en conversación y el inventario medido que las sostiene.
> Relacionado: [`storage-ports.md`](./storage-ports.md), [`two-zone-codegen.md`](./two-zone-codegen.md),
> [`catalog-and-views.md`](./catalog-and-views.md).

## 1. El planteamiento

Modux deja de ser una aplicación web con servidor propio. Se parte en tres piezas
que no comparten proceso:

| Pieza | Qué hace | Tecnología |
|---|---|---|
| **Plugin de IDE** (IntelliJ / VSCode) | **Solo edita ficheros.** Aloja el editor gráfico y aplica mutaciones sobre el YAML del proyecto. | TypeScript (web component en webview) |
| **Maven plugin** | Genera código a partir del modelo. **Solo lee.** | Java (`plugin/`, ya existe) |
| **Skill** | Enseña a un agente a autorar el modelo. | Markdown + JSON schema |

**No hay servidor.** Ni compartido en `:8192`, ni demonio embebido por proyecto.

### 1.1 El invariante que hace que encaje

> **Java lee el modelo y nunca lo escribe. TypeScript escribe el modelo y nunca genera.**

De aquí sale todo el reparto. Si el motor de mutación se quedara en Java, el plugin
tendría que arrancar una JVM por cada edición y habríamos reintroducido el demonio por
la puerta de atrás.

### 1.2 Qué gana el usuario

El modelo deja de vivir en `~/.modux` —un segundo origen de verdad, separado del código
que genera— y pasa a ser **un fichero más del repo**, versionado junto a su output.
Desaparece el ciclo «levantar servidor → navegador → modelar → volver al IDE». El modelo
pasa de artefacto-de-herramienta a código fuente.

Con ello, **un repositorio es un proyecto** (§4.6). Desaparecen de golpe los dos ejes de
indirección actuales: varios proyectos dentro de un mismo store, y varios stores
seleccionables desde un home compartido.

## 2. Diagnóstico medido

### 2.1 El editor ya está preparado; el acoplamiento está en un solo fichero

Todo el acceso HTTP del editor vive en `editor/src/host/modux-editor-connected.ts`
(1086 líneas). El core del editor es puro y trabaja sobre un modelo en memoria. Escribir
otro host —que haga I/O de ficheros por el IDE en vez de `fetch`— no toca el core.

Los tipos ya están en TypeScript: `editor/src/model.ts` (981 líneas) y
`editor/src/commands.ts` (1415 líneas). Lo difícil —acordar las formas de los datos— ya
está hecho.

### 2.2 Pero el editor hoy no muta el modelo: lo hace el servidor

De `editor/src/commands.ts`:

> «the editor never persists anything itself: the host applies the command to its model
> store and feeds the updated model back through the `model` property»

`commands.ts` es **solo el vocabulario**. El que aplica está en Java, y es el trabajo real
de esta migración.

### 2.3 Dónde está el applier

`EditorApiController.java:670-1208` es una **tabla de routing pura**: 281 `case`, cada uno
un one-liner que delega. El trabajo está en los métodos:

| Bloque | Comandos | Líneas Java | Dónde |
|---|---:|---:|---|
| **UI / páginas / apps** | 93 | 2003 | `UiEditorCommands.java` |
| **Núcleo DDD / arquitectura** | 127 | ~2307 | `EditorApiController.java:1209-3515` |
| **Agentes / IA / gateways** | 42 | 638 | `AgentEditorCommands.java` |
| **Workflows** | 19 | 550 | `WorkflowEditorCommands.java` |
| | **281** | **~5500** | |

(El fichero tiene 312 `case "` en total; los 31 restantes son el switch anidado de tipos
de elemento dentro de `rename-element`, en `:1209`. Un comando, no 31.)

Contenido de cada bloque:

- **Núcleo**: bounded contexts, agregados, entidades, value objects, operaciones, eventos
  de dominio y aplicación, casos de uso, queries, proyecciones, read models, actores, APIs,
  sistemas externos, módulos, servicios, relaciones ArchiMate, flows, procesos, vistas, y
  el mobiliario de lienzo (notas, áreas, urls).
- **UI**: páginas, menús, apps, modelos, transformaciones, custom code, ETL, documentos,
  notificaciones, identity providers, locales.
- **Agentes**: AI agents, RAG, MCP gateways, proxies, implementaciones de API.
- **Workflows**: pasos, gateways, links, dependencias, triggers, y 2 migraciones one-shot.

### 2.4 El vocabulario es abrumadoramente regular

```
add-*     103        pares add-/remove- simétricos: 101
remove-*  103        → 261 de 281 (93%) son:
set-*      55           añadir a lista / quitar de lista / set escalar
otros      20
```

Los 20 irregulares, completos: `move-model-field`, `move-process-step`,
`move-workflow-step`, `move-page-wizard-step`, `move-menu-item`, `move-page-component`,
`create-ui-app`, `delete-ui-app`, `create-ui-page`, `delete-ui-page`,
`update-process-step`, `update-workflow-step`, `migrate-processes-to-workflows`,
`migrate-sagas-to-workflows`, `rename-element`, `rename-ui-page`,
`invert-archimate-relation`, `save-interaction`, `note-attach`, `note-detach`.

**Consecuencia para el presupuesto:** no hay que portar 281 handlers a mano. Un applier
genérico por path sobre el árbol YAML (`add-item-at-path`, `remove-item-by-id-at-path`,
`set-scalar-at-path`) más una tabla declarativa `kind → path` cubre el 93%. A mano quedan
~20 comandos y la tabla. Además, esas 5500 líneas son Java con su ceremonia (DTOs, null
checks, imports): sobre el modelo ya tipado en TS no es una traducción 1:1.

**Este es el riesgo principal del RFC.** Si el applier genérico no se sostiene, el coste
se multiplica. Hacer spike antes de comprometerse con fechas.

## 3. El MCP sobra; hace falta un skill

El MCP y un skill nunca fueron la misma clase de cosa:

- El **MCP era un mecanismo de acceso** — hacía falta porque el modelo vivía en un almacén
  opaco detrás de un servidor.
- Un **skill es un mecanismo de conocimiento**.

Este cambio disuelve el problema de acceso por completo: el modelo es un fichero del repo
y el agente ya tiene Read/Edit/Grep. Queda solo el de conocimiento, que es el grande.

Además, el MCP actual es **peor que editar el fichero**: `ModelMcpTools` (688 líneas) es
una API gruesa (`create_project`, `create_solution`) contra un metamodelo de 281 comandos.
Nunca fue una API expresiva del modelo; fue un parche para la opacidad del store.

Verificado: `ModelMcpTools` **no referencia `EditorCommand` ni el applier del editor**.
Nunca compartieron motor de mutación, así que portar el applier a TS no lo rompe — pero
tampoco lo salva.

Costes del MCP que un skill no tiene: proceso stdio por sesión, configuración en cada
cliente, versionado cliente/servidor, y la fragilidad de «nunca loguear a consola en modo
stdio» (`ModelDrivenGeneratorApplication.main`). Un skill es markdown en el repo, y esa es
la propiedad decisiva: **se versiona con el formato del modelo**. Cambias el metamodelo y
el skill cambia en el mismo commit.

### 3.1 La pérdida, y cómo se cubre

MCP es protocolo abierto; los skills son de Claude. Cursor, Copilot y demás se quedan sin
superficie. **El activo que los cubre no es el MCP: es el JSON schema**, que ya se genera
con victools y ya acompaña al YAML en `sample/hla-booking/`. Emitirlo junto al modelo en
cada proyecto da validación a cualquier agente que edite el fichero. El MCP no aportaba
nada por encima de eso.

### 3.2 Qué tiene que llevar el skill

Conocimiento tácito que hoy no está escrito en ningún sitio:

- El metamodelo en corto: **BC posee significado, módulos empaquetan, servicios despliegan**.
- Puntero al JSON schema generado.
- **Las invariantes que el schema no expresa**: integridad referencial entre elementos, qué
  targets tienen que existir, el tope de ejecuciones por paso en sagas. Es donde un agente
  se estrella y el schema lo deja pasar.
- El bucle de verificación: `mvn modux:validate` → `mvn modux:generate` → build.
- Two-zone codegen: qué es zona generada y no se toca (ver `two-zone-codegen.md`).
- Ejemplos trabajados — `sample/patterns/` ya es material de skill esperando en el repo.

## 4. Organización de los ficheros en el repositorio

### 4.1 El formato granular ya existe

`GranularYamlStorageFormat.java` (153 líneas) ya guarda el modelo como un fichero por
elemento:

```
model/
├── index.yaml                    # formatVersion + counts por tipo
├── aggregates/{id}.yaml
├── archimateRelations/{id}.yaml
├── diagrams/{id}.yaml
└── …                             # un subdirectorio por lista de AllData (~55 tipos)
```

Va **por reflexión sobre los record components de `AllData`**, así que los tipos nuevos se
soportan solos: no hay tabla que mantener. Se activa con `--modux.split` y se autodetecta
(`handles()` = el path es un directorio). Ya trae carga parcial —`loadType(root, tipo)` y
`loadElement(root, id)`— aunque `CommonFileRepository` marca las cargas parciales como
solo-lectura.

Recorrer todos esos ficheros para reconstruir el catálogo es lo que ya hace `load()`. En TS
es el mismo paseo: para unos miles de YAML pequeños son decenas de milisegundos en Node. La
**carga total es el default correcto**; la carga perezosa es optimización prematura.

### 4.2 Las relaciones están a medias

- `archimateRelations` **ya es lista de primer nivel** → un fichero por relación. ✅
- Las relaciones de context map **no**: viven dentro del proyecto. `addRelation()` opera
  sobre `project.contextMap()` y hace `repository.save(project)`, así que cada relación
  reescribe `projects/{id}.yaml`. ❌

### 4.3 `project.yaml` es el fichero tóxico

(Singleton, no `projects/{id}.yaml`: un proyecto por carpeta — §4.6.)

`ProjectEntity` fusiona tres concerns con ciclos de cambio distintos:

1. **Identidad**: id, name, packageName, outputPath, objective, locales.
2. **Config de despliegue**: database, dbMigrationTool, terraform (3 campos), iam,
   messageBroker, tracing, metrics, logging, llm, cache, fileStorage, email, secrets,
   cicd, dockerRegistry, environments, tenancy.
3. **Arquitectura**: `contextMap`, `externalSystems`, `serviceIds`.

Con un fichero por elemento en todo lo demás, **cualquier edición de cualquiera de esas
tres cosas colisiona con las otras dos en git**. Dibujar una relación toca el mismo fichero
que cambiar el proveedor de tracing.

**Partirlo en tres es trabajo previo al spike** (§6.0):

- `contextMapRelations/{id}.yaml` — un fichero por relación, simétrico con `archimateRelations/`
- `externalSystems/{id}.yaml` — ya es un tipo, solo hay que sacarlo del proyecto
- `deployment.yaml` — toda la config de infra, que cambia por otras razones y en otros
  momentos que el modelo

### 4.4 Las vistas ya están; la decisión es el versionado

La geometría se guarda como `diagrams` en el propio store
(`EditorApiController:3507`, con fallback legacy a un `modux-editor-layout.json` al lado).
O sea: ya es `diagrams/{id}.yaml`, un fichero por vista.

**Decisión: se versiona.** El diagrama es documentación; sin versionar, cada uno ve un
auto-layout distinto. El coste —churn al arrastrar nodos— ya está acotado porque es un
fichero por vista, así que recolocar una lámina no toca las demás.

### 4.5 La regla de escritura del plugin

`save()` **borra y reescribe el directorio entero de cada tipo** en cada guardado
(`GranularYamlStorageFormat.java:117-124`: lista los `.yaml`, los borra todos, los
reescribe). Para un servidor dueño exclusivo del directorio es correcto. Para un plugin de
IDE es inaceptable: tocaría cada fichero del modelo en cada edición —churn de git brutal— y
pisaría ediciones externas concurrentes (el usuario editando el YAML a mano, o un agente).

> **Lee todo, escribe solo lo que cambió.**

Cada comando sabe qué elemento toca, así que el applier escribe un fichero y, como mucho,
borra otro. Encaja directamente con el applier genérico por path del spike: si la tabla
`kind → path` ya dice qué elemento se toca, el fichero a escribir sale gratis.

### 4.6 Un repositorio, un proyecto

**Convención: un proyecto por repositorio**, con su modelo en `modux/` en la raíz. No se
soporta —ni se documenta, ni se ofrece en el `init`— el caso de varios proyectos por repo:
no aporta nada y cada eje de multiplicidad que se deja abierto acaba pidiendo un selector.

Consecuencias directas:

- `AllData.projects` deja de ser lista → **`project.yaml` singleton**.
- `EditorProjectSupport.owningProject()` / `currentProject()` dejan de desambiguar: el repo
  ya lo dice. Con ello se cae el error «No hay ningún proyecto en el store — crea uno en
  Organización → Projects», que es puro artefacto del multi-proyecto.
- `~/.modux/current.yaml` (el contexto seleccionado) y `ModelContextSelector` mueren —
  ya morían con `infra/in/ui`, pero ahora además dejan de tener sentido.
- **No hay "proyecto actual" en ninguna parte.** Es el estado que obligaba a un selector.

```
mi-proyecto/
├── pom.xml
├── modux/                        ← el modelo, versionado
│   ├── index.yaml                ← marcador: identifica la carpeta como proyecto modux
│   ├── schema.json               ← emitido; hace segura la edición por agentes (§3.1)
│   ├── project.yaml
│   ├── deployment.yaml
│   ├── boundedContexts/
│   ├── aggregates/
│   ├── contextMapRelations/
│   ├── archimateRelations/
│   ├── diagrams/
│   └── …
└── src/main/java/                ← generado + custom (ver two-zone-codegen.md)
```

`modux/` junto al proyecto que genera, no `.modux/` ni `src/main/modux/`: no es oculto
porque es código fuente y los IDEs colapsan los dotfiles; y no va bajo `src/main` porque no
lo compila Maven y porque es el *input* que genera ese árbol — meter la entrada dentro de
la salida confunde. Se lee como `docs/` o `db/migrations/`: parte de primera clase del repo.

**Resolución: por marcador más cercano, no por ruta fija.** `index.yaml` —que ya lleva
`formatVersion` y los counts— pasa de detalle del formato a **marcador de proyecto**. Ante
un fichero abierto, el plugin sube directorios hasta el `index.yaml` más cercano y ese es
el proyecto al que pertenece.

Esto no contradice la convención de arriba: la implementa sin necesitar estado. Es más
simple que fijar la ruta a `<raíz>/modux` —no hay que preguntarle al IDE cuál es la raíz
del workspace, ni tratar los workspaces multi-root— y como efecto colateral un repo con
varias carpetas no se rompe: cada fichero sabe de quién es. Lo que **no** se hace nunca es
mantener un "proyecto actual", que es de donde salía el selector.

### 4.7 Referencias entre proyectos

Esto ya funciona **entre stores, no entre proyectos de un mismo store**, así que el cambio
lo confirma en vez de romperlo. Del javadoc de `ProjectReferenceService`:

> «every project is a system, and the `~/.modux` repository catalog is the organisation's
> map of them. LOCAL repositories read from their folder»

Y `addProjectReference()` **no crea un enlace vivo: hace un snapshot**. Lee el store del
otro proyecto, copia su nombre y sus use cases dentro de un `ExternalSystemEntity` del
proyecto actual, y guarda el `targetId` como puntero.

**Ese snapshot es una propiedad, no un apaño: la generación es hermética.** No necesitas el
otro proyecto presente —ni checkouteado, ni accesible— para construir. Hay que protegerlo
explícitamente.

Lo único que hay que rehousing es **dónde se resuelve el puntero**. Hoy es una clave en
`~/.modux/repositories.yaml`, un registro machine-local que desaparece con el home. Pasa a
ser una coordenada resoluble guardada **en el modelo y versionada**:

- **Coordenada git** (URL + branch) como forma canónica: con un proyecto por repo, referenciar
  otro proyecto es siempre referenciar otro repositorio.
- **Path local** (`../checkin/modux`) como atajo para checkouts hermanos en disco, que es lo
  normal mientras se trabaja en varios a la vez. Sin red y sin configuración por máquina.

`RepositoryEntity` ya distingue `LOCAL` / `GIT` / `JDBC`, así que el tipo existe: solo cambia
de sitio, de `~/.modux` al modelo.

El puntero solo se usa **al refrescar** la referencia. El resto del tiempo manda el snapshot,
y por eso perder el acceso al otro repo no rompe nada.

## 5. Qué se borra y qué sobrevive

Sobre **62 885 líneas de Java**:

| Paquete | Líneas | Destino |
|---|---:|---|
| `infra/in/ui` (Mateu UIDL) | 17 578 | **borrar** — la sustituye el editor gráfico |
| `infra/in/mcp` | 922 | **borrar** — §3 |
| `infra/out/git` | 718 | **borrar** — git lo hace el IDE |
| `infra/in/rest` | 8 189 | ~5500 → TS; el resto borrar |
| `application` + `domain` | 24 249 | **sobrevive** → maven-plugin |
| `infra/out/persistence` | 10 549 | parcial — sobrevive el formato granular (§4); el resto, ver §7 |

Dentro de `infra/in/rest`, se borran en lugar de portarse: `SolutionApiController` +
`SolutionGitService` + `SolutionDiffService` (538 líneas juntas), los endpoints `/layout`
(`EditorApiController:3516-3653`), `/repositories`, `/import-api`,
`/interactions/derive` y `/events` (SSE).

**Esto no es un replanteamiento de empaquetado: borra del orden de un tercio del código
Java** y convierte el resto en un maven-plugin que solo lee. Es el argumento de fondo del
movimiento, por encima de la ergonomía del IDE.

### 5.1 Endpoints actuales y su destino

| Endpoint | Destino |
|---|---|
| `/model`, `/version` | I/O de ficheros del IDE — trivial |
| `/layout` | fichero sidecar, I/O del plugin |
| `/commands` | **el port a TS — el trabajo real** |
| `/solutions/*` (diff, tag, tags, merge-check), `/repositories` | **borrar** — lo hace el IDE + git |
| `/import-api` (swagger-parser) | goal del maven-plugin, no vivo en el editor |
| `/interactions/derive` | derivación client-side (ya falla en silencio hoy) |
| `/events` (SSE) | **borrar** — no hay servidor que notifique |

## 6. Fases propuestas

0. **Asentar el formato en disco.** Todo es trabajo en el Java actual, sin plugin de por
   medio, y hay que hacerlo antes del spike para no diseñar la tabla de paths contra una
   forma que va a cambiar:
   - `projects` deja de ser lista → `project.yaml` singleton por carpeta (§4.6).
   - Partir `ProjectEntity` (§4.3): extraer `contextMapRelations/`, `externalSystems/` y
     `deployment.yaml`.
   - Mover la resolución de referencias del registro en `~/.modux` a coordenadas
     versionadas en el modelo (§4.7).
1. **Spike del applier genérico** + tabla de paths, con escritura incremental (§4.5).
   Decide si esto son semanas o meses. No comprometer fechas antes de esto.
2. **Núcleo DDD** (127 comandos). Es de lo que genera el maven-plugin y es el vocabulario
   del que dependen los demás bloques (ids, refs, contención).
3. **Workflows** (19) y **agentes** (42). Pequeños y autocontenidos.
4. **UI** (93). El más grande y el que más va a seguir moviéndose.
5. **Skill + emisión del JSON schema** por proyecto.
6. **Borrado**: `infra/in/ui`, `infra/in/mcp`, `infra/out/git`, endpoints de soluciones.

No hace falta tener los 281 el día uno: el plugin puede salir con el núcleo y dejar que el
resto se edite como YAML de texto. El conjunto de comandos es aditivo, no un big bang.

## 7. Preguntas abiertas

- **El resto de `infra/out/persistence` (10 549 líneas).** El formato granular sobrevive
  (§4.1), pero el paquete contiene además el tipo de repositorio DATABASE (H2/PostgreSQL) y
  el workspace store de `storage-ports.md`. Sin servidor, ¿sobrevive algo de eso? Sospecha:
  se borra casi entero. Sin medir.
- **`MonolithicYamlStorageFormat`.** ¿Se mantiene como formato de importación para modelos
  existentes, o se fuerza la migración a granular con `--modux.split` y se borra? El plugin
  solo va a saber hablar granular.
- **¿Muere el camino de despliegue compartido?** `Dockerfile`, `deploy/chart/modux/` (Helm)
  e `install.sh` apuntan a que se pensó en uso de equipo con servidor. ¿Se abandona o
  convive? Este RFC asume que se abandona.
- **Orden de IDEs.** IntelliJ primero (JVM, público Java/Spring, un solo runtime) o VSCode
  primero. Con el applier en TS los dos son viables; es decisión de público, no técnica.
- **Migración de modelos existentes.** Un modelo que hoy vive en `~/.modux` tiene que acabar
  en el `modux/` de su proyecto (§4.6). ¿Comando de migración one-shot, o a mano? Es también
  el momento de partir los stores multi-proyecto en una carpeta por proyecto.
- **La vista enterprise.** `system-and-solutions.md` y `enterprise-metamodel-extensions.md`
  plantean sistemas compuestos por varios proyectos. Con un proyecto por repo, agregarlos en
  una sola vista es necesariamente cross-repo: ¿existe un "repo de arquitectura" que solo
  contiene referencias, y es eso un proyecto modux o un tipo distinto? Los snapshots (§4.7)
  quitan hierro —la vista se compone sin checkoutear nada— pero la pregunta de quién es el
  dueño de esa vista sigue abierta. **Sin resolver — no darlo por muerto por omisión.**
