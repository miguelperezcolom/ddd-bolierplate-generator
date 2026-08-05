# RFC: Modux como plugin de IDE — sin servidor

> Estado: **en construcción** en la rama `ide-plugin` (2026-08-05). El editor gráfico ya dibuja
> un modelo del repositorio dentro de un IntelliJ en marcha, y el borrado ya está hecho: el build
> de `model-driven-generator`, roto desde antes de este RFC, compila y pasa sus tests. El port de
> comandos y la proyección van por el núcleo. Ver §8 para el estado real y §6 para lo que falta.
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

### 2.4 El vocabulario es regular de nombre; la semántica, a medias

Los nombres son casi perfectamente simétricos:

```
add-*     103        pares add-/remove- simétricos: 101
remove-*  103        → 261 de 281 (93%) se llaman
set-*      55           añadir / quitar / set
otros      20
```

**Pero eso mide los nombres, no lo que hacen.** Midiendo los 274 handlers por número de
tipos de elemento que tocan y si validan:

| | Handlers | |
|---|---:|---|
| Puros: un tipo, sin validación | **116 (42%)** | los cubre un applier genérico |
| Un tipo + validación | 25 (9%) | |
| **Dos tipos** | **90 (33%)** | mantienen back-reference, o crean un stub |
| Tres o más tipos | 43 (16%) | |

Media: **12,1 líneas por handler**. Los más grandes: `renameElement` (160 líneas, 29 tipos),
`addWorkflowLink` (71), `addProjection` (66).

Los 20 irregulares por nombre, completos: `move-model-field`, `move-process-step`,
`move-workflow-step`, `move-page-wizard-step`, `move-menu-item`, `move-page-component`,
`create-ui-app`, `delete-ui-app`, `create-ui-page`, `delete-ui-page`,
`update-process-step`, `update-workflow-step`, `migrate-processes-to-workflows`,
`migrate-sagas-to-workflows`, `rename-element`, `rename-ui-page`,
`invert-archimate-relation`, `save-interaction`, `note-attach`, `note-detach`.

**Consecuencia para el presupuesto.** Una tabla `kind → path` no basta: un tercio de los
comandos mantiene integridad referencial (meter el id del agregado en el `aggregateIds` de
su contexto), crea elementos satélite para que el modelo nazca completo, o resuelve dueños
polimórficos. Pero eso también es declarativo — solo que la tabla necesita `{tipo, padre,
back-reference, guardas, cascada}`, no un path. Con esa forma, los 12 líneas medias se
reparten en cuatro tareas comunes escritas una vez y dos o tres líneas propias por comando.

Verificado en el spike (§8): el bloque núcleo son 46 comandos en ~330 líneas de tabla sobre
~200 de motor.

### 2.5 La proyección, que no estaba contada

Además del applier hay que traer **`EditorModelProjection`, 951 líneas**: el store tiene una
lista por tipo, y el editor dibuja de una forma desnormalizada (`editor/src/model.ts`) donde
un bounded context lleva dentro sus use cases, sus eventos y sus read models.

El port total es entonces **~6450 líneas**, no 5500. Pero buena parte de esas 951 es
**scoping multi-proyecto** —decidir qué contextos son del proyecto actual recorriendo
servicios y módulos, y ocultar los cableados en otro sitio— y eso desaparece entero con un
repositorio por proyecto (§4.6): todo lo que hay en el árbol es del proyecto, porque el
árbol *es* el proyecto.

### 2.6 Dos detalles de formato que hay que replicar exactamente

Descubiertos al portar, y ninguno es cosmético:

1. **El writer de Java omite lo vacío.** `ModelYaml.writer()` usa `NON_EMPTY` más
   `NON_DEFAULT` para booleanos: nulls, cadenas vacías, listas vacías y `false` no se
   escriben. Si TypeScript no hace lo mismo, cada fichero que toque el plugin sale con un
   diff lleno de `aggregateIds: []` — justo el ruido que este diseño quiere evitar.
   El store en memoria normaliza al escribir, así que la forma en memoria y la del fichero
   son la misma por construcción.
2. **El formato granular no guarda el orden de los elementos de un tipo.** Se cargan por
   orden de nombre de fichero. Convertir un store monolítico reordena cada tipo una vez —un
   diff de una sola vez, estable a partir de ahí. El orden *dentro* de un elemento (los
   pasos de un use case) vive en su fichero y no se toca.

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

