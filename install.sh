#!/bin/sh
# Instalador local de modux: construye el jar y deja un launcher `modux` en
# ~/.local/bin. El modo local trabaja contra ~/.modux (sistema de archivos);
# con --docker construye la imagen y el launcher corre el contenedor.
set -e

MODE="jar"
[ "$1" = "--docker" ] && MODE="docker"

ROOT="$(cd "$(dirname "$0")" && pwd)"
BIN_DIR="${HOME}/.local/bin"
mkdir -p "$BIN_DIR"

if [ "$MODE" = "jar" ]; then
  command -v java >/dev/null || { echo "modux necesita java 21+ (o usa ./install.sh --docker)"; exit 1; }
  command -v mvn  >/dev/null || { echo "modux necesita maven para construirse (o usa ./install.sh --docker)"; exit 1; }
  echo "[modux] construyendo…"
  mvn -q -f "$ROOT/model-driven-generator/pom.xml" package -DskipTests
  JAR="$(ls "$ROOT"/model-driven-generator/target/*-exec.jar | head -1)"
  mkdir -p "${HOME}/.modux"
  cat > "$BIN_DIR/modux" <<LAUNCHER
#!/bin/sh
# modux en local: el modelo vive en ~/.modux (repositorios LOCAL/GIT sobre tu disco)
exec java -Dmodux.home="\${MODUX_HOME:-\$HOME/.modux}" -Dserver.port="\${MODUX_PORT:-8192}" -jar "$JAR" "\$@"
LAUNCHER
else
  command -v docker >/dev/null || { echo "falta docker"; exit 1; }
  command -v mvn >/dev/null || { echo "el jar se construye en el host: falta maven"; exit 1; }
  echo "[modux] construyendo el jar…"
  mvn -q -f "$ROOT/model-driven-generator/pom.xml" package -DskipTests
  echo "[modux] construyendo la imagen…"
  docker build -t modux:local "$ROOT"
  mkdir -p "${HOME}/.modux"
  cat > "$BIN_DIR/modux" <<'LAUNCHER'
#!/bin/sh
# modux en contenedor: ~/.modux montado como home; añade -v para tus carpetas LOCAL
exec docker run --rm -p "${MODUX_PORT:-8192}:8192" \
  -v "$HOME/.modux:/data/modux-home" \
  -e MODUX_HOME=/data/modux-home \
  modux:local "$@"
LAUNCHER
fi

chmod +x "$BIN_DIR/modux"

# Ejemplos didácticos de patrones (sample/patterns del repo): se copian a
# ~/.modux/examples y se registran como repositorios LOCAL. Idempotente;
# reinstalar sobrescribe los cambios hechos en esas copias.
PATTERNS_SRC="$ROOT/sample/patterns"
EXAMPLES_DIR="${HOME}/.modux/examples"
REPOS_FILE="${HOME}/.modux/repositories.yaml"
if [ -d "$PATTERNS_SRC" ]; then
  mkdir -p "$EXAMPLES_DIR"
  cp -R "$PATTERNS_SRC/." "$EXAMPLES_DIR/"
  rm -f "$EXAMPLES_DIR/README.md"
  [ -f "$REPOS_FILE" ] || echo "repositories:" > "$REPOS_FILE"
  for p in bff acl cqrs event-driven saga event-sourcing proceso-humano; do
    if ! grep -q "id: \"patron-$p\"" "$REPOS_FILE" 2>/dev/null; then
      cat >> "$REPOS_FILE" <<EOF
- id: "patron-$p"
  name: "Patrón · $p"
  type: "LOCAL"
  folder: "$EXAMPLES_DIR/$p"
  gitUrl: ""
  branch: ""
  jdbcUrl: ""
  description: "Ejemplo didáctico del patrón $p (sample/patterns del repo modux)"
EOF
    fi
  done
  echo "[modux] ejemplos de patrones sembrados en $EXAMPLES_DIR (repositorios 'Patrón · …')"
fi

echo "[modux] instalado: $BIN_DIR/modux  (arranca con: modux · abre http://localhost:8192)"
case ":$PATH:" in *":$BIN_DIR:"*) ;; *) echo "[modux] añade $BIN_DIR a tu PATH";; esac
