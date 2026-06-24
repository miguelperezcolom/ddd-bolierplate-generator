<#assign slug = service.name?lower_case?replace("[^a-z0-9]","-",'r')>
<#assign java = (service.javaVersion!'21')>
# syntax=docker/dockerfile:1
# Multi-stage image for the ${service.name} service. Build context: this service directory.

FROM maven:3.9-eclipse-temurin-${java} AS build
WORKDIR /workspace
COPY . .
RUN mvn -B -q -DskipTests package

FROM eclipse-temurin:${java}-jre AS runtime
WORKDIR /app
RUN groupadd --system app && useradd --system --gid app app
COPY --from=build /workspace/${slug}-app/target/*.jar /app/app.jar
USER app
EXPOSE ${(service.port!8080)?c}
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