**Hecho** (§8). Partido en tres tipos de primer nivel:

- `contextMapRelations/{id}.yaml` — un fichero por relación, simétrico con `archimateRelations/`
- `externalSystems/{id}.yaml` — ya era un tipo, solo había que sacarlo del proyecto
- `deployments/deployment-{projectId}.yaml` — la config de infra, que cambia por otras razones
  y en otros momentos que el modelo

Dos cosas que aparecieron al hacerlo:

1. **La migración es la parte que importa, no el split.** Un store escrito antes lleva todo eso
   anidado, y Jackson ignora las propiedades que no conoce: quitar los campos sin más habría
   hecho desaparecer seis relaciones de un modelo que abre sin quejarse. Se migra al cargar
   (`CommonFileRepository.hoistLegacyProjectElements`), junto al `healMainModules()` que ya
   seguía ese patrón. Los campos legacy siguen en `ProjectEntity`, agrupados y marcados, solo
   para eso; se pueden borrar cuando no queden stores anteriores.

   **Y tiene que estar en los dos lenguajes.** Durante un tiempo estuvo solo en Java, y el efecto
   era exactamente el que la migración existe para evitar: el plugin abría un árbol anterior al
   split *perdiendo las relaciones en silencio*, porque su proyección las lee como tipo de primer
   nivel y en el fichero seguían dentro del proyecto. Está portada en
   `editor/src/store/legacy.ts`, con el mismo contrato —lo migrado queda pendiente de escritura y
   llega al disco con el siguiente flush, nunca por el mero hecho de abrir el modelo—. Medido
   sobre `sample/hla-booking`: 6 relaciones, 2 sistemas externos y 1 despliegue.
2. **El id del despliegue no puede ser el del proyecto.** Se intentó, y el lint lo cazó: los ids
   son únicos en todo el modelo, y de esa invariante dependen tanto el validador como el applier
   del editor. Es `deployment-{projectId}`.

De las tres, **la que de verdad quitaba conflictos era la de las relaciones**: era la única que
escribía el fichero del proyecto en cada gesto del editor. Las otras dos separan concerns que se
editan desde la misma pantalla y de uvas a peras.

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

Lo único que hay que rehousing es **dónde se resuelve el puntero**. Era una clave en
`~/.modux/repositories.yaml`, un registro machine-local que desaparece con el home. Es ahora una
coordenada guardada **en el modelo y versionada** (`ReferencedProjectEntity`, en el campo
`referencedProject` del sistema externo):

- **Coordenada git** (URL + branch) como forma canónica: con un proyecto por repo, referenciar
  otro proyecto es siempre referenciar otro repositorio.
- **Path local** (`../checkin/modux`) como atajo para checkouts hermanos en disco, que es lo
  normal mientras se trabaja en varios a la vez. Sin red y sin configuración por máquina.

El puntero solo se usa **al refrescar** la referencia. El resto del tiempo manda el snapshot,
y por eso perder el acceso al otro repo no rompe nada.

**Hecho.** Tres cosas que aparecieron al implementarlo:

1. **La URL git sola basta casi siempre, y por eso es la que hay que guardar.** De ella sale el
   nombre del repositorio, y de ahí un checkout hermano (`../<nombre>/modux`, o `../<nombre>`).
   Eso cubre el caso normal —los dos repos al lado mientras trabajas en ambos— *sin* escribir en
   un fichero versionado dónde guarda las cosas tu máquina, que es lo que un path hace. El path
   queda como override para cuando el checkout no está donde se adivina.
2. **La migración solo puede ocurrir en la máquina que tenía el registro.** Convertir un id
   antiguo exige leer `~/.modux/repositories.yaml`, así que en cualquier otro sitio no hay nada
   que convertir. La regla es entonces **no perder**: un id que el registro no explica se deja
   como estaba en vez de borrarse, porque el snapshot sigue intacto y es lo que lee la
   generación — lo único que no se puede hacer es refrescar. Una carpeta local se convierte en
   path *relativo* al modelo que la referencia, que es lo que la hace resoluble para otro.
