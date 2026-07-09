# RFC: Puertos de almacenamiento — ficheros+git hoy, base de datos mañana

**Estado: IMPLEMENTADO (2026-07-09, F1-F4).** Puertos extraídos, adapters git detrás sin cambio de comportamiento, tipo de repositorio DATABASE con JdbcModelDatabase (H2/PostgreSQL) + DbWorkspaceStore con paridad de soluciones probada e2e sobre H2 (109/109), y copia entre repositorios (`POST /modux/editor/solutions/copy-repository`) como export/import. Credenciales por MODUX_DB_USER/MODUX_DB_PASSWORD o en la URL JDBC. Pregunta de Miguel (2026-07-09): ¿podemos hacer
que modux se base en base de datos en lugar de ficheros+git, como una cuestión SOLO de
la capa de infraestructura?

## Diagnóstico: el código ya está casi preparado

Tres hechos medidos sobre el código actual:

1. **Hay un único punto de estrangulamiento.** Los ~100 ficheros que tocan persistencia
   lo hacen a través de UNA clase, `CommonFileRepository`, cuya API ya es agnóstica del
   almacén en un 90%: `findById(id, type)`, `save`, `findAll(paged)`, `findAllOfType`,
   `allElements`, `deleteAllById`, `snapshot()`, `replaceWith(AllData)`. Solo cinco
   sitios usan file-isms (`storePath()`): los tres servicios git, el CLI runner y el
   fallback del layout legacy en `EditorApiController`.

2. **El modelo es un catálogo, no un grafo relacional.** Elementos identificables por
   `(tipo, id)` con payload serializable (records ↔ YAML/JSON vía Jackson). El formato
   granular («un fichero por elemento», `ModelStorageFormat`) demostró ya que la unidad
   natural de almacenamiento es el elemento — y "un fichero por elemento" se traduce
   1:1 a "una fila por elemento".

3. **La capa semántica de soluciones NO depende de git.** El diff y el merge son
   *por elemento y por id* sobre snapshots de `AllData` (`SolutionDiffService`,
   `SolutionMergeService`); git solo aporta tres cosas mecánicas: (a) aislar el
   contenido de cada rama, (b) darnos la BASE del three-way (merge-base vía worktree),
   (c) registrar historia (commits/tags). Las tres son reemplazables por tablas.

**Conclusión: sí es factible, y sin rehacer nada del dominio/aplicación.** El coste es
un refactor mecánico de tipos (extraer interfaces) más una implementación JDBC acotada.

## Diseño: dos puertos

### Puerto 1 — `ModelStore` (el catálogo)

```java
public interface ModelStore {
    <T> Optional<T> findById(String id, Class<T> type);
    void save(Identifiable element);
    <T> ListingData<T> findAll(String search, Object filters, Pageable p, Class<T> type);
    <T> List<T> findAllOfType(Class<T> type);
    Collection<Object> allElements();          // fingerprint SSE incluida
    <T> void deleteAllById(List<String> ids, Class<T> type);
    AllData snapshot();
    void replaceWith(AllData data);
}
```

- `FileModelStore` = el `CommonFileRepository` actual (renombrado, `implements`).
- `JdbcModelStore` = una tabla. La carga perezosa granular
  (`beginScopedLoad`/`loadTypeIntoStore`) va en una capability opcional
  (`ScopedLoading`) — en DB es incluso más natural (query por tipo/id).
- Los `*FileRepository` de cada agregado no cambian: hablan con el puerto.

### Puerto 2 — `WorkspaceStore` (sistema y soluciones)

```java
public interface WorkspaceStore {
    Workspace current();                        // rama/workspace activo + system?
    List<Workspace> list();                     // derivado, sin registro duplicado
    void createSolution(String name);           // branch desde el sistema
    void switchTo(String workspaceId);          // checkout + reload del ModelStore
    void discard(String workspaceId);           // archivar
    AllData baseOf(String workspaceId);         // LA CLAVE: la base del three-way
    void commitToSystem(AllData merged, String message);  // el merge aterrizando
    void updateBase(String workspaceId);        // tras «⟳ Actualizar del sistema»
}
```

- `GitWorkspaceStore` = `SolutionGitService` + la lectura por worktree de
  `SolutionDiffService` (que se queda como detalle interno del adapter git).
