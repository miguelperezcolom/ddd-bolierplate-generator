#!/bin/sh
# ${project.name} — down.sh (GENERADO por modux; se regenera con el modelo)
set -e

PRE="${project.name?lower_case?replace("[^a-z0-9]","-",'r')}"

<#list services as s>
pkill -f "${s.name}-app-0.0.1-SNAPSHOT.jar" 2>/dev/null || true
</#list>
<#list shells as sh>
pkill -f "${sh.slug}-0.0.1-SNAPSHOT.jar" 2>/dev/null || true
</#list>
docker rm -f $PRE-postgres $PRE-kafka <#if shells?has_content>$PRE-keycloak </#if>>/dev/null 2>&1 || true

echo "Sistema parado (los logs quedan en .up-*.log)."