3. **El schema mentía sobre el campo legacy.** `referencedRepositoryId` termina en `Id`, y el
   generador describe por convención todo `*Id` como «referencia a un elemento existente, el
   linter comprueba la integridad». No hay tal elemento. El schema es lo que lee un agente antes
   de escribir un modelo (§3.1), así que anunciar un destino inexistente es justo cómo se le
   convence de inventarlo: ahora el campo se describe como legado y dice qué usar en su lugar.

Con esto se cae también el selector de repositorios del editor: la paleta ya no ofrece una lista
de un catálogo que no existe, sino una caja donde dices dónde está el otro proyecto.

### 4.8 Las soluciones son ramas

modux tenía un concepto propio de **solución** —variantes del modelo con su diff, sus tags y su
merge— implementado sobre git en `SolutionApiController` + `SolutionGitService` +
`SolutionDiffService` + `SolutionMergeService`, con su propio vocabulario en el editor.

Con el modelo dentro del repositorio eso deja de tener sentido: **una solución es una rama.**

- Explorar un to-be: `git checkout -b solucion-x`. El modelo va en el árbol, así que la rama
  lo lleva.
- Comparar: `git diff`. El formato granular hace que el diff sea legible por elemento — un
  fichero por elemento es precisamente lo que lo hace revisable.
- Aprobar: un merge, o una pull request con revisión.
- Descartar: borrar la rama.

Todo eso ya lo hace el IDE con la interfaz que el usuario conoce, y lo hace mejor que una
reimplementación: blame, historia, revisión, conflictos, `git bisect`.

Lo que **no** cubre git y hay que decidir aparte es la capa semántica de
[`system-and-solutions.md`](./system-and-solutions.md): el as-is frente al to-be, y los ADRs
que justifican una propuesta. Eso es contenido del modelo, no control de versiones — un tipo
de elemento más, que vive en el árbol y viaja en la rama como todo lo demás. Sin resolver
(§7), pero conviene no confundirlo con lo que git ya da gratis.

## 5. Qué se borra y qué sobrevive

Sobre **62 885 líneas de Java**:

| Paquete | Líneas | Destino | Estado |
|---|---:|---|---|
| `infra/in/ui` (Mateu UIDL) | 17 578 | la sustituye el editor gráfico | ✅ borrado |
| `infra/in/mcp` | 922 | §3 | ✅ borrado |
| `infra/out/git` | 718 | git lo hace el IDE | ✅ borrado |
| `infra/in/rest` | 8 189 | ~5500 → TS; el resto borrar | parcial |
| `application` + `domain` | 24 249 | **sobrevive** → maven-plugin | — |
| `infra/out/persistence` | 10 549 | parcial — sobrevive el formato granular (§4); el resto, ver §7 | parcial |

**Hecho.** 21 641 líneas borradas: 20 856 de Java, 769 del editor. Además de los tres paquetes,
se fue con ellos la capa de workspaces, que resultó existir **solo** para las soluciones — fuera
de sus propias implementaciones, sus únicos consumidores eran `SolutionApiController` y
`RepositoryStoreOpener`. Cayeron enteros el puerto `application/out/store/WorkspaceStore`, su
router y las dos implementaciones (`GitWorkspaceStore`, `DbWorkspaceStore`). Eso responde en
parte a la primera pregunta abierta de §7.

En el editor se fue la UI de soluciones del host web —barra de workspace, badge y listado de
diff, etiquetado de versiones, y el flujo de resolución de conflictos del merge—: 1086 líneas
quedaron en 330. El anillo de diff sigue en el núcleo del editor como propiedad que nadie
alimenta, a propósito: §7 deja abierta la capa semántica as-is/to-be, que es lo que volvería a
alimentarla.

Lo que se conservó al borrar, en vez de irse por arrastre:

- **La cobertura de la generación.** Los tres e2e de MCP se fueron —su asunto era el camino de
  autoría vía MCP—, pero validar y generar sigue cubierto por otros doce e2e.
- **El backend DATABASE.** `DbStorageTest` afirmaba «paridad completa con git» para las
  soluciones; se redujo a lo que sobrevive, que es que el catálogo persiste como filas y aguanta
  una reapertura.
- **El documento HLA.** `GenerateHlaUseCase` cerraba con una sección «Qué cambia respecto al
  sistema» calculada diffeando la rama contra el sistema. Es `git diff` ahora, que sobre un
  fichero por elemento se lee mejor y no necesita modux levantado (§4.8).

