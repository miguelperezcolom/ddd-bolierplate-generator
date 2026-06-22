server:
  port: ${r"${SHELL_PORT:8100}"}

spring:
  application:
    name: ${shell.name?lower_case?replace("[^a-z0-9]","-",'r')}
  security:
    oauth2:
      resourceserver:
        jwt:
          jwk-set-uri: ${r"${KEYCLOAK_JWK_URI:http://localhost:8080/realms/master/protocol/openid-connect/certs}"}
          issuer-uri: ${r"${KEYCLOAK_ISSUER:http://localhost:8080/realms/master}"}

logging:
  level:
    org.springframework.security: INFO
