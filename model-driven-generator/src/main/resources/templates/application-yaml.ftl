<#assign useFlyway = (project.dbMigrationTool!'Flyway') != 'None'>
server:
    port: ${(service.port!8080)?c}

spring:
    application:
        name: ${service.name?lower_case?replace(" ","-")}

    datasource:
        url: jdbc:postgresql://127.0.0.1:5432/${service.name?lower_case?replace(" ","_")}
        username: user_app
        password: user_password
        driver-class-name: org.postgresql.Driver

    hikari:
        connection-timeout: 20000
        maximum-pool-size: 10

<#if useFlyway>
    # Schema is owned by Flyway migrations (src/main/resources/db/migration). Hibernate only
    # validates that the entities match the migrated schema — it never mutates it.
    flyway:
        enabled: true
        baseline-on-migrate: true
        locations: classpath:db/migration

</#if>
    jpa:
        database-platform: org.hibernate.dialect.PostgreSQLDialect
        hibernate:
            ddl-auto: ${useFlyway?then('validate', 'update')}
        show-sql: true
        properties:
            hibernate:
                format_sql: true

    cloud:
<#if consumers?has_content>
        function:
            definition: <#list consumers as c>${c.function}<#sep>;</#sep></#list>
</#if>
        stream:
<#if consumers?has_content>
            bindings:
<#list consumers as c>
                ${c.function}-in-0:
                    destination: ${c.topic}
                    group: ${c.group}
</#list>
</#if>
            kafka:
                binder:
                    # One source of truth for the broker address: the docker profile overrides
                    # spring.kafka.bootstrap-servers via env and the binder follows it.
                    brokers: ${r"${spring.kafka.bootstrap-servers}"}
                    auto-create-topics: true

    kafka:
        # Host-run default: the compose kafka publishes its host listener on 29092.
        bootstrap-servers: localhost:29092
        consumer:
            group-id: ${service.name?lower_case?replace(" ","-")}-group
            auto-offset-reset: earliest
            key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
            value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
        producer:
            key-serializer: org.apache.kafka.common.serialization.StringSerializer
            value-serializer: org.apache.kafka.common.serialization.ByteArraySerializer

logging:
    level:
        org.hibernate.SQL: DEBUG
        org.springframework.kafka: INFO

---
# Local profile: H2 in-memory database. Kafka/stream stays auto-configured (so beans like
# StreamBridge are available); without a reachable broker the consumers just retry in the
# background and do not block startup — enough to run and smoke-test the app locally.
spring:
    config:
        activate:
            on-profile: local
    datasource:
        url: jdbc:h2:mem:${service.name?lower_case?replace(" ","_")?replace("-","_")};DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE<#if useFlyway>;MODE=PostgreSQL</#if>
        username: sa
        password:
        driver-class-name: org.h2.Driver
<#if useFlyway>
    # Run the same Flyway migrations against the in-memory H2 (PostgreSQL compatibility mode), so a
    # local boot exercises the real schema. Hibernate does not touch DDL here.
    flyway:
        enabled: true
        locations: classpath:db/migration
</#if>
    jpa:
        database-platform: org.hibernate.dialect.H2Dialect
        hibernate:
            ddl-auto: ${useFlyway?then('validate', 'create-drop')}
        open-in-view: false
    h2:
        console:
            enabled: true
    cloud:
        stream:
            kafka:
                binder:
                    auto-create-topics: false
<#if idp??>

---
# «secure»: OIDC login against ${idp.name} (${idp.type}) — the model's identity provider.
# The client credentials arrive through the environment: in Kubernetes, from the
# modux-idp-credentials secret; locally, export IDP_CLIENT_ID / IDP_CLIENT_SECRET.
# Without this profile the app boots OPEN (see SecurityConfig).
spring:
    config:
        activate:
            on-profile: secure
    security:
        oauth2:
            client:
                registration:
                    ${idp.slug}:
                        client-id: ${r"${IDP_CLIENT_ID}"}
                        client-secret: ${r"${IDP_CLIENT_SECRET}"}
                        scope: openid, profile, email, roles
                provider:
                    ${idp.slug}:
                        issuer-uri: ${idp.issuer}
</#if>