**Esto no es un replanteamiento de empaquetado: borra del orden de un tercio del código
Java** y convierte el resto en un maven-plugin que solo lee. Es el argumento de fondo del
movimiento, por encima de la ergonomía del IDE.

### 5.1 Endpoints actuales y su destino

| Endpoint | Destino | Estado |
|---|---|---|
| `/model`, `/version` | I/O de ficheros del IDE — trivial | vive |
| `/layout` | fichero sidecar, I/O del plugin | **vive** — ver abajo |
| `/commands` | **el port a TS — el trabajo real** | vive |
| `/solutions/*` (diff, tag, tags, merge-check), `/repositories` | lo hace el IDE + git | ✅ borrado |
| `/import-api` (swagger-parser) | goal del maven-plugin, no vivo en el editor | ✅ borrado |
| `/interactions/derive` | derivación client-side (ya falla en silencio hoy) | ✅ borrado |
| `/events` (SSE) | no hay servidor que notifique | ✅ borrado |

**`/layout` se queda, de momento.** Es el único sitio donde se persiste la geometría, y el plugin
todavía no la lee ni la escribe (§8, pendiente 4). Borrarlo ahora no movería el trabajo de sitio:
destruiría la colocación manual de cada lámina sin nada que la recoja. Sale cuando el plugin
sepa hacerlo.

**Dos capacidades quedaron sin puerta al borrar sus endpoints**, y conviene no confundirlas con
código muerto: `ImportApiEntityUseCase` —importar un contrato OpenAPI/WSDL *dentro* de un nodo API
existente— no tiene Mojo (`ImportOpenApiMojo` usa `ImportOpenApiUseCase`, que es otra cosa), y
`DeriveInteractionUseCase` espera su port a TypeScript. Ambas siguen en `application`, que es
donde §5 dice que viven las cosas que sobreviven al maven-plugin; les falta la superficie.

## 6. Fases propuestas

0. **Asentar el formato en disco.** ✅ Hecho.
   - Partir `ProjectEntity` (§4.3): `contextMapRelations/`, `externalSystems/`, `deployments/`. ✅
   - Sin "proyecto actual": `currentProject()` → `theProject()`, que no desambigua nada. ✅
   - `projects` sigue siendo una lista de un elemento, en `projects/{id}.yaml` y no
     `project.yaml`: el formato granular es reflexivo sobre las listas de `AllData`, y
     convertir un tipo en singleton obligaría a un caso especial en los dos lenguajes a
     cambio de un nombre de fichero. Se enforcea semánticamente en su lugar.
   - Mover la resolución de referencias del registro en `~/.modux` a coordenadas
     versionadas en el modelo (§4.7). ✅
1. **Spike del applier genérico** + tabla de paths, con escritura incremental (§4.5).
   Decide si esto son semanas o meses. No comprometer fechas antes de esto.
2. **Núcleo DDD** (127 comandos). Es de lo que genera el maven-plugin y es el vocabulario
   del que dependen los demás bloques (ids, refs, contención).
3. **Workflows** (19) y **agentes** (42). Pequeños y autocontenidos.
4. **UI** (93). El más grande y el que más va a seguir moviéndose.
5. **Skill + emisión del JSON schema** por proyecto.
6. **Borrado**: `infra/in/ui`, `infra/in/mcp`, `infra/out/git`, endpoints de soluciones. ✅ Hecho.

No hace falta tener los 281 el día uno: el plugin puede salir con el núcleo y dejar que el
resto se edite como YAML de texto. El conjunto de comandos es aditivo, no un big bang.

**El orden real fue 0 → 1 → 6 → resto, y esa inversión resultó ser la correcta.** El borrado se
planteó como última fase para no quedarse sin nada que dibujara un modelo entero mientras la
proyección estuviera incompleta; pero lo único que impedía compilar eran precisamente los dos
paquetes que se borran, así que aplazarlo era aplazar tener un build. Y el miedo no se
materializó: lo que dibuja el modelo entero es `infra/in/rest` + el editor web, que no se tocan.
`infra/in/ui` era la administración en Mateu UIDL, que es otra cosa.

## 7. Preguntas abiertas

