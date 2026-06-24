version: "3.8"

services:
<#list project.services as svc>
  ${svc.name?lower_case?replace("[^a-z0-9]","-",'r')}:
    build:
      context: ./${svc.name?lower_case?replace("[^a-z0-9]","-",'r')}
    ports:
      - "${(svc.port!8080)?c}:${(svc.port!8080)?c}"
    environment:
      SPRING_PROFILES_ACTIVE: docker
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/${svc.name?lower_case?replace("[^a-z0-9]","_",'r')}
      SPRING_DATASOURCE_USERNAME: user_app
      SPRING_DATASOURCE_PASSWORD: user_password
      SPRING_KAFKA_BOOTSTRAP_SERVERS: kafka:9092
    depends_on:
      - postgres
      - kafka

</#list>
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user_app
      POSTGRES_PASSWORD: user_password
      POSTGRES_MULTIPLE_DATABASES: ${project.services?map(s -> s.name?lower_case?replace("[^a-z0-9]","_",'r'))?join(",")}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.1
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:7.6.1
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

volumes:
  postgres_data:
