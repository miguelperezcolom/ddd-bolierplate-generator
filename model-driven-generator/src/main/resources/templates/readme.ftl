# ${project.name}

<#if project.objective?has_content>
${project.objective}

</#if>
Proyecto generado por [modux](https://github.com/miguelperezcolom/modux) a partir de su modelo.

<#if services?has_content>
## Servicios

| Servicio | Módulos desplegados |
|----------|---------------------|
<#list services as s>
| ${s.name} | ${s.modules?join(", ")} |
</#list>

## Construir y arrancar

En local (base de datos H2 en memoria, sin infraestructura):

```bash
<#list services as s>
(cd ${s.slug} && mvn install -DskipTests && mvn spring-boot:run -pl ${s.slug}-app -Dspring-boot.run.profiles=local)
</#list>
```
<#else>
Este proyecto aún no tiene servicios: modela sus contextos, interfaces y despliegue
en el editor de modux y vuelve a generar.
</#if>
<#if contexts?has_content>

## Bounded contexts

<#list contexts as c>
- **${c}**
</#list>
</#if>

---
Regenerar: desde la UI de modux (proyecto «${project.name}») o por CLI:

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--modux.generate=${project.id} --modux.output=<destino>"
```