- **El resto de `infra/out/persistence` (10 549 líneas).** El formato granular sobrevive
  (§4.1), pero el paquete contiene además el tipo de repositorio DATABASE (H2/PostgreSQL) y
  el workspace store de `storage-ports.md`. **Medido a medias:** el workspace store se fue entero
  con las soluciones (§5) — puerto, router y las dos implementaciones—, porque no tenía ningún
  otro consumidor. Lo que queda por decidir es el tipo DATABASE, que sigue vivo y con su test.
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
- **La capa semántica de soluciones.** Git cubre las variantes (§4.8), pero no el as-is
  frente al to-be ni los ADRs de `system-and-solutions.md`. ¿Se modelan como tipos de
  elemento en el árbol? Sin resolver.

## 8. Estado de la implementación

Rama `ide-plugin`. Lo construido y verificado hasta ahora:

| Pieza | Dónde | Estado |
|---|---|---|
| Store granular + seguimiento de cambios | `editor/src/store/store.ts` | ✅ |
| Motor de comandos declarativo | `editor/src/store/spec.ts` | ✅ |
| **Bloque núcleo DDD: 124 de 125 comandos** | `editor/src/store/commands/` | ✅ 224 tests en el editor |
| Scaffolding CRUD determinista | `editor/src/store/scaffold.ts` | ✅ el núcleo que refuerzan las 4 familias |
| Árbol de ficheros, escritura incremental | `editor/src/store/tree.ts` | ✅ validado contra `sample/hla-booking` |
| Migración de árboles anteriores al split | `editor/src/store/legacy.ts` | ✅ simétrica con la de Java (§4.3) |
| Proyección store → vista | `editor/src/store/project.ts` | ✅ todo el núcleo; declara lo que no cubre |
| Host del editor en el IDE | `editor/src/host/modux-editor-ide.ts` | ✅ 166 tests en el editor |
| Plugin de IntelliJ | `intellij-plugin/` | ✅ 23 tests; **dibuja dentro de un IDEA en marcha** |
| `modux:generate` desde el árbol granular | `plugin/` | ✅ |
| `modux:validate` (integridad referencial) | `plugin/` | ✅ limpio sobre el sample |
| `modux:schema` | `plugin/` | ✅ 6 tests en el maven-plugin |
| Skill de autoría | `.claude/skills/modux-model/` | ✅ |
| **Fase 0 en Java**: relaciones, externos y despliegue a tipos propios | `model-driven-generator/` | ✅ |
| **Fase 6**: el borrado | `model-driven-generator/`, `editor/` | ✅ build verde por fin |
| **Fase 0 (3/3)**: referencias por coordenada versionada | `model-driven-generator/`, `editor/` | ✅ 169 tests en Java, 184 en el editor |

### 8.1 Lo que enseñó verificarlo dentro de un IDE

La verificación end-to-end estaba pendiente y encontró tres cosas rotas, ninguna visible desde
Java:

1. **El bundle era inalcanzable para el webview.** El puente apuntaba el `<script type="module">`
   a `getResource(...)`, que en un plugin empaquetado devuelve `jar:file:…!/modux-editor.js` — un
   esquema que el navegador no sabe cargar. El panel habría salido en blanco *siempre*, sin un
   solo error del lado Java. El plugin sirve ahora el bundle desde un origen propio
   (`EditorResources`), resolviendo contra el classpath a demanda: así el chunk de ELK, cuyo
   nombre lleva un hash de contenido, no necesita ninguna lista que mantener.
2. **El plugin de gradle no arrancaba un IDEA actual.** `buildPlugin` colaba con 2.1.0 y `runIde`
   moría al leer el `product-info.json` de 2025.2. Actualizado a 2.18.1, que exige Gradle 9 — y
   el proyecto no tenía wrapper, así que dependía del gradle que hubiera suelto en la máquina.
3. **El marcador era demasiado laxo.** `isMarker` aceptaba cualquier fichero llamado `index.yaml`,
   así que un `docs/index.yaml` de otra herramienta ofrecía una pestaña «Modux» condenada a
   fallar. Discrimina por `formatVersion`, que es exactamente lo que §4.6 dice que convierte a ese
   fichero en marcador.

Lo que no es automatizable es el último palmo: que dibuje. El resto sí está cubierto sin pantalla
—`ModelFiles` sobre el VFS real (incluida la regla de §4.5: escribir un elemento no toca el
`stamp` de ningún otro), la resolución por marcador más cercano, y que el bundle sea servible—.
Para el palmo visual: `./gradlew runIde -PmoduxRunProject=<ruta>` abre el sandbox sobre un
proyecto, y los mensajes de consola del webview van al log del IDE, que era la otra cosa que
faltaba: sin ellos, un modelo que cargó y uno que nunca llegó a cargar se ven igual.

