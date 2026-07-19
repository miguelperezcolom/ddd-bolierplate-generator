# API gateway — las rutas salen del modelo (servicios + uiAdapters); GENERADO por modux.
server:
    port: ${gatewayPort?c}

spring:
    application:
        name: ${project.name?lower_case?replace("[^a-z0-9]","-",'r')}-api-gateway
    cloud:
        gateway:
            server:
                webmvc:
                    routes:
<#list services as s>
                    # ${s.name}: frontera de máquinas (REST de los gateways ACL)
                    - id: api-${s.slug}
                      uri: http://localhost:${s.port?c}
                      predicates: [ "Path=/api/${s.slug}/**" ]
                      filters: [ "StripPrefix=2" ]
</#list>
<#list apps as a>
                    # ${a.slug}: micro-frontend (rutas /_app de la shell) y caminos de máquina
                    # en ruta natural (los sync del micro-frontend van a /<app>/mateu y /<app>/assets);
                    # la UI en /<app> la sirve la shell, que monta la app dentro (misma sesión)
                    - id: mateu-${a.slug}
                      uri: http://localhost:${a.port?c}
                      predicates: [ "Path=/_${a.slug}/mateu/**" ]
                      filters: [ "RewritePath=/_${a.slug}/mateu(?<segment>/?.*), /${a.slug}/mateu${r"${segment}"}" ]
                    - id: ui-${a.slug}
                      uri: http://localhost:${a.port?c}
                      predicates: [ "Path=/_${a.slug}/**" ]
                      filters: [ "RewritePath=/_${a.slug}(?<segment>/?.*), /${a.slug}${r"${segment}"}" ]
                    - id: app-${a.slug}
                      uri: http://localhost:${a.port?c}
                      predicates: [ "Path=/${a.slug}/mateu/**, /${a.slug}/assets/**" ]
</#list>
                    # la shell (todo lo demás)
                    - id: shell
                      uri: http://localhost:${shellPort?c}
                      predicates: [ "Path=/**" ]
