<#assign slug = service.name?lower_case?replace("[^a-z0-9]","-",'r')>
<#assign java = (service.javaVersion!'21')>
# syntax=docker/dockerfile:1
# Runtime image for the ${service.name} service. The jar is built OUTSIDE the image
# (`mvn package` before `docker compose build`): the build needs the developer's local
# Maven repository (io.mateu:* artifacts), which an isolated docker build cannot see.

FROM eclipse-temurin:${java}-jre
WORKDIR /app
RUN groupadd --system app && useradd --system --gid app app
COPY ${slug}-app/target/*.jar /app/app.jar
USER app
EXPOSE ${(service.port!8080)?c}
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
