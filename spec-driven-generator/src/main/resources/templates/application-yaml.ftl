server:
    port: 8080

spring:
    application:
        name: ${project.name}

    datasource:
        url: jdbc:postgresql://127.0.0.1:5432/${project.name}
        username: user_app
        password: user_password
        driver-class-name: org.postgresql.Driver

    hikari:
        connection-timeout: 20000
        maximum-pool-size: 10

    jpa:
        database-platform: org.hibernate.dialect.PostgreSQLDialect
        hibernate:
            ddl-auto: update
        show-sql: true
        properties:
            hibernate:
                format_sql: true

    cloud:
        stream:
            kafka:
                binder:
                    brokers: localhost:9092
                    auto-create-topics: true

    kafka:
        bootstrap-servers: localhost:9092
        consumer:
            group-id: ${project.name}-group
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
# Local profile: H2 in-memory, no Kafka
spring:
    config:
        activate:
            on-profile: local
    datasource:
        url: jdbc:h2:mem:${project.name?replace(" ", "_")};DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
        username: sa
        password:
        driver-class-name: org.h2.Driver
    jpa:
        database-platform: org.hibernate.dialect.H2Dialect
        hibernate:
            ddl-auto: create-drop
        open-in-view: false
    h2:
        console:
            enabled: true
    cloud:
        stream:
            defaultBinder: ""
            bindings: {}
        function:
            definition: ""
    autoconfigure:
        exclude:
            - org.springframework.cloud.stream.config.BindingServiceConfiguration
            - org.springframework.cloud.stream.function.FunctionConfiguration
            - org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration
