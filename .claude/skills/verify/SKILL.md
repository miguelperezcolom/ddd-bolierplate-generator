---
name: verify
description: How to boot and drive this repo's app (modux) to verify changes end-to-end — isolated backend instance, editor bundle, Playwright over the real web component.
---

# Verifying modux changes

## Backend (model-driven-generator, Spring Boot)

- The app serves everything on **port 8192** (`application.properties`); the user
  usually has their own instance running there — never reuse it.
- The model is read from **repositories** configured in `~/.modux` (the user's home):
  `repositories.yaml` is the catalog (LOCAL folder / GIT url / DATABASE jdbc) and
  `current.yaml` records which repository+project is open, reopened on startup.
  Opening a repository WRITES `current.yaml` — an isolated instance MUST get its own
  home via `-Dmodux.home`, or it will mutate the user's real state.
- Boot an isolated one:

```bash
# Own modux home + seed data, so verification never touches ~/.modux or the user's files
mkdir -p <scratch>/verify-home <scratch>/verify-data
# Seed: copy the user's current repo folder (find it via ~/.modux/repositories.yaml
# + current.yaml) or, if ~/.modux is absent, use sample/hla-booking/model-driven-store.yaml
cat > <scratch>/verify-home/repositories.yaml <<EOF
repositories:
  - id: "verify"
    name: "verify"
    type: "LOCAL"
    folder: "<scratch>/verify-data"
EOF
printf 'repositoryId: "verify"\n' > <scratch>/verify-home/current.yaml

# spring-boot.run.jvmArguments is IGNORED by this plugin version — use JAVA_TOOL_OPTIONS
cd model-driven-generator && JAVA_TOOL_OPTIONS="-Dserver.port=8193 \
  -Dmodux.home=<scratch>/verify-home" mvn spring-boot:run
```

- Boots in ~15 s. Readiness probe: `curl http://localhost:8193/modux/editor/version`.
- The store inside a repository folder is its `model-driven-store.yaml` when present,
  or the folder itself as a granular store (one file per element).
- `-Dmodux.model-file=<path>` still works as fallback when no repository was opened,
  but repositories are the primary path now (`RepositoryStoreOpener`,
  `ReopenCurrentRepositoryOnStartup`).
- Editor API surface: `GET/PUT /modux/editor/layout`, `GET /modux/editor/model`,
  `POST /modux/editor/commands`, SSE `/modux/editor/events`.

## Editor (editor/, Lit + vite)

- `cd editor && npm run copy` — type-checks, bundles, and copies the bundle into the
  generator's static resources (both `src/main/resources` and `target/classes`).
- The user's running backend serves the copied bundle immediately; browser reload picks it up.

## Driving the real UI

- Playwright resolves from `/home/mperezco/IdeaProjects/node_modules/playwright/index.mjs`
  (a parent dir of the repo — NOT in editor/node_modules; plain `import 'playwright'`
  only resolves if the script lives under ~/IdeaProjects).
- No need to find the Mateu page route: navigate anywhere on `http://localhost:8193`
  (same origin), then inject the component:

```js
await import('/modux-editor/modux-editor.js');
const el = document.createElement('modux-editor-connected');
el.setAttribute('base', '/modux/editor');
document.body.appendChild(el);
```

- Playwright locators pierce the shadow DOM (e.g. `select:has(option[value="contexts"])`
  finds the context-map detail selector). Layout writes debounce **600 ms** before the
  PUT — wait ≥1 s before asserting on persisted state.
