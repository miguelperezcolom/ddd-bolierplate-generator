#!/bin/sh
# El contenedor arranca en uno de dos mundos:
#  - web contra BD:      MODUX_BOOTSTRAP_DB=jdbc:postgresql://… (+ MODUX_DB_USER/PASSWORD)
#  - local contra disco: sin variables — el home vive en el volumen /data
set -e

MODUX_HOME="${MODUX_HOME:-/data/modux-home}"
mkdir -p "$MODUX_HOME"

# Primer arranque contra BD: el catálogo de repositorios se siembra solo.
if [ -n "$MODUX_BOOTSTRAP_DB" ] && [ ! -f "$MODUX_HOME/repositories.yaml" ]; then
  cat > "$MODUX_HOME/repositories.yaml" <<YAML
repositories:
- id: "main"
  name: "${MODUX_REPOSITORY_NAME:-main}"
  type: "DATABASE"
  jdbcUrl: "$MODUX_BOOTSTRAP_DB"
YAML
  printf 'repositoryId: "main"\n' > "$MODUX_HOME/current.yaml"
  echo "[modux] repositorio DATABASE sembrado hacia $MODUX_BOOTSTRAP_DB"
fi

exec java ${JAVA_OPTS} \
  -Dmodux.home="$MODUX_HOME" \
  -Dserver.port="${SERVER_PORT:-8192}" \
  -jar /app/modux.jar