- Los servicios semánticos (diff three-way, merge por elemento, approval gate) se
  mueven a `application/` como funciones puras sobre `AllData` — les llega la base
  por el puerto y dejan de saber qué es un worktree.

### Implementación DB (esbozo)

```sql
workspace(id, name, kind SYSTEM|SOLUTION, status, created_at)
element(workspace_id, type, id, payload jsonb, updated_at,
        PRIMARY KEY (workspace_id, type, id))
element_base(workspace_id, type, id, payload jsonb)   -- congelada al crear la solución
history(workspace_id, seq, at, actor, summary, changeset jsonb)  -- blame/auditoría
```

- Crear solución = copiar las filas del sistema a `element` y `element_base` del
  workspace nuevo (o copy-on-write si el tamaño lo pide).
- `baseOf` = leer `element_base`. «⟳ Actualizar del sistema» = merge semántico (ya
  existente) + refrescar `element_base`.
- Merge al sistema = `commitToSystem(merged)` + fila de `history` + archivar workspace.

## La BD como un TIPO más de repositorio (decisión de Miguel, 2026-07-09)

En lugar de un selector global (`modux.storage` por perfil Spring), la BD entra por el
catálogo de repositorios que ya existe: `RepositoryType` gana **`DATABASE`** junto a
`LOCAL` y `GIT`, con sus campos condicionales en el formulario (JDBC URL, usuario,
esquema, y credencial como *referencia* — env var / secretsProvider — nunca en claro
en `~/.modux/repositories.yaml`).

La consecuencia arquitectónica: la elección de adapters es **por repositorio y en
tiempo de apertura**, no de arranque. Hoy `RepositoryStoreOpener.open(repo)` devuelve
un `Path` (clonando si es GIT); pasa a resolver un **par de adapters**
(`ModelStore` + `WorkspaceStore`) según el tipo:

```
LOCAL / GIT  → FileModelStore + GitWorkspaceStore   (lo actual)
DATABASE     → JdbcModelStore + DbWorkspaceStore
```

Los ~100 puntos de inyección siguen inyectando UN bean: un `ModelStore` *router* que
delega en el par abierto por el repositorio en curso — el mismo patrón que hoy, donde
cambiar de repositorio hace `loadFrom` sobre el singleton.

Bonus que salen gratis con este diseño:

- **Backends mezclados en la misma sesión**: el repo corporativo en Postgres y un
  repo LOCAL de exploración personal (con su YAML editable a mano/IA), conmutables
  desde el mismo selector de la cabecera.
- **Migración entre backends = gesto de UI**: abrir el repo origen → `snapshot()` →
  crear el repo destino → `replaceWith()`. El espejo YAML de la F4 se reduce a
  «copiar el repositorio a uno de tipo LOCAL» (export) y viceversa (import).

## Qué NO se toca

Dominio, casos de uso de aplicación, linter, expanders, importers, generación, HLA,
TODO el editor (TS y API REST de comandos), MCP de autoría, EventStorming. El refactor
es de **tipos en infraestructura**: el compilador guía los ~100 puntos de uso.

## Trade-offs a decidir

| | ficheros+git | base de datos |
|---|---|---|
| Editable a mano / por IA como texto | ✅ (clave hoy para NL→spec) | ❌ (mitigable: export/import YAML o espejo fs) |
| Historia, blame, PRs en GitHub | ✅ gratis | tabla `history` propia |
| Multiusuario real / hosted / locking | ❌ (repo local) | ✅ |
| Gitlink/repos anidados | caveat conocido | desaparece |

## Fases

- **F1 — Extraer los puertos** (sin cambio de comportamiento): `ModelStore` +
  `WorkspaceStore`, adapters actuales detrás (elegidos por `RepositoryStoreOpener`
  según el tipo), servicios semánticos a application. Prueba de no-regresión: la
  suite (108) y los e2e de soluciones en verde intactos.
- **F2 — Tipo `DATABASE` + `JdbcModelStore`** (Postgres jsonb): alta del repositorio
  en el formulario con campos condicionales, abrir/conmutar, catálogo funcionando;
  sin soluciones aún.
- **F3 — `DbWorkspaceStore`** + paridad de soluciones: la misma suite e2e de
  soluciones ejecutada contra ambos tipos de repositorio.
- **F4 (opcional) — Migración entre repositorios** («copiar a…»): que hace de
  export/import YAML gratis.