### 8.1.1 El núcleo, portado

El bloque núcleo está en TypeScript: **124 de sus 125 comandos**, repartidos por asunto en
`editor/src/store/commands/` en vez de en un fichero. El que falta es `add-project-reference`, y
falta por una razón que no es pereza: **leer otro modelo del disco es trabajo del host, no del
motor de comandos**. El applier es puro sobre un store en memoria, y esa pureza es lo que lo hace
testable sin ficheros; el día que se porte, el host resolverá la coordenada (§4.7) y le pasará el
snapshot ya leído.

Lo que la medición de §2.4 predijo se cumplió —la mayoría son tabla— y lo que no predijo fue
dónde estaba el trabajo real:

- **El scaffolding CRUD**, en `scaffold.ts`. Cuatro gestos distintos —un actor que puede
  ejecutarlo, una app que lo muestra, un sistema externo que se integra, otro contexto que lo
  lee— derivan **el mismo** trío de casos de uso, los mismos tres eventos de ciclo de vida, la
  misma query de listado y el mismo contrato REST. Que los ids dependan solo del agregado es lo
  que hace que se refuercen entre sí en vez de que cada uno acuñe su copia, y que «ya está
  relacionado» sea un `store.has`.
- **`rename-element`**, que en Java es un switch de 160 líneas sobre 29 tipos donde cada brazo
  dice lo mismo dos veces. Aquí es una tabla de 31 entradas: es el caso donde el argumento de
  `spec.ts` se ve más claro, porque es donde el código por tipo era más idéntico.
- **Los pasos de un proceso**, donde el orden es dato: añadir, mover y borrar tienen que decir
  exactamente dónde, y un `move` sin ancla va al frente, que es el único «a ninguna parte» que
  no es ambiguo.

**Y portar encontró cuatro defectos en lo que ya estaba portado**, todos de la misma clase —el
campo almacenado no se llama como el comando lo llama—, y todos invisibles hasta que alguien
abriera un modelo real:

1. La proyección leía `actors`, un tipo que no existe: los actores son `roles` en el store.
2. Una URL se guardaba con la dirección en `uri`, pero el campo es `url`. Una URL cargada de un
   modelo de verdad salía con la dirección vacía.
3. Una nota guardaba sus anclajes en `attachedToIds`, pero el campo es `targetIds` — y además
   hay dos: un ancla a una relación es una coordenada de vista (`edgeRefs`), no un id, y no debe
   acabar donde algo va a intentar resolverla.
4. `remove-url` no desenganchaba la URL de los servicios que respondían en ella.

Nada de eso lo habría cazado un test de los comandos contra sí mismos: se cazan comparando con
el esquema que Java escribe, que es lo que este port obliga a hacer.

### 8.2 Lo que falta, por orden de peso

1. **Los otros 154 comandos** — UI (93), agentes (42) y workflows (19).
2. **El resto de la proyección** — faltan UI, workflows, agentes y la vista de procesos.
3. **Layout / `diagrams`** — el editor todavía no lee ni escribe geometría por esta vía, y es lo
   que mantiene vivo `/layout` (§5.1).
4. **Superficie para las dos capacidades huérfanas** (§5.1): el Mojo de `ImportApiEntityUseCase`
   y la derivación de interacciones en TypeScript.
5. **`add-project-reference` en el applier de TypeScript** — el único del núcleo sin portar, por
   la razón de §8.1.1: leer otro modelo del disco es trabajo del host.

**El build de `model-driven-generator` llevaba roto desde antes de este RFC**, y ya no lo está.
Lo revelador fue dónde: **lo único que no compilaba era `infra/in/ui` (17 578 líneas, referencias
a `CrudAdapter`, `CrudEditorForm` y `CrudCreationForm` que no existen en el mateu local) e
`infra/in/mcp` (922) — exactamente los dos paquetes que este RFC borra.** Borrarlos dejó el módulo
compilando y sus 159 tests en verde, sin tocar nada más. Era la única deuda que no había que
pagar: había que dejar de arrastrarla.
